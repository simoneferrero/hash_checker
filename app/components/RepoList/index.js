/**
*
* RepoList
*
*/

import React from 'react';
import PropTypes from 'prop-types';

const RepoList = ({
  repos,
}) => (
  <ul>
    { repos.map((repo) => <li>{ repo.name }</li>) }
  </ul>
);

RepoList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      latest: PropTypes.shape({
        date: PropTypes.string.isRequired,
        sha: PropTypes.string.isRequired,
      }),
      error: PropTypes.string,
    }),
  ).isRequired,
};

export default RepoList;
