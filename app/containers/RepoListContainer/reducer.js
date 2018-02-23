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
  GET_LATEST_SHA_SUCCESS,
  GET_LATEST_SHA_ERROR,

  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,

  GET_REPO_BRANCHES_SUCCESS,
  GET_REPO_BRANCHES_ERROR,
} from './constants';

const initialState = fromJS({
  repos: GIT_REPOS.map((repo) => (
    {
      name: repo,
      branches: [],
      latest: {
        error: null,
      },
    }
  )),
});

function repoListContainerReducer(state = initialState, action) {
  switch (action.type) {
    /* GET_LATEST_SHA */
    case GET_LATEST_SHA_SUCCESS: {
      const {
        name,
        response,
      } = action;

      // TODO: export this to separate helper function and test
      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      const latest = {
        date: response.commit.author.date,
        sha: response.sha,
      };

      return state
        .setIn(['repos', repoIndex, 'latest'], fromJS(latest));
    }
    case GET_LATEST_SHA_ERROR: {
      const {
        name,
        error,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      const latest = {
        error,
      };

      return state
        .setIn(['repos', repoIndex, 'latest'], fromJS(latest));
    }

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
        .setIn(['repos', repoIndex, 'defaultBranch'], details.default_branch);
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

    default:
      return state;
  }
}

export default repoListContainerReducer;
