import { products, categories } from '../data/products';

export default function FilterSidebar({ filters, onChange, onClear }) {
  const update = (patch) => onChange({ ...filters, ...patch });
  const toggleFlag = (flag) => update({ flags: filters.flags.includes(flag) ? filters.flags.filter((item) => item !== flag) : [...filters.flags, flag] });
  const hasFilters = filters.category || filters.minPrice || filters.maxPrice || filters.flags.length > 0;

  return (
    <aside className="filter-sidebar" aria-label="Product filters">
      <div className="filter-sidebar__header">
        <h2>Filters</h2>
        {hasFilters && <button type="button" className="filter-sidebar__clear" onClick={onClear}>Clear all</button>}
      </div>

      <fieldset className="filter-group">
        <legend className="filter-group__title">Category</legend>
        <button type="button" className={`filter-option ${!filters.category ? 'filter-option--active' : ''}`} onClick={() => update({ category: '' })}>
          <span>All pieces</span><span className="filter-option__count">{products.length}</span>
        </button>
        {categories.map((category) => (
          <button key={category.id} type="button" className={`filter-option ${filters.category === category.id ? 'filter-option--active' : ''}`} onClick={() => update({ category: category.id })}>
            <span>{category.label}</span>
            <span className="filter-option__count">{products.filter((product) => product.category === category.id).length}</span>
          </button>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-group__title">Price range</legend>
        <div className="filter-price">
          <label className="filter-price__field">
            <span>Min</span>
            <input type="number" min="0" max="400" value={filters.minPrice} onChange={(event) => update({ minPrice: event.target.value })} placeholder="0" aria-label="Minimum price" />
          </label>
          <span className="filter-price__separator">—</span>
          <label className="filter-price__field">
            <span>Max</span>
            <input type="number" min="0" max="400" value={filters.maxPrice} onChange={(event) => update({ maxPrice: event.target.value })} placeholder="400" aria-label="Maximum price" />
          </label>
        </div>
        <input
          type="range"
          className="filter-range"
          min="0"
          max="400"
          step="5"
          value={filters.maxPrice || 400}
          onChange={(event) => update({ maxPrice: event.target.value === '400' ? '' : event.target.value })}
          aria-label="Maximum price slider"
        />
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-group__title">Highlights</legend>
        {[{ id: 'sale', label: 'On sale' }, { id: 'bestseller', label: 'Bestsellers' }, { id: 'new', label: 'New arrivals' }].map((flag) => (
          <label key={flag.id} className="filter-check">
            <input type="checkbox" checked={filters.flags.includes(flag.id)} onChange={() => toggleFlag(flag.id)} />
            <span className="filter-check__box" aria-hidden="true" />
            <span>{flag.label}</span>
          </label>
        ))}
      </fieldset>
    </aside>
  );
}