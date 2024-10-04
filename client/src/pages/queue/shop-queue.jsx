import { getQueues } from '@/api/queue.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddQueueModal from './join-queue';
import QueueCard from '@/components/queue-card/queue-card';
import { LoadingSpinner } from '@/components/ui/spinner';

const ShopQueue = () => {
  const { shopID } = useParams();

  const location = useLocation();
  const { shopName } = location.state || {};

  // Get the shop's queues
  const {
    data: queues,
    isLoading: queuesLoading,
    isError: queuesError,
    refetch,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () => getQueues(shopID),
  });

  return (
    <div>
      {queuesLoading && <LoadingSpinner />}
      {queuesError && <p>Error fetching queues</p>}
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">
            Queue of {shopName}
          </h2>
          <AddQueueModal
            shopID={shopID}
            onSuccess={refetch}
            queueIds={
              queuesLoading
                ? []
                : queues.map((queue) => queue.userID?._id)
            }
          />
        </div>
        {queues && (
          <div className="mt-5 grid grid-cols-1 gap-4 justify-items-center">
            {queues.map((queue, index) => (
              <QueueCard
                key={queue._id}
                queue={queue}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ShopQueue;
