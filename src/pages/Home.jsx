import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Truck, RotateCcw, ShieldCheck, Leaf, Quote, Star, Sparkles, Shirt, Gem, Armchair } from 'lucide-react';
import { bestSellers, newArrivals, products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import SectionHeading from '../components/SectionHeading';
import Newsletter from '../components/Newsletter';
import Reveal from '../components/Reveal';

const collections = [
  { title: 'The Women’s Edit', subtitle: 'Soft tailoring, fluid layers', image: '/images/collection-women.webp', to: '/shop?category=women' },
  { title: 'The Men’s Edit', subtitle: 'Considered everyday uniforms', image: '/images/collection-men.webp', to: '/shop?category=men' },
  { title: 'Home & Living', subtitle: 'Objects with quiet presence', image: '/images/collection-home.webp', to: '/shop?category=home' },
];

const categoryTiles = [
  { label: 'Women', to: '/shop?category=women', icon: Shirt, count: products.filter((p) => p.category === 'women').length },
  { label: 'Men', to: '/shop?category=men', icon: Sparkles, count: products.filter((p) => p.category === 'men').length },
  { label: 'Accessories', to: '/shop?category=accessories', icon: Gem, count: products.filter((p) => p.category === 'accessories').length },
  { label: 'Home & Living', to: '/shop?category=home', icon: Armchair, count: products.filter((p) => p.category === 'home').length },
];

const testimonials = [
  { quote: 'The coat arrived beautifully wrapped and fits like it was made for me. You can feel the difference in the wool — this is a piece I will keep for a decade.', name: 'Amara L.', location: 'London', rating: 5 },
  { quote: 'Finally a shop where everything feels intentional. The linen shirt and wide-leg trousers have become my entire summer wardrobe.', name: 'Sofia M.', location: 'Copenhagen', rating: 5 },
  { quote: 'The ceramic candle is even better in person. Thoughtful packaging, fast shipping, and a scent that makes the whole flat feel calmer.', name: 'Daniel R.', location: 'Amsterdam', rating: 5 },
];

export default function Home() {
  const heroImageRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (heroImageRef.current) heroImageRef.current.style.transform = `translateY(${Math.min(window.scrollY * 0.08, 60)}px) scale(1.06)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__copy">
          <Reveal>
            <p className="hero__eyebrow"><span /> Autumn / Winter 2026</p>
            <h1 className="hero__title">Considered pieces.<br /><em>Extraordinary</em> everyday.</h1>
            <p className="hero__text">Fashion, accessories, and objects chosen for the way they feel — and the years they will stay. Less, but better.</p>
            <div className="hero__actions">
              <Link to="/shop" className="button button--primary button--large">Shop the edit <ArrowRight size={17} /></Link>
              <Link to="/about" className="button button--ghost button--large">Our story</Link>
            </div>
            <div className="hero__meta">
              <span>20 considered pieces</span>
              <span className="hero__meta-dot" />
              <span>Responsibly made</span>
            </div>
          </Reveal>
        </div>
        <div className="hero__media">
          <img ref={heroImageRef} src="/images/hero.webp" alt="Woman in a camel wool coat and ivory trousers walking through a sunlit limestone courtyard" fetchPriority="high" />
          <Link to="/product/camel-coat" className="hero__product-card">
            <img src="/images/product-camel-coat.webp" alt="" />
            <span>
              <span className="hero__product-label">The piece of the season</span>
              <span className="hero__product-name">Sculpted Wool Coat</span>
              <span className="hero__product-cta">Shop now <ArrowUpRight size={14} /></span>
            </span>
          </Link>
        </div>
      </section>

      <section className="trust-bar" aria-label="Our promises">
        {[{ icon: Truck, title: 'Complimentary shipping', text: 'On orders over $150' }, { icon: RotateCcw, title: '30-day returns', text: 'Easy, considered, free' }, { icon: Leaf, title: 'Responsibly made', text: 'Natural & recycled materials' }, { icon: ShieldCheck, title: 'Secure checkout', text: 'Simulated, never real charges' }].map((item) => (
          <div key={item.title} className="trust-bar__item">
            <item.icon size={21} strokeWidth={1.5} />
            <div><p className="trust-bar__title">{item.title}</p><p className="trust-bar__text">{item.text}</p></div>
          </div>
        ))}
      </section>

      <section className="section collections">
        <Reveal><SectionHeading eyebrow="Curated collections" title="Edits for the way you live" description="Three wardrobes, one philosophy: fewer pieces, chosen well." linkTo="/shop" linkLabel="Shop all pieces" /></Reveal>
        <div className="collections__grid">
          {collections.map((collection, index) => (
            <Reveal key={collection.title} delay={index * 90}>
              <Link to={collection.to} className="collection-card">
                <img src={collection.image} alt={collection.title} loading="lazy" />
                <span className="collection-card__overlay" />
                <span className="collection-card__content">
                  <span className="collection-card__subtitle">{collection.subtitle}</span>
                  <span className="collection-card__title">{collection.title}</span>
                  <span className="collection-card__cta">Explore <ArrowUpRight size={16} /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tinted">
        <Reveal><SectionHeading eyebrow="Most loved" title="The bestsellers" description="The pieces our community returns to, season after season." linkTo="/shop?flags=bestseller" linkLabel="View bestsellers" /></Reveal>
        <Reveal delay={80}><ProductGrid products={bestSellers} /></Reveal>
      </section>

      <section className="editorial">
        <Reveal className="editorial__media"><img src="/images/atelier.webp" alt="Artisan hands folding natural linen in a sunlit atelier" loading="lazy" /></Reveal>
        <Reveal className="editorial__copy" delay={100}>
          <p className="eyebrow">The VELORA philosophy</p>
          <h2 className="editorial__title">Made slowly.<br />Worn for years.</h2>
          <p className="editorial__text">We work with a small circle of family-run workshops and responsible mills. Every piece is chosen for its material, its make, and the quiet confidence it gives the person wearing it.</p>
          <ul className="editorial__list">
            <li><Leaf size={17} /> Natural and recycled materials, always</li>
            <li><ShieldCheck size={17} /> Small-batch production, no overstock</li>
            <li><RotateCcw size={17} /> Designed to be repaired, not replaced</li>
          </ul>
          <Link to="/about" className="button button--outline">Read our story <ArrowRight size={16} /></Link>
        </Reveal>
      </section>

      <section className="section">
        <Reveal><SectionHeading eyebrow="Just arrived" title="New for the season" description="Fresh silhouettes and objects, added to the collection this month." linkTo="/shop?flags=new&sort=newest" linkLabel="View new arrivals" /></Reveal>
        <Reveal delay={80}><ProductGrid products={newArrivals} /></Reveal>
      </section>

      <section className="section section--tinted category-section">
        <Reveal><SectionHeading eyebrow="Find your category" title="Shop by world" /></Reveal>
        <div className="category-tiles">
          {categoryTiles.map((tile, index) => (
            <Reveal key={tile.label} delay={index * 70}>
              <Link to={tile.to} className="category-tile">
                <tile.icon size={24} strokeWidth={1.4} />
                <span className="category-tile__label">{tile.label}</span>
                <span className="category-tile__count">{tile.count} pieces</span>
                <ArrowUpRight size={17} className="category-tile__arrow" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <Reveal><SectionHeading eyebrow="From the community" title="Worn, loved, kept" description="Words from the people who live with VELORA every day." /></Reveal>
        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 90}>
              <figure className="testimonial">
                <Quote size={26} className="testimonial__quote" strokeWidth={1.3} />
                <div className="testimonial__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <blockquote className="testimonial__text">“{testimonial.quote}”</blockquote>
                <figcaption className="testimonial__author"><span>{testimonial.name}</span><span>{testimonial.location}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <div id="newsletter"><Newsletter /></div>
    </div>
  );
}