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

import RepoDetails from 'components/RepoDetails';
import DeployedHash from 'components/DeployedHash';

import {
  selectBranch,
  selectSingleRepo,
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
        <td>{ branch.commit.sha }</td>
        <td><DeployedHash deployed={repo.latest} /></td>
      </tr>
    );
  }
}

RepoContainer.defaultProps = {
  branch: {
    name: '',
    commit: {
      sha: '',
      url: '',
    },
  },
};

RepoContainer.propTypes = {
  branch: PropTypes.shape({
    name: PropTypes.string.isRequired,
    commit: PropTypes.shape({
      sha: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  onChangeBranch: PropTypes.func.isRequired,
  onLoadGetRepoBranches: PropTypes.func.isRequired, // TODO: change horrible names
  onLoadGetRepoDetails: PropTypes.func.isRequired,
  repo: PropTypes.shape({
    branches: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        commit: PropTypes.shape({
          sha: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    latest: PropTypes.shape({
      date: PropTypes.string,
      sha: PropTypes.string,
    }),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  branch: selectBranch(props.name, props.selectedBranch),
  repo: selectSingleRepo(props.name),
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
