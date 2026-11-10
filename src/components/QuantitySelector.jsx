import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, max = 99, min = 1, label = 'Quantity' }) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button type="button" className="quantity__button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={15} />
      </button>
      <span className="quantity__value" aria-live="polite">{value}</span>
      <button type="button" className="quantity__button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={15} />
      </button>
    </div>
  );
}