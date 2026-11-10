import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const content = {
  'shipping-returns': {
    eyebrow: 'Care',
    title: 'Shipping & returns',
    intro: 'Everything you need to know about getting your pieces to you — and back to us if they are not right.',
    sections: [
      { heading: 'Shipping', body: ['Complimentary standard shipping on all orders over $150. Orders under $150 ship for a flat $12.', 'Standard delivery arrives in 3–5 business days. Express delivery (1–2 business days) would be available at checkout in a live store.', 'Every order is wrapped in recycled tissue and shipped in a plastic-free box.'] },
      { heading: 'Returns', body: ['Returns are accepted within 30 days of delivery, unworn, unwashed, and with original tags attached.', 'In a live store, return shipping would be free and refunds processed to the original payment method within 5 business days of receipt.', 'Final-sale items would be clearly marked before purchase.'] },
      { heading: 'This demonstration', body: ['VELORA is a frontend project. No real orders are shipped and no real payments are collected. Demo orders are stored locally in your browser so you can explore the full confirmation flow.'] },
    ],
  },
  'care-guide': {
    eyebrow: 'Care',
    title: 'The care guide',
    intro: 'The most sustainable piece is the one you keep. A little care goes a long way.',
    sections: [
      { heading: 'Wool & cashmere', body: ['Air between wears rather than washing after every use. When needed, hand wash cold with a wool-specific detergent and dry flat away from sunlight.', 'Store folded, never on a hanger, and use cedar blocks to deter moths. De-pill gently with a cashmere comb.'] },
      { heading: 'Linen & cotton', body: ['Machine wash cold on a gentle cycle. Line dry when possible and embrace the natural crease — it is part of the character.', 'Warm iron while slightly damp for a crisper finish. Pre-shrunk pieces can be tumble-dried on low.'] },
      { heading: 'Leather & accessories', body: ['Wipe leather with a soft dry cloth and condition seasonally. Store bags in their dust bags, stuffed lightly to keep their shape.', 'Keep gold vermeil away from water, perfume, and lotion. Polish gently and store separately to avoid scratches.'] },
      { heading: 'Home objects', body: ['Hand wash ceramics with mild soap; avoid dishwashers and microwaves. Re-oil wooden pieces every few months with food-safe oil.', 'Trim candle wicks to 5 mm before each burn and never leave a flame unattended.'] },
    ],
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    intro: 'Your data stays yours. Here is exactly what this demonstration stores and why.',
    sections: [
      { heading: 'What is stored', body: ['Your cart, wishlist, promo code, newsletter subscription, and demo orders are saved in your browser’s LocalStorage so they persist between visits.', 'No data is sent to any server. There is no backend, no analytics, and no tracking.'] },
      { heading: 'What is never collected', body: ['No real payment card details are requested, stored, or transmitted at any point. Checkout is a simulation.', 'Contact and newsletter forms validate input locally and show confirmation feedback without sending email.'] },
      { heading: 'Clearing your data', body: ['You can remove all stored data at any time by clearing your browser’s site data for this page. The application will return to its initial state.'] },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of service',
    intro: 'The short, honest version for a frontend demonstration.',
    sections: [
      { heading: 'Demonstration only', body: ['VELORA is a university-level frontend project. Products, prices, reviews, and orders are fictional and provided for demonstration purposes.', 'No real purchases can be made, no payments are processed, and no goods are shipped.'] },
      { heading: 'Use of the site', body: ['You are welcome to explore, interact with, and learn from every feature. The source code demonstrates React fundamentals, Context API state, routing, and persistent client-side data.', 'Photography is generated for this project. Brand names and product names are fictional.'] },
      { heading: 'No warranty', body: ['The application is provided as-is for educational use. While every effort is made to keep it functional and error-free, it is not a commercial service.'] },
    ],
  },
};

export default function InfoPage({ slug }) {
  const page = content[slug];
  if (!page) return null;

  return (
    <div className="page info-page">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={13} /><span>{page.title}</span></nav>
      <header className="page__header">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="page__title">{page.title}</h1>
        <p className="page__subtitle">{page.intro}</p>
      </header>
      <div className="info-page__sections">
        {page.sections.map((section) => (
          <section key={section.heading} className="info-section">
            <h2 className="info-section__heading">{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph.slice(0, 40)} className="info-section__text">{paragraph}</p>)}
          </section>
        ))}
      </div>
      <div className="info-page__footer">
        <p>Questions? We are happy to help.</p>
        <Link to="/contact" className="button button--outline">Contact the studio</Link>
      </div>
    </div>
  );
}