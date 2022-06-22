import React from "react";

import { Plus } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import { useHistory } from "react-router-dom";

import Button from "common/Button";

function HeaderComponent({
  TABLE_COLUMNS,
  search,
  setSearch,
  unselectedColumns,
  setUnselectedColumns,
  categories,
}) {
  const history = useHistory();

  const toggleColumn = value => {
    setUnselectedColumns(prevState => {
      const index = prevState.indexOf(value);
      if (index === -1) {
        prevState.push(value);
      } else {
        prevState.splice(index, 1);
      }

      return [...prevState];
    });
  };

  const headerActions = () => (
    <>
      <Dropdown
        buttonProps={{
          onClick: function noRefCheck() {},
        }}
        buttonStyle="secondary"
        label="Columns"
        position="bottom-end"
        closeOnSelect={false}
      >
        <Typography style="h4" className="px-2">
          Columns
        </Typography>
        {TABLE_COLUMNS.map(col => (
          <Checkbox
            key={col.key}
            label={col.title}
            className="m-2"
            onChange={() => toggleColumn(col.title)}
            checked={!unselectedColumns.includes(col.title)}
          />
        ))}
      </Dropdown>
      <Button
        disabled={categories.length === 0}
        disabledMsg="Add a Category first"
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
