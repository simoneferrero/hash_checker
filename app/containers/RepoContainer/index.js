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
import DeployedSha from 'components/DeployedSha';

import {
  selectSingleRepo,
} from 'containers/RepoListContainer/selectors';
import {
  getLatestSha,
} from 'containers/RepoListContainer/actions';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import styles from './styles.css';

export class RepoContainer extends React.PureComponent {
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
      <tr className={styles.repoContainer}>
        <td>{ name }</td>
        <td><LatestSha latest={repo.latest} /></td>
        <td><DeployedSha deployed={repo.latest} /></td>
      </tr>
    );
  }
}

RepoContainer.propTypes = {
  name: PropTypes.string.isRequired,
  onLoadGetLatestSha: PropTypes.func.isRequired,
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
    onLoadGetLatestSha: (name) => dispatch(getLatestSha(name)),
  }
);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'repoContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(RepoContainer);
