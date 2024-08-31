import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import propTypes from 'prop-types';

const UserQueueCard = ({ queue, index }) => {
  return (
    <Card
      key={queue._id}
      className={cn(
        'w-full p-1 flex flex-row',
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
            {format(new Date(queue.createdAt), 'hh:mm a')}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {queue._id}
        </CardContent>
      </div>
    </Card>
  );
};

export default UserQueueCard;

// Prop Validations
UserQueueCard.propTypes = {
  queue: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
};
