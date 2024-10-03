import { useQuery } from '@tanstack/react-query';
import DiscountAmountCard from '../components/promotions/discount-amount-card';
import { PromotionCard } from '../components/promotions/promotion-card';
import { getPromotions } from '@/api/promotion.api';
import { useState } from 'react';

export function MapPromotions() {
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
  return { discounts, amounts };
}
