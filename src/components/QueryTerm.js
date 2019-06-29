import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import RepositoryList, { REPOSITORY_FRAGMENT } from "./Repository";
import Loading from "./Loading";
import ErrorMessage from "./Error";

const GET_REPOSITORIES_OF_QUERY = gql`
  query($queryString: String!) {
    search(type: REPOSITORY, query: $queryString, last: 10) {
      edges {
        node {
          ...repository
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const QueryTerm = ({ queryString }) => (
  <Query
    query={GET_REPOSITORIES_OF_QUERY}
    variables={{
      queryString
    }}
    skip={queryString === ""}
  >
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { search } = data;

      if (loading && !search) {
        return <Loading />;
      }
      return <RepositoryList loading={loading} repositories={search} />;
    }}
  </Query>
);

export default QueryTerm;
