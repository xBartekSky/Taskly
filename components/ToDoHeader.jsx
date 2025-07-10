import { PiNotepadBold } from "react-icons/pi";

export const ToDoHeader = () => {
  return (
    <div className="w-full bg-[#565656] h-16 shadow-lg flex justify-center">
      <div className="w-4/5  h-full flex items-center justify-center gap-2">
        <PiNotepadBold size={40} color="#ffb300" />
        <p className="no-underline text-[#ffb300] text-3xl font-bold">Taskly</p>
      </div>
    </div>
  );
};
