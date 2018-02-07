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
} from './constants';

const initialState = fromJS({
  repos: GIT_REPOS.map((repo) => (
    {
      name: repo,
    }
  )),
});

function repoListContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LATEST_SHA_SUCCESS: {
      const {
        name,
        response,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      repos[repoIndex].latest = {
        date: response.commit.author.date,
        sha: response.sha,
      };
      return state
        .set('repos', fromJS(repos));
    }
    case GET_LATEST_SHA_ERROR: {
      const {
        name,
        error,
      } = action;

      const repos = state.get('repos').toJS();
      const repoIndex = repos.findIndex((repo) => (repo.name === name));

      repos[repoIndex].latest = {
        error,
      };
      return state
        .set('repos', fromJS(repos));
    }
    default:
      return state;
  }
}

export default repoListContainerReducer;
