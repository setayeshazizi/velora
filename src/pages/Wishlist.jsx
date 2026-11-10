import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { getProduct } from '../data/products';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

export default function Wishlist() {
  const { wishlist, addToCart, openQuickView } = useStore();
  const { notify } = useToast();
  const items = wishlist.map(getProduct).filter(Boolean);

  const handleAdd = (product) => {
    if (product.sizes.length > 0) {
      openQuickView(product.id);
      return;
    }
    addToCart(product.id, { color: product.colors[0]?.name || '' });
    notify(`${product.name} added to your bag`);
  };

  if (items.length === 0) {
    return (
      <div className="page">
        <EmptyState icon={Heart} title="Save what speaks to you" message="Tap the heart on any piece to keep it here. Your wishlist stays with you, even after you close the tab." actionLabel="Explore the collection" actionTo="/shop" />
      </div>
    );
  }

  return (
    <div className="page wishlist-page">
      <header className="page__header">
        <p className="eyebrow">Kept for later</p>
        <h1 className="page__title">Your wishlist <span className="page__title-count">({items.length})</span></h1>
      </header>
      <div className="wishlist-page__grid">
        {items.map((product) => (
          <div key={product.id} className="wishlist-page__item">
            <ProductCard product={product} />
            <button type="button" className="button button--outline wishlist-page__add" onClick={() => handleAdd(product)}>
              <ShoppingBag size={16} /> {product.sizes.length > 0 ? 'Choose size & add' : 'Add to bag'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}