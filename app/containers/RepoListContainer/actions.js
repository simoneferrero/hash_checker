/*
 *
 * RepoListContainer actions
 *
 */

import {
  GET_LATEST_SHA,
  GET_LATEST_SHA_SUCCESS,
  GET_LATEST_SHA_ERROR,
} from './constants';

export const getLatestSha = (name) => (
  {
    type: GET_LATEST_SHA,
    name,
  }
);

export const getLatestShaSuccess = (name, response) => (
  {
    type: GET_LATEST_SHA_SUCCESS,
    name,
    response,
  }
);

export const getLatestShaError = (name, error) => (
  {
    type: GET_LATEST_SHA_ERROR,
    name,
    error,
  }
);
