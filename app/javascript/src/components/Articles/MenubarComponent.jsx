import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { MENUBAR_ITEMS } from "./constants";

function MenubarComponent({
  articlesCount,
  categories = [],
  selectedTab,
  setSelectedTab,
}) {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [search, setSearch] = useState("");

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
            onClick: () => setIsSearchCollapsed(prev => !prev),
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

      <div className="overflow-y-auto">
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
