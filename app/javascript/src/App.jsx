import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import Navbar from "common/Navbar";
import Articles from "components/Articles";
import CreateArticle from "components/CreateArticle";
import EUI from "components/EUI";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerIntercepts();
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <div>Welcome to scribble app</div>}
          />
          <Route exact path="/articles/create" component={CreateArticle} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/:slug" component={EUI} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
