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
      name,
      onChangeBranch,
      repo,
    } = this.props;

    const {
      branches,
      selectedBranch,
    } = repo;

    // TODO: this needs to use selector -> currently selector is broken
    const branch = branches.find((item) => item.name === selectedBranch);

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
