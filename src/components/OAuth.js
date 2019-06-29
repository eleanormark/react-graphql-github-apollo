import React, { useEffect, useState } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./App";
import STATUS from "../constants/status";

const CLIENT_ID = "1f9bd52cc8095599320d";
const REDIRECT_URI = "http://localhost:3000/";
const GITHUB_BASE_URL = "https://api.github.com/graphql";

const cache = new InMemoryCache();

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
      fetch(`https://starquest999.herokuapp.com/authenticate/${code}`)
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
        {
          <div>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}`}
            >
              Login
            </a>
          </div>
        }
        {status === STATUS.FINISHED_LOADING && client !== undefined && <App />}
      </div>
    </ApolloProvider>
  );
};
export default OAuth;
