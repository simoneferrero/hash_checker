/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GIT_COMPANY_NAME,
} from 'utils/config';

import {
  GET_REPO_BRANCHES,

  GET_REPO_DETAILS,
} from 'containers/RepoListContainer/constants';
import {
  getRepoBranchesSuccess,
  getRepoBranchesError,

  getRepoDetailsSuccess,
  getRepoDetailsError,
} from 'containers/RepoListContainer/actions';
import
  repoContainerSaga,
{
  getRepoBranchesSaga,

  getRepoDetailsSaga,
} from '../saga';

const name = 'test1';
const headers = new Headers({
  Authorization: `Bearer ${GITHUB_API_TOKEN}`,
});

const getOpts = {
  method: 'GET',
  credentials: 'same-origin',
  headers,
};

describe('getRepoDetailsSaga', () => {
  let generator;

  beforeEach(() => {
    generator = getRepoDetailsSaga({ name });

    const requestURL = `${GITHUB_API_URL}repos/${GIT_COMPANY_NAME}/${name}`;

    const callDescriptor = generator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL, getOpts));
  });

  it('dispatches getRepoDetailsSuccess if request is successful', () => {
    const defaultBranch = 'staging';
    const response = {
      default_branch: defaultBranch,
    };

    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(getRepoDetailsSuccess(name, response)));
  });

  it('dispatches getRepoDetailsError if request is not successful', () => {
    const response = new Error('Some error');

    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor).toEqual(put(getRepoDetailsError(name, response)));
  });
});

describe('getRepoBranchesSaga', () => {
  let generator;

  beforeEach(() => {
    generator = getRepoBranchesSaga({ name });

    const requestURL = `${GITHUB_API_URL}repos/${GIT_COMPANY_NAME}/${name}/branches`;

    const callDescriptor = generator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL, getOpts));
  });

  it('dispatches getRepoBranchesSuccess if request is successful', () => {
    const response = [
      {
        name: 'test',
        commit: {
          sha: 'abc123d',
          url: 'test.url',
        },
      },
    ];

    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(getRepoBranchesSuccess(name, response)));
  });

  it('dispatches getRepoBranchesError if request is not successful', () => {
    const response = new Error('Some error');

    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor).toEqual(put(getRepoBranchesError(name, response)));
  });
});

describe('repoContainerSaga', () => {
  const generator = repoContainerSaga();

  it('starts watcher', () => {
    const takeEveryDescriptor = generator.next().value;
    expect(takeEveryDescriptor).toEqual([
      takeEvery(GET_REPO_DETAILS, getRepoDetailsSaga),
      takeEvery(GET_REPO_BRANCHES, getRepoBranchesSaga),
    ]);
  });
});
