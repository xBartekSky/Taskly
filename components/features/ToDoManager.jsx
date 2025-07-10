import { ToDoBox } from "../ToDoBox";

export const ToDoManager = ({ lists, setLists, children }) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start gap-5 p-5 flex-wrap">
      {lists.length === 0 ? (
        <p className="text-gray-400">Brak list</p>
      ) : (
        lists.map((list) => (
          <ToDoBox
            key={list.id}
            id={list.id}
            title={list.title}
            tasks={list.tasks}
            lists={lists}
            setLists={setLists}
          />
        ))
      )}
      {children}
    </div>
  );
};
