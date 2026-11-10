import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, Package, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Modal from './Modal';
import SearchBar from './SearchBar';

const navItems = [
  { label: 'Shop all', to: '/shop', match: (path, params) => path === '/shop' && !params.get('category') && !params.get('flags') },
  { label: 'Women', to: '/shop?category=women', match: (path, params) => path === '/shop' && params.get('category') === 'women' },
  { label: 'Men', to: '/shop?category=men', match: (path, params) => path === '/shop' && params.get('category') === 'men' },
  { label: 'Accessories', to: '/shop?category=accessories', match: (path, params) => path === '/shop' && params.get('category') === 'accessories' },
  { label: 'Home & Living', to: '/shop?category=home', match: (path, params) => path === '/shop' && params.get('category') === 'home' },
  { label: 'New in', to: '/shop?flags=new&sort=newest', match: (path, params) => path === '/shop' && params.get('flags') === 'new' },
  { label: 'Our story', to: '/about', match: (path) => path === '/about' },
];

export default function Navbar() {
  const { cartCount, wishlistCount } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  const submitSearch = (value) => {
    const trimmed = value.trim();
    navigate(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : '/shop');
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="announcement">
        <Link to="/shipping-returns">Complimentary shipping over $150 · 30-day considered returns</Link>
      </div>
      <div className="header__bar">
        <button type="button" className="icon-button header__menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
          <Menu size={22} />
        </button>
        <Link to="/" className="header__logo" aria-label="VELORA home">VELORA<span className="header__logo-dot" /></Link>
        <nav className="header__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className={`header__link ${item.match(location.pathname, params) ? 'header__link--active' : ''}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header__actions">
          <button type="button" className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search products">
            <Search size={20} />
          </button>
          <Link to="/orders" className="icon-button header__orders" aria-label="Your orders">
            <Package size={20} />
          </Link>
          <Link to="/wishlist" className="icon-button header__wishlist" aria-label={`Wishlist, ${wishlistCount} ${wishlistCount === 1 ? 'item' : 'items'}`}>
            <Heart size={20} />
            {wishlistCount > 0 && <span className="header__dot">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="icon-button header__cart" aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span key={cartCount} className="header__badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} label="Search the collection" variant="search">
        <div className="search-modal">
          <p className="eyebrow">Find your piece</p>
          <h2 className="modal__title">Search VELORA</h2>
          <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} autoFocus />
          <div className="search-modal__popular">
            <span>Popular:</span>
            {['Cashmere', 'Linen', 'Coat', 'Ceramic', 'Leather'].map((term) => (
              <button key={term} type="button" onClick={() => submitSearch(term)}>{term}</button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} label="Navigation menu" variant="drawer">
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <p className="eyebrow">Menu</p>
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className={`mobile-nav__link ${item.match(location.pathname, params) ? 'mobile-nav__link--active' : ''}`} onClick={() => setMenuOpen(false)}>
              {item.label} <ArrowRight size={17} />
            </Link>
          ))}
          <div className="mobile-nav__secondary">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist ({wishlistCount})</Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>Your orders</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </nav>
      </Modal>
    </header>
  );
}