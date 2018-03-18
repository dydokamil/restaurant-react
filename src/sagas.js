import { all, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from './constants/actions'

const ROOT_URL = 'http://localhost:3000'

// login saga

// watcher
export function * loginWatcher () {
  yield takeEvery(actions.LOGIN_REQUEST, loginWorker)
}

// worker
export function * loginWorker ({ credentials }) {
  try {
    const session = yield call(login, credentials)
    yield put({ type: actions.LOGIN_SUCCESS, session })
  } catch (error) {
    yield put({ type: actions.LOGIN_FAILURE, error })
  }
}

// request
export const login = credentials => {
  return axios.post(`${ROOT_URL}/users/login`, { ...credentials })
}

// /login saga

export default function * rootSaga () {
  yield all([loginWatcher()])
}
