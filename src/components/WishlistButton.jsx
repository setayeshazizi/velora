import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';

export default function WishlistButton({ productId, productName, className = '' }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const { notify } = useToast();
  const saved = isWishlisted(productId);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(productId);
    notify(saved ? `${productName} removed from wishlist` : `${productName} saved to wishlist`, 'info');
  };

  return (
    <button type="button" className={`wishlist-button ${saved ? 'wishlist-button--active' : ''} ${className}`} onClick={handleClick} aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`} aria-pressed={saved}>
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
    </button>
  );
}