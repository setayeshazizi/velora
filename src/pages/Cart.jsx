import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import EmptyState from '../components/EmptyState';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartCount } = useStore();
  const { notify } = useToast();

  const handleRemove = (key) => {
    removeFromCart(key);
    notify('Piece removed from your bag', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="page cart-empty">
        <EmptyState icon={ShoppingBag} title="Your bag is waiting" message="Nothing here yet. Explore the collection and find the pieces you will keep for years." actionLabel="Start shopping" actionTo="/shop" />
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <header className="page__header">
        <p className="eyebrow">Your selection</p>
        <h1 className="page__title">Shopping bag <span className="page__title-count">({cartCount})</span></h1>
      </header>
      <div className="cart-page__layout">
        <div className="cart-page__items">
          {cart.map((item) => <CartItem key={item.key} item={item} onQuantityChange={updateQuantity} onRemove={handleRemove} />)}
          <Link to="/shop" className="cart-page__continue"><ArrowLeft size={16} /> Continue shopping</Link>
        </div>
        <OrderSummary>
          <Link to="/checkout" className="button button--primary button--large order-summary__checkout">Proceed to checkout <ArrowRight size={17} /></Link>
          <p className="order-summary__secure"><ShieldCheck size={15} /> Secure demo checkout</p>
        </OrderSummary>
      </div>
    </div>
  );
}