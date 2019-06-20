import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Profile from "../Profile";
import QUERY from '../Query';

import * as routes from '../constants/routes';



function App() {
  useEffect(() => {
    console.log("hello from console");
  }, []);

  return (
    <Router>
    <div className="App">
      <div className="App-main">
        <Route
          exact
          path={routes.Query}
          component={() => (
            <div className="App-content_large-header">
              <Query />
            </div>
          )}
        />
        <Route
          exact
          path={routes.PROFILE}
          component={() => (
            <div className="App-content_small-header">
              <Profile />
            </div>
          )}
        />
      </div>
    </div>
  </Router>
  );
}

export default App;
