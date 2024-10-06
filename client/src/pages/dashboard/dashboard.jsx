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
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl text-blue-600 font-bold text-center mb-6">Dashboard</h1>

      {shopLoading && (
        <div className="mt-4 p-4 text-blue-500 bg-blue-100 rounded-lg text-center">
          Loading...
        </div>
      )}
      {shopIsError && (
        <div className="mt-4 p-4 text-red-600 bg-red-100 rounded-lg text-center">
          Error: {shopIsError.message}
        </div>
      )}

      <h2 className="text-2xl text-gray-800 font-semibold mt-8 border-b-2 border-blue-500 inline-block pb-1 mb-4">
        Shop Details
      </h2>

      {!shopData && (
        <div className="mt-4 p-4 text-orange-600 bg-orange-100 rounded-lg text-center">
          No shop data found
        </div>
      )}

      {shopData && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="text-3xl font-medium mb-4" style={{ fontFamily: 'Righteous, sans-serif' }}>
            {shopData?.name}
          </h2>
          <p className="text-base text-gray-600">
            <span className="font-bold">Location:</span> {shopData?.location || 'Not Provided'}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-bold">Open Time:</span> {shopData?.openTime || 'Not Provided'}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-bold">Contact Number:</span> {shopData?.contactNumber || 'Not Provided'}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-bold">Owner Email:</span> {shopData?.ownerEmail || 'Not Provided'}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-bold">Shop Type:</span> {shopData?.shopType || 'Not Provided'}
          </p>
        </div>
      )}

      <h2 className="text-2xl text-gray-800 font-semibold mt-8 border-b-2 border-blue-500 inline-block pb-1 mb-4">
        Owner Details
      </h2>
      <div className="text-lg mt-4 p-4 bg-gray-100 rounded-lg">
        <p>
          <span className="font-bold">Owner:</span> {fullName}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
