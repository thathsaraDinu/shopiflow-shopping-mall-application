import { useEffect, useState, useCallback } from 'react';
import { getAllProducts } from '@/api/product.api';
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import { completeOrder } from '@/api/order.api';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/spinner';

const FinalizeOrder = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] =
    useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const location = useLocation();
  const queue = location.state?.queue;
  const navigate = useNavigate();

  const { handleSubmit } = useForm();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products-list'],
    queryFn: getAllProducts,
  });

  const completeOrderMutation = useMutation({
    mutationFn: completeOrder,
    onSuccess: async () => {
      toast.success('Order completed successfully');

      // Redirect to the queue page
      navigate('/queue');
    },
    onError: (error) => {
      console.error('Error logging in:', error);
      if (error.response.status === 401) {
        toast.error('Invalid credentials');
      }

      if (error.response?.status !== 401) {
        toast.error('Something went wrong');
      }
    },
  });

  const calculateTotal = useCallback(() => {
    const total = orderItems.reduce(
      (acc, item) =>
        acc + item.buyingPrice * item.buyQuantity,
      0,
    );
    setTotalAmount(total);
  }, [orderItems]);

  useEffect(() => {
    calculateTotal();
  }, [orderItems, calculateTotal]);

  const addProductToOrder = (product) => {
    const existingProduct = orderItems.find(
      (item) => item._id === product._id,
    );
    if (existingProduct) {
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id
            ? { ...item, buyQuantity: item.buyQuantity + 1 }
            : item,
        ),
      );
    } else {
      setOrderItems([
        ...orderItems,
        { ...product, buyQuantity: 1 },
      ]);
    }
  };

  if (!queue) {
    return <p>No queue data available</p>;
  }

  const removeProductFromOrder = (productId) => {
    setOrderItems(
      orderItems.filter((item) => item._id !== productId),
    );
  };

  const changeQuantity = (productId, buyQuantity) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              buyQuantity: Math.max(
                1,
                item.buyQuantity + buyQuantity,
              ),
            }
          : item,
      ),
    );
  };

  const filteredProducts = products?.data?.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Search input change handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1); // Reset selection index when typing
    setIsDropdownVisible(e.target.value !== '');
  };

  const handleProductSelect = (product) => {
    addProductToOrder(product);
    setSearchQuery(''); // Clear search after adding the product
    setIsDropdownVisible(false);
    setSelectedIndex(-1); // Reset selection index
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!filteredProducts || filteredProducts.length === 0)
      return;

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) =>
        prev < filteredProducts.length - 1
          ? prev + 1
          : prev,
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : prev,
      );
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleProductSelect(filteredProducts[selectedIndex]);
    }
  };

  const onSubmit = async (data) => {
    completeOrderMutation.mutate({
      ...data,
      items: orderItems,
    });
  };

  {
    productsLoading && <LoadingSpinner />;
  }
  {
    productsError && <LoadingSpinner />;
  }

  return (
    <div className="flex gap-8">
      <div className="w-2/3">
        <h1 className="text-2xl font-semibold text-gray-600">
          Items
        </h1>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="w-full"
          />
          {isDropdownVisible &&
            filteredProducts?.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
                {filteredProducts?.map((product, index) => (
                  <li
                    key={product._id}
                    onClick={() => {
                      if (product.quantity > 0) {
                        handleProductSelect(product);
                      }
                    }}
                    className={`p-2 flex items-center ${
                      product.quantity === 0
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    } ${selectedIndex === index ? 'bg-gray-200' : ''}`}
                  >
                    <img
                      src={product?.image}
                      alt={product.name}
                      className="w-8 h-8 object-cover mr-2"
                    />
                    <span className="truncate">
                      {product.name}
                    </span>
                    <span className="text-gray-600 ms-2 font-semibold text-sm truncate">
                      #{product?.productID}
                    </span>
                    <span className="flex ms-2">
                      ({' '}
                      {product.quantity ? (
                        <span className="text-green-500">
                          {product.quantity} in Stock
                        </span>
                      ) : (
                        <span className="text-red-500">
                          Out of Stock
                        </span>
                      )}
                      )
                    </span>
                    <span className="ml-auto">
                      LKR {product.buyingPrice}
                    </span>
                  </li>
                ))}
              </ul>
            )}
        </div>

        {/* Selected Order Items */}
        <h2 className="text-xl font-semibold mt-6">
          Selected Items
        </h2>
        {/* Line */}
        <div className="border-b-2 border-gray-200 my-6"></div>
        {orderItems.length === 0 ? (
          <div className="text-gray-500">
            Please Add Items to the Order
          </div>
        ) : (
          <div className="mt-4">
            <ul className="divide-y divide-gray-300">
              {orderItems?.map((item) => (
                <li
                  key={item._id}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p>{item.name}</p>{' '}
                        <span className="text-gray-500 text-sm mt-1">
                          #{item.productID}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          disabled={item.buyQuantity === 1}
                          onClick={() =>
                            changeQuantity(item._id, -1)
                          }
                          size="sm"
                          className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 font-semibold text-sm"
                        >
                          -
                        </Button>
                        <p className="font-semibold text-lg text-gray-600 min-w-10 text-center">
                          {item.buyQuantity}
                        </p>
                        <Button
                          disabled={
                            item.buyQuantity ===
                            item.quantity
                          }
                          onClick={() =>
                            changeQuantity(item._id, 1)
                          }
                          size="sm"
                          className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 font-semibold text-sm"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p>
                      LKR.{' '}
                      {(
                        item.buyingPrice * item.buyQuantity
                      ).toFixed(2)}
                    </p>
                    <Button
                      onClick={() =>
                        removeProductFromOrder(item._id)
                      }
                      color="danger"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        {/* User Data */}
        <h3 className="text-xl font-semibold mb-4">
          User Data
        </h3>
        <div>
          <h1>Finalize Queue</h1>
          <p>Shop: {queue.shopID.name}</p>
          <p>
            User: {queue.userID.firstName}{' '}
            {queue.userID.lastName}
          </p>
          <p>Position: {queue.position}</p>
        </div>

        <h3 className="text-xl font-semibold mb-4">
          Order Summary
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total Amount:</p>
            <p className="text-lg font-bold">
              LKR. {totalAmount.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              disabled={orderItems.length === 0}
              type="submit"
              color="success"
              className="w-full"
            >
              Complete Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinalizeOrder;
