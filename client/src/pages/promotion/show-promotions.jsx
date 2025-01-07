import DiscountAmountCard from '@/components/promotions/discount-amount-card';
import { PromotionCard } from '@/components/promotions/promotion-card';
import { CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { UsePromotionsQuery } from '@/hooks/usePromotions';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/spinner';

export default function ShowPromotions() {
  const { discounts, amounts, isLoading } =
    UsePromotionsQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [promotionType, setPromotionType] = useState('0');
  const [sortOption, setSortOption] = useState('startDate');
  const [selectedStores, setSelectedStores] = useState([]); // Array for storing selected stores
  const [isFilterByStoreOpen, setIsFilterByStoreOpen] =
    useState(false);

  const allPromos = [
    ...(discounts || []),
    ...(amounts || []),
  ];

  // Get unique store names
  const storeNames = [
    ...new Set(allPromos.map((promo) => promo.storeName)),
  ];

  // Handle store selection
  const toggleStoreSelection = (store) => {
    setSelectedStores((prevSelected) =>
      prevSelected.includes(store)
        ? prevSelected.filter((s) => s !== store)
        : [...prevSelected, store],
    );
  };

  // Filtering logic: filter by searchQuery, promotionType, and selected store names
  const handleFiltering = (promotions) => {
    let filteredPromos = promotions.filter((promo) =>
      promo.storeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

    if (promotionType === '1') {
      filteredPromos = filteredPromos.filter(
        (promotion) => promotion.promotionType == '1',
      );
    } else if (promotionType === '2') {
      filteredPromos = filteredPromos.filter(
        (promotion) => promotion.promotionType == '3',
      );
    }

    // Filter by selected stores
    if (selectedStores.length > 0) {
      filteredPromos = filteredPromos.filter((promo) =>
        selectedStores.includes(promo.storeName),
      );
    }

    return filteredPromos;
  };

  // Sorting logic: sort by storeName, startDate, or endDate
  const handleSorting = (promotions) => {
    if (sortOption === 'storeNameAsc') {
      return [...promotions].sort((a, b) =>
        a.storeName.localeCompare(b.storeName),
      );
    } else if (sortOption === 'storeNameDesc') {
      return [...promotions].sort((a, b) =>
        b.storeName.localeCompare(a.storeName),
      );
    } else if (sortOption === 'startDate') {
      return [...promotions].sort(
        (a, b) =>
          new Date(a.startDate) - new Date(b.startDate),
      );
    } else if (sortOption === 'endDate') {
      return [...promotions].sort(
        (a, b) => new Date(a.endDate) - new Date(b.endDate),
      );
    }
    return promotions;
  };

  // Apply filtering and sorting
  const filteredAndSortedPromos = handleSorting(
    handleFiltering(allPromos),
  );

  return (
    <div className="transition-all duration-500 py-5 px-10 md:py-10 md:px-20 flex flex-col gap-10">
      <CardTitle
        className="text-5xl font-bold text-center text-gradient bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        Promotions
      </CardTitle>
      <div className="flex flex-col gap-10">
        <div className="text-sm flex items-start justify-between flex-wrap gap-5">
          {/* Search and filter options */}
          <div className="flex flex-row justify-space flex-wrap items-center gap-5">
            <div className=" relative   focus:outline-none">
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
                className="  border-gray-300 border focus:outline-0 focus:ring-gray-400 focus:ring-1 pl-9 py-2 rounded-sm w-full h-full"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>

            <select
              onChange={(e) =>
                setPromotionType(e.target.value)
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gray-400 focus:ring-1"
            >
              <option value="0">View All</option>
              <option value="1">
                Percentage Discounts
              </option>
              <option value="2">Special Discounts</option>
            </select>
          </div>

          {/* Checkbox card for store name selection */}
          <div className="flex justify-between items-start flex-wrap gap-5">
            <Button
              className="bg-gray-100 border-gray-400 hover:border-gray-600 hover:bg-gray-200"
              variant="outline"
              onClick={() =>
                setIsFilterByStoreOpen(!isFilterByStoreOpen)
              }
            >
              <div>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5L4 7C4 7.01671 4.00082 7.03323 4.00242 7.04952C2.86009 7.28022 2 8.28967 2 9.5C2 10.7103 2.86009 11.7198 4.00242 11.9505C4.00082 11.9668 4 11.9833 4 12V13.5C4 13.7761 4.22386 14 4.5 14C4.77614 14 5 13.7761 5 13.5V12C5 11.9833 4.99918 11.9668 4.99758 11.9505C6.1399 11.7198 7 10.7103 7 9.5C7 8.28967 6.1399 7.28022 4.99758 7.04952C4.99918 7.03323 5 7.01671 5 7L5 1.5ZM11 1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V3C10 3.01671 10.0008 3.03323 10.0024 3.04952C8.8601 3.28022 8 4.28967 8 5.5C8 6.71033 8.8601 7.71978 10.0024 7.95048C10.0008 7.96677 10 7.98329 10 8V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V8C11 7.98329 10.9992 7.96677 10.9976 7.95048C12.1399 7.71978 13 6.71033 13 5.5C13 4.28967 12.1399 3.28022 10.9976 3.04952C10.9992 3.03323 11 3.01671 11 3V1.5ZM4.5 8C3.67157 8 3 8.67157 3 9.5C3 10.3284 3.67157 11 4.5 11C5.32843 11 6 10.3284 6 9.5C6 8.67157 5.32843 8 4.5 8ZM9 5.5C9 4.67157 9.67157 4 10.5 4C11.3284 4 12 4.67157 12 5.5C12 6.32843 11.3284 7 10.5 7C9.67157 7 9 6.32843 9 5.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="pl-3">Fiter by Store</div>
            </Button>
            <select
              defaultValue={'startDate'}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-gray-400 focus:ring-1"
            >
              <option value="startDate">Sort By</option>
              <option value="storeNameAsc">
                Store Name (A-Z)
              </option>
              <option value="storeNameDesc">
                Store Name (Z-A)
              </option>
              <option value="startDate">
                Starting Date (Earliest to Latest)
              </option>
              <option value="endDate">
                Ending Date (Earliest to Latest)
              </option>
            </select>
          </div>
          {/* Sorting options */}
        </div>
        {isFilterByStoreOpen && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md max-h-48 rounded-lg p-5 overflow-hidden border border-gray-200">
            <h3 className="text-lg font-bold mb-3 text-blue-900">
              Filter by Store
            </h3>
            <div className="flex flex-wrap gap-3 items-start max-h-48">
              {storeNames.map((store) => (
                <label
                  key={store}
                  className="flex items-center space-x-3 group"
                >
                  <input
                    type="checkbox"
                    value={store}
                    checked={selectedStores.includes(store)}
                    onChange={() =>
                      toggleStoreSelection(store)
                    }
                    className="w-5 h-5 text-blue-600  border-gray-300  focus:ring-blue-500  transition-all duration-300 "
                  />
                  <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-300">
                    {store}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Promotion display */}
        <div className="flex flex-wrap xl:gap-10 gap-6 justify-center">
          {isLoading && (
            <p>
              <LoadingSpinner />
            </p>
          )}
          {filteredAndSortedPromos.length > 0
            ? filteredAndSortedPromos.map((promotion) => {
                if (promotion.promotionType == '1') {
                  return (
                    <PromotionCard
                      key={promotion._id}
                      promotion={promotion}
                    />
                  );
                } else {
                  return (
                    <DiscountAmountCard
                      key={promotion._id}
                      promotion={promotion}
                    />
                  );
                }
              })
            : !isLoading && <p>No promotions found.</p>}
        </div>
      </div>
    </div>
  );
}
