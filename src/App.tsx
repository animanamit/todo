import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListView } from "./list-view.component";
import { NavLink } from "react-router-dom";
import FocusView from "./focus-view.component";
import useLocalStorage from "./use-local-storage";

type Task = {
  label: string;
  id: string;
  isComplete: boolean;
};

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>([], "tasks");

  return (
    <BrowserRouter>
      <div className="text-center flex flex-col bg-lime-200 h-screen">
        <Routes>
          <Route
            path="/"
            element={<ListView tasks={tasks} setTasks={setTasks} />}
          />
          {/* <Route
            path="/list"
            element={<ListView tasks={tasks} setTasks={setTasks} />}
          /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
