import React from "react";

import { Check } from "neetoicons";

function Input({ collapse, value, setValue, handleSubmit }) {
  return (
    <>
      {collapse && (
        <div className="h-9 w-58 shadow mb-2 flex items-center bg-white px-2 ">
          <input
            type="text"
            className="outline-none w-58 py-2"
            placeholder="Enter Category"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Check className="ml-auto cursor-pointer" onClick={handleSubmit} />
        </div>
      )}
    </>
  );
}

export default Input;
