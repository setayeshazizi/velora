import { getProduct } from '../data/products';

export const FREE_SHIPPING_THRESHOLD = 150;
export const SHIPPING_COST = 12;
export const PROMO_CODE = 'VELORA10';
export const PROMO_RATE = 0.1;

export const cartItemKey = (productId, size, color) => `${productId}::${size || 'one'}::${color || 'default'}`;

export function calculateTotals(items, promoCode = '') {
  let subtotal = 0;
  let savings = 0;

  for (const item of items) {
    const product = getProduct(item.productId);
    if (!product) continue;
    subtotal += product.price * item.quantity;
    if (product.originalPrice) savings += (product.originalPrice - product.price) * item.quantity;
  }

  const discount = promoCode === PROMO_CODE ? Math.round(subtotal * PROMO_RATE * 100) / 100 : 0;
  const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;

  return { subtotal, savings, discount, shipping, total };
}

export function sanitizeCart(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    const product = getProduct(item?.productId);
    return product && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= product.stock;
  });
}