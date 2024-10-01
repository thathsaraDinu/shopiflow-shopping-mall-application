import InputField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';

export function AddPromotionStep2({
  promotionType,
  register,
  errors,
}) {
  return (
    <div className="  transition-all duration-500">
      <CardTitle className="text-center pb-10">
        {promotionType == 1 ? (
          <span>Discount By Percentage</span>
        ) : promotionType == 3 ? (
          <span>Discount on Amount</span>
        ) : (
          `No Type Selected ${promotionType}`
        )}
      </CardTitle>
      <div className="">
        <InputField
          label={'Store Name'}
          type="text"
          name="storeName"
          register={register}
          id="inputField"
          errors={errors}
        />
      </div>

      {promotionType == 1 ? (
        <div>
            <InputField
              label="Discount Percentage"
              type="number"
              register={register}
              name="discountPercentage"
              errors={errors}
              // Max is only relevant for discountPercentage
            />
        </div>
      ) : (
        <div>
          <div className="">
            <InputField
              label={'Qualifying Purchase Amount'}
              type="number"
              register={register}
              name="qualifyingPurchaseAmount"
              errors={errors}
            />
          </div>
          <div className="">
            <InputField
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
          label={'Description'}
          type="textArea"
          name="description"
          register={register}
          errors={errors}
        />
      </div>
      <div className="h-5"></div>
    </div>
  );
}
