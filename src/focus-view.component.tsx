import { nanoid } from "nanoid";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type FocusViewProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

type Task = {
  label: string;
  id: string;
  isComplete: boolean;
};

const FocusView = ({ tasks, setTasks }: FocusViewProps) => {
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
      <p>test</p>
      <div>
        <input
          value={label}
          onChange={(e) => handleLabelChange(e)}
          onKeyPress={(e) => handleNewTaskKeyPress(e)}
        />
        <button onClick={handleClearTasks}>Clear</button>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={handleTaskCompleteChange(task)}
            />
            {task.label}
            <button onClick={() => handleTaskDelete(task)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusView;
