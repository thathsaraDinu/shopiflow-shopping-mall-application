import { getShopById } from '@/api/shop.api';
import { useAuthStore } from '@/store/auth-store';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';

function Dashboard() {
  const shopId = useShopStore((state) => state.shopId);
  const fullName = useAuthStore((state) => state.fullName);

  const {
    data: shopData,
    isLoading: shopLoading,
    isError: shopIsError,
  } = useQuery({
    queryKey: ['shopData'],
    queryFn: () => getShopById(shopId),
  });

  return (
    <>
      <h1>Dashboard</h1>
      {shopLoading && <div>Loading...</div>}
      {shopIsError && (
        <div>Error: {shopIsError.message}</div>
      )}
      <h2>Shop Details</h2>
      <div>Shop Name: {shopData.name}</div>
      <div>Open Time: {shopData.openTime}</div>
      <div>Shop Phone: {shopData.contactNumber}</div>
      <h2>Owner Details</h2>
      <div>Owner: {fullName}</div>
    </>
  );
}

export default Dashboard;
