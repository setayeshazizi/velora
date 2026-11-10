import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';

export default function Newsletter() {
  const { newsletter, subscribeNewsletter } = useStore();
  const { notify } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    subscribeNewsletter(email);
    notify('Welcome to the VELORA list');
    setEmail('');
    setError('');
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner">
        <div className="newsletter__copy">
          <p className="eyebrow">The VELORA letter</p>
          <h2 id="newsletter-title" className="newsletter__title">A quieter kind of inbox.</h2>
          <p className="newsletter__text">New arrivals, considered stories, and private access to seasonal edits. One thoughtful email a month — never more.</p>
        </div>
        {newsletter ? (
          <div className="newsletter__success" role="status">
            <CheckCircle2 size={22} />
            <div>
              <p className="newsletter__success-title">You’re on the list.</p>
              <p className="newsletter__success-text">We’ll write to {newsletter.email} when something worth sharing arrives.</p>
            </div>
          </div>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
            <label className="newsletter__label" htmlFor="newsletter-email"><Mail size={16} /> Email address</label>
            <div className="newsletter__row">
              <input id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder="you@example.com" aria-invalid={Boolean(error)} aria-describedby={error ? 'newsletter-error' : undefined} />
              <button type="submit" className="button button--primary">Subscribe <ArrowRight size={16} /></button>
            </div>
            {error && <p className="newsletter__error" id="newsletter-error" role="alert">{error}</p>}
            <p className="newsletter__privacy">By subscribing you agree to our privacy policy. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}