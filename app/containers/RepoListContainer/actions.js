/*
 *
 * RepoListContainer actions
 *
 */

import {
  GET_REPO_DETAILS,
  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,

  GET_REPO_BRANCHES,
  GET_REPO_BRANCHES_SUCCESS,
  GET_REPO_BRANCHES_ERROR,

  SET_SELECTED_BRANCH,
} from './constants';

/* getRepoDetails */
export const getRepoDetails = (name) => (
  {
    type: GET_REPO_DETAILS,
    name,
  }
);

export const getRepoDetailsSuccess = (name, details) => (
  {
    type: GET_REPO_DETAILS_SUCCESS,
    name,
    details,
  }
);

export const getRepoDetailsError = (name, error) => (
  {
    type: GET_REPO_DETAILS_ERROR,
    name,
    error,
  }
);

/* getRepoBranches */
export const getRepoBranches = (name) => (
  {
    type: GET_REPO_BRANCHES,
    name,
  }
);

export const getRepoBranchesSuccess = (name, branches) => (
  {
    type: GET_REPO_BRANCHES_SUCCESS,
    name,
    branches,
  }
);

export const getRepoBranchesError = (name, error) => (
  {
    type: GET_REPO_BRANCHES_ERROR,
    name,
    error,
  }
);

/* setSelectedBranch */
export const setSelectedBranch = (name, branch) => (
  {
    type: SET_SELECTED_BRANCH,
    name,
    branch,
  }
);
