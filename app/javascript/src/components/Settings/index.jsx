import React from "react";

import { Route, Switch } from "react-router-dom";

import CategoriesSettings from "./CategoriesSettings";
import GeneralSettings from "./GeneralSettings";
import MenubarComponent from "./MenubarComponent";
import RedirectionsComponent from "./RedirectionsComponent";

function Settings() {
  return (
    <div className="flex">
      <MenubarComponent />
      <div className="component-container flex w-full justify-center">
        <Switch>
          <Route
            exact
            path="/settings/redirections"
            component={RedirectionsComponent}
          />
          <Route
            exact
            path="/settings/categories"
            component={CategoriesSettings}
          />
          <Route exact path="/settings" component={GeneralSettings} />
        </Switch>
      </div>
    </div>
  );
}

export default Settings;
