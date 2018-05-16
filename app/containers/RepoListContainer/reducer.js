/*
 *
 * RepoListContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GIT_REPOS,
} from 'utils/config';
import {
  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,

  GET_REPO_BRANCHES_SUCCESS,
  GET_REPO_BRANCHES_ERROR,

  SET_SELECTED_BRANCH,
} from './constants';

const initialState = fromJS({
  repos: GIT_REPOS.map((repo) => (
    {
      name: repo,
      branches: [],
      latest: {
        error: null,
      },
      defaultBranch: '',
      selectedBranch: '',
    }
  )),
});

function repoListContainerReducer(state = initialState, action) {
  switch (action.type) {
    /* GET_REPO_DETAILS */
    // TODO: include GET_REPO_DETAILS to use for spinner and update reducer with ui
    case GET_REPO_DETAILS_SUCCESS: {
      const {
        name,
        details,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      return state
        .setIn(['repos', repoIndex, 'defaultBranch'], details.default_branch)
        .setIn(['repos', repoIndex, 'selectedBranch'], details.default_branch);
    }
    case GET_REPO_DETAILS_ERROR: {
      const {
        name,
        error,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      return state
        .setIn(['repos', repoIndex, 'error'], error);
    }

    /* GET_REPO_BRANCHES */
    // TODO: include GET_REPO_BRANCHES to use for spinner and update reducer with ui
    case GET_REPO_BRANCHES_SUCCESS: {
      const {
        name,
        branches,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      return state
        .setIn(['repos', repoIndex, 'branches'], branches);
    }
    case GET_REPO_BRANCHES_ERROR: {
      const {
        name,
        error,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      return state
        .setIn(['repos', repoIndex, 'error'], error);
    }

    /* SET_SELECTED_BRANCH */
    case SET_SELECTED_BRANCH: {
      const {
        name,
        branch,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      return state
      .setIn(['repos', repoIndex, 'selectedBranch'], branch);
    }
    default:
      return state;
  }
}

export default repoListContainerReducer;
