import InputField from "@/components/form-field";

export function AddPromotionStep3({
  startDate,
  endDate,
  register,
  errors,
  
}) {
  return (
    <div className="transition-all duration-500">
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
