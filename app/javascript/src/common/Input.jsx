import React from "react";

import { Check, Close } from "neetoicons";

function Input({ collapse, setCollapse, value, setValue, handleSubmit }) {
  const handleEscAndEnterKeyDown = event => {
    if (event.key === "Enter") {
      handleSubmit();
    } else if (event.key === "Escape") {
      setValue("");
      setCollapse(true);
    }
  };

  return (
    <>
      {collapse && (
        <div className="h-9 w-58 shadow mb-2 flex items-center bg-white px-2 ">
          <input
            type="text"
            className="outline-none w-full py-2"
            placeholder="Enter Category"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleEscAndEnterKeyDown}
          />
          <Check
            size={32}
            className="ml-auto cursor-pointer"
            onClick={handleSubmit}
          />
          <Close
            size={32}
            className="ml-auto cursor-pointer  border-l-2 pl-2"
            onClick={() => setCollapse(true)}
          />
        </div>
      )}
    </>
  );
}

export default Input;
