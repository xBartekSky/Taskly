import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToDoButton } from "../ToDoButton";
import { ToDoInput } from "../ToDoInput";
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export const ToDoAddListForm = ({ lists, setLists }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");

  const handleClick = () => setIsEdit(true);

  const handleCancel = () => {
    setIsEdit(false);
    setTitle("");
  };

  const handleAddNewList = () => {
    if (!title.trim()) return;

    const newList = {
      id: Date.now(),
      title: title.trim(),
      tasks: [],
    };

    setLists([...lists, newList]);

    setTitle("");
    setIsEdit(false);
  };

  return (
    <div className="lg:w-1/5 w-full h-40 p-10 items-center flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isEdit ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ToDoButton onClick={handleClick} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col gap-5"
          >
            <ToDoInput
              placeholder="Wpisz nazwę listy"
              value={title}
              onchange={(e) => setTitle(e.target.value)}
            />
            <div className="w-full flex gap-10">
              <ToDoButton
                label="Zapisz"
                icon={IoMdDoneAll}
                onClick={handleAddNewList}
              />
              <ToDoButton
                label="Anuluj"
                icon={MdCancel}
                onClick={handleCancel}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
