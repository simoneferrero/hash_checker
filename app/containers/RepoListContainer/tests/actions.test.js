
import {
  getLatestHash,
  getLatestHashSuccess,
  getLatestHashError,
} from '../actions';
import {
  GET_LATEST_SHA,
  GET_LATEST_SHA_SUCCESS,
  GET_LATEST_SHA_ERROR,
} from '../constants';

describe('RepoListContainer actions', () => {
  describe('GetLatestHash', () => {
    it('has a type of GET_LATEST_SHA', () => {
      const name = 'test';
      const expected = {
        type: GET_LATEST_SHA,
        name,
      };
      expect(getLatestHash(name)).toEqual(expected);
    });
  });

  describe('GetLatestHashSuccess', () => {
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

  describe('GetLatestHashError', () => {
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
});
