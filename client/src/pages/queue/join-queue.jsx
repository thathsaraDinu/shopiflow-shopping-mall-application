import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';

const AddQueueModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Join Queue</Button>
      </DialogTrigger>
      <DialogContent className="p-5">
        <DialogHeader>
          <h2 className="text-2xl font-bold">
            Read First...
          </h2>
          <DialogDescription>
            You are about to join the queue of a shop.
            Please make sure you are at the shop before
            joining the queue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQueueModal;
