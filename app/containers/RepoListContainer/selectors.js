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

const selectRepos = () => createSelector(
  selectRepoListContainerDomain,
  (state) => state.get('repos').toJS(),
);

const selectSingleRepo = (name) => createSelector(
  selectRepoListContainerDomain,
  (state) => {
    const repos = state.get('repos').toJS();
    const repoIndex = repos.findIndex((repo) => (repo.name === name));

    return state.getIn(['repos', repoIndex]).toJS();
  },
);

export {
  selectRepoListContainerDomain,
  selectRepos,
  selectSingleRepo,
};
