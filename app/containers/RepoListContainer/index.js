/**
 *
 * RepoListContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import RepoList from 'components/RepoList';

import injectReducer from 'utils/injectReducer';
import { selectRepos } from './selectors';
import reducer from './reducer';

export const RepoListContainer = ({
  repos,
}) => (
  <div>
    <RepoList
      repos={repos}
    />
  </div>
);

RepoListContainer.propTypes = {
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

RepoListContainer.defaultProps = {
  repos: [],
};

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: 'repoListContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(RepoListContainer);
