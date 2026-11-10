import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Scissors, HeartHandshake, Recycle } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const values = [
  { icon: Leaf, title: 'Materials first', text: 'We begin with the fibre — responsible wool, European linen, grade-A cashmere, full-grain leather. If the material is not right, the piece does not exist.' },
  { icon: Scissors, title: 'Made by people we know', text: 'A small circle of family-run workshops in Italy, Portugal, and Denmark. We visit, we ask questions, and we pay for craft properly.' },
  { icon: HeartHandshake, title: 'Fewer, better things', text: 'Twenty pieces, not two thousand. Each one earns its place through fit, feel, and the quiet confidence it gives the person wearing it.' },
  { icon: Recycle, title: 'Built to be kept', text: 'Repairable construction, timeless silhouettes, and care guidance that helps every piece last. The most sustainable garment is the one you already own.' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <Reveal className="about-hero__copy">
          <p className="eyebrow">Our story</p>
          <h1 className="about-hero__title">A quieter way<br />to <em>dress</em> and live.</h1>
          <p className="about-hero__text">VELORA began with a simple frustration: too many things, too little meaning. We wanted a wardrobe — and a home — filled with pieces that felt considered, wore beautifully, and stayed.</p>
        </Reveal>
        <Reveal className="about-hero__media" delay={100}><img src="/images/atelier.webp" alt="Artisan folding linen in the VELORA atelier" /></Reveal>
      </section>

      <section className="section about-story">
        <Reveal>
          <p className="eyebrow">Since 2026</p>
          <h2 className="about-story__title">Started in Copenhagen.<br />Made for everywhere.</h2>
          <div className="about-story__columns">
            <p>We are a small studio with a long view. Every season we edit rather than expand — refining the pieces that work, retiring the ones that do not, and adding only what earns its place. The result is a collection you can actually know.</p>
            <p>Our name comes from the idea of value that lasts: not loud luxury, but the quiet kind you feel in a seam, a drape, a glaze. Things that become more yours with time. That is the standard we hold every piece to.</p>
          </div>
        </Reveal>
      </section>

      <section className="section section--tinted">
        <Reveal><SectionHeading eyebrow="What we stand for" title="Four commitments, no exceptions" /></Reveal>
        <div className="values-grid">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 80}>
              <article className="value-card">
                <span className="value-card__icon"><value.icon size={23} strokeWidth={1.4} /></span>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__text">{value.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <Reveal>
          <img src="/images/collection-home.webp" alt="Sculptural ceramic vase and linen in a sunlit interior" loading="lazy" />
          <div className="about-cta__copy">
            <p className="eyebrow">The collection</p>
            <h2>See what considered feels like.</h2>
            <p>Twenty pieces across fashion, accessories, and home. Each one chosen to stay.</p>
            <div className="about-cta__actions">
              <Link to="/shop" className="button button--primary button--large">Shop the collection <ArrowRight size={17} /></Link>
              <Link to="/contact" className="button button--ghost button--large">Talk to us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}