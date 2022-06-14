import React, { useState } from "react";

import { Settings, Repeat, Seo } from "neetoicons";
import { MenuBar } from "neetoui/layouts";

import MenuLink from "./MenuLink";

function MenubarComponent() {
  const [selectedTab, setSelectedTab] = useState("General");

  return (
    <div className="bg-white" style={{ background: "white" }}>
      <MenuBar
        showMenu
        className="border-r-2 bg-white"
        style={{ backgroundColor: "white" }}
      >
        <MenuLink
          title="General"
          description="Page Title, Brand Name & Meta Description"
          Icon={Settings}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          url="/settings"
        />
        <MenuLink
          title="Redirections"
          description="Create & configure redirections rules"
          Icon={Repeat}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          url="/settings/redirections"
        />
        <MenuLink
          title="Manage categories"
          description="Edit and Reorder KB Structure"
          Icon={Seo}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          url="/settings/categories"
        />
      </MenuBar>
    </div>
  );
}

export default MenubarComponent;
