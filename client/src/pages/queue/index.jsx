import { getQueues } from '@/api/queue.api';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';
import QueueCard from '@/components/queue-card/queue-card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

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

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Pending Queues ( {queues?.length || 0} )
        </h1>

        <div className="flex items-center gap-5">
          {/* Current Date and Time */}
          <div className="text-gray-600 text-xl font-semibold w-64">
            {format(new Date(currentDateTime), 'PPpp')}
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
              <QueueCard queue={queues[0]} index={0} />
            </div>
          </div>

          {/* Right side: Scrollable list of other queues */}
          <div className="sidebar-scroll overflow-y-auto">
            <div className="flex flex-col gap-4">
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
