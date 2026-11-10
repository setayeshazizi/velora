import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';
import Modal from './Modal';
import ProductPurchasePanel from './ProductPurchasePanel';
import RatingStars from './RatingStars';

export default function QuickView() {
  const { quickViewProduct, closeQuickView } = useStore();

  return (
    <Modal open={Boolean(quickViewProduct)} onClose={closeQuickView} label="Product quick view" variant="wide">
      {quickViewProduct && (
        <div className="quick-view" key={quickViewProduct.id}>
          <Link to={`/product/${quickViewProduct.id}`} className="quick-view__media" onClick={closeQuickView}>
            <img src={quickViewProduct.image} alt={quickViewProduct.name} />
          </Link>
          <div className="quick-view__info">
            <p className="eyebrow">{categories.find((item) => item.id === quickViewProduct.category)?.label}</p>
            <h2 className="quick-view__name">{quickViewProduct.name}</h2>
            <RatingStars rating={quickViewProduct.rating} reviews={quickViewProduct.reviews} />
            <p className="quick-view__description">{quickViewProduct.description}</p>
            <ProductPurchasePanel product={quickViewProduct} compact />
            <Link to={`/product/${quickViewProduct.id}`} className="quick-view__details" onClick={closeQuickView}>
              View full details →
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}