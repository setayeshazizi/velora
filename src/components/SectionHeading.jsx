import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, description, linkTo, linkLabel }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
        <h2 className="section-heading__title">{title}</h2>
        {description && <p className="section-heading__description">{description}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="section-heading__link">
          {linkLabel || 'View all'} <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}