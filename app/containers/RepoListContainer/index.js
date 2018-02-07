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

import injectReducer from 'utils/injectReducer';
import { selectRepos } from './selectors';
import reducer from './reducer';

function RepoListContainer() {
  return (
    <div>
    </div>
  );
}

RepoListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'repoListContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(RepoListContainer);
