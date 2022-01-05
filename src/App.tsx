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
      <nav>
        <NavLink to="/">Focus</NavLink>
        <NavLink to="/list">List</NavLink>
      </nav>
      <h3 className="text-3xl font-bold underline">VIEWS</h3>
      <Routes>
        <Route
          path="/"
          element={<FocusView tasks={tasks} setTasks={setTasks} />}
        />
        <Route
          path="/list"
          element={<ListView tasks={tasks} setTasks={setTasks} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
