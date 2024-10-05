import InputField from '@/components/form-field';
import { CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useState } from 'react';

export function AddPromotionStep3({
  promotionType,
  register,
  errors,
  handleFileChange,
  selectedFile,
  watch,
  promotion,
  setValue,
}) {

  const startDate = watch('startDate');
  const minEndDate = startDate
    ? startDate
    : new Date().toISOString().split('T')[0];

  function base64ToFile(base64String, fileName) {
    const byteString = atob(base64String.split(',')[1]); // Remove the `data:image/png;base64,` part if exists
    const mimeType = base64String
      .split(',')[0]
      .match(/:(.*?);/)[1];

    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return new File([blob], fileName, { type: mimeType });
  }

  if (promotion) {
    const file = base64ToFile(promotion.photo, 'photo');
    setValue('photo', file);
  }

  return (
    <div className="transition-all duration-500 flex flex-col gap-10">
      <CardTitle className="text-base font-semibold text-gray-800 text-center">
        {promotionType == 1 ? (
          <span>Discount By Percentage</span>
        ) : promotionType == 3 ? (
          <span>Discount on Amount</span>
        ) : (
          `No Type Selected ${promotionType}`
        )}
      </CardTitle>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between gap-5 flex-wrap">
          <div className=" inline-block">
            <InputField
              defaultValue={
                promotion
                  ? new Date(promotion.startDate)
                      .toISOString()
                      .split('T')[0]
                  : ''
              }
              type="date"
              name="startDate"
              min={new Date().toISOString().split('T')[0]}
              label={'Start Date'}
              errors={errors}
              register={register}
            />
          </div>

          <div className=" inline-block">
            <InputField
              defaultValue={
                promotion
                  ? new Date(promotion.endDate)
                      .toISOString()
                      .split('T')[0]
                  : ''
              }
              disabled={startDate == '' ? true : false}
              type="date"
              name="endDate"
              min={minEndDate}
              label={'End Date'}
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-start flex-wrap items-center gap-8">
            <p className=" text-sm font-medium">
              Promotion Image
            </p>

            <div className="">
              <label
                htmlFor="file-upload"
                className="bg-blue-500 text-sm text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Upload Image
              </label>
            </div>
            <InputField
              type="file"
              name="photo"
              className="hidden"
              id="file-upload"
              register={(name) =>
                register(name, {
                  onChange: handleFileChange, // Handle file input change
                })
              }
            />
          </div>
          <div>
            <div className="flex items-center">
              <div className="  flex flex-col w-full h-[250px]">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : promotion
                        ? promotion.photo
                        : 'https://via.placeholder.com/500?text=No+Image+Selected'
                  }
                  alt="Selected file"
                  className=" h-full w-full object-cover border"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm">
                    {errors.photo.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
