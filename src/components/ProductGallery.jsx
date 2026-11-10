import { useState } from 'react';

const views = [
  { label: 'Full view', scale: 1, position: '50% 50%' },
  { label: 'Detail', scale: 1.75, position: '50% 38%' },
  { label: 'Texture', scale: 2.5, position: '50% 58%' },
];

export default function ProductGallery({ product }) {
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img
          src={product.image}
          alt={`${product.name} — ${view.label.toLowerCase()}`}
          style={{ transform: `scale(${view.scale})`, objectPosition: view.position }}
        />
        <span className="gallery__view-label">{view.label}</span>
      </div>
      <div className="gallery__thumbs" role="group" aria-label="Product image views">
        {views.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`gallery__thumb ${active === index ? 'gallery__thumb--active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Show ${item.label.toLowerCase()}`}
            aria-pressed={active === index}
          >
            <img src={product.image} alt="" style={{ transform: `scale(${item.scale})`, objectPosition: item.position }} />
          </button>
        ))}
      </div>
    </div>
  );
}