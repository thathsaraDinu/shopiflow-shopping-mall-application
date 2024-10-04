import { getQueues } from '@/api/queue.api';
import { useQuery } from '@tanstack/react-query';

const ManageQueue = () => {
  // Fetch the queue data
  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
    refetch,
  } = useQuery({
    queryKey: 'queues',
    queryFn: getQueues,
  });

  return (
    <div>
      <h1>Manage Queue</h1>
    </div>
  );
};

export default ManageQueue;
