/*
 *
 * RepoListContainer actions
 *
 */

import {
  GET_LATEST_SHA,
  GET_LATEST_SHA_SUCCESS,
  GET_LATEST_SHA_ERROR,

  GET_REPO_DETAILS,
  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,

  GET_REPO_BRANCHES,
  GET_REPO_BRANCHES_SUCCESS,
  GET_REPO_BRANCHES_ERROR,
} from './constants';

/* getLatestHash */
export const getLatestHash = (name) => (
  {
    type: GET_LATEST_SHA,
    name,
  }
);

export const getLatestHashSuccess = (name, response) => (
  {
    type: GET_LATEST_SHA_SUCCESS,
    name,
    response,
  }
);

export const getLatestHashError = (name, error) => (
  {
    type: GET_LATEST_SHA_ERROR,
    name,
    error,
  }
);

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
