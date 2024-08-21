import InputField from '@/components/form-field';
import { CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export function AddPromotionStep2({
  promotionType,
  storeName,
  discountAmount,
  discountPercentage,
  applicableItems: applicableItems,
  qualifyingPurchaseAmount,
  description,
  handleChange,
  addItem,
  removeItem,
  handleItemChange,
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
      <div className="grid pb-4 gap-4">
        <InputField
          label={'Store Name'}
          className={`border-solid border-2`}
          type="text"
          name="storeName"
          register={register}
          id="inputField"
          errors={errors}
        />
      </div>

      {promotionType == 1 ? (
        <div>
          <div className="grid pb-4 gap-4">
            <InputField
              label="Discount Percentage"
              type="number"
              register={register}
              name="discountPercentage"
              errors={errors}

              // Max is only relevant for discountPercentage
            />
          </div>
          <div className=" pb-4 gap-4">
            <div className="text-sm font-medium pb-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Applicable Items
            </div>
            {applicableItems.map((item, index) => (
              <div className='w-full flex gap-5 items-center' key={index}>
                <input
                  type="text"
                  className="flex h-9  rounded-md border border-input bg-transparent px-3 py-1 text-sm mb-3 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register(`applicableItems.${index}`, {
                    required: true,
                    onChange: (e) =>
                      handleItemChange(
                        index,
                        e.target.value,
                        1,
                      ),
                  })}
                  name={`applicableItems[${index}]`}
                />
{applicableItems.length != 1 ? <button
                  type="button"
                  onClick={() => removeItem(index, 1)}
                  className='inline-block'
                >
                  Remove
                </button>: ""}
                
                <span className="text-sm text-red-500">
                  {errors.applicableItems &&
                    errors.applicableItems[index] && (
                      <p>
                        {
                          errors.applicableItems[index]
                            .message
                        }
                      </p>
                    )}
                </span>
              </div>
            ))}
            <button
            className='p-2'
              type="button"
              onClick={() => addItem(1)}
            >
              Add Item
            </button>
          </div>
        </div>
      ) : (
        <div>
          <InputField
            label={'Qualifying Purchase Amount'}
            type="number"
            register={register}
            name="qualifyingPurchaseAmount"
            errors={errors}
          />

          <InputField
            label={'Discount Amount'}
            type="number"
            register={register}
            name="discountAmount"
            className={`border-solid border-2`}
            errors={errors}
          />
        </div>
      )}

      <div>
        <InputField
          label={'Description'}
          type="text"
          name="description"
          register={register}
          className={`border-solid border-2`}
          errors={errors}
        />
      </div>
      <div className="h-5"></div>
    </div>
  );
}
