import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import redirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";
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
  const authToken = getFromLocalStorage("authToken");
  const expiry = String(getFromLocalStorage("expiry") || "");
  const currentTime = String(new Date().getTime());
  const isLoggedIn =
    authToken && expiry && expiry.localeCompare(currentTime) === 1;

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders(setLoading);
    fetchRedirections();
  }, []);

  if (!isLoggedIn) {
    return <EnterPassword />;
  }

  const fetchRedirections = async () => {
    try {
      const res = await redirectionsApi.list();
      setRedirections([...res.data.redirections]);
    } catch (err) {
      logger.error(err);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ToastContainer />
      <Router>
        {/* <Navbar /> */}
        <Switch>
          {redirections.map(({ from, to, id }) => (
            <Redirect key={id} exact from={from} to={to} />
          ))}
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/create" component={CreateArticle} />
          <Route exact path="/articles/:slug" component={EUI} />
          <Route exact path="/articles/edit/:slug" component={EditArticle} />
          <Route exact path="/login" component={EnterPassword} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
