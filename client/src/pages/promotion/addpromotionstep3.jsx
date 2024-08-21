export function AddPromotionStep3({
  startDate,
  endDate,
  register,
  errors,
  handleChange,
}) {
  return (
    <div className="transition-all duration-500">
      <div></div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          className={`border-solid border-2`}
          value={startDate}
          {...register('startDate', {
            onChange: (e) => {
              handleChange(e);
              // Update state
            },
          })}
        />
        {errors.startDate && (
          <p>{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          className={`border-solid border-2`}
          value={endDate}
          {...register('endDate', {
            onChange: (e) => {
              handleChange(e);
              // Update state
            },
          })}
        />
        {errors.endDate && <p>{errors.endDate.message}</p>}
      </div>
    </div>
  );
}
