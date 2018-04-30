import { createSelector } from 'reselect';

import createSelectorWithDynamicArgs from 'utils/createSelectorWithDynamicArgs';
/**
 * Direct selector to the repoListContainer state domain
 */
const getRepoListContainer = (state) => state.get('repoListContainer');

/**
 * Other specific selectors
 */
const getAllRepos = () => createSelector(
  getRepoListContainer,
  (state) => state.get('repos').toJS(),
);

const getRepo = (repoName) => createSelectorWithDynamicArgs(
  getAllRepos(),
  (repos) => repos.find((repo) => repo.name === repoName),
);

const getSelectedBranch = (repoName) => createSelectorWithDynamicArgs(
  getRepo(repoName),
  ({ branches, selectedBranch }) => branches.find((branch) => branch.name === selectedBranch),
);

export {
  getAllRepos,
  getRepo,
  getRepoListContainer,
  getSelectedBranch,
};
