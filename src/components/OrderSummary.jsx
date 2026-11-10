import { useState } from 'react';
import { Tag, X, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/format';
import { FREE_SHIPPING_THRESHOLD, PROMO_CODE } from '../utils/cart';

export default function OrderSummary({ showPromo = true, children, title = 'Order summary' }) {
  const { totals, promoCode, applyPromo, removePromo, cartCount } = useStore();
  const { notify } = useToast();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount));

  const handleApply = (event) => {
    event.preventDefault();
    if (applyPromo(code)) {
      notify('Promo code applied — 10% off your order');
      setCode('');
      setError('');
    } else {
      setError('That code is not valid. Try VELORA10.');
    }
  };

  return (
    <aside className="order-summary" aria-label={title}>
      <h2 className="order-summary__title">{title}</h2>

      {totals.subtotal > 0 && (
        <div className="order-summary__shipping">
          <p><Truck size={15} /> {remaining > 0 ? `${formatCurrency(remaining)} away from free shipping` : 'You have unlocked free shipping'}</p>
          <div className="order-summary__progress"><span style={{ width: `${Math.min(100, ((totals.subtotal - totals.discount) / FREE_SHIPPING_THRESHOLD) * 100)}%` }} /></div>
        </div>
      )}

      <dl className="order-summary__rows">
        <div><dt>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</dt><dd>{formatCurrency(totals.subtotal)}</dd></div>
        {totals.savings > 0 && <div className="order-summary__savings"><dt>Sale savings</dt><dd>−{formatCurrency(totals.savings)}</dd></div>}
        {totals.discount > 0 && <div className="order-summary__savings"><dt>Promo ({promoCode})</dt><dd>−{formatCurrency(totals.discount)}</dd></div>}
        <div><dt>Shipping</dt><dd>{totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping)}</dd></div>
      </dl>

      {showPromo && (
        <div className="order-summary__promo">
          {promoCode ? (
            <div className="order-summary__promo-applied">
              <span><Tag size={14} /> {promoCode} applied</span>
              <button type="button" onClick={() => { removePromo(); notify('Promo code removed', 'info'); }} aria-label="Remove promo code"><X size={15} /></button>
            </div>
          ) : (
            <form onSubmit={handleApply}>
              <label className="order-summary__promo-label" htmlFor="promo-code">Promo code</label>
              <div className="order-summary__promo-row">
                <input id="promo-code" type="text" value={code} onChange={(event) => { setCode(event.target.value); setError(''); }} placeholder={`Try ${PROMO_CODE}`} aria-invalid={Boolean(error)} />
                <button type="submit" className="button button--outline button--small">Apply</button>
              </div>
              {error && <p className="order-summary__promo-error" role="alert">{error}</p>}
            </form>
          )}
        </div>
      )}

      <div className="order-summary__total">
        <span>Total</span>
        <span>{formatCurrency(totals.total)}</span>
      </div>
      <p className="order-summary__note">Demo checkout — no real payment is collected.</p>
      {children}
    </aside>
  );
}