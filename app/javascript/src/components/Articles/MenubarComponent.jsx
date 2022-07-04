import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";
import Input from "common/Input.jsx";
import { startCase } from "utils/changeCase";

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

  const createCategory = async () => {
    try {
      const res = await categoriesApi.create({ name: newCategory });
      setCategories([res.data.category, ...categories]);
      setNewCategory("");
      setIsCreateCollapsed(prev => !prev);
    } catch (err) {
      logger.error(err);
    }
  };

  const handleEscKeyDown = event => {
    if (event.key === "Escape") {
      setSearch("");
      setIsSearchCollapsed(true);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MenuBar showMenu title="Articles" className="articles-menubar">
      {MENUBAR_ITEMS.map(item => (
        <MenuBar.Block
          key={item}
          label={startCase(item)}
          count={
            item === "All"
              ? articlesCount?.draft + articlesCount?.published
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
        onKeyDown={handleEscKeyDown}
      />
      <Input
        collapse={!isCreateCollapsed}
        setCollapse={setIsCreateCollapsed}
        value={newCategory}
        setValue={setNewCategory}
        handleSubmit={createCategory}
      />
      <div className="categories-container">
        {filteredCategories.map(category => (
          <MenuBar.Block
            key={category.value}
            label={category.label}
            count={category.count}
            active={category.value === selectedTab}
            onClick={() => setSelectedTab(category.value)}
          />
        ))}
      </div>
    </MenuBar>
  );
}

export default MenubarComponent;
