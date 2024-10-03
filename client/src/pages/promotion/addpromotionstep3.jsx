import InputField from '@/components/form-field';
import { CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export function AddPromotionStep3({
  promotionType,
  register,
  errors,
  handleFileChange,
  watch,
  photo,
  setPhoto,
}) {
  

  const startDate = watch('startDate');
  const minEndDate = startDate
    ? startDate
    : new Date().toISOString().split('T')[0];

  return (
    <div className="transition-all duration-500">
      <CardTitle className="text-center pb-10">
        {promotionType == 1 ? (
          <span>Discount By Percentage</span>
        ) : promotionType == 3 ? (
          <span>Discount on Amount</span>
        ) : (
          `No Type Selected ${promotionType}`
        )}
      </CardTitle>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <div className=" inline-block">
            <InputField
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
          <div className="flex flex-row justify-start items-center gap-5">
            <p className=" text-sm font-medium">Photo</p>

            <div className="">
              <label
                htmlFor="file-upload"
                className="bg-blue-500 text-sm text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
              >
                Upload Photo
              </label>
            </div>
            <input
              type="file"
              name="photo"
              className="hidden"
              label={'Photo'}
              id="file-upload"
              onChange={(e) => {
                setPhoto(e.target.files[0]); // Save the selected file to state
                handleFileChange(e); // Call additional logic (e.g., converting to base64, etc.)
              }}
            />
          </div>
          <div>
            <div className="flex items-center">
              <div className="inline-block border">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="promotion"
                    className=" h-40"
                  />
                ) : (
                  <img
                    src="https://placehold.co/600x400/D3D3D3/000000?text=No+Image+Selected"
                    alt="promotion"
                    className="h-40 w-60"
                  />
                )}
              </div>
              <div
                onClick={() => setPhoto(null)}
                className=" ml-10 py-1 px-3  border-red border-2 rounded-md inline-block cursor-pointer text-sm text-red"
              >
                Clear
              </div>
            </div>
            {errors.photo && (
              <div className="mt-2 text-sm text-red-500">
                {errors.photo.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
