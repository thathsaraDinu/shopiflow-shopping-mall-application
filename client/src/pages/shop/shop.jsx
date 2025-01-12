import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getShops } from '@/api/shop.api';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  MdAccessTime as ClockIcon,
  MdEmail as MailIcon,
  MdLocationOn as MapPinIcon,
  MdPhone as PhoneIcon,
  MdStore as StoreIcon,
  MdPeople as UsersIcon,
} from 'react-icons/md';

const ITEMS_PER_PAGE = 4;

const Shop = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShopType, setSelectedShopType] =
    useState('all');
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );

  // Fetch the shops data
  const fetchShops = async () => {
    setIsLoading(true);
    try {
      const data = await getShops();
      setShops(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    shops.length / ITEMS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get unique shop types for filter dropdown
  const shopTypes = [
    'all',
    ...new Set(shops.map((shop) => shop.shopType)),
  ];

  // Filter and search logic
  const filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesShopType =
      selectedShopType === 'all' ||
      shop.shopType === selectedShopType;
    return matchesSearch && matchesShopType;
  });

  const currentShops = filteredShops.slice(
    startIndex,
    endIndex,
  );

  const handlePreviousPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  const joinQueueHandler = (shopID, shopName) => {
    navigate(`/queue/${shopID}`, { state: { shopName } });
  };

  return (
    <div className="container mx-auto min-h-screen py-5 flex flex-col gap-10 md:py-10">
      <h1 className="text-3xl font-bold text-center text-black">
        Explore Our Shops
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-wrap text-sm items-center justify-end gap-4">
        {/* Shop Type Filter */}
        <select
          className="border-gray-300 border rounded-sm py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={selectedShopType}
          onChange={(e) => {
            setSelectedShopType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Shop Types</option>
          {isLoading ? (
            <option>Please wait...</option>
          ) : (
            shopTypes
              .filter((category) => category !== 'all')
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
          )}
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
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-5 h-96 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : currentShops?.length > 0 ? (
          currentShops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={shop.image == '' ? '/images/shop image.jpg': shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">
                    {shop.name}
                  </CardTitle>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {shop.shopType}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{shop.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>{shop.openTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4" />
                  <span>{shop.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MailIcon className="h-4 w-4" />
                  <span>{shop.ownerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <StoreIcon className="h-4 w-4" />
                  <span>Currently in queue:</span>
                  {shop.numberOfQueues}
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-blue-500"></span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isLoggedIn ? (
                  <Button
                    onClick={() =>
                      joinQueueHandler(shop._id, shop.name)
                    }
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-2 px-6 rounded-lg"
                  >
                    View Queue
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/login')}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-1 px-4 rounded-lg"
                  >
                    Login to Join Queue
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-5 text-gray-500">
            No shops found.
          </p>
        )}
      </div>

      {!isLoading && filteredShops.length > 3 && (
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

export default Shop;
