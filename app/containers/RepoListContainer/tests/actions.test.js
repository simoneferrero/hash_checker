
import {
  getLatestHash,
  getLatestHashSuccess,
  getLatestHashError,

  getRepoDetails,
  getRepoDetailsSuccess,
  getRepoDetailsError,
} from '../actions';
import {
  GET_LATEST_SHA,
  GET_LATEST_SHA_SUCCESS,
  GET_LATEST_SHA_ERROR,

  GET_REPO_DETAILS,
  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,
} from '../constants';

describe('RepoListContainer actions', () => {
  /* getLatestHash */
  describe('getLatestHash', () => {
    it('has a type of GET_LATEST_SHA', () => {
      const name = 'test';
      const expected = {
        type: GET_LATEST_SHA,
        name,
      };
      expect(getLatestHash(name)).toEqual(expected);
    });
  });

  describe('getLatestHashSuccess', () => {
    it('has a type of GET_LATEST_SHA_SUCCESS', () => {
      const name = 'test';
      const response = 'response';

      const expected = {
        type: GET_LATEST_SHA_SUCCESS,
        name,
        response,
      };
      expect(getLatestHashSuccess(name, response)).toEqual(expected);
    });
  });

  describe('getLatestHashError', () => {
    it('has a type of GET_LATEST_SHA_ERROR', () => {
      const error = 'Some error';
      const name = 'test';

      const expected = {
        type: GET_LATEST_SHA_ERROR,
        name,
        error,
      };
      expect(getLatestHashError(name, error)).toEqual(expected);
    });
  });

  /* getrepoDetails */
  describe('getRepoDetails', () => {
    it('has a type of GET_REPO_DETAILS', () => {
      const name = 'test';
      const expected = {
        type: GET_REPO_DETAILS,
        name,
      };
      expect(getRepoDetails(name)).toEqual(expected);
    });
  });

  describe('getRepoDetailsSuccess', () => {
    it('has a type of GET_REPO_DETAILS_SUCCESS', () => {
      const name = 'test';
      const details = {
        default_branch: 'staging',
      };

      const expected = {
        type: GET_REPO_DETAILS_SUCCESS,
        name,
        details,
      };
      expect(getRepoDetailsSuccess(name, details)).toEqual(expected);
    });
  });

  describe('getRepoDetailsError', () => {
    it('has a type of GET_REPO_DETAILS_ERROR', () => {
      const error = 'Some error';
      const name = 'test';

      const expected = {
        type: GET_REPO_DETAILS_ERROR,
        name,
        error,
      };
      expect(getRepoDetailsError(name, error)).toEqual(expected);
    });
  });
});
