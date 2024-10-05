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
import { Button } from '@/components/ui/button';
import { DeleteModal } from '@/components/modals/delete';
import { QUEUE_STATUS } from '@/constants';

const UserQueueCard = ({ queue, index, onLeave }) => {
  return (
    <Card
      key={queue._id}
      className={cn(
        `w-full p-1 ${queue.status !== QUEUE_STATUS.COMPLETED ? 'flex flex-row' : 'hidden'} `,
        'hover:shadow-md',
      )}
    >
      <div className="p-2">{index + 1}</div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-3">
          <CardHeader>
            <CardTitle>{queue.shopID.name}</CardTitle>
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
        <div className="h-full p-4 grid grid-rows-2 grid-flow-col gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-green-500 text-white hover:bg-green-400 hover:text-white hidden"
            onClick={() => {
              console.log('Move Down');
            }}
          >
            Move Down
          </Button>

          <DeleteModal
            description={queue.shopID.name}
            btnText={'Leave'}
            btnClassName="w-full bg-red-500 text-white hover:bg-red-400 hover:text-white"
            title={`Are you sure you want to leave from ${queue.shopID.name}?`}
            onYes={() => {
              onLeave(queue._id);
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default UserQueueCard;

// Prop Validations
UserQueueCard.propTypes = {
  queue: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  onLeave: propTypes.func.isRequired,
};
