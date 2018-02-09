/**
 *
 * RepoContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LatestSha from 'components/LatestSha';

import {
  getLatestSha,
} from 'containers/RepoListContainer/actions';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import styles from './styles.css';

export class RepoContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount = () => {
    const {
      onLoadGetLatestSha,
      repo,
    } = this.props;
    onLoadGetLatestSha(repo.name);
  }

  render() {
    const {
      latest,
      name,
    } = this.props.repo;

    return (
      <div className={styles.repoContainer}>
        <div>{ name }</div>
        <div><LatestSha latest={latest} /></div>
      </div>
    );
  }
}

RepoContainer.propTypes = {
  onLoadGetLatestSha: PropTypes.func.isRequired,
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    latest: PropTypes.shape({
      date: PropTypes.string.isRequired,
      sha: PropTypes.string.isRequired,
    }),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  repocontainer: () => {},
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoadGetLatestSha: (name) => dispatch(getLatestSha(name)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'repoContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(RepoContainer);
