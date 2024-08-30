import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getShops } from '@/api/shop.api';
import { useQuery } from '@tanstack/react-query';

const Shop = () => {
  const navigate = useNavigate();

  // Fetch the shops data using react-query
  const {
    data: shops,
    isLoading: shopsLoading,
    isError: shopsError,
  } = useQuery({
    queryKey: ['shops'],
    queryFn: getShops,
  });

  // Join queue button handler
  const joinQueueHandler = (shopID, shopName) => {
    navigate(`/queue/${shopID}`, { state: { shopName } });
  };

  return (
    <div>
      <h1>Shops</h1>
      {shopsLoading && <p>Loading...</p>}
      {shopsError && <p>Error fetching shops</p>}
      {shops?.map((shop) => (
        <div key={shop._id} className="m-5 p-4 border rounded shadow">
          <h2 className="text-lg font-semibold">{shop.name}</h2>
          <p className="text-sm text-gray-600">Location: {shop.location}</p>
          <p className="text-sm text-gray-600">Open Time: {shop.openTime}</p>

          <div className="mt-2">
            <h3 className="text-md font-medium">Items Available:</h3>
            {shop.items && shop.items.length > 0 ? (
              <ul className="list-disc pl-4">
                {shop.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items available</p>
            )}
          </div>

          <Button
            onClick={() => joinQueueHandler(shop._id, shop.name)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            View Virtual Queue
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
