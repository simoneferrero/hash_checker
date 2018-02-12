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
  selectSingleRepo,
} from 'containers/RepoListContainer/selectors';
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
      name,
    } = this.props;
    onLoadGetLatestSha(name);
  }

  render() {
    const {
      name,
      repo,
    } = this.props;

    return (
      <div className={styles.repoContainer}>
        <div>{ name }</div>
        <div><LatestSha latest={repo.latest} /></div>
      </div>
    );
  }
}

RepoContainer.propTypes = {
  name: PropTypes.string.isRequired,
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

const mapStateToProps = (state, props) => createStructuredSelector({
  repo: selectSingleRepo(props.name),
});

const mapDispatchToProps = (dispatch) => (
  {
    onLoadGetLatestSha: (name) => dispatch(getLatestSha(name)),
  }
);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'repoContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(RepoContainer);
