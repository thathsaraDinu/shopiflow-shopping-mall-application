import { getUserQueues, leaveQueue } from '@/api/queue.api';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import UserQueueCard from '@/components/queue-card/user-queue-card';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/ui/spinner';

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
      toast.success('Left queue successfully');
      refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error leaving queue');
    },
  });

  const handleLeaveQueue = (queueId) => {
    leaveQueueMutation.mutate(queueId);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple bg-clip-text text-transparent">
          Joined Queues ({queues?.length})
        </h2>
      </div>
      {queuesLoading && (
        <div className="col-span-5 h-96 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {queuesError && <p>Error fetching queues</p>}
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
  );
};
export default MyQueue;
