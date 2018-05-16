
import { fromJS } from 'immutable';

import {
  getRepoDetailsSuccess,
  getRepoDetailsError,

  getRepoBranchesSuccess,
  getRepoBranchesError,

  setSelectedBranch,
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

  it('handles getRepoDetailsSuccess correctly', () => {
    const name = 'test1';
    const defaultBranch = 'staging';

    const details = {
      default_branch: defaultBranch,
    };

    const expectedResult = state
      .setIn(['repos', 0, 'defaultBranch'], defaultBranch)
      .setIn(['repos', 0, 'selectedBranch'], defaultBranch);
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

  it('handles setSelectedBranch correctly', () => {
    const name = 'test1';
    const branch = 'testBranch';

    const expectedResult = state.setIn(['repos', 0, 'selectedBranch'], branch);
    expect(repoListContainerReducer(state, setSelectedBranch(name, branch))).toEqual(expectedResult);
  });
});
