import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, discountPercent } from '../utils/format';
import { categories } from '../data/products';
import RatingStars from './RatingStars';
import WishlistButton from './WishlistButton';

const badgeLabels = { bestseller: 'Bestseller', new: 'New arrival', sale: 'Sale' };

export default function ProductCard({ product }) {
  const { openQuickView } = useStore();
  const [loaded, setLoaded] = useState(false);
  const category = categories.find((item) => item.id === product.category)?.label;
  const badge = product.badge === 'sale' ? `−${discountPercent(product.price, product.originalPrice)}%` : badgeLabels[product.badge];

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          {!loaded && <span className="product-card__skeleton" aria-hidden="true" />}
          <img src={product.image} alt={product.name} loading="lazy" onLoad={() => setLoaded(true)} className={loaded ? 'is-loaded' : ''} />
        </Link>
        {badge && <span className={`product-card__badge product-card__badge--${product.badge}`}>{badge}</span>}
        <WishlistButton productId={product.id} productName={product.name} className="product-card__wishlist" />
        <button type="button" className="product-card__quick" onClick={() => openQuickView(product.id)}>
          <Eye size={15} /> Quick view
        </button>
      </div>
      <div className="product-card__info">
        <p className="product-card__category">{category}</p>
        <h3 className="product-card__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <RatingStars rating={product.rating} reviews={product.reviews} compact />
        <p className="product-card__price">
          <span className={product.originalPrice ? 'product-card__price--sale' : ''}>{formatCurrency(product.price)}</span>
          {product.originalPrice && <s>{formatCurrency(product.originalPrice)}</s>}
        </p>
      </div>
    </article>
  );
}