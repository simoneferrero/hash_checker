import { createSelector } from 'reselect';

import createSelectorWithDynamicArgs from 'utils/createSelectorWithDynamicArgs';
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

const selectRepo = (repoName) => createSelectorWithDynamicArgs(
  selectRepos(),
  (repos) => repos.find((repo) => repo.name === repoName),
);

const selectBranch = (repoName) => createSelector(
  selectRepo(repoName),
  ({ branches, selectedBranch }) => branches.find((branch) => branch.name === selectedBranch),
);

export {
  selectBranch,
  selectRepoListContainerDomain,
  selectRepos,
  selectRepo,
};
