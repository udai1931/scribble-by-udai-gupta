import React from "react";

import { Route, Switch } from "react-router-dom";

import MenubarComponent from "./MenubarComponent";

function Settings() {
  return (
    <div className="flex">
      <MenubarComponent />
      <Switch>
        <Route
          exact
          path="/settings/redirections"
          component={() => <div>redirections Page</div>}
        />
        <Route exact path="/settings/categories">
          <div>categories Page</div>
        </Route>
        <Route
          exact
          path="/settings"
          component={() => <div>Seetings Page</div>}
        />
      </Switch>
    </div>
  );
}

export default Settings;
