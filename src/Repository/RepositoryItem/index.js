import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Link from "../../Link";
import Button from "../../Button";

const STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const UN_STAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  viewerHasStarred
}) => (
  <div>
    <div className="RepositoryItem-title">
      <div className="RepositoryItem-title-url">
        <Link href={url}>{name}</Link>
      </div>

      <div className="RepositoryItem-title-action">
        {stargazers.totalCount} Stars
      </div>
    </div>
    <div>
      {!viewerHasStarred ? (
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {(addStar, { data, loading, error }) => (
            <Button className={"RepositoryItem-title-action"} onClick={addStar}>
              {stargazers.totalCount} Star
            </Button>
          )}
        </Mutation>
      ) : (
        <span>
          {
            <Mutation mutation={UN_STAR_REPOSITORY} variables={{ id }}>
              {(removeStar, { data, loading, error }) => (
                <Button
                  className={"RepositoryItem-title-action"}
                  onClick={removeStar}
                >
                  {stargazers.totalCount} Unstar
                </Button>
              )}
            </Mutation>
          }
        </span>
      )}
    </div>
    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
