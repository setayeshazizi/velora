import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Wallet, Banknote, Lock, Loader2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { getProduct } from '../data/products';
import { formatCurrency } from '../utils/format';
import FormInput from '../components/FormInput';
import OrderSummary from '../components/OrderSummary';
import EmptyState from '../components/EmptyState';

const paymentMethods = [
  { id: 'card', label: 'Credit / debit card', description: 'Simulated — no card details collected', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', description: 'Simulated redirect, no real charge', icon: Wallet },
  { id: 'cod', label: 'Cash on delivery', description: 'Pay when your demo order arrives', icon: Banknote },
];

const initialForm = { firstName: '', lastName: '', email: '', phone: '', address: '', apartment: '', city: '', state: '', zip: '', country: 'United States' };

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (form.phone && !/^[+()\d\s-]{7,20}$/.test(form.phone)) errors.phone = 'Enter a valid phone number.';
  if (!form.address.trim()) errors.address = 'Street address is required.';
  if (!form.city.trim()) errors.city = 'City is required.';
  if (!form.zip.trim()) errors.zip = 'Postal code is required.';
  return errors;
}

export default function Checkout() {
  const { cart, placeOrder } = useStore();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0 && !submitting) {
    return <div className="page"><EmptyState icon={ShoppingBag} title="Your bag is empty" message="Add a few considered pieces before checking out." actionLabel="Back to the shop" actionTo="/shop" /></div>;
  }

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      notify('Please check the highlighted fields', 'error');
      window.setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 50);
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const method = paymentMethods.find((item) => item.id === payment);
      const order = placeOrder({ ...form, apartment: form.apartment.trim() }, method.label);
      notify('Order confirmed — thank you');
      navigate(`/order/${order.id}`);
    }, 900);
  };

  return (
    <div className="page checkout-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/cart">Bag</Link><ChevronRight size={13} /><span>Checkout</span><ChevronRight size={13} /><span>Confirmation</span>
      </nav>
      <header className="page__header">
        <p className="eyebrow">Almost yours</p>
        <h1 className="page__title">Checkout</h1>
      </header>

      <form className="checkout-page__layout" onSubmit={handleSubmit} noValidate>
        <div className="checkout-page__form">
          <section className="checkout-section">
            <h2 className="checkout-section__title"><span>01</span> Contact</h2>
            <div className="form-grid form-grid--2">
              <FormInput label="First name" value={form.firstName} onChange={update('firstName')} error={errors.firstName} autoComplete="given-name" required />
              <FormInput label="Last name" value={form.lastName} onChange={update('lastName')} error={errors.lastName} autoComplete="family-name" required />
              <FormInput label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} autoComplete="email" required />
              <FormInput label="Phone (optional)" type="tel" value={form.phone} onChange={update('phone')} error={errors.phone} autoComplete="tel" />
            </div>
          </section>

          <section className="checkout-section">
            <h2 className="checkout-section__title"><span>02</span> Shipping address</h2>
            <div className="form-grid">
              <FormInput label="Street address" value={form.address} onChange={update('address')} error={errors.address} autoComplete="address-line1" required />
              <FormInput label="Apartment, suite, etc. (optional)" value={form.apartment} onChange={update('apartment')} autoComplete="address-line2" />
              <div className="form-grid form-grid--3">
                <FormInput label="City" value={form.city} onChange={update('city')} error={errors.city} autoComplete="address-level2" required />
                <FormInput label="State / region" value={form.state} onChange={update('state')} autoComplete="address-level1" />
                <FormInput label="Postal code" value={form.zip} onChange={update('zip')} error={errors.zip} autoComplete="postal-code" required />
              </div>
              <FormInput label="Country" as="select" value={form.country} onChange={update('country')} autoComplete="country-name">
                {['United States', 'United Kingdom', 'Denmark', 'Germany', 'Netherlands', 'France', 'Canada', 'Australia'].map((country) => <option key={country}>{country}</option>)}
              </FormInput>
            </div>
          </section>

          <section className="checkout-section">
            <h2 className="checkout-section__title"><span>03</span> Payment</h2>
            <div className="payment-methods" role="radiogroup" aria-label="Payment method">
              {paymentMethods.map((method) => (
                <label key={method.id} className={`payment-method ${payment === method.id ? 'payment-method--active' : ''}`}>
                  <input type="radio" name="payment" value={method.id} checked={payment === method.id} onChange={() => setPayment(method.id)} />
                  <method.icon size={21} strokeWidth={1.5} />
                  <span className="payment-method__text"><span className="payment-method__label">{method.label}</span><span className="payment-method__description">{method.description}</span></span>
                  <span className="payment-method__radio" aria-hidden="true" />
                </label>
              ))}
            </div>
            <p className="checkout-page__demo"><Lock size={15} /> This is a frontend demonstration. No real payment details are requested, stored, or charged.</p>
          </section>

          <button type="submit" className="button button--primary button--large checkout-page__submit" disabled={submitting}>
            {submitting ? <><Loader2 size={18} className="spin" /> Placing your order…</> : <><Lock size={17} /> Place demo order</>}
          </button>
        </div>

        <div className="checkout-page__summary">
          <div className="checkout-items">
            <h2 className="order-summary__title">In your bag</h2>
            {cart.map((item) => {
              const product = getProduct(item.productId);
              return (
                <div key={item.key} className="checkout-item">
                  <div className="checkout-item__media"><img src={product.image} alt={product.name} /><span className="checkout-item__qty">{item.quantity}</span></div>
                  <div className="checkout-item__info"><p>{product.name}</p><span>{[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(' · ')}</span></div>
                  <span className="checkout-item__price">{formatCurrency(product.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <OrderSummary showPromo={false} title="Totals" />
        </div>
      </form>
    </div>
  );
}