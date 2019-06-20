import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation";
import QueryTerm from "../QueryTerm";
import StarredRepos from "../StarredRepos";

import * as routes from "../constants/routes";

function App() {
  useEffect(() => {
    console.log("hello from console");
  }, []);

  const [queryString, setQueryString] = useState("elixer");

  return (
    <Router>
      <div className="App">
        <Navigation queryString={queryString} setQuerySearch={setQueryString} />
        <br />
        <div className="App-main">
          <Route
            exact
            path={routes.QUERY_TERM}
            component={() => (
              <div className="App-content_large-header">
                <QueryTerm queryString={queryString} />
              </div>
            )}
          />
          <Route
            exact
            path={routes.STARRED_REPOS}
            component={() => (
              <div className="App-content_small-header">
                <StarredRepos />
              </div>
            )}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
