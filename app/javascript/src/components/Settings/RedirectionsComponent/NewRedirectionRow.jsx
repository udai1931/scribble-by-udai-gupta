import React from "react";

import { Check } from "neetoicons";
import { Input } from "neetoui";

function NewRedirectionRow({ value, setValue, handleSubmit }) {
  return (
    <div className="flex h-16 w-full flex-row items-center justify-between bg-white px-4">
      <div className="w-2/6">
        <Input
          placeholder="https://scribble.com"
          value={value?.from}
          onChange={e => setValue({ ...value, from: e.target.value })}
        />
      </div>
      <div className="w-2/6">
        <Input
          placeholder="https://scribble.com"
          value={value?.to}
          onChange={e => setValue({ ...value, to: e.target.value })}
        />
      </div>
      <div className="w-1/6 text-right">
        <Check className="ml-auto cursor-pointer" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default NewRedirectionRow;
