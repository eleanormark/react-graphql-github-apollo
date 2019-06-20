import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import Loading from "../Loading";
import ErrorMessage from "../Error";

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

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

const GET_QUERY_REPOS = gql`
  query ($queryString: String!)
  {
    search(query: $queryString, type: REPOSITORY, last: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            descriptionHTML
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            updatedAt
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => (
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

export default Profile;
