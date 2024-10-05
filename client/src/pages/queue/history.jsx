import { getQueues } from '@/api/queue.api';
import { useShopStore } from '@/store/shop-store';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { QUEUE_STATUS } from '@/constants';
import toast from 'react-hot-toast';
import QueueTable from './queue-table';

const History = () => {
  const shopId = useShopStore((state) => state.shopId);

  // Fetch the queue data
  const {
    data: queues,
    isLoading: queuesLoading,
    error: queuesError,
  } = useQuery({
    queryKey: ['queues-history'],
    queryFn: () =>
      getQueues(shopId, [
        QUEUE_STATUS.COMPLETED,
        QUEUE_STATUS.CANCELLED,
      ]),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Report Download Button */}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              toast.success('Report downloaded');
            }}
          >
            Download Report
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <QueueTable
          queues={queues}
          isLoading={queuesLoading}
          isError={queuesError}
        />
      </div>
    </div>
  );
};

export default History;
