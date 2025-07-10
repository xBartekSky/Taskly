import { CiSettings } from "react-icons/ci";
import { ToDoTask } from "./ToDoTask";
import { ToDoButton } from "./ToDoButton";
import { useState } from "react";
import { ToDoInput } from "./ToDoInput";
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const ToDoBox = ({ title, id, lists, setLists }) => {
  const [isAddTask, setIsAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [openSettings, setOpenSettings] = useState(false);

  const currentList = lists.find((list) => list.id === id);
  const tasks = currentList ? currentList.tasks : [];

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;

    return true;
  });

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      completed: false,
    };

    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        return { ...list, tasks: [...list.tasks, newTask] };
      }
      return list;
    });

    setLists(updatedLists);

    setTaskTitle("");
    setTaskDescription("");
    setIsAddTask(false);
  };
  const handleDelete = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    localStorage.setItem("todo", JSON.stringify(updatedLists));
  };

  const handleCancel = () => {
    setIsAddTask(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="relative w-4/5 lg:w-1/5 p-1 flex flex-col items-center gap-5 rounded-md border border-transparent hover:border-[#565656] transition">
      <div className="w-full flex h-10">
        <div className="w-full h-full flex items-center gap-5">
          <p className="lg:text-3xl">{title}</p>
          <p className="lg:text-xl">{tasks.length} zadań</p>
        </div>
        <div className="w-full h-full flex justify-end items-center">
          {openSettings ? (
            <div className="absolute top-10 right-0 z-10 bg-[#4a4a4a] rounded-md p-2 shadow-md w-40">
              <ToDoButton
                label="Usuń liste"
                color="#ffb300"
                icon={CiBoxList}
                onClick={() => handleDelete(id)}
              />
            </div>
          ) : (
            <></>
          )}
          <button onClick={() => setOpenSettings(!openSettings)}>
            <CiSettings
              size={25}
              className="hover:text-[#ffb300] transition duration-300 ease-in-out"
            />
          </button>
        </div>
      </div>
      <div className="w-[95%] lg:w-[95%] flex flex-col lg:flex-row lg:min-h-10 flex-wrap gap-5">
        <ToDoButton
          label="Wszystkie"
          color="#ffb300"
          icon={CiBoxList}
          onClick={() => setFilter("all")}
        />
        <ToDoButton
          label="Ukończone"
          color="#ffb300"
          icon={IoMdCheckmarkCircleOutline}
          onClick={() => setFilter("completed")}
        />
        <ToDoButton
          label="Nieukończone"
          color="#ffb300"
          icon={IoMdCloseCircleOutline}
          onClick={() => setFilter("incomplete")}
        />
      </div>

      {filteredTasks.map((task) => (
        <ToDoTask
          key={task.id}
          task={task}
          listId={id}
          lists={lists}
          setLists={setLists}
        />
      ))}

      {!isAddTask ? (
        <ToDoButton
          label="Dodaj zadanie"
          color="#ffb300"
          onClick={() => setIsAddTask(true)}
        />
      ) : (
        <div className="w-full bg-[#565656] rounded-md p-2">
          <div className="w-full flex flex-col gap-2">
            <ToDoInput
              placeholder="Wprowadź nazwę zadania"
              value={taskTitle}
              onchange={(e) => setTaskTitle(e.target.value)}
            />
            <span className="w-full h-1 bg-yellow-500" />
            <ToDoInput
              placeholder="Wprowadź opis zadania"
              value={taskDescription}
              onchange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-3 mt-2">
            <ToDoButton
              label="Dodaj"
              icon={IoMdDoneAll}
              onClick={handleAddTask}
            />
            <ToDoButton label="Anuluj" icon={MdCancel} onClick={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
};
