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
  GIT_DEFAULT_BRANCH,
} from 'utils/config';

import {
  GET_LATEST_SHA,

  GET_REPO_DETAILS,
} from 'containers/RepoListContainer/constants';
import {
  getLatestHashSuccess,
  getLatestHashError,

  getRepoDetailsSuccess,
  getRepoDetailsError,
} from 'containers/RepoListContainer/actions';
import
  repoContainerSaga,
{
  getLatestHashSaga,

  getRepoDetailsSaga,
} from '../saga';

const name = 'test1';
const sha = '93b02ffd52c069fa21bc0c919405278ab0758ce5';
const date = '2018-02-05T15:40:23Z';
const headers = new Headers({
  Authorization: `Bearer ${GITHUB_API_TOKEN}`,
});

const getOpts = {
  method: 'GET',
  credentials: 'same-origin',
  headers,
};

describe('getLatestHashSaga', () => {
  let generator;

  beforeEach(() => {
    generator = getLatestHashSaga({ name });

    const requestURL = `${GITHUB_API_URL}repos/${GIT_COMPANY_NAME}/${name}/commits/${GIT_DEFAULT_BRANCH}`;

    const callDescriptor = generator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL, getOpts));
  });

  it('dispatches getLatestHashSuccess if request is successful', () => {
    const response = {
      sha,
      commit: {
        author: {
          date,
        },
      },
    };

    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(getLatestHashSuccess(name, response)));
  });

  it('dispatches getLatestHashError if request is not successful', () => {
    const response = new Error('Some error');

    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor).toEqual(put(getLatestHashError(name, response)));
  });
});

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

describe('repoContainerSaga', () => {
  const generator = repoContainerSaga();

  it('starts watcher for GET_LATEST_SHA action', () => {
    const takeEveryDescriptor = generator.next().value;
    expect(takeEveryDescriptor).toEqual([
      takeEvery(GET_LATEST_SHA, getLatestHashSaga),
      takeEvery(GET_REPO_DETAILS, getRepoDetailsSaga),
    ]);
  });
});
