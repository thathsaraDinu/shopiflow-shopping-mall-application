import { getQueues } from '@/api/queue.api';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';
import QueueCard from '@/components/queue-card/queue-card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ProfileImg from '@/assets/avatar/user.jpg';

const ManageQueue = () => {
  // Update date time every second
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString(),
  );

  const shopId = useShopStore((state) => state.shopId);
  const navigate = useNavigate();

  // Fetch the queue data
  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
    // refetch,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () => getQueues(shopId),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hold the queue window pop up
  const holdHandler = () => {
    alert('Hold the queue');
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Pending Queues ( {queues?.length || 0} )
        </h1>

        <div className="flex items-center gap-5">
          {/* Current Date and Time */}
          <div className="text-gray-600 text-xl font-semibold">
            {format(new Date(currentDateTime), 'PPPP')}
          </div>
          <div className="text-gray-600 text-xl font-semibold w-20">
            {format(new Date(currentDateTime), 'HH:mm:ss')}
          </div>

          {/* All History */}
          <Button
            onClick={() => navigate('/history')}
            variant="secondary"
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white"
          >
            View History
          </Button>
        </div>
      </div>

      {/* Queue Loading or Error */}
      {queuesLoading && <LoadingSpinner />}
      {queuesError && (
        <div>Error: {queuesError.message}</div>
      )}

      {queues && queues.length > 0 && (
        <div
          className="mt-5 grid grid-cols-2 gap-4"
          style={{ height: '75vh' }}
        >
          {/* Left side: First Queue Card */}
          <div className="border-r-2 pr-4">
            <div className="h-full flex items-center">
              <div className="w-full h-full border-2 border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-6 gap-4">
                  <h1 className="text-2xl font-bold text-gray-600 col-start-1 col-end-7">
                    {queues[0].shopID.name}
                  </h1>
                  {/* Line */}
                  <div className="border-b-2 border-gray-200 col-span-6 my-2"></div>
                  <img
                    src={ProfileImg}
                    alt="Profile"
                    className="col-span-2 rounded-md w-32 h-32"
                  />
                  <div className="col-span-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-600">
                        {queues[0].userID.firstName}{' '}
                        {queues[0].userID.lastName}
                      </h2>
                      <span className="text-gray-400">
                        #
                        {queues[0].position
                          .toString()
                          .padStart(5, '0')}
                      </span>
                    </div>
                    {/* Line */}
                    <div className="border-b-2 border-transparent my-2"></div>
                    <p className="text-gray-600">
                      {queues[0].userID.mobile}
                    </p>
                    <p className="text-gray-600">
                      {queues[0].userID.email}
                    </p>
                    <p className="text-gray-600">
                      {queues[0].userID.gender
                        .charAt(0)
                        .toUpperCase() +
                        queues[0].userID.gender.slice(1)}
                    </p>
                  </div>
                </div>
                {/* Line */}
                <div className="border-b-2 border-gray-200 my-6"></div>
                <div className="border-b-2 border-gray-200 my-6"></div>
                <div className="flex justify-between items-center gap-5">
                  <Button
                    variant="primary"
                    className="w-full py-2 bg-green-400 hover:bg-green-500 text-white"
                    onClick={() =>
                      navigate('/finalize', {
                        state: { queue: queues[0] },
                      })
                    }
                  >
                    Complete
                  </Button>
                  <Button
                    className="w-full py-2 bg-red-400 hover:bg-red-500 text-white"
                    onClick={holdHandler}
                  >
                    Hold
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Scrollable list of other queues */}
          <div className="sidebar-scroll overflow-y-auto">
            <div className="flex flex-col gap-4 pr-3">
              {queues.slice(1).map((queue, index) => (
                <QueueCard
                  key={queue._id}
                  queue={queue}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQueue;
