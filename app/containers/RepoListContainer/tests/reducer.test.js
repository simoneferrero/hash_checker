
import { fromJS } from 'immutable';

import {
  getLatestHashSuccess,
  getLatestHashError,
} from '../actions';
import repoListContainerReducer from '../reducer';

describe('RepoListContainer reducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      repos: [
        {
          name: 'test1',
        },
        {
          name: 'test2',
        },
      ],
    });
  });

  it('returns the initial state', () => {
    expect(repoListContainerReducer(state, {})).toEqual(state);
  });

  it('handles getLatestHashSuccess correctly', () => {
    const date = '2018-02-05T15:40:23Z';
    const name = 'test1';
    const sha = '93b02ffd52c069fa21bc0c919405278ab0758ce5';

    const response = {
      sha,
      commit: {
        author: {
          date,
        },
      },
    };

    const latest = {
      date,
      sha,
    };

    const expectedResult = state.setIn(['repos', 0, 'latest'], fromJS(latest));
    expect(repoListContainerReducer(state, getLatestHashSuccess(name, response))).toEqual(expectedResult);
  });

  it('handles getLatestHashError correctly', () => {
    const name = 'test1';
    const error = 'Some error';

    const latest = {
      error,
    };

    const expectedResult = state.setIn(['repos', 0, 'latest'], fromJS(latest));
    expect(repoListContainerReducer(state, getLatestHashError(name, error))).toEqual(expectedResult);
  });
});
