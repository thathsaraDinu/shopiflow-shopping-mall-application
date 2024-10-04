import { getShops } from '@/api/shop.api';
import InputField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { useEffect } from 'react';
import { useState } from 'react';

export function AddPromotionStep2({
  promotionType,
  register,
  errors,
  shops,
  loading,
  promotion,
}) {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close

  const handleToggle = (e) => {
    setIsOpen(!isOpen);
    setValue('storeName', e.target.value);
    console.log('e', e.target.value);
  };

  return (
    <div className="flex flex-col gap-10 transition-all duration-500 ease-in-out">
      <CardTitle className="text-base font-semibold text-gray-800 text-center">
        {promotionType == 1 ? (
          <span>Discount By Percentage</span>
        ) : promotionType == 3 ? (
          <span>Discount on Amount</span>
        ) : (
          `No Type Selected ${promotionType}`
        )}
        {console.log('shops', shops)}
      </CardTitle>
      <div className='flex flex-col gap-5 transition-all duration-500 ease-in-out"'>
        <div className="text-sm flex flex-col gap-2">
          <label
            htmlFor="storeSelect"
            className="text-sm font-medium"
          >
            Store Name
          </label>
          <div className="relative flex w-full max-w-md transition duration-300 ease-in-out">
            <div className="h-2 "></div>
            <select
              defaultValue={
                promotion ? promotion.storeName : ''
              }
              onClick={handleToggle}
              onBlur={() => setIsOpen(false)}
              className=" appearance-none focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black border w-full shadow-sm  rounded-md px-4 py-2 bg-white text-sm"
              id="storeSelect"
              {...register('storeName', {
                required: 'Store name is required',
              })}
            >
              <option value="">Select a store</option>
              {!loading && shops.length > 0 ? (
                shops.map((shop) => (
                  <option key={shop.name} value={shop.name}>
                    {shop.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {loading
                    ? 'Loading stores...'
                    : 'No stores available'}
                </option>
              )}
            </select>
            <div
              className={`absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#808080"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </div>
          </div>
          {errors.storeName && (
            <p className="text-red">
              {errors.storeName.message}
            </p>
          )}
        </div>
        {/* <div className="">
            <InputField
              label={'Store Name'}
              type="text"
              name="storeName"
              register={register}
              id="inputField"
              errors={errors}
            />
          </div> */}

        {promotionType == 1 ? (
          <div>
            <InputField
              defaultValue={
                promotion
                  ? promotion.discountPercentage
                  : ''
              }
              label="Discount Percentage"
              type="number"
              register={register}
              name="discountPercentage"
              errors={errors}
              // Max is only relevant for discountPercentage
            />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="">
              <InputField
                defaultValue={
                  promotion
                    ? promotion.qualifyingPurchaseAmount
                    : ''
                }
                label={'Qualifying Purchase Amount'}
                type="number"
                register={register}
                name="qualifyingPurchaseAmount"
                errors={errors}
              />
            </div>
            <div className="">
              <InputField
                defaultValue={
                  promotion ? promotion.discountAmount : ''
                }
                label={'Discount Amount'}
                type="number"
                register={register}
                name="discountAmount"
                errors={errors}
              />
            </div>
          </div>
        )}

        <div>
          <InputField
            defaultValue={
              promotion ? promotion.description : ''
            }
            label={'Description'}
            type="textArea"
            name="description"
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
