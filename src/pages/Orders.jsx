import { Link } from 'react-router-dom';
import { Package, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, formatDate } from '../utils/format';
import EmptyState from '../components/EmptyState';

export default function Orders() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return <div className="page"><EmptyState icon={Package} title="No orders yet" message="When you place a demo order, it will appear here — saved on this device." actionLabel="Start shopping" actionTo="/shop" /></div>;
  }

  return (
    <div className="page orders-page">
      <header className="page__header">
        <p className="eyebrow">Your history</p>
        <h1 className="page__title">Orders</h1>
      </header>
      <div className="orders-page__list">
        {orders.map((order) => (
          <Link key={order.id} to={`/order/${order.id}`} className="order-row">
            <div className="order-row__images">
              {order.items.slice(0, 3).map((item) => <img key={item.key} src={item.image} alt={item.name} />)}
              {order.items.length > 3 && <span className="order-row__more">+{order.items.length - 3}</span>}
            </div>
            <div className="order-row__info">
              <p className="order-row__id">{order.id}</p>
              <p className="order-row__date">{formatDate(order.createdAt)} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} pieces</p>
            </div>
            <span className="order-row__status">Confirmed</span>
            <span className="order-row__total">{formatCurrency(order.totals.total)}</span>
            <ArrowUpRight size={18} className="order-row__arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}