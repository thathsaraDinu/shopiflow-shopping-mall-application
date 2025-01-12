import { useQuery } from '@tanstack/react-query';
import { getPromotions } from '@/api/promotion.api';

export function UsePromotionsQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
  });

  const discounts =
    data?.data.promotions.discountPercentage;
  const amounts = data?.data.promotions.discountAmount;

  return { discounts, amounts, isLoading };
}
