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

import LatestHash from 'components/LatestHash';
import DeployedHash from 'components/DeployedHash';

import {
  selectSingleRepo,
} from 'containers/RepoListContainer/selectors';
import {
  getLatestHash,

  getRepoDetails,
} from 'containers/RepoListContainer/actions';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import styles from './styles.css';

export class RepoContainer extends React.PureComponent {
  componentWillMount = () => {
    const {
      name,
      onLoadGetLatestHash,
      onLoadGetRepoDetails,
    } = this.props;
    onLoadGetLatestHash(name);
    onLoadGetRepoDetails(name);
  }

  render() {
    const {
      name,
      repo,
    } = this.props;

    return (
      <tr className={styles.repoContainer}>
        <td>{ name }</td>
        <td><LatestHash latest={repo.latest} /></td>
        <td><DeployedHash deployed={repo.latest} /></td>
      </tr>
    );
  }
}

RepoContainer.propTypes = {
  name: PropTypes.string.isRequired,
  onLoadGetLatestHash: PropTypes.func.isRequired,
  onLoadGetRepoDetails: PropTypes.func.isRequired,
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    latest: PropTypes.shape({
      date: PropTypes.string,
      sha: PropTypes.string,
    }),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  repo: selectSingleRepo(props.name),
});

const mapDispatchToProps = (dispatch) => (
  {
    onLoadGetLatestHash: (name) => dispatch(getLatestHash(name)),
    onLoadGetRepoDetails: (name) => dispatch(getRepoDetails(name)),
  }
);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'repoContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(RepoContainer);
