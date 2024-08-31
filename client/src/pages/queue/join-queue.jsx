import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { useAuthStore } from '@/store/auth-store';
import { USER_ROLES } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { joinQueue } from '@/api/queue.api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { joinQueueValidation } from '@/validations/queue-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import propTypes from 'prop-types';

const AddQueueModal = ({ shopID }) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );

  const role = useAuthStore((state) => state.role);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(joinQueueValidation),
    defaultValues: {
      agree: false,
    },
  });

  const joinQueueQuery = useMutation({
    mutationFn: joinQueue,
    onSuccess: () => {
      toast.success('Joined queue successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error joining queue');
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    joinQueueQuery.mutate(shopID);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Join to Queue</Button>
      </DialogTrigger>
      {isAuthenticated && role === USER_ROLES.USER && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join to the Queue</DialogTitle>
            <DialogDescription>
              Join the queue to get served. Click join when
              you&apos;re ready.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group form-check">
              <input
                name="acceptTerms"
                type="checkbox"
                {...register('acceptTerms')}
                id="acceptTerms"
                className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
              />
              <label
                htmlFor="acceptTerms"
                className="form-check-label"
              >
                I&apos;m ready to join the queue
              </label>
            </div>
            {/* Error */}
            {errors?.acceptTerms && (
              <span className="text-sm text-red-500">
                {errors.acceptTerms.message}
              </span>
            )}

            <DialogFooter className="mt-5">
              <Button type="submit">Join Now</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
      {!isAuthenticated && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alert!</DialogTitle>
            <DialogDescription>
              You need to be logged in to join the queue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button onClick={() => navigate('/login')}>
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddQueueModal;

// Prop Validations
AddQueueModal.propTypes = {
  shopID: propTypes.string.isRequired,
};
