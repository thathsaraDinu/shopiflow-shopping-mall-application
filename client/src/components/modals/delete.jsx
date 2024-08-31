import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import propTypes from 'prop-types';

export function DeleteModal({
  description,
  btnText,
  title,
  btnClassName = '',
  onYes,
  onNo,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={btnClassName}>
          {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={onNo}>
            No
          </Button>
          <Button type="submit" onClick={onYes}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Prop Types
DeleteModal.propTypes = {
  description: propTypes.string.isRequired,
  btnText: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  btnClassName: propTypes.string,
  onYes: propTypes.func.isRequired,
  onNo: propTypes.func.isRequired,
};
