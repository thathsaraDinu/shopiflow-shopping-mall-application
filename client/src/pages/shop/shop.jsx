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
      <h1 className='text-center mt-6 mb-6 text-4xl font-medium' style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Available Shops</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}


      {/* Display Shops */}
      {shops.map((shop) => (
        <div
          key={shop._id}
          className="m-5 p-4 border rounded shadow"
        >
          <h2 className="text-lg font-medium " style={{ fontFamily: 'Righteous, sans-serif', fontSize: '30px' }}>
            {shop.name}
          </h2>
          <p className="text-base text-gray-600">
            Location: {shop.location}
          </p>
          <p className="text-base text-gray-600">
            Open Time: {shop.openTime}
          </p>
          <p className="text-base text-gray-600">
            Contact Number: {shop.contactNumber}
          </p>
          {/* Display newly added fields */}
          <p className="text-base text-gray-600">
            Owner Email: {shop.ownerEmail} {/* **Newly Added Field** */}
          </p>
          <p className="text-base text-gray-600">
            Shop Type: {shop.shopType} {/* **Newly Added Field** */}
          </p>
          {/* Number of buyers in queue */}
          <div>
            <span
              className={`${queueLength > 10 ? 'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded' : 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded'}`}
            >
              {queueLength} buyers in queue
            </span>
          </div>

          <Button
            onClick={() =>
              joinQueueHandler(shop._id, shop.name)
            }
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Join Queue
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
