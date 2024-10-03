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
import { addpromotion } from '@/api/promotion.api';
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

export function AddPromotionMain({ refetch }) {
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
        addPromotion.mutate(formData3);
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
    />,
    <AddPromotionStep2
      {...formData}
      register={register}
      errors={errors}
      shops={shops}
      loading={loading}
    />,
    <AddPromotionStep3
      {...formData}
      register={register}
      errors={errors}
      watch={watch}
      handleFileChange={handleFileChange}
      selectedFile={selectedFile}
    />,
  ]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white text-sm px-5 py-5 rounded-lg hover:bg-blue-600 transition">
          Add Promotion
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="text-2xl pb-5 text-grey-700 font-semibold">
            Add Promotion
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
                    className="bg-blue-600 text-white hover:bg-blue-500 transition"
                  >
                    Previous
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white hover:bg-green-500 transition"
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
