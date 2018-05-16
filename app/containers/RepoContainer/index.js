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

import { isEqual } from 'lodash';

import DeployedHash from 'components/DeployedHash';
import LatestHash from 'components/LatestHash';
import RepoDetails from 'components/RepoDetails';

import {
  getSelectedBranch,
  getRepo,
} from 'containers/RepoListContainer/selectors';
import {
  getRepoBranches,

  getRepoDetails,

  setSelectedBranch,
} from 'containers/RepoListContainer/actions';
import injectSaga from 'utils/injectSaga';
import {
  branchType,
  repoType,
 } from 'types';

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

  shouldComponentUpdate = (nextProps) => !isEqual(this.props, nextProps)

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
  branch: branchType,
  name: PropTypes.string.isRequired,
  onChangeBranch: PropTypes.func.isRequired,
  onLoadGetRepoBranches: PropTypes.func.isRequired,
  onLoadGetRepoDetails: PropTypes.func.isRequired,
  repo: repoType.isRequired,
};

RepoContainer.defaultProps = {
  name: '',
  onChangeBranch: () => {},
  onLoadGetRepoBranches: () => {},
  onLoadGetRepoDetails: () => {},
  repo: {},
};

const mapStateToProps = (state, props) => createStructuredSelector({
  branch: getSelectedBranch(props.name),
  repo: getRepo(props.name),
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
