import {
  getQueues,
  updateQueueStatus,
} from '@/api/queue.api';
import { useShopStore } from '@/store/shop-store';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import QueueCard from '@/components/queue-card/queue-card';
import { LoadingSpinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { differenceInMinutes, format } from 'date-fns';
import { QUEUE_STATUS } from '@/constants';
import toast from 'react-hot-toast';
import { MdAccessTimeFilled } from 'react-icons/md';

const ManageQueue = () => {
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString(),
  );
  const [remainingTime, setRemainingTime] = useState({});

  const shopId = useShopStore((state) => state.shopId);
  const navigate = useNavigate();

  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
    refetch: refetchQueues,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () =>
      getQueues(shopId, [
        QUEUE_STATUS.PENDING,
        QUEUE_STATUS.IN_PROGRESS,
        QUEUE_STATUS.HOLD,
      ]),
    select: (data) => {
      return data.sort((a, b) => {
        if (
          a.status === QUEUE_STATUS.HOLD &&
          b.status !== QUEUE_STATUS.HOLD
        )
          return 1;
        if (
          a.status !== QUEUE_STATUS.HOLD &&
          b.status === QUEUE_STATUS.HOLD
        )
          return -1;
        return 0;
      });
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());

      // Update remaining time for each queue
      if (queues && queues.length > 0) {
        const updatedRemainingTime = {};
        queues.forEach((queue) => {
          if (queue.status === QUEUE_STATUS.HOLD) {
            const timeElapsed =
              new Date() - new Date(queue.updatedAt);
            const timeLeft = 120000 - timeElapsed; // 2 minutes in milliseconds
            updatedRemainingTime[queue._id] = Math.max(
              0,
              timeLeft,
            );
          }
        });
        setRemainingTime(updatedRemainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [queues]);

  const holdQueueMutation = useMutation({
    mutationFn: updateQueueStatus,
    onSuccess: () => {
      refetchQueues();
      toast.success('Queue held successfully');
    },
    onError: (error) => {
      console.error('Error holding queue:', error);
      toast.error('Failed to hold queue');
    },
  });

  const unHoldQueueMutation = useMutation({
    mutationFn: updateQueueStatus,
    onSuccess: () => {
      refetchQueues();
      toast.success('Queue unheld successfully');
    },
    onError: (error) => {
      console.error('Error unholding queue:', error);
      toast.error('Failed to unhold queue');
    },
  });

  const holdHandler = () => {
    holdQueueMutation.mutate({
      queueID: queues[0]._id,
      status: QUEUE_STATUS.HOLD,
    });
  };

  const unHoldHandler = (id) => {
    unHoldQueueMutation.mutate({
      queueID: id,
      status: QUEUE_STATUS.PENDING,
    });
  };

  useEffect(() => {
    // Auto cancel queue if time is up
    const cancelQueue = (id) => {
      unHoldQueueMutation.mutate({
        queueID: id,
        status: QUEUE_STATUS.CANCELLED,
      });
    };

    const timers = Object.keys(remainingTime).map((id) => {
      if (remainingTime[id] <= 0) {
        cancelQueue(id);
      }
    });

    return () =>
      timers.forEach((timer) => clearTimeout(timer));
  }, [remainingTime, unHoldQueueMutation]);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Pending Queues ( {queues?.length || 0} )
        </h1>
        <div className="flex items-center gap-5">
          <div className="text-gray-600 text-xl font-semibold">
            {format(new Date(currentDateTime), 'PPPP')}
          </div>
          <div className="text-gray-600 text-xl font-semibold w-20">
            {format(new Date(currentDateTime), 'HH:mm:ss')}
          </div>
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
                  <div className="border-b-2 border-gray-200 col-span-6 my-2"></div>
                  <img
                    src={`https://api.dicebear.com/9.x/micah/svg?seed=${queues[0].userID.firstName}`}
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
                    <div className="text-green-500 font-medium">
                      In Progress
                    </div>
                    {/* Countdown Timer */}
                    {queues[0].status ===
                      QUEUE_STATUS.HOLD && (
                      <div className="text-red-500 font-bold">
                        Time Remaining:{' '}
                        {Math.ceil(
                          remainingTime[queues[0]._id] /
                            1000,
                        )}{' '}
                        seconds
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-b-2 border-gray-200 my-6"></div>
                <div className="text-gray-600 text-xl font-semibold flex items-center gap-2">
                  <MdAccessTimeFilled className="text-gray-500 h-10 w-10" />
                  {differenceInMinutes(
                    new Date(),
                    new Date(queues[0].createdAt),
                  )}{' '}
                  mins waiting in queue
                </div>
                <div className="border-b-2 border-gray-200 my-6"></div>
                <div className="flex justify-between items-center gap-5">
                  <Button
                    disabled={
                      queues[0].status === QUEUE_STATUS.HOLD
                    }
                    variant="primary"
                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() =>
                      navigate('/finalize', {
                        state: { queue: queues[0] },
                      })
                    }
                  >
                    {queues[0].status === QUEUE_STATUS.HOLD
                      ? 'Unhold First >'
                      : 'Finalize'}
                  </Button>
                  <Button
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white"
                    onClick={
                      queues[0].status === QUEUE_STATUS.HOLD
                        ? () => unHoldHandler(queues[0]._id)
                        : holdHandler
                    }
                  >
                    {queues[0].status === QUEUE_STATUS.HOLD
                      ? 'Unhold'
                      : 'Hold'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Scrollable list of other queues */}
          <div className="sidebar-scroll overflow-y-auto">
            <div className="flex flex-col gap-4 pr-3">
              {queues.slice(1)?.map((queue, index) => (
                <QueueCard
                  key={queue._id}
                  queue={queue}
                  index={index + 1}
                  unHold={unHoldHandler}
                  remainingTime={remainingTime[queue._id]}
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
