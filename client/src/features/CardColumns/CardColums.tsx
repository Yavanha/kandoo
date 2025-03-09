export const CardColumns = () => {
  return (
    <div className=" px-4 h-[calc(100lvh_-_72px)] text-center justify-center flex flex-col items-center">
      <p className="heading-l text-medium-grey mb-6">
        This board is empty. Create a new column to get started.
      </p>
      <button className="bg-primary text-white rounded-full p-4 heading-m">
        + Add New Column
      </button>
    </div>
  );
};
