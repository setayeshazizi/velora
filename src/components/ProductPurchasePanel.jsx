import { useEffect, useState } from 'react';
import { ShoppingBag, Check, Truck, RotateCcw, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, discountPercent } from '../utils/format';
import ProductVariantSelector from './ProductVariantSelector';
import QuantitySelector from './QuantitySelector';
import WishlistButton from './WishlistButton';
import Modal from './Modal';

export default function ProductPurchasePanel({ product, onAdded, compact = false }) {
  const { addToCart } = useStore();
  const { notify } = useToast();
  const [color, setColor] = useState(product.colors[0]?.name || '');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState('');
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    setColor(product.colors[0]?.name || '');
    setSize('');
    setQuantity(1);
    setSizeError('');
    setAdded(false);
  }, [product]);

  const handleAdd = () => {
    if (product.sizes.length > 0 && !size) {
      setSizeError('Please select a size.');
      return;
    }
    addToCart(product.id, { size, color, quantity });
    notify(`${product.name} added to your bag`);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    onAdded?.();
  };

  const lowStock = product.stock <= 10;

  return (
    <div className={`purchase-panel ${compact ? 'purchase-panel--compact' : ''}`}>
      <div className="purchase-panel__price">
        <span className={product.originalPrice ? 'purchase-panel__price--sale' : ''}>{formatCurrency(product.price)}</span>
        {product.originalPrice && (
          <>
            <s>{formatCurrency(product.originalPrice)}</s>
            <span className="purchase-panel__discount">Save {discountPercent(product.price, product.originalPrice)}%</span>
          </>
        )}
      </div>

      <ProductVariantSelector
        product={product}
        color={color}
        size={size}
        onColorChange={setColor}
        onSizeChange={(value) => { setSize(value); setSizeError(''); }}
        sizeError={sizeError}
      />

      {product.sizes.length > 0 && (
        <button type="button" className="purchase-panel__guide" onClick={() => setGuideOpen(true)}>
          <Ruler size={15} /> Size & fit guide
        </button>
      )}

      <div className="purchase-panel__actions">
        <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
        <button type="button" className={`button button--primary purchase-panel__add ${added ? 'button--success' : ''}`} onClick={handleAdd}>
          {added ? <><Check size={17} /> Added to bag</> : <><ShoppingBag size={17} /> Add to bag</>}
        </button>
        <WishlistButton productId={product.id} productName={product.name} className="purchase-panel__wishlist" />
      </div>

      <p className={`purchase-panel__stock ${lowStock ? 'purchase-panel__stock--low' : ''}`}>
        <span className="purchase-panel__stock-dot" />
        {lowStock ? `Only ${product.stock} left — order soon` : 'In stock, ready to ship'}
      </p>

      {!compact && (
        <div className="purchase-panel__perks">
          <span><Truck size={16} /> Free shipping over $150</span>
          <span><RotateCcw size={16} /> 30-day easy returns</span>
        </div>
      )}

      <Modal open={guideOpen} onClose={() => setGuideOpen(false)} label="Size and fit guide">
        <div className="size-guide">
          <p className="eyebrow">Fit notes</p>
          <h2 className="modal__title">Size & fit guide</h2>
          <p className="size-guide__intro">{product.name} is designed for a {product.description.toLowerCase().includes('oversized') ? 'relaxed, oversized' : 'considered, true-to-size'} fit. If you are between sizes, we recommend sizing up for a more relaxed silhouette.</p>
          <table className="size-guide__table">
            <thead><tr><th>Size</th><th>Chest / Waist</th><th>Length</th></tr></thead>
            <tbody>
              {product.sizes.map((option, index) => (
                <tr key={option}><td>{option}</td><td>{86 + index * 6} cm</td><td>{64 + index * 2} cm</td></tr>
              ))}
            </tbody>
          </table>
          <p className="size-guide__note">Measurements are garment measurements. Our care team can help with fit questions via the contact page.</p>
        </div>
      </Modal>
    </div>
  );
}