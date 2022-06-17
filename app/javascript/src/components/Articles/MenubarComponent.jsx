import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";
import Input from "common/Input.jsx";

import { MENUBAR_ITEMS } from "./constants";

function MenubarComponent({
  articlesCount,
  categories = [],
  setCategories,
  selectedTab,
  setSelectedTab,
}) {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isCreateCollapsed, setIsCreateCollapsed] = useState(true);
  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const addNewCategory = async () => {
    try {
      const res = await categoriesApi.create({ name: newCategory });
      setCategories([...categories, res.data.category]);
      setNewCategory("");
      setIsCreateCollapsed(prev => !prev);
    } catch (err) {
      logger.error(err);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MenuBar showMenu title="Articles" className="articles-menubar">
      {MENUBAR_ITEMS.map(item => (
        <MenuBar.Block
          key={item}
          label={item}
          count={
            item === "All"
              ? articlesCount?.Draft + articlesCount?.Published
              : articlesCount[item]
          }
          active={item === selectedTab}
          onClick={() => setSelectedTab(item)}
        />
      ))}

      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => setIsSearchCollapsed(prev => !prev),
          },
          {
            icon: Plus,
            onClick: () => setIsCreateCollapsed(prev => !prev),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>

      <MenuBar.Search
        collapse={isSearchCollapsed}
        onCollapse={() => {
          setSearch("");
          setIsSearchCollapsed(true);
        }}
        placeholder="Search Category"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Input
        collapse={!isCreateCollapsed}
        value={newCategory}
        setValue={setNewCategory}
        handleSubmit={addNewCategory}
      />

      <div className="categories-container">
        {filteredCategories.length > 0 &&
          filteredCategories.map(category => (
            <MenuBar.Block
              key={category.id}
              label={category.name}
              count={category.count}
              active={category.id === selectedTab}
              onClick={() => setSelectedTab(category.id)}
            />
          ))}
      </div>
    </MenuBar>
  );
}

export default MenubarComponent;
