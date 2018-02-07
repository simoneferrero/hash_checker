import { takeEvery, call, put } from 'redux-saga/effects';
import request from 'utils/request';

import {
  GET_LATEST_SHA,
} from 'containers/RepoListContainer/constants';

import {
  getLatestShaSuccess,
  getLatestShaError,
} from 'containers/RepoListContainer/actions';

import {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GIT_DEFAULT_BRANCH,
} from 'utils/config';

export function* getLatestShaSaga(name) {
  const requestURL = `${GITHUB_API_URL}${name}/commits/${GIT_DEFAULT_BRANCH || 'master'}`; // TODO: build url with url builder instead
  const headers = new Headers({
    Authorization: GITHUB_API_TOKEN ? `Bearer ${GITHUB_API_TOKEN}` : '',
  });

  const opts = {
    method: 'GET',
    credentials: 'same-origin',
    headers,
  };

  try {
    const response = yield call(request, requestURL, opts);

    yield put(getLatestShaSuccess(name, response));
  } catch (error) {
    yield put(getLatestShaError(name, error));
  }
}

// Individual exports for testing
export default function* repoContainerSaga() {
  yield takeEvery(GET_LATEST_SHA, getLatestShaSaga);
}
