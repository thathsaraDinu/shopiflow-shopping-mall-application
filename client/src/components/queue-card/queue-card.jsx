import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, differenceInMinutes } from 'date-fns';
import propTypes from 'prop-types';

const QueueCard = ({ queue, index }) => {
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
      <div className="bg-gray-100 text-gray-800 flex items-center justify-center rounded-md w-16 h-16 font-bold text-3xl">
        {index + 1}
      </div>

      <div className="ml-4 w-full">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">
              {queue.userID.firstName +
                ' ' +
                queue.userID.lastName}{' '}
              {/* Token number shows with 5 digits */}
              (Token Number: #
              {queue.position.toString().padStart(5, '0')})
            </CardTitle>
            <CardDescription className="text-gray-500">
              Joined:{' '}
              {format(
                new Date(queue.createdAt),
                'MM/dd/yyyy',
              )}{' '}
              at{' '}
              {format(new Date(queue.createdAt), 'hh:mm a')}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-sm mt-2">
          {/* Queue Status */}
          {queue.status === 'completed' ? (
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
        </CardContent>
      </div>
    </Card>
  );
};

export default QueueCard;

// Prop Validations
QueueCard.propTypes = {
  queue: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
};
