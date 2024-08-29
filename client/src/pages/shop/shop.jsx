import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getShops } from '@/api/shop.api';
import { useQuery } from '@tanstack/react-query';

const Shop = () => {
  const navigate = useNavigate();

  // Get the shop's queues
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
      <h1>Shop</h1>
      {shopsLoading && <p>Loading...</p>}
      {shopsError && <p>Error fetching shops</p>}
      {shops?.map((shop) => (
        <div key={shop._id} className="m-5">
          {shop.name}
          <Button
            onClick={() =>
              joinQueueHandler(shop._id, shop.name)
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Virtual Queue
          </Button>
        </div>
      ))}
    </div>
  );
};
export default Shop;
