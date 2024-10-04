import { getQueues } from '@/api/queue.api';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';
import QueueCard from '@/components/queue-card/queue-card';
import { LoadingSpinner } from '@/components/ui/spinner';

const ManageQueue = () => {
  const shopId = useShopStore((state) => state.shopId);
  // Fetch the queue data
  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
    refetch,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () => getQueues(shopId),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Queues</h1>
      {queuesLoading && <LoadingSpinner />}
      {queuesError && (
        <div>Error: {queuesError.message}</div>
      )}
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
  );
};

export default ManageQueue;
