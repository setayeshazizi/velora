import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.title} className={`accordion__item ${expanded ? 'accordion__item--open' : ''}`}>
            <button type="button" className="accordion__trigger" onClick={() => setOpen(expanded ? -1 : index)} aria-expanded={expanded}>
              <span>{item.title}</span>
              <ChevronDown size={17} className="accordion__chevron" />
            </button>
            {expanded && <div className="accordion__content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}