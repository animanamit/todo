import { nanoid } from "nanoid";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// import Task from "./task.component";

type ListViewProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type Task = {
  label: string;
  id: string;
  isComplete: boolean;
};

export const ListView = ({ tasks, setTasks }: ListViewProps) => {
  //   const [tasks, setTasks] = useState<Task[]>([]);

  const [label, setLabel] = useState("");

  function handleLabelChange(e: ChangeEvent<HTMLInputElement>) {
    setLabel((label) => e.target.value);
  }

  function handleNewTaskKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && label !== "") {
      console.log("added task");
      setTasks((tasks) => [
        { label: label, id: nanoid(), isComplete: false },
        ...tasks,
      ]);
      setLabel("");
    }
  }
  const handleTaskCompleteChange =
    (changingTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === changingTask.id) {
            return { ...task, isComplete: e.target.checked };
          } else return task;
        });
      });
    };

  function handleClearTasks() {
    setTasks((tasks) => tasks.filter((task) => task.isComplete === false));
  }

  function handleTaskDelete(deleteTask: Task) {
    setTasks((tasks) => tasks.filter((task) => task.id !== deleteTask.id));
  }

  const animatedTask = {
    hidden: { opacity: 0, y: -100 },
    show: { opacity: 1, y: 0 },
    remove: { opacity: 0 },
  };

  return (
    <div className="bg-slate-50 w-fit p-20 m-auto rounded-2xl">
      <span className="block text-sm font-medium text-gray-700">
        Add a new task
      </span>
      <input
        value={label}
        onChange={(e) => handleLabelChange(e)}
        onKeyPress={(e) => handleNewTaskKeyPress(e)}
        style={{ width: "20rem" }}
        className="mt-1 max-w-xs px-3 py-2 bg-white border border-gray-500 rounded-md text-sm shadow-sm placeholder-gray-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
      />

      <div>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              variants={animatedTask}
              initial="hidden"
              animate="show"
              exit="remove"
              //   whileHover={{ scale: 1.2, rotate: 90 }}
              //   whileTap={{
              //     scale: 0.8,
              //     rotate: -90,
              //     borderRadius: "100%",
              //   }}
              className="m-3 pt-3 pb-3 shadow-md rounded-2xl"
              key={task.id}
            >
              <input
                type="checkbox"
                // className="h-3 w-3  rounded-md appearance-none bg-red-400 checked:bg-lime-500"
                className="h-3 w-3"
                checked={task.isComplete}
                onChange={handleTaskCompleteChange(task)}
              />
              <span className="text-lg text-black font-semibold m-3">
                {task.label}
              </span>
              <button
                className="px-4 py-1 text-sm text-slate-200 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                onClick={() => handleTaskDelete(task)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        className="px-4 py-1 m-3 text-sm font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        onClick={handleClearTasks}
      >
        Clear Completed Tasks
      </button>
    </div>
  );
};
