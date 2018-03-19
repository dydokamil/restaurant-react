import { all, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from './constants/actions'

const ROOT_URL = 'http://localhost:3000'

// v login saga v //
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

// ^ login saga ^ //

// v signup saga v //
export function * signupWatcher () {
  yield takeEvery(actions.SIGNUP_REQUEST, signupWorker)
}

export function * signupWorker ({ credentials }) {
  try {
    const session = yield call(signup, credentials)
    yield put({ type: actions.SIGNUP_SUCCESS, session })
  } catch (error) {
    yield put({ type: actions.SIGNUP_FAILURE, error })
  }
}

export const signup = credentials => {
  return axios.post(`${ROOT_URL}/users`, { ...credentials })
}
// ^ signup saga ^ //

// v fetch tables saga v //
export function * tablesWatcher () {
  yield takeEvery(actions.TABLES_REQUEST, tablesWorker)
}

export function * tablesWorker () {
  try {
    const tables = yield call(fetchTables)
    yield put({ type: actions.TABLES_SUCCESS, tables })
  } catch (error) {
    yield put({ type: actions.TABLES_FAILURE, error })
  }
}

export const fetchTables = () => {
  return axios.get(`${ROOT_URL}/reservations/available`)
}
// ^ fetch tables saga ^ //

// v make a reservation v //
export function * makeReservationWatcher () {
  yield takeEvery(actions.MAKE_RESERVATION_REQUEST, makeReservationWorker)
}

export function * makeReservationWorker ({ reservationDetails }) {
  try {
    const reservation = yield call(makeReservation, reservationDetails)
    yield put({ type: actions.MAKE_RESERVATION_SUCCESS, reservation })
  } catch (error) {
    yield put({ type: actions.MAKE_RESERVATION_FAILURE, error })
  }
}

export const makeReservation = reservation => {
  return axios.post(
    `${ROOT_URL}/reservations`,
    {
      time: reservation.time,
      table: reservation.table
    },
    { headers: { 'x-access-token': reservation.token } }
  )
}
// ^ make a reservation ^ //

// v fetch my reservation v //
export function * fetchMyReservationWatcher () {
  yield takeEvery(
    actions.FETCH_MY_RESERVATION_REQUEST,
    fetchMyReservationWorker
  )
}

export function * fetchMyReservationWorker ({ token }) {
  try {
    const reservation = yield call(fetchMyReservation, token)
    yield put({ type: actions.FETCH_MY_RESERVATION_SUCCESS, reservation })
  } catch (error) {
    yield put({ type: actions.FETCH_MY_RESERVATION_FAILURE, error })
  }
}

export const fetchMyReservation = token => {
  return axios.get(`${ROOT_URL}/reservations/mine`, {
    headers: { 'x-access-token': token }
  })
}
// ^ fetch my reservation ^ //

export default function * rootSaga () {
  yield all([
    loginWatcher(),
    signupWatcher(),
    tablesWatcher(),
    makeReservationWatcher(),
    fetchMyReservationWatcher()
  ])
}
