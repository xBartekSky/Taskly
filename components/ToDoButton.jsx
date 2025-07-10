import { IoIosAddCircleOutline } from "react-icons/io";

export const ToDoButton = ({
  label = "Dodaj listę",
  onClick,
  icon: Icon = IoIosAddCircleOutline,
  iconSize = 30,
  color,
}) => {
  return (
    <button
      className="group bg-[#565656] flex justify-center items-center gap-2  h-10 rounded-md hover:text-[#ffb300] px-4 py-2 "
      onClick={onClick}
    >
      <Icon
        size={iconSize}
        className="text-[#8d8d8d] group-hover:text-[#ffb300] transition duration-300 ease-in-out"
        color={color}
      />
      <span className="text-[#8d8d8d] group-hover:text-[#ffb300] transition duration-300 ease-in-out">
        {label}
      </span>
    </button>
  );
};
