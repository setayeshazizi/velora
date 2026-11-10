import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, MapPin, CreditCard, PackageSearch } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatDate } from '../utils/format';
import EmptyState from '../components/EmptyState';

export default function OrderConfirmation() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return <div className="page"><EmptyState icon={PackageSearch} title="Order not found" message="We could not find that order on this device. Orders are stored locally in this demo." actionLabel="View your orders" actionTo="/orders" /></div>;
  }

  return (
    <div className="page confirmation-page">
      <div className="confirmation-page__hero">
        <span className="confirmation-page__icon"><CheckCircle2 size={34} strokeWidth={1.5} /></span>
        <p className="eyebrow">Thank you, {order.customer.firstName}</p>
        <h1 className="page__title">Your order is confirmed.</h1>
        <p className="confirmation-page__text">A confirmation would normally arrive at <strong>{order.customer.email}</strong>. In this demo, your order is saved locally and ready to view anytime.</p>
        <div className="confirmation-page__meta">
          <span><Package size={15} /> {order.id}</span>
          <span>{formatDate(order.createdAt)}</span>
          <span className="confirmation-page__status">Confirmed</span>
        </div>
      </div>

      <div className="confirmation-page__layout">
        <section className="confirmation-card">
          <h2 className="confirmation-card__title">Your pieces</h2>
          <div className="confirmation-card__items">
            {order.items.map((item) => (
              <div key={item.key} className="checkout-item">
                <div className="checkout-item__media"><img src={item.image} alt={item.name} /><span className="checkout-item__qty">{item.quantity}</span></div>
                <div className="checkout-item__info"><p>{item.name}</p><span>{[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(' · ')}</span></div>
                <span className="checkout-item__price">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <dl className="order-summary__rows">
            <div><dt>Subtotal</dt><dd>{formatCurrency(order.totals.subtotal)}</dd></div>
            {order.totals.discount > 0 && <div className="order-summary__savings"><dt>Promo ({order.promoCode})</dt><dd>−{formatCurrency(order.totals.discount)}</dd></div>}
            <div><dt>Shipping</dt><dd>{order.totals.shipping === 0 ? 'Free' : formatCurrency(order.totals.shipping)}</dd></div>
          </dl>
          <div className="order-summary__total"><span>Total</span><span>{formatCurrency(order.totals.total)}</span></div>
        </section>

        <div className="confirmation-page__aside">
          <section className="confirmation-card">
            <h2 className="confirmation-card__title"><MapPin size={17} /> Shipping to</h2>
            <address className="confirmation-card__address">
              {order.customer.firstName} {order.customer.lastName}<br />
              {order.customer.address}{order.customer.apartment && `, ${order.customer.apartment}`}<br />
              {order.customer.city}{order.customer.state && `, ${order.customer.state}`} {order.customer.zip}<br />
              {order.customer.country}
            </address>
          </section>
          <section className="confirmation-card">
            <h2 className="confirmation-card__title"><CreditCard size={17} /> Payment</h2>
            <p className="confirmation-card__text">{order.paymentMethod}</p>
            <p className="confirmation-card__note">Demo method — no real charge was made.</p>
          </section>
          <div className="confirmation-page__actions">
            <Link to="/shop" className="button button--primary">Continue shopping <ArrowRight size={16} /></Link>
            <Link to="/orders" className="button button--outline">View all orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}