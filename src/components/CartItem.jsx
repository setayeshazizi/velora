import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { getProduct } from '../data/products';
import { formatCurrency } from '../utils/format';
import QuantitySelector from './QuantitySelector';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const product = getProduct(item.productId);
  if (!product) return null;

  return (
    <article className="cart-item">
      <Link to={`/product/${product.id}`} className="cart-item__media">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="cart-item__details">
        <div className="cart-item__top">
          <div>
            <h3 className="cart-item__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
            <p className="cart-item__variant">
              {item.color && <span>{item.color}</span>}
              {item.size && <span>Size {item.size}</span>}
            </p>
          </div>
          <button type="button" className="cart-item__remove icon-button" onClick={() => onRemove(item.key)} aria-label={`Remove ${product.name} from bag`}>
            <Trash2 size={17} />
          </button>
        </div>
        <div className="cart-item__bottom">
          <QuantitySelector value={item.quantity} onChange={(value) => onQuantityChange(item.key, value)} max={product.stock} label={`Quantity for ${product.name}`} />
          <p className="cart-item__price">
            <span className="cart-item__line-total">{formatCurrency(product.price * item.quantity)}</span>
            {item.quantity > 1 && <span className="cart-item__unit">{formatCurrency(product.price)} each</span>}
          </p>
        </div>
      </div>
    </article>
  );
}