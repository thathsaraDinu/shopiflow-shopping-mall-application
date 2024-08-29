import { useEffect, useState } from 'react';
import { useMultistepForm } from '../../hooks/useMultiStepForm';

import { AddPromotionStep1 } from './addpromotionstep1';
import { AddPromotionStep2 } from './addpromotionstep2';
import { AddPromotionStep3 } from './addpromotionstep3';
import { set, useForm } from 'react-hook-form';
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

export function AddPromotionMain() {
  const [formData, setFormData] = useState({
    promotionType: -1,
    storeName: '',
    discountAmount: 0,
    discountPercentage: 0,
    applicableItems: [''],
    qualifyingPurchaseAmount: 0,
    startDate: '',
    endDate: '',
    description: '',
  });
  const [formData2, setFormData2] = useState({
    promotionType: -1,
    storeName: '',
    discountAmount: 0,
    discountPercentage: 0,
    applicableItems: [''],
    qualifyingPurchaseAmount: 0,
    startDate: '',
    endDate: '',
    description: '',
  });
  const [theStep, setTheStep] = useState(1);

  const {
    register,
    handleSubmit,
    unregister,
    reset,
    formState: { errors, isSubmitting },
    setError,
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
      reset();
    },
    onError: (error) => {
      console.log("the formdata: ",formData2);
      console.log("the error: ",error);
      console.log(error.response?.status);
      if (error.response.status === 400) {
        toast.error('Promotion already exists');
      }
      else if (error.response?.status !== 500) {
        toast.error('Something went wrong');
      }
    },
  });

  const onSubmit = async (data) => {
    if(currentStepIndex == 0) setFormData((prevData) => ({ ...prevData, promotionType: parseInt(data.promotionType) }));
    console.log(data)
    setFormData2((prevData) => ({ ...prevData, ...data }));
   console.log(formData2);

    if (currentStepIndex == 2) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addPromotion.mutate(formData2);
    }
    next(); 
  };

  // const handleChange = (e) => {
  //   console.log('the step', theStep);
  //   const { name, value } = e.target;
  //   console.log(name, typeof value);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]:
  //       name === 'promotionType'
  //         ? parseInt(value)
  //         : name === 'discountAmount' ||
  //             name === 'qualifyingPurchaseAmount' ||
  //             name === 'discountPercentage'
  //           ? !isNaN(parseFloat(value))
  //             ? parseFloat(value)
  //             : ''
  //           : value,
  //   }));

  //   console.log(formData);
  // };

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

  
  // const handleItemChange = (index, value, type) => {
  //   if (type == 1) {
  //     const items = [...formData2.applicableItems];
  //     items[index] = value;
  //     setFormData2({
  //       ...formData2,
  //       applicableItems: items,
  //     });
  //   }
  // };

  const addItem = (type) => {
    if (type == 1) {
      setFormData({
        ...formData,
        applicableItems: [...formData.applicableItems, ''],
      });
    }
    console.log(formData);
  };

  const removeItem = (index, type) => {
    if (type === 1) {
      // Filter out the item from the form data
      const items = formData.applicableItems.filter(
        (_, i) => i !== index,
      );

      // Update the form data state
      setFormData({
        ...formData,
        applicableItems: items,
      });

      // Deregister the field before removing the item
      unregister(`applicableItems[${index}]`, {
        keepValue: false,
      });
      console.log(`applicableItems[${index}]`);
    }
  };

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
      addItem={addItem}
      register={register}
      removeItem={removeItem}
      errors={errors}
    />,
    <AddPromotionStep3
      {...formData}
      register={register}
      errors={errors}
    />,
  ]);

  return (
    <div className="">
      <div className="sm:px-20 px-10">
        <div className=" pt-10">
          <div className="text-3xl font-semibold ">
            topic 1
          </div>
          <div className="text-xl pt-5 font-medium ">
            topic 2!
          </div>
        </div>
        <div className="flex justify-center mb-10 sm:mb-20">
          <Card className="mt-10 w-[120vh] rounded-xl  sm:px-10 py-20 pb-10 h-auto ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 "
            >
              <div className="w-full px-5 sm:px-10 md:px-20 h-[4rem] lg:h-[8rem] py-">
                <div className="relative flex items-center justify-between w-full">
                  <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                  <div
                    className={`absolute left-0 top-2/4 h-0.5 ${
                      isFirstStep
                        ? 'w-0'
                        : isSecondStep
                          ? 'w-1/2'
                          : 'w-full'
                    }  -translate-y-2/4 bg-green-500 transition-all duration-500`}
                  ></div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      isFirstStep
                        ? 'text-white  bg-gray-900'
                        : 'text-white bg-green-500'
                    } rounded-full place-items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      ></path>
                    </svg>
                    <div className="absolute bottom-[3.5rem] lg:-bottom-[4.5rem] w-max text-center">
                      <h6
                        id="steptext"
                        className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal ${
                          isFirstStep
                            ? 'text-black'
                            : 'text-green-500'
                        }`}
                      >
                        Step 1
                      </h6>
                      <p
                        id="steptext"
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          isFirstStep
                            ? 'text-black'
                            : 'text-green-500'
                        }`}
                      >
                        Select Type
                      </p>
                    </div>
                  </div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      isSecondStep
                        ? 'text-white  bg-gray-900'
                        : isLastStep || isComplete
                          ? 'text-white bg-green-500'
                          : 'text-white  bg-gray-300'
                    } rounded-full place-items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                      ></path>
                    </svg>
                    <div className="absolute bottom-[3.5rem] lg:-bottom-[4.5rem] w-max text-center">
                      <h6
                        className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal ${
                          isSecondStep
                            ? 'text-gray-900 '
                            : isLastStep || isComplete
                              ? 'text-green-500'
                              : 'text-gray-300 '
                        }`}
                      >
                        Step 2
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          isSecondStep
                            ? 'text-gray-900 '
                            : isLastStep || isComplete
                              ? 'text-green-500'
                              : 'text-gray-300 '
                        }`}
                      >
                        Fill Out Information
                      </p>
                    </div>
                  </div>
                  <div
                    className={`relative z-10 grid w-10 h-10 font-bold transition-all duration-300  ${
                      isLastStep
                        ? 'text-white  bg-gray-900'
                        : isComplete
                          ? 'text-white  bg-green-500'
                          : 'text-white bg-gray-300'
                    } rounded-full place-items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                      ></path>
                    </svg>
                    <div className="absolute bottom-[3.5rem] lg:-bottom-[4.5rem] w-max text-center">
                      <h6
                        className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal ${
                          isLastStep
                            ? 'text-black'
                            : isComplete
                              ? 'text-green-500'
                              : 'text-gray-300'
                        }`}
                      >
                        Step 3
                      </h6>
                      <p
                        className={`lg:block hidden font-sans text-base antialiased font-normal leading-relaxed  ${
                          isLastStep
                            ? 'text-black'
                            : isComplete
                              ? 'text-green-500'
                              : 'text-gray-300'
                        }`}
                      >
                        Confirm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {step}
              {errors.root && <p>{errors.root.message}</p>}
              {!isComplete && (
                <div
                  className={`w-full gap-5 sm:gap-10 flex items-center justify-center sm:justify-end text-end`}
                >
                  {!isFirstStep && (
                    <Button
                      onClick={back}
                      type="button"
                      varient="secondary"
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    varient="default"
                  >
                    {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit':  'Next'}
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
