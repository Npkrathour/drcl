"use client";

import { useSyncExternalStore } from "react";
import { getProduct, type SizeLabel } from "./products";
import { site } from "./site";

export interface CartItem {
  slug: string;
  size: SizeLabel;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  /** Last "added to cart" notification, shown as a toast. */
  toast: { id: number; message: string } | null;
}

const STORAGE_KEY = "drcl-cart-v1";
const MAX_QTY = 20;
const EMPTY: CartState = { items: [], toast: null };

let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const items = (JSON.parse(raw) as CartItem[]).filter(
        (i) => getProduct(i.slug)?.sizes.some((s) => s.label === i.size) && i.quantity > 0,
      );
      state = { ...state, items };
    }
  } catch {
    /* storage unavailable — start with an empty cart */
  }
}

function setState(next: Partial<CartState>) {
  state = { ...state, ...next };
  if (next.items) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      loaded = false;
      state = { ...state, items: [] };
      load();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

const getServerSnapshot = () => EMPTY;

let toastId = 0;

export const cartActions = {
  add(slug: string, size: SizeLabel, quantity = 1, { silent = false } = {}) {
    const items = [...state.items];
    const idx = items.findIndex((i) => i.slug === slug && i.size === size);
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity: Math.min(MAX_QTY, items[idx].quantity + quantity) };
    } else {
      items.push({ slug, size, quantity: Math.min(MAX_QTY, quantity) });
    }
    const name = getProduct(slug)?.name ?? "Item";
    setState({
      items,
      toast: silent ? state.toast : { id: ++toastId, message: `${name} (${size}) added to cart` },
    });
  },
  setQuantity(slug: string, size: SizeLabel, quantity: number) {
    if (quantity <= 0) return cartActions.remove(slug, size);
    setState({
      items: state.items.map((i) =>
        i.slug === slug && i.size === size ? { ...i, quantity: Math.min(MAX_QTY, quantity) } : i,
      ),
    });
  },
  remove(slug: string, size: SizeLabel) {
    setState({ items: state.items.filter((i) => !(i.slug === slug && i.size === size)) });
  },
  clear() {
    setState({ items: [] });
  },
  dismissToast() {
    setState({ toast: null });
  },
};

export function useCartState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export interface CartLine extends CartItem {
  name: string;
  image: string;
  unitPrice: number;
  lineTotal: number;
}

export function useCart() {
  const { items, toast } = useCartState();
  const lines: CartLine[] = items.flatMap((item) => {
    const product = getProduct(item.slug);
    const size = product?.sizes.find((s) => s.label === item.size);
    if (!product || !size) return [];
    return [
      {
        ...item,
        name: product.name,
        image: product.images[0],
        unitPrice: size.price,
        lineTotal: size.price * item.quantity,
      },
    ];
  });
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const shipping = subtotal === 0 || subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
  return { lines, count, subtotal, shipping, total: subtotal + shipping, toast, ...cartActions };
}

export { MAX_QTY };
