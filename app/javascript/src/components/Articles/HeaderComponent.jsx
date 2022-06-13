import React from "react";

import { Plus } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import Button from "common/Button";

function HeaderComponent({ TABLE_COLUMNS, search, setSearch }) {
  const history = useHistory();

  const headerActions = () => (
    <>
      <Dropdown
        buttonProps={{
          onClick: function noRefCheck() {},
        }}
        buttonStyle="bg-indigo-600"
        label="Columns"
        position="bottom-end"
        closeOnSelect={false}
        className="bg-indigo-600"
      >
        <Typography style="h4" className="px-2">
          Columns
        </Typography>
        {TABLE_COLUMNS.map(col => (
          <Checkbox key={col.key} label={col.title} className="m-2" />
        ))}
      </Dropdown>
      <Button
        title="Add New Article"
        icon={<Plus />}
        onClick={() => history.push("/articles/create")}
      />
    </>
  );

  return (
    <Header
      actionBlock={headerActions()}
      searchProps={{
        onChange: e => setSearch(e.target.value),
        value: search,
      }}
      className="articles-header py-1"
    />
  );
}

export default HeaderComponent;
