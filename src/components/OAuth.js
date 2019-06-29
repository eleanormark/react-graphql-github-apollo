import React, { useEffect, useState } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./App";
import STATUS from "../constants/status";
import styled from "styled-components";

const CLIENT_ID = "77b186da15071bff9c3e";
const REDIRECT_URI = "https://starquest.herokuapp.com/";
const GITHUB_BASE_URL = "https://api.github.com/graphql";
const cache = new InMemoryCache();

const Login = styled.div`
  background-color: #24292e;
  padding: 1em;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -1em;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  width: 150px;
  text-align: center;
  a {
    text-decoration: none;
    color: white;
  }
`;

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  request: operation => {
    const token = localStorage.getItem("github_token");
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  },
  cache
});

const OAuth = () => {
  const [status, setStatus] = useState(STATUS.INITIAL);

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let code = params.get("code");

    if (code) {
      fetch(`https://starquest21.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          if (token) {
            localStorage.setItem("github_token", token);
            setStatus(STATUS.FINISHED_LOADING);
          }
        });
    }
  });

  return (
    <ApolloProvider client={client}>
      <div>
        {status !== STATUS.FINISHED_LOADING && (
          <Login>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}`}
            >
              Login with Github
            </a>
          </Login>
        )}
        {status === STATUS.FINISHED_LOADING && client !== undefined && <App />}
      </div>
    </ApolloProvider>
  );
};
export default OAuth;
