import { getPromotions } from '@/api/promotion.api';
import DiscountAmountCard from '@/components/promotions/discount-amount-card';
import { PromotionCard } from '@/components/promotions/promotion-card';
import { CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function ShowPromotions() {
  const { data, isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
  });

  const discounts =
    data?.data.promotions.discountPercentage;
  const amounts = data?.data.promotions.discountAmount;
  const [promotionType, setPromotionType] = useState('1');
  console.log(data);

  const [promotions, setPromotions] = useState([]);

  return (
    <div className="transition-all duration-500 py-10 px-20 flex flex-col gap-10">
      <CardTitle className="text-center text-xl">
        Promotions
      </CardTitle>
      <div className='flex justify-between'>
        <div className="flex flex-row justify-space items-center gap-10">
          <input
            type="text"
            onChange={(e) => {
              setPromotions(
                discounts.filter((promotion) =>
                  promotion.storeName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
            placeholder="Search"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-400 focus:ring-1"
          />

          <select
            onChange={(e) => {
              setPromotions(
                promotions.filter((promotion) =>
                  promotion.storeName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }}
            className="px-4 py-2 border rounded-md "
          >
            <option value="1">View All</option>
            <option value="2">Entertain</option>
            <option value="3">Food</option>
            <option value="4">Health</option>
            <option value="5">Fashion</option>
          </select>
        </div>
        <select className="px-4 py-2 border rounded-md ">
          <option value="1">View All</option>
          <option value="2">Percentage Discounts</option>
          <option value="4">Special Discounts</option>
        </select>
      </div>
      {/* <div className="flex flex-row justify-center gap-5">
        <button
          onClick={() => setPromotionType('1')}
          className={`${
            promotionType == '1'
              ? 'bg-primary text-white'
              : 'bg-white text-black'
          } px-5 py-2 rounded-md`}
        >
          Percentage
        </button>
        <button
          onClick={() => setPromotionType('3')}
          className={`${
            promotionType == '3'
              ? 'bg-primary text-white'
              : 'bg-white text-black'
          } px-5 py-2 rounded-md`}
        >
          Amount
        </button>
      </div> */}
      <div className="flex flex-wrap xl:gap-10 gap-6 justify-center">
        {discounts?.map((promotion) => (
          <PromotionCard
            key={promotion._id}
            promotion={promotion}
          />
        ))}
        {amounts?.map((promotion) => (
          <DiscountAmountCard
            key={promotion._id}
            promotion={promotion}
          />
        ))}
      </div>
    </div>
  );
}
