import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./App";
import "./App/style.css";
import "semantic-ui-css/semantic.min.css";
import STATUS from "./constants/status";
import { Loading as LoadingAuth } from "gitstar-components";

const CLIENT_ID = "1f9bd52cc8095599320d";
const REDIRECT_URI = "http://localhost:3000/";
const GITHUB_BASE_URL = "https://api.github.com/graphql";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }

  if (networkError) {
    console.log("networkError", networkError);
  }
});

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
  errorLink,
  cache
});

class OAuth extends Component {
  state = {
    status: STATUS.INITIAL,
    token: null
  };

  componentDidMount() {
    let params = new URL(document.location).searchParams;
    let code = params.get("code");

    if (code) {
      this.setState({ status: STATUS.LOADING });
      fetch(`https://starquest999.herokuapp.com/authenticate/${code}`)
        .then(response => response.json())
        .then(({ token }) => {
          if (token) {
            localStorage.setItem("github_token", token);
          }
          this.setState({
            token,
            status: STATUS.FINISHED_LOADING
          });
        });
    }
  }
  render() {
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
              <LoadingAuth 
                status={this.state.status}
                callback={() => {
                  if (this.props.status !== STATUS.AUTHENTICATED) {
                    this.setState({
                      status: STATUS.AUTHENTICATED
                    });
                  }
                }}
              />
            </div>
          }
          {this.state.status === STATUS.AUTHENTICATED && <App />}
        </div>
      </ApolloProvider>
    );
  }
}
export default OAuth;
