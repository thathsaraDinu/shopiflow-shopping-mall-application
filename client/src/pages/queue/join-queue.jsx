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
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { joinQueueValidation } from '@/validations/queue-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import propTypes from 'prop-types';
import { useState } from 'react';
import { getProfileData } from '@/api/user.api';

const JoinQueueModal = ({ shopID, onSuccess, joined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const setProfile = useAuthStore((state) => state.profile);
  const role = useAuthStore((state) => state.role);
  const fullName = useAuthStore((state) => state.fullName);

  const navigate = useNavigate();

  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    isSuccess: profileSuccess,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  // If profileSuccess is true, set the profile data
  if (profileSuccess) {
    setProfile(profile);
  }

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
      setIsOpen(false),
        toast.success('Successfully joined the queue');
      onSuccess();
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error('Already in the queue');
      }

      if (error.response?.status !== 400) {
        toast.error('Something went wrong');
      }
    },
  });

  const onSubmit = () => {
    joinQueueQuery.mutate(shopID);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          {profileLoading
            ? 'Loading...'
            : profileError
              ? 'Error'
              : joined
                ? 'Leave Queue'
                : 'Join Queue'}
        </Button>
      </DialogTrigger>
      {isAuthenticated && role === USER_ROLES.USER && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join to the Queue</DialogTitle>
            <DialogDescription>
              Hi, {fullName}! Join the queue to get served.
              Click join when you&apos;re ready.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group form-check hover:cursor-pointer w-fit">
              <input
                name="acceptTerms"
                type="checkbox"
                {...register('acceptTerms')}
                id="acceptTerms"
                className={`hover:cursor-pointer form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
              />
              <label
                htmlFor="acceptTerms"
                className="form-check-label ms-2 hover:cursor-pointer"
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

export default JoinQueueModal;

// Prop Validations
JoinQueueModal.propTypes = {
  shopID: propTypes.string.isRequired,
  onSuccess: propTypes.func.isRequired,
  joined: propTypes.bool,
};
