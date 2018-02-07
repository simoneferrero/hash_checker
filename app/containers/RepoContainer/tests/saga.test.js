/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GIT_DEFAULT_BRANCH,
} from 'utils/config';

import {
  GET_LATEST_SHA,
} from 'containers/RepoListContainer/constants';
import {
  getLatestShaSuccess,
  getLatestShaError,
} from 'containers/RepoListContainer/actions';
import
repoContainerSaga,
{
  getLatestShaSaga,
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

describe('getLatestShaSaga', () => {
  let generator;

  beforeEach(() => {
    generator = getLatestShaSaga(name);

    const requestURL = `${GITHUB_API_URL}${name}/commits/${GIT_DEFAULT_BRANCH}`;

    const callDescriptor = generator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL, getOpts));
  });

  it('dispatches getLatestShaSuccess if request is successful', () => {
    const response = {
      sha,
      commit: {
        author: {
          date,
        },
      },
    };

    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(getLatestShaSuccess(name, response)));
  });

  it('dispatches getLatestShaError if request is not successful', () => {
    const response = new Error('Some error');

    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor).toEqual(put(getLatestShaError(name, response)));
  });
});

describe('repoContainerSaga', () => {
  const generator = repoContainerSaga();

  it('starts watcher for GET_LATEST_SHA action', () => {
    const takeEveryDescriptor = generator.next().value;
    expect(takeEveryDescriptor).toEqual(takeEvery(GET_LATEST_SHA, getLatestShaSaga));
  });
});
