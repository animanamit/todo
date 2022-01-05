import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

const Task = () => {
  const [label, setLabel] = useState("");

  function handleLabelChange(e: ChangeEvent<HTMLInputElement>) {
    setLabel((label) => e.target.value);
  }
  return (
    <div>
      <input value={label} onChange={(e) => handleLabelChange(e)} />
    </div>
  );
};

export default Task;
