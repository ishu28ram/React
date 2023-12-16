import React from "react";

const Checkboxes = ({ id, name, state, onChange }) => {
  return (
    <div>
      <input type="checkbox" id={id} checked={state} onChange={onChange} />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default Checkboxes;
