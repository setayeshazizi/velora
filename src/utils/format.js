export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);

export const formatDate = (value) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));

export const discountPercent = (price, originalPrice) =>
  originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export const classNames = (...values) => values.filter(Boolean).join(' ');

export const createOrderId = () =>
  `VEL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;