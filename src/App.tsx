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
      <div className="text-center flex flex-col justify-center items-center">
        <blockquote className="text-2xl font-semibold italic text-center  text-gray-900">
          People underestimate what they can do in a year and over estimate
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
            <span className="relative text-white">
              what they can do in a day
            </span>
          </span>
        </blockquote>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
