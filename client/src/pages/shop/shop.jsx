import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getShops } from '@/api/shop.api';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';

const Shop = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn,
  );

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
    <div className="min-h-screen bg-gray-100 py-5 md:py-10 px-5">
      <h1
        className="text-5xl font-bold text-center mb-8 text-gradient bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}
      >
        Explore Our Shops
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <div className="col-span-5 h-96 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {/* Display Shops */}
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="border rounded-xl shadow-lg bg-white transform transition hover:scale-105 hover:shadow-xl"
          >
            <div className="bg-gradient-to-r from-blue-400 to-green-400 p-2 rounded-t-xl">
              <h2
                className="text-2xl font-extrabold text-white text-center"
                style={{
                  fontFamily: 'Righteous, sans-serif',
                }}
              >
                {shop.name}
              </h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-b-xl">
              <div className="text-base text-gray-700 space-y-2 mb-4">
                <p>
                  <span className="font-semibold">
                    Location:
                  </span>{' '}
                  {shop.location}
                </p>
                <p>
                  <span className="font-semibold">
                    Open Time:
                  </span>{' '}
                  {shop.openTime}
                </p>
                <p>
                  <span className="font-semibold">
                    Contact Number:
                  </span>{' '}
                  {shop.contactNumber}
                </p>
                <p>
                  <span className="font-semibold">
                    Owner Email:
                  </span>{' '}
                  {shop.ownerEmail}
                </p>
                <p>
                  <span className="font-semibold">
                    Shop Type:
                  </span>{' '}
                  {shop.shopType}
                </p>
              </div>

              <div className="flex justify-between flex-wrap gap-4 items-center">
                {/* Number of buyers in queue */}
                <div className="text-right">
                  <span
                    className={`${
                      shop.numberOfQueues > 10
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    } text-sm font-medium px-2.5 py-1 rounded`}
                  >
                    {shop.numberOfQueues} buyers in the
                    queue
                  </span>
                </div>

                <div className="text-right">
                  {isLoggedIn ? (
                    <Button
                      onClick={() =>
                        joinQueueHandler(
                          shop._id,
                          shop.name,
                        )
                      }
                      className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      View Queue
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate('/login')}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-1 px-4 rounded-lg"
                    >
                      Login to Join Queue
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
