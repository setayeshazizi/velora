import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getProduct } from '../data/products';
import { calculateTotals, cartItemKey, sanitizeCart } from '../utils/cart';
import { createOrderId } from '../utils/format';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('velora.cart.v1', []);
  const [wishlist, setWishlist] = useLocalStorage('velora.wishlist.v1', []);
  const [orders, setOrders] = useLocalStorage('velora.orders.v1', []);
  const [promoCode, setPromoCode] = useLocalStorage('velora.promo.v1', '');
  const [newsletter, setNewsletter] = useLocalStorage('velora.newsletter.v1', null);
  const [quickViewId, setQuickViewId] = useState(null);

  const safeCart = useMemo(() => sanitizeCart(cart), [cart]);

  const addToCart = useCallback((productId, { size = '', color = '', quantity = 1 } = {}) => {
    const product = getProduct(productId);
    if (!product) return false;
    const key = cartItemKey(productId, size, color);
    setCart((current) => {
      const existing = sanitizeCart(current).find((item) => item.key === key);
      const nextQuantity = Math.min((existing?.quantity || 0) + quantity, product.stock);
      if (existing) {
        return sanitizeCart(current).map((item) => item.key === key ? { ...item, quantity: nextQuantity } : item);
      }
      return [...sanitizeCart(current), { key, productId, size, color, quantity: nextQuantity }];
    });
    return true;
  }, [setCart]);

  const updateQuantity = useCallback((key, quantity) => {
    setCart((current) => sanitizeCart(current).map((item) => {
      if (item.key !== key) return item;
      const product = getProduct(item.productId);
      return { ...item, quantity: Math.max(1, Math.min(quantity, product.stock)) };
    }));
  }, [setCart]);

  const removeFromCart = useCallback((key) => {
    setCart((current) => sanitizeCart(current).filter((item) => item.key !== key));
  }, [setCart]);

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((current) => {
      const list = Array.isArray(current) ? current : [];
      return list.includes(productId) ? list.filter((id) => id !== productId) : [...list, productId];
    });
  }, [setWishlist]);

  const isWishlisted = useCallback((productId) => (Array.isArray(wishlist) ? wishlist : []).includes(productId), [wishlist]);

  const applyPromo = useCallback((code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'VELORA10') {
      setPromoCode(normalized);
      return true;
    }
    return false;
  }, [setPromoCode]);

  const removePromo = useCallback(() => setPromoCode(''), [setPromoCode]);

  const placeOrder = useCallback((customer, paymentMethod) => {
    const items = sanitizeCart(cart).map((item) => {
      const product = getProduct(item.productId);
      return { ...item, name: product.name, image: product.image, price: product.price, originalPrice: product.originalPrice };
    });
    const totals = calculateTotals(items, promoCode);
    const order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      customer,
      paymentMethod,
      items,
      totals,
      promoCode,
      status: 'confirmed',
    };
    setOrders((current) => [order, ...(Array.isArray(current) ? current : [])]);
    setCart([]);
    setPromoCode('');
    return order;
  }, [cart, promoCode, setCart, setOrders, setPromoCode]);

  const subscribeNewsletter = useCallback((email) => {
    setNewsletter({ email, subscribedAt: new Date().toISOString() });
  }, [setNewsletter]);

  const openQuickView = useCallback((id) => setQuickViewId(id), []);
  const closeQuickView = useCallback(() => setQuickViewId(null), []);

  const cartCount = safeCart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;
  const totals = useMemo(() => calculateTotals(safeCart, promoCode), [safeCart, promoCode]);
  const quickViewProduct = quickViewId ? getProduct(quickViewId) : null;

  const value = useMemo(() => ({
    cart: safeCart,
    cartCount,
    wishlist: Array.isArray(wishlist) ? wishlist : [],
    wishlistCount,
    orders: Array.isArray(orders) ? orders : [],
    promoCode,
    totals,
    newsletter,
    quickViewProduct,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
    applyPromo,
    removePromo,
    placeOrder,
    subscribeNewsletter,
    openQuickView,
    closeQuickView,
  }), [safeCart, cartCount, wishlist, wishlistCount, orders, promoCode, totals, newsletter, quickViewProduct, addToCart, updateQuantity, removeFromCart, clearCart, toggleWishlist, isWishlisted, applyPromo, removePromo, placeOrder, subscribeNewsletter, openQuickView, closeQuickView]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}