import { createSelector } from 'reselect';

/**
 * Direct selector to the repoListContainer state domain
 */
const selectRepoListContainerDomain = (state) => state.get('repoListContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RepoListContainer
 */
// TODO: change simple selectors to get and function selectors to makeGet
const selectRepos = () => createSelector(
  selectRepoListContainerDomain,
  (state) => state.get('repos').toJS(),
);

const selectSingleRepo = (repoName) => createSelector(
  selectRepoListContainerDomain,
  (state) => {
    const repos = state.get('repos').toJS();
    const selectedRepo = repos.find((repo) => (repo.name === repoName));

    return selectedRepo;
  },
);

const selectBranch = (repoName, branchName) => createSelector(
  selectRepoListContainerDomain,
  (state) => {
    const repos = state.get('repos').toJS();
    const { branches } = repos.find((repo) => (repo.name === repoName));
    const selectedBranch = branches.find((branch) => (branch.name === branchName));

    return selectedBranch;
  },
);

export {
  selectBranch,
  selectRepoListContainerDomain,
  selectRepos,
  selectSingleRepo,
};
