import { getQueues, leaveQueue } from '@/api/queue.api';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import JoinQueueModal from './join-queue';
import QueueCard from '@/components/queue-card/queue-card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { QUEUE_STATUS } from '@/constants';
import { useEffect } from 'react';
import { DeleteModal } from '@/components/modals/delete';
import toast from 'react-hot-toast';

const ShopQueue = () => {
  const { shopID } = useParams();

  const location = useLocation();
  const { shopName } = location.state || {};
  const [joined, setJoined] = useState(false);
  const [queueID, setQueueID] = useState(null);
  const userID = useAuthStore((state) => state.id);

  const {
    data: queues,
    isLoading: queuesLoading,
    isError: queuesError,
    refetch,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () =>
      getQueues(shopID, [
        QUEUE_STATUS.PENDING,
        QUEUE_STATUS.IN_PROGRESS,
        QUEUE_STATUS.HOLD,
      ]),
  });

  // Check if user has joined the queue already
  useEffect(() => {
    if (queues) {
      const userQueue = queues.find(
        (queue) =>
          queue.userID._id === userID &&
          queue.status === QUEUE_STATUS.PENDING &&
          queue.shopID._id === shopID,
      );
      if (userQueue) {
        setJoined(true);
        setQueueID(userQueue._id);
      }
    }
  }, [queues, userID, shopID]);

  const leaveQueueMutation = useMutation({
    mutationFn: leaveQueue,
    onSuccess: () => {
      toast.success('Left queue successfully');
      refetch();
      setJoined(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error leaving queue');
    },
  });

  const handleLeaveQueue = (queueId) => () => {
    leaveQueueMutation.mutate(queueId);
  };

  return (
    <div>
      {queuesLoading && <LoadingSpinner />}
      {queuesError && <p>Error fetching queues</p>}
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">
            Queue of {shopName}
          </h2>
          {joined && (
            <DeleteModal
              description={'Leave from the queue'}
              btnText={'Leave'}
              btnClassName="w-40 bg-red-500 text-white hover:bg-red-400 hover:text-white"
              title={`Are you sure you want to leave from the queue of ${shopName}?`}
              onYes={handleLeaveQueue(queueID)}
            />
          )}
          {!joined && (
            <JoinQueueModal
              shopID={shopID}
              onSuccess={refetch}
              joined={joined}
            />
          )}
        </div>
        {queues && (
          <div className="mt-5 grid grid-cols-1 gap-4 justify-items-center">
            {queues.map((queue, index) => (
              <QueueCard
                key={queue._id}
                queue={queue}
                index={index}
                mine={queue.userID._id === userID}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ShopQueue;
