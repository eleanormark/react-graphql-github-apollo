import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import RepositoryList from '../Repository';
import Loading from '../Loading';

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 10
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

const GET_CURRENT_USER_STARRED_REPO = gql`
  {
    viewer {
      login
      starredRepositories(
        last: 10
        ) {
          edges {
            node {
              name
              url
              stargazers {
                totalCount
              }
              descriptionHTML
              primaryLanguage {
                name
              }
              owner {
                login
                url
              }
            }
          }
        }
    }
  }
`;

const Profile = () => (
    <Query query={GET_CURRENT_USER_STARRED_REPO}>
      {({ data, loading }) => {
        const { viewer } = data;
  
        if (loading || !viewer) {
          return <Loading />;
        }
      
        return <RepositoryList repositories={viewer.starredRepositories} />;
      }}
    </Query>
  );

export default Profile;