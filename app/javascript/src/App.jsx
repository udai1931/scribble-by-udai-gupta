import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import organizationApi from "apis/organization";
import redirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";
import PrivateRoute from "common/PrivateRoute";
import Analytics from "components/Analytics";
import Articles from "components/Articles";
import CreateArticle from "components/CreateArticle";
import EditArticle from "components/EditArticle";
import EnterPassword from "components/EnterPassword";
import EUI from "components/EUI";
import Settings from "components/Settings";

import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);
  const [organization, setOrganization] = useState({});
  const authToken = getFromLocalStorage("authToken");
  const expiry = String(getFromLocalStorage("expiry"));
  const currentTime = String(new Date().getTime());
  const isLoggedIn =
    organization?.is_password_protected === false ||
    (authToken && expiry && expiry.localeCompare(currentTime) === 1);

  const fetchRedirections = async () => {
    try {
      const res = await redirectionsApi.list();
      setRedirections([...res.data.redirections]);
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchNameAndStatus = async () => {
    try {
      const res = await organizationApi.show();
      setOrganization(res.data.organization);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders();
    fetchRedirections();
    fetchNameAndStatus();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/login">
            <EnterPassword isLoggedIn={isLoggedIn} name={organization.name} />
          </Route>
          {redirections.map(({ from, to, id }) => (
            <Redirect key={id} exact from={from} to={to} />
          ))}
          <PrivateRoute exact condition={isLoggedIn} path="/">
            <Redirect to="/articles" />
          </PrivateRoute>
          <PrivateRoute
            condition={isLoggedIn}
            path="/settings"
            component={Settings}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/articles"
            component={Articles}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/articles/create"
            component={CreateArticle}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/articles/:slug"
            component={EUI}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/articles/edit/:slug"
            component={EditArticle}
          />
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/analytics"
            component={Analytics}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
