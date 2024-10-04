import { useEffect, useState } from 'react';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import { AddPromotionStep1 } from './addpromotionstep1';
import { AddPromotionStep2 } from './addpromotionstep2';
import { AddPromotionStep3 } from './addpromotionstep3';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  schema1,
  schema2,
  schema3,
  schema4,
} from '../../validations/promotion-validation';
import { useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
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
  DialogClose,
} from '@/components/ui/dialog'; // Import DialogContent, DialogHeader, DialogFooter
import { Link } from 'react-router-dom';
import { getShops } from '@/api/shop.api';
import { set } from 'date-fns';

export default function AddPromotionMain({
  refetch,
  isUpdate,
  promotion,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    promotionType: -1,
    storeName: '',
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
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const data = await getShops();
      setShops(data);
      setError(null);
    } catch (err) {
      setError('Error fetching shops');
    } finally {
      setLoading(false);
    }
  };

  // Fetch shops when component mounts
  useEffect(() => {
    fetchShops();
  }, []);

  const {
    register,
    handleSubmit,
    unregister,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    trigger,
    control,
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
      console.log('Promotion Created Successfully');
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
      console.log('the formdata: ', formData);
      console.log('the error: ', error);
      console.log(error.response?.status);
      if (error.response.status === 400) {
        toast.error('Promotion already exists');
      } else if (error.response?.status !== 500) {
        toast.error('Something went wrong');
      }
    },
    onSettled: () => {
      console.log('Settled');
    },
  });

  const updatepromotion = useMutation({
    mutationFn: updatePromotion,
    onSuccess: (e) => {
      console.log('Promotion Updated Successfully', e);
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
      console.log('the formdata: ', formData);
      console.log('the error: ', error);
      console.log(error.response?.status);
      if (error.response.status === 400) {
        toast.error('Promotion already exists');
      } else if (error.response?.status !== 500) {
        toast.error('Something went wrong');
      }
    },
    onSettled: () => {
      console.log('Settled');
    },
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // This will return a Base64 string
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
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

  const convertToString = async (file) => {
    if (file) {
      const base64 = await convertToBase64(file)
        .then((base64) => {
          console.log('Base64:', base64);
          setFormData((prevData) => ({
            ...prevData,
            photo: base64,
          }));
        })
        .catch((error) => {
          console.error(
            'Error converting file to Base64:',
            error,
          );
        });
    }
  };

  const onSubmit = async (data) => {
    try {
      if (currentStepIndex == 0)
        setFormData((prevData) => ({
          ...prevData,
          promotionType: parseInt(data.promotionType),
        }));
      if (currentStepIndex == 1)
        setFormData((prevData) => ({
          ...prevData,
          storeName: data.storeName,
        }));

      setFormData((prevData) => ({ ...prevData, ...data }));

      if (currentStepIndex == 2) {
        console.log('photo:', data.photo);
        const convertedPhoto = await handleFileConversion(
          data.photo,
        );

        console.log('Converted Photo:', convertedPhoto);
        const formData3 = {
          promotionType: formData.promotionType,
          storeName: formData.storeName,
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
      console.log('File selected:', file.name);
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
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isSecondStep,
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
      shops={shops}
      loading={loading}
      promotion={promotion}
    />,
    <AddPromotionStep3
      {...formData}
      register={register}
      errors={errors}
      watch={watch}
      handleFileChange={handleFileChange}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
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

        <div className=" mx-auto w-[400px]">
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
                    : isLastStep
                      ? 'Submit'
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
