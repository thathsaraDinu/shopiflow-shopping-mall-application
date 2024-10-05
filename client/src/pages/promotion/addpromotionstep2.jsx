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
  setShopId,
  setValue,
  loggedInShopId,
}) {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown open/close
  setValue(
    'storeName',
    shops.find((shop) => shop._id === loggedInShopId).name,
  );
  setShopId(loggedInShopId ? loggedInShopId : '');

  

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
        <div className="  w-full  transition duration-300 ease-in-out">
          <InputField
            defaultValue={
              promotion ? promotion.promoTitle : ''
            }
            type="text"
            name="promoTitle"
            label={'Promotion Title'}
            errors={errors}
            register={register}
          />
        </div>
        {errors.promoName && (
          <p className="text-red">
            {errors.promoTitle.message}
          </p>
        )}
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
