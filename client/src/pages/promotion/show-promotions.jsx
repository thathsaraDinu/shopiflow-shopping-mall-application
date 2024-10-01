import { getPromotions } from '@/api/promotion.api';
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
    <div className="transition-all duration-500 py-10 px-20">
      <CardTitle className="text-center pb-10">
        Promotions
      </CardTitle>
      <div className="flex flex-wrap gap-10 justify-center">
        {discounts?.map((promotion) => (
          <PromotionCard
            key={promotion._id}
            promotion={promotion}
          />
        ))}
      </div>
    </div>
  );
}
