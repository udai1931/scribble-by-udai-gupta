import React from "react";

import { Input, Select, Textarea, ActionDropdown } from "neetoui";

import Button from "common/Button";

function Form({
  handleSubmit,
  loading,
  title,
  desc,
  setTitle,
  setDesc,
  handleClose,
}) {
  return (
    <div className="flex justify-center">
      <div className="form-wrapper w-5/12 p-2 text-gray-600">
        <div className="m-2 mb-4 flex justify-between">
          <Input
            label="Article Title"
            placeholder="Enter Title"
            className="mr-1 w-3/6 text-xs font-bold"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Select
            placeholder="Select Category"
            className="ml-1 w-2/6"
            size="small"
            label="Category"
            isSearchable
          />
        </div>
        <Textarea
          label="Article Body"
          placeholder="Enter body for the article"
          rows={14}
          className="w-100 m-2"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <div className="m-2 flex">
          <ActionDropdown
            disabled={loading}
            label="Save Draft"
            onClick={handleSubmit}
            size="large"
            style="bg-indigo-600"
            className="rounded-md bg-indigo-600 text-white"
          >
            <li onClick={e => handleSubmit(e, "Published")}>Publish Article</li>
          </ActionDropdown>
          <Button
            title="Cancel"
            bgColor="white"
            color="black"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
