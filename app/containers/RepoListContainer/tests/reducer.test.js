
import { fromJS } from 'immutable';

import {
  getLatestHashSuccess,
  getLatestHashError,

  getRepoDetailsSuccess,
  getRepoDetailsError,

  getRepoBranchesSuccess,
  getRepoBranchesError,
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

  it('handles getRepoDetailsSuccess correctly', () => {
    const name = 'test1';
    const defaultBranch = 'staging';

    const details = {
      default_branch: defaultBranch,
    };

    const expectedResult = state.setIn(['repos', 0, 'defaultBranch'], defaultBranch);
    expect(repoListContainerReducer(state, getRepoDetailsSuccess(name, details))).toEqual(expectedResult);
  });

  it('handles getRepoDetailsError correctly', () => {
    const name = 'test1';
    const error = 'Some error';

    const expectedResult = state.setIn(['repos', 0, 'error'], error);
    expect(repoListContainerReducer(state, getRepoDetailsError(name, error))).toEqual(expectedResult);
  });

  it('handles getRepoBranchesSuccess correctly', () => {
    const name = 'test1';
    const branches = [
      {
        name: 'staging',
        commit: {
          sha: '0246991e7e11b3ef20e7d43a6ca6d32b4fb42059',
          url: 'testUrl',
        },
      },
    ];

    const expectedResult = state.setIn(['repos', 0, 'branches'], branches);
    expect(repoListContainerReducer(state, getRepoBranchesSuccess(name, branches))).toEqual(expectedResult);
  });

  it('handles getRepoBranchesError correctly', () => {
    const name = 'test1';
    const error = 'Some error';

    const expectedResult = state.setIn(['repos', 0, 'error'], error);
    expect(repoListContainerReducer(state, getRepoBranchesError(name, error))).toEqual(expectedResult);
  });
});
