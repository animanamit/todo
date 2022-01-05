import { nanoid } from "nanoid";
import { useState, ChangeEvent, KeyboardEvent } from "react";
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

  return (
    <div>
      <span className="block text-sm font-medium text-gray-700">
        Add a new task
      </span>
      <input
        value={label}
        onChange={(e) => handleLabelChange(e)}
        onKeyPress={(e) => handleNewTaskKeyPress(e)}
        style={{ width: "20rem" }}
        className="mt-1 max-w-xs px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
      <button onClick={handleClearTasks}>Clear</button>
      <div>
        {tasks.map((task) => (
          <div className="m-1 p-1" key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleTaskCompleteChange(task)}
            />
            <span className="text-lg text-black font-semibold">
              {task.label}
            </span>
            <button
              className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              onClick={() => handleTaskDelete(task)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
