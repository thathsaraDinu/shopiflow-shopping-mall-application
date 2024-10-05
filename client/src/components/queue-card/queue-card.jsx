import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QUEUE_STATUS } from '@/constants';
import { cn } from '@/lib/utils';
import { format, differenceInMinutes } from 'date-fns';
import propTypes from 'prop-types';
import { Button } from '../ui/button';

const QueueCard = ({ queue, index, unHold }) => {
  // Calculate the waiting time
  const waitingTime = differenceInMinutes(
    new Date(),
    new Date(queue.createdAt),
  );

  // Estimate time to serve the customer
  const estimatedTime = index * 2;

  return (
    <Card
      key={queue._id}
      className={cn(
        'w-full p-4 flex flex-row items-center',
        'hover:shadow-lg transition-shadow',
      )}
    >
      {/* Large Queue Index */}
      <div className="grid grid-cols-5">
        <div className="col-start-1 col-end-2">
          <div className="grid grid-rows-2 grid-flow-col gap-1">
            <div className="bg-gray-100 text-gray-800 flex items-center justify-center rounded-md w-full h-16 font-bold text-3xl">
              {index + 1}
            </div>
            <img
              src={`https://api.dicebear.com/9.x/micah/svg?seed=${queue.userID.firstName}`}
              alt="avatar"
              className="rounded-lg w-full h-20 border-2 border-gray-200"
            />
          </div>
        </div>

        <div className="col-start-2 col-end-6 w-full">
          <CardHeader className="flex justify-between items-center p-0 ps-6">
            <div>
              <CardTitle className="text-xl font-semibold">
                <div className="grid grid-cols-5">
                  <h2 className="text-xl font-semibold text-gray-600 col-start-1 col-span-4">
                    {queue.userID.firstName}{' '}
                    {queue.userID.lastName}
                  </h2>
                  <span className="text-gray-400 col-end-6">
                    #
                    {queue.position
                      .toString()
                      .padStart(5, '0')}
                  </span>
                </div>
              </CardTitle>
              <CardDescription className="text-gray-500">
                Joined:{' '}
                {format(
                  new Date(queue.createdAt),
                  'MM/dd/yyyy',
                )}{' '}
                at{' '}
                {format(
                  new Date(queue.createdAt),
                  'hh:mm a',
                )}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-5 text-sm p-0 ps-6 pt-10">
            <div className="col-span-4">
              {/* Queue Status */}
              {queue.status === QUEUE_STATUS.COMPLETED ? (
                <p className="text-green-500 font-medium">
                  Completed
                </p>
              ) : (
                <p className="text-red-500 font-medium">
                  Pending
                </p>
              )}

              {/* Estimated Waiting Time */}
              <div className="mt-2">
                <p className="text-gray-700">
                  <span className="font-medium">
                    Waiting Time:
                  </span>{' '}
                  {waitingTime} minutes
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">
                    Estimated Time:
                  </span>{' '}
                  {estimatedTime} minutes
                </p>
              </div>

              {/* Token Number if Completed */}
              {queue.status === 'completed' && (
                <p className="mt-2 text-gray-600 font-medium">
                  Token Number: {queue.position}
                </p>
              )}
            </div>
            <div className="col-start-5 col-end-6">
              {queue.status === QUEUE_STATUS.HOLD &&
                unHold && (
                  <Button
                    onClick={() => unHold(queue._id)}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600"
                  >
                    Unhold
                  </Button>
                )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default QueueCard;

// Prop Validations
QueueCard.propTypes = {
  queue: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  unHold: propTypes.func,
};
