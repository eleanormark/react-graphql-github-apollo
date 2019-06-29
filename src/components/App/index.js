import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation";
import QueryTerm from "../QueryTerm";
import StarredRepos from "../StarredRepos";

import * as routes from "../../constants/routes";
import styled from "styled-components";
import { device } from "../../constants/device";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const ContainerMain = styled.div`
  flex: 1;
`;

const ContainerContent = styled.div`
  margin-top: 84px;
  margin-left: 20px;
  @media ${device.screenM} {
    margin-top: 240px;
  }
  a {
    text-decoration: none;
    color: #0366d6;
  }
`;

function App() {
  const [queryString, setQueryString] = useState("elixer");

  return (
    <Router>
      <Container>
        <Navigation queryString={queryString} setQuerySearch={setQueryString} />
        <ContainerMain>
          <Route
            exact
            path={routes.QUERY_TERM}
            component={() => (
              <ContainerContent>
                <QueryTerm queryString={queryString} />
              </ContainerContent>
            )}
          />
          <Route
            exact
            path={routes.STARRED_REPOS}
            component={() => (
              <ContainerContent>
                <StarredRepos />
              </ContainerContent>
            )}
          />
        </ContainerMain>
      </Container>
    </Router>
  );
}

export default App;
