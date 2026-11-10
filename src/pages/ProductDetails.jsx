import { Link, useParams } from 'react-router-dom';
import { ChevronRight, PackageSearch, Star } from 'lucide-react';
import { getProduct, getRelated, categories } from '../data/products';
import ProductGallery from '../components/ProductGallery';
import ProductPurchasePanel from '../components/ProductPurchasePanel';
import ProductGrid from '../components/ProductGrid';
import RatingStars from '../components/RatingStars';
import Accordion from '../components/Accordion';
import SectionHeading from '../components/SectionHeading';
import EmptyState from '../components/EmptyState';
import Reveal from '../components/Reveal';

const sampleReviews = [
  { name: 'Elena V.', rating: 5, date: 'October 2026', title: 'Exactly what I hoped for', text: 'The material is exceptional and the fit is true to the size guide. Beautifully packaged, too.' },
  { name: 'Marcus T.', rating: 5, date: 'September 2026', title: 'A permanent wardrobe piece', text: 'I have worn it weekly since it arrived. The quality is obvious in person — worth every penny.' },
  { name: 'Priya K.', rating: 4, date: 'September 2026', title: 'Lovely, runs slightly relaxed', text: 'Gorgeous piece. I sized down for a closer fit and it is perfect. The colour is even nicer in daylight.' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);

  if (!product) {
    return <div className="page"><EmptyState icon={PackageSearch} title="This piece has moved on" message="We could not find that product. It may have sold out or been renamed." actionLabel="Back to the shop" actionTo="/shop" /></div>;
  }

  const category = categories.find((item) => item.id === product.category)?.label;
  const related = getRelated(product);

  return (
    <div className="product-page page" key={product.id}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><ChevronRight size={13} /><Link to="/shop">Shop</Link><ChevronRight size={13} />
        <Link to={`/shop?category=${product.category}`}>{category}</Link><ChevronRight size={13} /><span>{product.name}</span>
      </nav>

      <div className="product-page__layout">
        <ProductGallery product={product} />
        <div className="product-page__info">
          <p className="eyebrow">{category}{product.badge && <span className={`product-page__badge product-page__badge--${product.badge}`}>{product.badge === 'sale' ? 'Sale' : product.badge === 'new' ? 'New arrival' : 'Bestseller'}</span>}</p>
          <h1 className="product-page__name">{product.name}</h1>
          <a href="#reviews" className="product-page__rating"><RatingStars rating={product.rating} reviews={product.reviews} /></a>
          <p className="product-page__description">{product.description}</p>
          <ProductPurchasePanel product={product} />
          <Accordion items={[
            { title: 'Details & fit', content: <ul className="product-page__details">{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> },
            { title: 'Materials & sourcing', content: <p>{product.materials} Produced in small batches by a family-run workshop we visit regularly.</p> },
            { title: 'Care', content: <p>{product.care}</p> },
            { title: 'Shipping & returns', content: <p>Complimentary shipping on orders over $150. Standard delivery in 3–5 business days. Returns accepted within 30 days, unworn and with tags. <Link to="/shipping-returns">Read the full policy</Link>.</p> },
          ]} />
        </div>
      </div>

      <section className="reviews" id="reviews">
        <Reveal>
          <div className="reviews__header">
            <div>
              <p className="eyebrow">Community reviews</p>
              <h2 className="section-heading__title">What people are saying</h2>
            </div>
            <div className="reviews__score">
              <span className="reviews__score-value">{product.rating.toFixed(1)}</span>
              <RatingStars rating={product.rating} />
              <span className="reviews__score-count">{product.reviews} reviews</span>
            </div>
          </div>
          <div className="reviews__grid">
            {sampleReviews.map((review) => (
              <article key={review.name} className="review">
                <div className="review__top">
                  <span className="review__stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill={i < review.rating ? 'currentColor' : 'none'} />)}</span>
                  <span className="review__date">{review.date}</span>
                </div>
                <h3 className="review__title">{review.title}</h3>
                <p className="review__text">{review.text}</p>
                <p className="review__author">{review.name} <span>· Verified purchase</span></p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="section">
          <Reveal><SectionHeading eyebrow="Complete the story" title="You may also love" linkTo={`/shop?category=${product.category}`} linkLabel={`More ${category}`} /></Reveal>
          <Reveal delay={80}><ProductGrid products={related} /></Reveal>
        </section>
      )}
    </div>
  );
}