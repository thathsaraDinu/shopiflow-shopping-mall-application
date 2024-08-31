import InputField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export function AddPromotionStep2({
  promotionType,
  fields,
  addItem,
  removeItem,
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
            {fields.map((item, index) => (
              <div
                id={`applicableItems.${index}`}
                className="w-full flex gap-5 items-center"
                key={index}
              >
                <InputField
                  type="text"
                  register={register}
                  name={`applicableItems[${index}]`}
                />

                {fields.length != 1 ? (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      removeItem(index, 1);
                    }}
                    className="inline-block"
                  >
                    Remove
                  </Button>
                ) : (
                  ''
                )}

                <span className="text-sm text-red-500">
                  {errors.applicableItems ? (
                    errors.applicableItems[index] ? (
                      <p>
                        {
                          errors.applicableItems[index]
                            .message
                        }
                      </p>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </span>
              </div>
            ))}
            <Button
              className="mt-3"
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => addItem(1)}
            >
              Add Item
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="pb-4">
            <InputField
              label={'Qualifying Purchase Amount'}
              type="number"
              register={register}
              name="qualifyingPurchaseAmount"
              errors={errors}
            />
          </div>
          <div>
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
