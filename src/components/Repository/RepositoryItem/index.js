import React from "react";
import { Mutation } from "react-apollo";
import REPOSITORY_FRAGMENT from "../fragments";
import Link from "../../Link";
import Button from "../../Button";

import { STAR_REPOSITORY, UNSTAR_REPOSITORY } from "../mutations";

const updateAddStar = (
  client,
  {
    data: {
      addStar: {
        starrable: { id, viewerHasStarred }
      }
    }
  }
) =>
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: getUpdatedStarData(client, id, viewerHasStarred)
  });

const updateRemoveStar = (
  client,
  {
    data: {
      removeStar: {
        starrable: { id, viewerHasStarred }
      }
    }
  }
) => {
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: getUpdatedStarData(client, id, viewerHasStarred)
  });
};

const getUpdatedStarData = (client, id, viewerHasStarred) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT
  });

  let { totalCount } = repository.stargazers;
  totalCount = viewerHasStarred ? totalCount + 1 : totalCount - 1;

  return {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount
    }
  };
};

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
    <div>
      <div>
        <Link href={url}>{name}</Link>
      </div>
    </div>
    <div>
      {!viewerHasStarred ? (
        <Mutation
          mutation={STAR_REPOSITORY}
          variables={{ id }}
          update={updateAddStar}
        >
          {(addStar, { data, loading, error }) => (
            <Button white onClick={addStar}>
              {stargazers.totalCount} Star
            </Button>
          )}
        </Mutation>
      ) : (
        <span>
          {
            <Mutation
              mutation={UNSTAR_REPOSITORY}
              variables={{ id }}
              update={updateRemoveStar}
            >
              {(removeStar, { data, loading, error }) => (
                <Button white onClick={removeStar}>
                  {stargazers.totalCount} Unstar
                </Button>
              )}
            </Mutation>
          }
        </span>
      )}
    </div>
    <div>
      <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
      <div>
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
