// src/app/products/page.jsx

'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Spinner from '@/components/Spinner';
import EmptyState from '@/components/EmptyState';
import { productsAPI } from '@/services/api';

const CATEGORIES = [
  { id: 'all', label: 'All Soaps' },
  { id: 'hydration', label: 'Aloe Vera Hydration' },
  { id: 'acne', label: 'Haldi Neem Anti-Acne' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured / Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Sync state with URL
  const updateUrlParams = useCallback(
    (params) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (!value || value === 'all' || value === 'featured') {
          urlParams.delete(key);
        } else {
          urlParams.set(key, value);
        }
      });
      router.push(`/products?${urlParams.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Debounced search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateUrlParams({ search: searchInput });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, currentSearch, updateUrlParams]);

  // Fetch products whenever filters or search query change
  useEffect(() => {
    async function fetchFilteredProducts() {
      setLoading(true);
      try {
        const res = await productsAPI.getAll({
          category: currentCategory,
          sort: currentSort,
          search: currentSearch,
        });
        setProducts(res?.data?.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredProducts();
  }, [currentCategory, currentSort, currentSearch]);

  const handleCategorySelect = (categoryId) => {
    updateUrlParams({ category: categoryId });
  };

  const handleSortChange = (e) => {
    updateUrlParams({ sort: e.target.value });
  };

  const clearFilters = () => {
    setSearchInput('');
    router.push('/products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Ayurvedic Botanical Formulations
        </span>
        <h1 className="text-3xl sm:text-5xl font-poppins font-extrabold text-charcoal">
          Pure Organic Soap Collection
        </h1>
        <p className="text-charcoal-light text-sm sm:text-base font-inter">
          Cold-crafted with 100% vegetable glycerine, raw botanical extracts, and essential oils. Zero sulfates, parabens, or harsh detergents.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-extra p-4 sm:p-6 border border-primary/15 shadow-subtle space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-large text-xs font-poppins font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-cream shadow-subtle'
                    : 'bg-cream text-charcoal hover:bg-cream-dark/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-cream-dark">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by ingredient or name..."
              className="w-full pl-9 pr-8 py-2 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-charcoal placeholder:text-charcoal-muted"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <span className="text-xs font-inter text-charcoal-light">
              Showing <strong>{products.length}</strong> items
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-charcoal-muted" />
              <select
                value={currentSort}
                onChange={handleSortChange}
                className="bg-cream/50 border border-primary/20 rounded-large px-3 py-1.5 text-xs font-poppins font-semibold text-charcoal focus:outline-none focus:border-primary"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid Area */}
      {loading ? (
        <Spinner size="lg" text="Loading Soaps Catalog..." />
      ) : products.length === 0 ? (
        <EmptyState
          title="No Soaps Match Your Filters"
          description="Try clearing your search query or selecting a different skin concern category."
          actionText="Reset All Filters"
          onAction={clearFilters}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`grid gap-6 sm:gap-8 ${
            products.length <= 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Spinner size="lg" text="Loading catalog..." />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
