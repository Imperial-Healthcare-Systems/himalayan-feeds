"use client";

/* ==========================================================================
   ADMIN PORTAL — shared state
   --------------------------------------------------------------------------
   One provider holds the catalogue, the categories, the session and the toast
   queue, so every screen sees the same data and a mutation on one screen shows
   on the next without a refetch. All writes go through lib/admin/store.ts,
   which is the seam a real API slots into.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import {
  getServerSessionSnapshot,
  getSessionSnapshot,
  signOut as clearSession,
  subscribeSession,
  type AdminSession,
} from "@/lib/admin/auth";
import { categoryStore, productStore } from "@/lib/admin/store";
import type { AdminCategory, AdminProduct } from "@/lib/admin/types";

type PortalCtx = {
  session: AdminSession | null;
  ready: boolean;
  signOut: () => void;

  products: AdminProduct[];
  categories: AdminCategory[];
  loading: boolean;
  error: string | null;
  reload: () => void;

  createProduct: (p: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">) => Promise<AdminProduct>;
  updateProduct: (id: string, patch: Partial<AdminProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetProducts: () => Promise<void>;

  createCategory: (c: Omit<AdminCategory, "id">) => Promise<void>;
  updateCategory: (id: string, patch: Partial<AdminCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  toast: (msg: ReactNode) => void;
};

const Ctx = createContext<PortalCtx | null>(null);

/* Module-level so the identities stay stable across renders. */
const NO_SUBSCRIBE = () => () => {};
const TRUE_SNAPSHOT = () => true;
const FALSE_SNAPSHOT = () => false;

export function usePortal(): PortalCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePortal must be used inside AdminProvider");
  return v;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  /* Read through an external store rather than a mount effect: localStorage
     does not exist on the server, and useSyncExternalStore is the primitive
     built to reconcile that without a cascading render. */
  const session = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );
  /* True only once the client has taken over, so the route guard never
     redirects against a server snapshot that is signed-out by definition. */
  const ready = useSyncExternalStore(NO_SUBSCRIBE, TRUE_SNAPSHOT, FALSE_SNAPSHOT);

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const [toastMsg, setToastMsg] = useState<ReactNode>(null);
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* The fetch awaits before its first setState, so nothing is set
     synchronously inside the effect body. `reloadToken` re-runs it. */
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const [p, c] = await Promise.all([productStore.list(), categoryStore.list()]);
        if (cancelled) return;
        setProducts(p);
        setCategories(c);
        setError(null);
      } catch {
        if (!cancelled) setError("Could not load the local catalogue.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const toast = useCallback((msg: ReactNode) => {
    setToastMsg(msg);
    setToastOn(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 2800);
  }, []);

  /* Called from event handlers only, where setState is the normal path. */
  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadToken((t) => t + 1);
  }, []);

  /* clearSession notifies the external store, so `session` updates itself. */
  const signOutNow = useCallback(() => clearSession(), []);

  const createProduct = useCallback(
    async (p: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">) => {
      const created = await productStore.create(p);
      setProducts((prev) => [created, ...prev]);
      return created;
    },
    [],
  );

  const updateProduct = useCallback(async (id: string, patch: Partial<AdminProduct>) => {
    const next = await productStore.update(id, patch);
    if (next) setProducts((prev) => prev.map((p) => (p.id === id ? next : p)));
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await productStore.remove(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetProducts = useCallback(async () => {
    const seeded = await productStore.reset();
    setProducts(seeded);
  }, []);

  const createCategory = useCallback(async (c: Omit<AdminCategory, "id">) => {
    const created = await categoryStore.create(c);
    setCategories((prev) => [...prev, created]);
  }, []);

  const updateCategory = useCallback(async (id: string, patch: Partial<AdminCategory>) => {
    const next = await categoryStore.update(id, patch);
    if (next) setCategories((prev) => prev.map((c) => (c.id === id ? next : c)));
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    await categoryStore.remove(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const value = useMemo<PortalCtx>(
    () => ({
      session, ready, signOut: signOutNow,
      products, categories, loading, error, reload,
      createProduct, updateProduct, deleteProduct, resetProducts,
      createCategory, updateCategory, deleteCategory,
      toast,
    }),
    [
      session, ready, signOutNow, products, categories, loading, error, reload,
      createProduct, updateProduct, deleteProduct, resetProducts,
      createCategory, updateCategory, deleteCategory, toast,
    ],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Toast — lives at provider level so any screen can raise one. */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm text-cream shadow-lift transition-all duration-300 ${
          toastOn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toastMsg}
      </div>
    </Ctx.Provider>
  );
}
