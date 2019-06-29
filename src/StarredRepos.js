import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import Loading from "../Loading";
import ErrorMessage from "../Error";

const GET_STAR_REPOSITORIES_BY_CURRENT_USER = gql`
  {
    viewer {
      starredRepositories(first: 10) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const STARRED_REPOS = () => (
  <Query query={GET_STAR_REPOSITORIES_BY_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.starredRepositories} />;
    }}
  </Query>
);

export default STARRED_REPOS;
