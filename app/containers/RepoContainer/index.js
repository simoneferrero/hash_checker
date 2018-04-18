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

import DeployedHash from 'components/DeployedHash';
import LatestHash from 'components/LatestHash';
import RepoDetails from 'components/RepoDetails';

import {
  selectBranch,
  selectRepo,
} from 'containers/RepoListContainer/selectors';
import {
  getRepoBranches,

  getRepoDetails,

  setSelectedBranch,
} from 'containers/RepoListContainer/actions';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import styles from './styles.css';

export class RepoContainer extends React.PureComponent {
  componentWillMount = () => {
    const {
      name,
      onLoadGetRepoBranches,
      onLoadGetRepoDetails,
    } = this.props;
    onLoadGetRepoDetails(name);
    onLoadGetRepoBranches(name);
  }

  render() {
    const {
      branch,
      name,
      onChangeBranch,
      repo,
    } = this.props;

    return (
      <tr className={styles.repoContainer}>
        <td>
          <RepoDetails
            branches={repo.branches}
            defaultBranch={repo.defaultBranch}
            name={name}
            onChangeBranch={onChangeBranch}
          />
        </td>
        <td>{branch && <LatestHash branch={branch.commit} />}</td>
        <td><DeployedHash deployed={repo.latest} /></td>
      </tr>
    );
  }
}

RepoContainer.propTypes = {
  branch: PropTypes.shape({
    commit: PropTypes.shape({
      sha: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  onChangeBranch: PropTypes.func.isRequired,
  onLoadGetRepoBranches: PropTypes.func.isRequired, // TODO: change horrible names
  onLoadGetRepoDetails: PropTypes.func.isRequired,
  repo: PropTypes.shape({
    branches: PropTypes.arrayOf(
      PropTypes.shape({
        commit: PropTypes.shape({
          sha: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    defaultBranch: PropTypes.string.isRequired,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    latest: PropTypes.shape({
      date: PropTypes.string,
      sha: PropTypes.string,
    }),
    selectedBranch: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  branch: selectBranch(props.name),
  repo: selectRepo(props.name),
});

const mapDispatchToProps = (dispatch) => (
  {
    onChangeBranch: (name, branch) => dispatch(setSelectedBranch(name, branch)),
    onLoadGetRepoBranches: (name) => dispatch(getRepoBranches(name)),
    onLoadGetRepoDetails: (name) => dispatch(getRepoDetails(name)),
  }
);
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'repoContainer', saga });

export default compose(
  withSaga,
  withConnect,
)(RepoContainer);
