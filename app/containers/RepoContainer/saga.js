import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { getRequestUrl } from 'utils/helpers';

import {
  GET_LATEST_SHA,

  GET_REPO_DETAILS,

  GET_REPO_BRANCHES,
} from 'containers/RepoListContainer/constants';

import {
  getLatestHashSuccess,
  getLatestHashError,

  getRepoDetailsSuccess,
  getRepoDetailsError,

  getRepoBranchesSuccess,
  getRepoBranchesError,
} from 'containers/RepoListContainer/actions';

import {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GIT_COMPANY_NAME,
  GIT_DEFAULT_BRANCH,
} from 'utils/config';

/* getLatestHashSaga */
export function* getLatestHashSaga({ name }) { // TODO: find a way to pass request url as param for better testing
  const requestUrl = getRequestUrl(
    GITHUB_API_URL,
    ['repos', GIT_COMPANY_NAME, name, 'commits', GIT_DEFAULT_BRANCH || 'master'],
  );

  const headers = new Headers({
    Authorization: GITHUB_API_TOKEN ? `Bearer ${GITHUB_API_TOKEN}` : '',
  });

  const opts = {
    method: 'GET',
    credentials: 'same-origin',
    headers,
  };

  try {
    const response = yield call(request, requestUrl, opts);

    yield put(getLatestHashSuccess(name, response));
  } catch (error) {
    yield put(getLatestHashError(name, error));
  }
}

/* getRepoDetailsSaga */
export function* getRepoDetailsSaga({ name }) {
  const requestUrl = getRequestUrl(
    GITHUB_API_URL,
    ['repos', GIT_COMPANY_NAME, name],
  );

  const headers = new Headers({
    Authorization: GITHUB_API_TOKEN ? `Bearer ${GITHUB_API_TOKEN}` : '',
  });

  const opts = {
    method: 'GET',
    credentials: 'same-origin',
    headers,
  };

  try {
    const response = yield call(request, requestUrl, opts);

    yield put(getRepoDetailsSuccess(name, response));
  } catch (error) {
    yield put(getRepoDetailsError(name, error));
  }
}

/* getRepoBranchesSaga */
export function* getRepoBranchesSaga({ name }) {
  const requestUrl = getRequestUrl(
    GITHUB_API_URL,
    ['repos', GIT_COMPANY_NAME, name, 'branches'],
  );

  const headers = new Headers({
    Authorization: GITHUB_API_TOKEN ? `Bearer ${GITHUB_API_TOKEN}` : '',
  });

  const opts = {
    method: 'GET',
    credentials: 'same-origin',
    headers,
  };

  try {
    const response = yield call(request, requestUrl, opts);

    yield put(getRepoBranchesSuccess(name, response));
  } catch (error) {
    yield put(getRepoBranchesError(name, error));
  }
}

// Individual exports for testing
export default function* repoContainerSaga() {
  yield [
    takeEvery(GET_LATEST_SHA, getLatestHashSaga),
    takeEvery(GET_REPO_DETAILS, getRepoDetailsSaga),
    takeEvery(GET_REPO_BRANCHES, getRepoBranchesSaga),
  ];
}
