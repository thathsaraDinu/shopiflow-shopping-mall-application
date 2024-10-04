import { getUserQueues, leaveQueue } from '@/api/queue.api';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import UserQueueCard from '@/components/queue-card/user-queue-card';
import toast from 'react-hot-toast';

const MyQueue = () => {
  // Get the shop's queues
  const {
    data: queues,
    isLoading: queuesLoading,
    isError: queuesError,
    refetch,
  } = useQuery({
    queryKey: ['myqueues'],
    queryFn: () => getUserQueues(),
  });

  const leaveQueueMutation = useMutation({
    mutationFn: leaveQueue,
    onSuccess: () => {
      toast.success('Joined queue successfully'), refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error joining queue');
    },
  });

  const handleLeaveQueue = (queueId) => {
    leaveQueueMutation.mutate(queueId);
  };

  return (
    <div>
      {queuesLoading && <p>Loading...</p>}
      {queuesError && <p>Error fetching queues</p>}
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">
            Joined Queues ({queues?.length})
          </h2>
        </div>
        {queues && (
          <div className="mt-5 grid grid-cols-1 gap-4 justify-items-center">
            {queues.map((queue, index) => (
              <UserQueueCard
                key={queue._id}
                queue={queue}
                index={index}
                onLeave={handleLeaveQueue}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MyQueue;
