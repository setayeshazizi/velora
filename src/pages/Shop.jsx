import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, SearchX, X, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = {
    category: params.get('category') || '',
    minPrice: params.get('min') || '',
    maxPrice: params.get('max') || '',
    flags: (params.get('flags') || '').split(',').filter(Boolean),
  };
  const search = params.get('search') || '';
  const sort = params.get('sort') || 'featured';

  const writeParams = (next) => {
    const updated = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (value === '' || value === null || (Array.isArray(value) && value.length === 0)) updated.delete(key);
      else updated.set(key, Array.isArray(value) ? value.join(',') : value);
    });
    setParams(updated, { replace: true });
  };

  const handleFilterChange = (next) => writeParams({ category: next.category, min: next.minPrice, max: next.maxPrice, flags: next.flags });
  const clearFilters = () => setParams(search ? { search } : {}, { replace: true });

  const flagsKey = filters.flags.join(',');
  const filtered = useMemo(() => {
    const activeFlags = flagsKey ? flagsKey.split(',') : [];
    const query = search.trim().toLowerCase();
    const min = filters.minPrice === '' ? 0 : Number(filters.minPrice);
    const max = filters.maxPrice === '' ? Infinity : Number(filters.maxPrice);
    let result = products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (product.price < min || product.price > max) return false;
      if (activeFlags.length && !activeFlags.includes(product.badge)) return false;
      if (query) {
        const haystack = `${product.name} ${product.category} ${product.description} ${product.materials} ${product.colors.map((c) => c.name).join(' ')}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
    const sorters = {
      featured: (a, b) => b.popularity - a.popularity,
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...result].sort(sorters[sort] || sorters.featured);
  }, [search, filters.category, filters.minPrice, filters.maxPrice, flagsKey, sort]);

  const categoryLabel = categories.find((item) => item.id === filters.category)?.label;
  const activeChips = [
    filters.category && { label: categoryLabel, clear: () => handleFilterChange({ ...filters, category: '' }) },
    search && { label: `“${search}”`, clear: () => writeParams({ search: '' }) },
    (filters.minPrice || filters.maxPrice) && { label: `$${filters.minPrice || 0} – $${filters.maxPrice || '400+'}`, clear: () => handleFilterChange({ ...filters, minPrice: '', maxPrice: '' }) },
    ...filters.flags.map((flag) => ({ label: flag === 'new' ? 'New arrivals' : flag === 'sale' ? 'On sale' : 'Bestsellers', clear: () => handleFilterChange({ ...filters, flags: filters.flags.filter((item) => item !== flag) }) })),
  ].filter(Boolean);

  const sidebar = <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={clearFilters} />;

  return (
    <div className="shop page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><ChevronRight size={13} /><span>Shop</span>{categoryLabel && <><ChevronRight size={13} /><span>{categoryLabel}</span></>}
      </nav>
      <header className="shop__header">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="page__title">{search ? `Results for “${search}”` : categoryLabel || 'All pieces'}</h1>
          <p className="shop__count">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} considered</p>
        </div>
        <div className="shop__tools">
          <SearchBar value={search} onChange={(value) => writeParams({ search: value })} placeholder="Search the collection…" />
          <SortDropdown value={sort} onChange={(value) => writeParams({ sort: value === 'featured' ? '' : value })} />
          <button type="button" className="button button--outline shop__filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </header>

      {activeChips.length > 0 && (
        <div className="shop__chips">
          {activeChips.map((chip) => (
            <button key={chip.label} type="button" className="chip" onClick={chip.clear}>{chip.label} <X size={13} /></button>
          ))}
          <button type="button" className="shop__clear" onClick={clearFilters}>Clear all</button>
        </div>
      )}

      <div className="shop__layout">
        <div className="shop__sidebar">{sidebar}</div>
        <div className="shop__results">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} className="product-grid--shop" />
          ) : (
            <EmptyState icon={SearchX} title="Nothing matches — yet" message="Try a different search, widen the price range, or clear a filter. The right piece is here somewhere." actionLabel="Clear filters" onAction={clearFilters} />
          )}
        </div>
      </div>

      <Modal open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} label="Product filters" variant="drawer">
        <div className="mobile-filters">
          {sidebar}
          <button type="button" className="button button--primary mobile-filters__apply" onClick={() => setMobileFiltersOpen(false)}>
            Show {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </button>
        </div>
      </Modal>
    </div>
  );
}