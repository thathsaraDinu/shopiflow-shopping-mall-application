import React from 'react';
import { addToWishlist } from '@/api/wishlist.api';
import { useState } from 'react';
import { useWishlitStore } from '@/store/wishlist-store';

const ProductCard = ({ data }) => {
  const [showAddToWhishlist, setShowAddToWhishlist] =
    useState(false);
  const setWishlistData = useWishlitStore(
    (state) => state.setWishlistData,
  );

  const addItemToWishlist = async () => {
    try {
      const response = await addToWishlist({
        productId: data._id,
      });

      setWishlistData(response.data.products.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setShowAddToWhishlist(true)}
        onMouseLeave={() => setShowAddToWhishlist(false)}
        className="w-[260px] h-[450px] border border-grey-100 rounded-lg overflow-hidden"
      >
        <div className="relative flex items-center h-[330px] bg-gray-100">
          <img
            className="mix-blend-multiply w-[200px] h-[200px] mx-auto"
            src={data.image}
            alt={data.name}
          />
          {showAddToWhishlist && (
            <button
              onClick={addItemToWishlist}
              className="absolute top-[280px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[200px] py-3 rounded-lg transition-all"
            >
              Add to Whishlist
            </button>
          )}
        </div>
        <div className="mt-2 px-2">
          <div>
            <h3 className="font-bold">{data.name}</h3>
          </div>
          <p className="text-sm mb-1">{data.supplier}</p>
          <p className="mb-1">{data.category}</p>
          <div className="flex justify-between items-center">
            <p>${data.buyingPrice.toFixed(2)}</p>
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
