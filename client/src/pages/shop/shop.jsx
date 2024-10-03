import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  getShops
} from '@/api/shop.api';
import { useEffect, useState } from 'react';

const Shop = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queueLength, setQueueLength] = useState(0);

  // Fetch the shops data
  const fetchShops = async () => {
    setLoading(true);
    try {
      const data = await getShops();
      setShops(data);
      setError(null);
    } catch (err) {
      setError('Error fetching shops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const joinQueueHandler = (shopID, shopName) => {
    navigate(`/queue/${shopID}`, { state: { shopName } });
  };

  return (
    <div>
      <h1 className='ml-6 mt-6 mb-6 text-4xl font-medium' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Available Shops
      </h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display Shops */}
      {shops.map((shop) => (
        <div
          key={shop._id}
          className="m-5 p-6 border rounded-lg shadow-lg bg-white"
        >
          <h2 className="text-3xl font-medium text-center mb-3" style={{ fontFamily: 'Righteous, sans-serif' }}>
            {shop.name}
          </h2>
          <div className="text-base text-gray-700 space-y-2 ml-2">
            <p>
              <span className="font-semibold">Location:</span> {shop.location}
            </p>
            <p>
              <span className="font-semibold">Open Time:</span> {shop.openTime}
            </p>
            <p>
              <span className="font-semibold">Contact Number:</span> {shop.contactNumber}
            </p>
            <p>
              <span className="font-semibold">Owner Email:</span> {shop.ownerEmail}
            </p>
            <p>
              <span className="font-semibold">Shop Type:</span> {shop.shopType}
            </p>
          </div>

          {/* Number of buyers in queue */}
          <div className="text-right">
            <span
              className={`${queueLength > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                } text-xs font-medium px-2.5 py-0.5 rounded`}
            >
              {queueLength} buyers in queue
            </span>
          </div>

          <div className="text-right mt-2">
            <Button
              onClick={() => joinQueueHandler(shop._id, shop.name)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              Join Queue
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
