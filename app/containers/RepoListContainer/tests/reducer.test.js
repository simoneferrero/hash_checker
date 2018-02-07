
import { fromJS } from 'immutable';

import {
  getLatestShaSuccess,
  getLatestShaError,
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

  it('handles getLatestShaSuccess correctly', () => {
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

    const repos = [
      {
        name,
        latest: {
          date,
          sha,
        },
      },
      {
        name: 'test2',
      },
    ];

    const expectedResult = state.set('repos', fromJS(repos));
    expect(repoListContainerReducer(state, getLatestShaSuccess(name, response))).toEqual(expectedResult);
  });

  it('handles getLatestShaError correctly', () => {
    const name = 'test1';
    const error = 'Some error';

    const repos = [
      {
        name,
        latest: {
          error,
        },
      },
      {
        name: 'test2',
      },
    ];

    const expectedResult = state.set('repos', fromJS(repos));
    expect(repoListContainerReducer(state, getLatestShaError(name, error))).toEqual(expectedResult);
  });
});
