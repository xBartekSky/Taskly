import { useState, useEffect } from "react";
import { ToDoManager } from "./features/ToDoManager";
import { ToDoAddListForm } from "./features/ToDoAddListForm";
import { ToDoHeader } from "./ToDoHeader";
import { ToDoName } from "./ToDoName";

export const ToDo = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("todo")) || [];
    setLists(storedLists);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="w-screen min-h-screen lg:h-screen bg-[#3a3a3a] flex flex-col items-center">
      <ToDoHeader />
      <ToDoName />
      <ToDoManager lists={lists} setLists={setLists}>
        <ToDoAddListForm lists={lists} setLists={setLists} />
      </ToDoManager>
    </div>
  );
};
