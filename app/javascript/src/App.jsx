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
import redirectionsApi from "apis/redirections";
import sitedetailsApi from "apis/sitedetails";
import { initializeLogger } from "common/logger";
import PrivateRoute from "common/PrivateRoute";
import Articles from "components/Articles";
import CreateArticle from "components/CreateArticle";
import EditArticle from "components/EditArticle";
import EnterPassword from "components/EnterPassword";
import EUI from "components/EUI";
import Home from "components/Home";
import Settings from "components/Settings";

import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);
  const [siteDetails, setSiteDetails] = useState({});
  const authToken = getFromLocalStorage("authToken");
  const expiry = String(getFromLocalStorage("expiry"));
  const currentTime = String(new Date().getTime());
  const isLoggedIn =
    siteDetails?.status === false ||
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
      const res = await sitedetailsApi.show();
      setSiteDetails(res.data.details);
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
            <EnterPassword isLoggedIn={isLoggedIn} name={siteDetails.name} />
          </Route>
          {redirections.map(({ from, to, id }) => (
            <Redirect key={id} exact from={from} to={to} />
          ))}
          <PrivateRoute
            exact
            condition={isLoggedIn}
            path="/"
            component={Home}
          />
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
        </Switch>
      </Router>
    </>
  );
};

export default App;
