import React from "react";

import { Route, Switch } from "react-router-dom";

import GeneralSettings from "./GeneralSettings";
import MenubarComponent from "./MenubarComponent";

function Settings() {
  return (
    <div className="flex">
      <MenubarComponent />
      <div className="flex w-full justify-center">
        <Switch>
          <Route
            exact
            path="/settings/redirections"
            component={() => <div>redirections Page</div>}
          />
          <Route exact path="/settings/categories">
            <div>categories Page</div>
          </Route>
          <Route exact path="/settings" component={GeneralSettings} />
        </Switch>
      </div>
    </div>
  );
}

export default Settings;
