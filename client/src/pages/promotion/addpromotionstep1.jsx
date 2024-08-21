import { CardTitle } from "@/components/ui/card";

export function AddPromotionStep1({
  promotionType,
  handleChange,
  register,
  errors,
}) {
  return (
    <div
      id="firstpart"
      className="transition-all duration-500 px-3 mb-6 sm:px-10"
    >
      <div className="mt-5 mb-10 flex pt-5 items-center flex-col gap-2">
        <CardTitle>Select a Promotion type</CardTitle>
        <div className="h-6"></div>

        <select
          name="promotionType"
          className="mt-4 px-4 py-3 rounded-lg"
          {...register('promotionType', {
            onChange: (e) => {
              handleChange(e);
              // Update state
            },
          })}
          value={promotionType}
        >
          <option className="px-4 py-3" value={0}>
            Select type
          </option>
          <option value={1} className="p-10">
            Discount Percentage
          </option>

          <option value={3}>Discount on Amount</option>
        </select>
        <div>
          {errors.promotionType && (
            <p>{errors.promotionType.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
