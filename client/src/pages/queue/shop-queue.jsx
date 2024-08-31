import { getQueues } from '@/api/queue.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import AddQueueModal from './join-queue';
import { format } from 'date-fns';

const ShopQueue = () => {
  const { shopID } = useParams();

  const location = useLocation();
  const { shopName } = location.state || {};

  // Get the shop's queues
  const {
    data: queues,
    isLoading: queuesLoading,
    isError: queuesError,
  } = useQuery({
    queryKey: ['queues'],
    queryFn: () => getQueues(shopID),
  });

  return (
    <div>
      {queuesLoading && <p>Loading...</p>}
      {queuesError && <p>Error fetching queues</p>}
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">
            Queue of {shopName}
          </h2>
          <AddQueueModal />
        </div>
        {queues && (
          <div className="grid grid-cols-1 gap-4 justify-items-center">
            {queues.map((queue, index) => (
              <Card
                key={queue._id}
                className={cn(
                  'min-w-[1000px] p-1 flex flex-row',
                  'hover:shadow-md',
                )}
              >
                <div className="p-2">{index + 1}</div>
                <div>
                  <CardHeader>
                    <CardTitle>
                      {queue.userID.firstName +
                        ' ' +
                        queue.userID.lastName}
                    </CardTitle>
                    <CardDescription>
                      {format(
                        new Date(queue.createdAt),
                        'MM/dd/yyyy',
                      )}
                      {' at '}
                      {format(
                        new Date(queue.createdAt),
                        'hh:mm a',
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    {queue._id}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ShopQueue;
