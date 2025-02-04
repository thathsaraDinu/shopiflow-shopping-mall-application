import { addToWishlist } from '@/api/wishlist.api';
import { useState } from 'react';
import { useWishlitStore } from '@/store/wishlist-store';
import toast from 'react-hot-toast';
import { Route } from 'react-router-dom';

const ProductCard = ({ data, isLoggedIn }) => {
  const [showAddToWhishlist, setShowAddToWhishlist] =
    useState(false);
  const setWishlistData = useWishlitStore(
    (state) => state.setWishlistData,
  );

  const addItemToWishlist = async () => {
    try {
      if (!isLoggedIn) {
        Route.push('/login');
        toast.error('Please log in');
        return;
      }
      const response = await addToWishlist({
        productId: data._id,
      });

      setWishlistData(response.data.products.length);
      toast.success('Successfully Added');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setShowAddToWhishlist(true)}
        onMouseLeave={() => setShowAddToWhishlist(false)}
        className="w-[220px] h-[370px] border border-grey-100 bg-white rounded-lg overflow-hidden"
      >
        <div className="relative flex items-center h-[220px] overflow-clip bg-gray-100">
          <img
            className="mix-blend-multiply mx-auto"
            src={data.image}
            alt={data.name}
          />
          {showAddToWhishlist && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <button
                onClick={addItemToWishlist}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-2/3 py-3 rounded-lg transition-all"
              >
                Add to Whishlist
              </button>
            </div>
          )}
        </div>
        <div className="mt-2 px-2">
          <div>
            <h3 className="font-bold">{data.name}</h3>
          </div>
          <p className="text-sm mb-1">{data.supplier}</p>
          <p className="mb-1">{data.category}</p>
          <div className="flex justify-between items-center">
            <p>{data.buyingPrice} LKR</p>
            <p className="text-xs font-bold">
              Stock:{' '}
              {data.quantity > data.thresholdValue
                ? data.thresholdValue
                : data.quantity}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
