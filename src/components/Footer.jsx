import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'All pieces', to: '/shop' },
      { label: 'Women', to: '/shop?category=women' },
      { label: 'Men', to: '/shop?category=men' },
      { label: 'Accessories', to: '/shop?category=accessories' },
      { label: 'Home & Living', to: '/shop?category=home' },
      { label: 'New arrivals', to: '/shop?flags=new&sort=newest' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Your orders', to: '/orders' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: 'Shipping & returns', to: '/shipping-returns' },
      { label: 'Care guide', to: '/care-guide' },
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of service', to: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">VELORA<span className="header__logo-dot" /></Link>
          <p className="footer__tagline">Considered pieces for extraordinary everyday living. Designed slowly, made responsibly, kept for years.</p>
          <div className="footer__contact">
            <a href="mailto:hello@velora.com"><Mail size={15} /> hello@velora.com</a>
            <span><MapPin size={15} /> Studio 12, Copenhagen</span>
          </div>
        </div>
        {columns.map((column) => (
          <nav key={column.title} className="footer__column" aria-label={column.title}>
            <h3 className="footer__heading">{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer__column footer__column--cta">
          <h3 className="footer__heading">Stay considered</h3>
          <p>Private edits and new arrivals, once a month.</p>
          <Link to="/#newsletter" className="footer__cta">Join the letter <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} VELORA. A frontend demonstration — no real orders or payments.</p>
        <div className="footer__payments" aria-label="Accepted demo payment methods">
          <span>Visa</span><span>Mastercard</span><span>Amex</span><span>PayPal</span>
        </div>
      </div>
    </footer>
  );
}