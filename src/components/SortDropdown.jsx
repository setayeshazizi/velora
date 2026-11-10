import { ChevronDown } from 'lucide-react';

const options = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-dropdown">
      <span className="sort-dropdown__label">Sort by</span>
      <span className="sort-dropdown__control">
        <select value={value} onChange={(event) => onChange(event.target.value)} aria-label="Sort products">
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown size={15} aria-hidden="true" />
      </span>
    </label>
  );
}