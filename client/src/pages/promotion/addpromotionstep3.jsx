import InputField from "@/components/form-field";
import { CardTitle } from "@/components/ui/card";

export function AddPromotionStep3({
  promotionType,
  register,
  errors,
  
}) {
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
      <div></div>
      <div>
        <InputField
          type="date"
          name="startDate"
          className="w-100"
          label={'Start Date'}
          errors={errors}
          register={register}
        />
      </div>

      <div>
        <InputField
          type="date"
          name="endDate"
          className="w-100"
          label={'End Date'}
          errors={errors}
          register={register}
        />
      </div>
    </div>
  );
}
