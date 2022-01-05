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
      <h4>Test</h4>
      <input
        value={label}
        onChange={(e) => handleLabelChange(e)}
        onKeyPress={(e) => handleNewTaskKeyPress(e)}
      />
      <button onClick={handleClearTasks}>Clear</button>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
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
