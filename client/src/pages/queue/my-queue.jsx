import { getUserQueues } from '@/api/queue.api';
import { useQuery } from '@tanstack/react-query';
import QueueCard from '@/components/queue-card/queue-card';

const MyQueue = () => {
  // Get the shop's queues
  const {
    data: queues,
    isLoading: queuesLoading,
    isError: queuesError,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () => getUserQueues(),
  });

  return (
    <div>
      {queuesLoading && <p>Loading...</p>}
      {queuesError && <p>Error fetching queues</p>}
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">
            Joind Queues
          </h2>
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
export default MyQueue;
