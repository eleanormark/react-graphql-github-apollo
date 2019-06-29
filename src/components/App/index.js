import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation";
import QueryTerm from "../QueryTerm";
import StarredRepos from "../StarredRepos";

import * as routes from "../../constants/routes";
import "./style.css";
import { Container } from "semantic-ui-react";

function App() {
  const [queryString, setQueryString] = useState("elixer");

  return (
    <Router>
      <div className="App">
        <Navigation queryString={queryString} setQuerySearch={setQueryString} />
        <Container className="App-main">
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
        </Container>
      </div>
    </Router>
  );
}

export default App;
