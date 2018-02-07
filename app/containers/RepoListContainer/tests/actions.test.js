
import {
  getLatestSha,
  getLatestShaSuccess,
  getLatestShaError,
} from '../actions';
import {
  GET_LATEST_SHA,
  GET_LATEST_SHA_SUCCESS,
  GET_LATEST_SHA_ERROR,
} from '../constants';

describe('RepoListContainer actions', () => {
  describe('GetLatestSha', () => {
    it('has a type of GET_LATEST_SHA', () => {
      const name = 'test';
      const expected = {
        type: GET_LATEST_SHA,
        name,
      };
      expect(getLatestSha(name)).toEqual(expected);
    });
  });

  describe('GetLatestShaSuccess', () => {
    it('has a type of GET_LATEST_SHA_SUCCESS', () => {
      const name = 'test';
      const response = 'response';

      const expected = {
        type: GET_LATEST_SHA_SUCCESS,
        name,
        response,
      };
      expect(getLatestShaSuccess(name, response)).toEqual(expected);
    });
  });

  describe('GetLatestShaError', () => {
    it('has a type of GET_LATEST_SHA_ERROR', () => {
      const error = 'Some error';
      const name = 'test';

      const expected = {
        type: GET_LATEST_SHA_ERROR,
        name,
        error,
      };
      expect(getLatestShaError(name, error)).toEqual(expected);
    });
  });
});
