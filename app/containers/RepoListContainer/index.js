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

import RepoContainer from 'containers/RepoContainer';

import injectReducer from 'utils/injectReducer';
import { selectRepos } from './selectors';
import reducer from './reducer';

import styles from './styles.css';

export const RepoListContainer = ({
  repos,
}) => (
  <div className={styles.repoListContainer}>
    { repos.map((repo) => <RepoContainer key={repo.name} name={repo.name} />) }
  </div>
);

RepoListContainer.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      latest: PropTypes.shape({
        date: PropTypes.string,
        sha: PropTypes.string,
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
