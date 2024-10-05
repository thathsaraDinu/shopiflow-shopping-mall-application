import { useEffect, useState } from 'react';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import { AddPromotionStep1 } from './addpromotionstep1';
import { AddPromotionStep2 } from './addpromotionstep2';
import { AddPromotionStep3 } from './addpromotionstep3';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  schema1,
  schema2,
  schema3,
  schema4,
} from '../../validations/promotion-validation';
import {
  useMutation,
} from '@tanstack/react-query';
import {
  addpromotion,
  updatePromotion,
} from '@/api/promotion.api';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog'; // Import DialogContent, DialogHeader, DialogFooter

export default function AddPromotionMain({
  refetch,
  isUpdate,
  promotion,
  loggedInShopId,
  shopName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [shopId, setShopId] = useState(loggedInShopId ? loggedInShopId : '');
  const [formData, setFormData] = useState({
    promotionType: -1,
    storeName: '',
    promoTitle: '',
    discountAmount: 0,
    discountPercentage: 0,
    qualifyingPurchaseAmount: 0,
    startDate: '',
    endDate: '',
    description: '',
    photo: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [theStep, setTheStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:
      theStep == 1
        ? zodResolver(schema1)
        : theStep == 2
          ? zodResolver(schema2)
          : theStep == 3
            ? zodResolver(schema3)
            : zodResolver(schema4),
  });

  const addPromotion = useMutation({
    mutationFn: addpromotion,
    onSuccess: () => {
      toast.success('Promotion Created Successfully');
      refetch();
      reset();
      back();
      back();
      setSelectedFile(null);
      setTheStep(1);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log('the error: ', error);
      if (error.response.status === 400) {
        toast.error('Promotion already exists');
      } else if (error.response?.status !== 500) {
        toast.error('Something went wrong');
      }
    },
    onSettled: () => {
    },
  });

  const updatepromotion = useMutation({
    mutationFn: updatePromotion,
    onSuccess: (e) => {
      toast.success('Promotion Updated Successfully');
      refetch();
      reset();
      back();
      back();
      setSelectedFile(null);
      setTheStep(1);
      setIsOpen(false);
    },
    onError: (error) => {
      
      console.log('the error: ', error);
      if (error.response.status === 400) {
        toast.error('Promotion already exists');
      } else if (error.response?.status !== 500) {
        toast.error('Something went wrong');
      }
    },
    onSettled: () => {
    },
  });

  const handleFileConversion = async (file) => {
    if (!file) return null;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result; // Get the Base64 string
        setFormData((prevData) => ({
          ...prevData,
          photo: base64, // Update the formData with the Base64 string
        }));
        resolve(base64); // Resolve the promise with the Base64 string
      };
      reader.onerror = (error) => {
        console.error(
          'Error converting file to Base64:',
          error,
        );
        reject(error); // Reject the promise if an error occurs
      };
    });
  };

  const onSubmit = async (data) => {
    try {
      if (currentStepIndex == 0)
        setFormData((prevData) => ({
          ...prevData,
          promotionType: parseInt(data.promotionType),
        }));

      setFormData((prevData) => ({ ...prevData, ...data }));

      if (currentStepIndex == 2) {
        const convertedPhoto = await handleFileConversion(
          data.photo,
        );

        const formData3 = {
          promotionType: formData.promotionType,
          promoTitle: formData.promoTitle,
          storeName: shopName,
          shopId: shopId,
          discountAmount: formData.discountAmount,
          discountPercentage: formData.discountPercentage,
          qualifyingPurchaseAmount:
            formData.qualifyingPurchaseAmount,
          startDate: data.startDate,
          endDate: data.endDate,
          description: formData.description,
          photo: convertedPhoto,
        };
        await new Promise((resolve) =>
          setTimeout(resolve, 1000),
        );
        if (isUpdate) {
          updatepromotion.mutate({
            id: promotion._id,
            data: formData3,
          });
        } else addPromotion.mutate(formData3);
      }
      next();
    } catch (error) {}
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setValue('photo', file);
    if (file) {
      setSelectedFile(file); // Store the selected file in state
    }
  };

  useEffect(() => {
    if (currentStepIndex == 0) setTheStep(1);
    else if (
      currentStepIndex == 1 &&
      formData.promotionType == 1
    )
      setTheStep(2);
    else if (
      currentStepIndex == 1 &&
      formData.promotionType == 3
    )
      setTheStep(3);
    else setTheStep(4);
  });

  const {
    currentStepIndex,
    step,
    isFirstStep,
    isComplete,
    next,
    back,
    isLastStep,
  } = useMultistepForm([
    <AddPromotionStep1
      {...formData}
      register={register}
      errors={errors}
      promotion={promotion}
    />,
    <AddPromotionStep2
      {...formData}
      register={register}
      errors={errors}
      promotion={promotion}
    />,
    <AddPromotionStep3
      {...formData}
      register={register}
      errors={errors}
      watch={watch}
      handleFileChange={handleFileChange}
      selectedFile={selectedFile}
      promotion={promotion}
      setValue={setValue}
    />,
  ]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            isUpdate
              ? 'w-8 mt-0 p-1 h-8 bg-white border-none'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition py-5 px-5 rounded-md'
          }
          variant="outline"
        >
          {isUpdate ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="#5F9EA0"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                fill="#0000FF"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          ) : (
            'Add Promotion'
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className={'pb-8'}>
          <div className="text-lg font-semibold leading-none tracking-tight">
            {isUpdate
              ? 'Update Promotion'
              : 'Add Promotion'}
          </div>
        </DialogHeader>

        <div className=" mx-5 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <div className="pb-10">{step}</div>
            {errors.root && (
              <p className="text-red-500">
                {errors.root.message}
              </p>
            )}
            {/* Step content */}
            {!isComplete && (
              <div className="flex items-center gap-10 justify-center">
                {!isFirstStep && (
                  <Button
                    onClick={back}
                    type="button"
                    className="hover:bg-gray-200 bg-white border border-gray-400 text-black transition"
                  >
                    Previous
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white hover:bg-green-600 transition"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : isLastStep && !isUpdate // If last step and not updating, show 'Submit'
                      ? 'Submit'
                      : isLastStep && isUpdate // If last step and updating, show 'Update'
                        ? 'Update'
                        : 'Next'}
                </Button>
              </div>
            )}
          </form>
        </div>

        <DialogFooter>{/* Optional footer */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
