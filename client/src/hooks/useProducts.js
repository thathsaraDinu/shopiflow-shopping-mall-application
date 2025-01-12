import { getAllProducts } from '@/api/product.api';
import { useQuery } from '@tanstack/react-query';

const UseProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  const products = data?.data;
  return { products, isLoading, error };
};

export default UseProducts;
