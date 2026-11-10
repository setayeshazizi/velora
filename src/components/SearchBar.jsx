import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search pieces, categories, materials…', autoFocus = false }) {
  return (
    <form className="search-bar" role="search" onSubmit={(event) => { event.preventDefault(); onSubmit?.(value); }}>
      <Search size={18} className="search-bar__icon" aria-hidden="true" />
      <input
        type="search"
        className="search-bar__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        autoFocus={autoFocus}
      />
      {value && (
        <button type="button" className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </form>
  );
}