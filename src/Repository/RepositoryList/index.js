import React from 'react';

import RepositoryItem from '../RepositoryItem';


const RepositoryList = ({ repositories }) =>
  repositories.edges.map(({ node }) => (
    <div key={node.id} >
      <RepositoryItem {...node} />
      <br />
    </div>
  ));

export default RepositoryList;