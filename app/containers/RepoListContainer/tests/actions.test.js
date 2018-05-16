
import {
  getRepoDetails,
  getRepoDetailsSuccess,
  getRepoDetailsError,

  getRepoBranches,
  getRepoBranchesSuccess,
  getRepoBranchesError,

  setSelectedBranch,
} from '../actions';
import {
  GET_REPO_DETAILS,
  GET_REPO_DETAILS_SUCCESS,
  GET_REPO_DETAILS_ERROR,

  GET_REPO_BRANCHES,
  GET_REPO_BRANCHES_SUCCESS,
  GET_REPO_BRANCHES_ERROR,

  SET_SELECTED_BRANCH,
} from '../constants';

describe('RepoListContainer actions', () => {
  /* getRepoDetails */
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

  /* getRepoBranches */
  describe('getRepoBranches', () => {
    it('has a type of GET_REPO_BRANCHES', () => {
      const name = 'test';
      const expected = {
        type: GET_REPO_BRANCHES,
        name,
      };
      expect(getRepoBranches(name)).toEqual(expected);
    });
  });

  describe('getRepoBranchesSuccess', () => {
    it('has a type of GET_REPO_BRANCHES_SUCCESS', () => {
      const name = 'test';
      const branches = [
        {
          name: 'staging',
          commit: {
            sha: '0246991e7e11b3ef20e7d43a6ca6d32b4fb42059',
            url: 'testUrl',
          },
        },
      ];

      const expected = {
        type: GET_REPO_BRANCHES_SUCCESS,
        name,
        branches,
      };
      expect(getRepoBranchesSuccess(name, branches)).toEqual(expected);
    });
  });

  describe('getRepoDetailsError', () => {
    it('has a type of GET_REPO_BRANCHES_ERROR', () => {
      const error = 'Some error';
      const name = 'test';

      const expected = {
        type: GET_REPO_BRANCHES_ERROR,
        name,
        error,
      };
      expect(getRepoBranchesError(name, error)).toEqual(expected);
    });
  });
  /* setSelectedBranch */
  describe('setSelectedBranch', () => {
    it('has a type of SET_SELECTED_BRANCH', () => {
      const name = 'test';
      const branch = 'testBranch';
      const expected = {
        type: SET_SELECTED_BRANCH,
        name,
        branch,
      };
      expect(setSelectedBranch(name, branch)).toEqual(expected);
    });
  });
});
