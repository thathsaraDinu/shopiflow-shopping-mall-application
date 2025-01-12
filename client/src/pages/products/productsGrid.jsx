import { useState } from 'react';
import ProductCard from './productCard';
import useProducts from '@/hooks/useProducts';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

const ITEMS_PER_PAGE = 5;

const ProductsGrid = () => {
  const { data, isLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('all');
  const [sortOption, setSortOption] = useState('default'); // 'price-asc', 'price-desc', 'date-asc', 'date-desc'
  const [currentPage, setCurrentPage] = useState(1);

  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );

  // Ensure "all" is always available, even when data is loading
  const categories = data
    ? ['all', ...new Set(data.map((item) => item.category))]
    : ['all'];

  // Filter products based on search query and selected category
  const filteredProducts = data?.filter((item) => {
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected sorting option
  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'date-asc':
        return (
          new Date(a.createdAt) - new Date(b.createdAt)
        );
      case 'date-desc':
        return (
          new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return 0; // No sorting
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(
    (sortedProducts?.length || 0) / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts?.slice(
    startIndex,
    endIndex,
  );

  const handlePreviousPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Search, category filters, and sorting options */}
      <div className="flex flex-wrap items-center justify-end gap-4 text-sm">
        {/* Category Selector */}
        <select
          className="border-gray-300 border rounded-sm py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to first page on category change
          }}
        >
          <option value="all">All Categories</option>
          {isLoading ? (
            <option>Please wait...</option>
          ) : (
            categories
              .filter((category) => category !== 'all')
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
          )}
        </select>

        {/* Sort Selector */}
        <select
          className="border-gray-300 border rounded-sm py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1); // Reset to first page on sort change
          }}
        >
          <option value="default">Sort By</option>
          <option value="price-asc">
            Price: Low to High
          </option>
          <option value="price-desc">
            Price: High to Low
          </option>
          <option value="date-asc">
            Date: Oldest First
          </option>
          <option value="date-desc">
            Date: Newest First
          </option>
        </select>

        {/* Search Input */}
        <div className="relative">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            color="gray"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <input
            className="border-gray-300 border focus:outline-0 focus:ring-gray-400 focus:ring-1 pl-9 py-2 rounded-sm w-full h-full"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2  gap-4">
        {isLoading ? (
          <div className="col-span-5 h-96 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : currentProducts?.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              data={product}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <p className="text-center col-span-5 text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {!isLoading &&
        sortedProducts?.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2 px-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
    </div>
  );
};

export default ProductsGrid;
