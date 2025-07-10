import { useState, useEffect } from "react";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
  MdDeleteForever,
} from "react-icons/md";

export const ToDoTask = ({ task, listId, lists, setLists }) => {
  const [checked, setChecked] = useState(task.completed);

  useEffect(() => {
    setChecked(task.completed);
  }, [task.completed]);

  const toggleChecked = () => {
    const updatedChecked = !checked;
    setChecked(updatedChecked);

    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.map((t) =>
          t.id === task.id ? { ...t, completed: updatedChecked } : t
        );
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });

    setLists(updatedLists);
    localStorage.setItem("todo", JSON.stringify(updatedLists));
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.filter((t) => t.id !== task.id);
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });

    setLists(updatedLists);
    localStorage.setItem("todo", JSON.stringify(updatedLists));
  };

  return (
    <div
      className="w-[95%] min-h-12 p-3 rounded-md bg-[#565656] flex items-center gap-4 cursor-pointer"
      onClick={toggleChecked}
    >
      {checked ? (
        <MdOutlineRadioButtonChecked className="text-yellow-500 text-2xl" />
      ) : (
        <MdOutlineRadioButtonUnchecked className="text-gray-400 text-2xl" />
      )}
      <div className="flex flex-col w-[90%]">
        <span className={`text-gray-400 ${checked ? "line-through" : ""}`}>
          {task.title}
        </span>
        <span className="text-xs text-gray-400">{task.description}</span>
      </div>
      <div className="flex justify-end">
        <button onClick={handleDelete}>
          <MdDeleteForever size={30} className="hover:text-[#ffb300]" />
        </button>
      </div>
    </div>
  );
};
