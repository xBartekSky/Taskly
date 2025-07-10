export const ToDoInput = ({ placeholder, onchange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onchange}
      className="bg-[#565656]  h-10 rounded-md focus:border-2 focus:border-[#ffb300] focus:outline-none p-2 w-full"
    />
  );
};
