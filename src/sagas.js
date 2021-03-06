import { all, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from './constants/actions'

// const ROOT_URL = 'http://localhost:3000'
const ROOT_URL = 'https://node-restaurant.herokuapp.com'

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

// v invite a user v //
export function * inviteUserWatcher () {
  yield takeEvery(actions.INVITE_REQUEST, inviteUserWorker)
}

export function * inviteUserWorker ({ payload }) {
  try {
    const reservation = yield call(inviteUser, payload)
    yield put({ type: actions.INVITE_SUCCESS, reservation })
  } catch (error) {
    yield put({
      type: actions.INVITE_FAILURE,
      error
    })
  }
}

export const inviteUser = payload =>
  axios.post(
    `${ROOT_URL}/reservations/${payload.id}/invite`,
    { guest: payload.guest },
    { headers: { 'x-access-token': payload.token } }
  )
// ^ invite a user ^ //

// v kick a user v //
export function * kickUserWatcher () {
  yield takeEvery(actions.KICK_REQUEST, kickUserWorker)
}

export function * kickUserWorker ({ payload }) {
  try {
    const reservation = yield call(kickUser, payload)
    yield put({
      type: actions.KICK_SUCCESS,
      reservation
    })
  } catch (error) {
    yield put({ type: actions.KICK_FAILURE, error })
  }
}

export const kickUser = payload =>
  axios.post(
    `${ROOT_URL}/reservations/${payload.reservation}/kick`,
    {
      guestId: payload.guest
    },
    { headers: { 'x-access-token': payload.token } }
  )
// ^ kick a user ^ //

// v clear reservations v //
export function * clearReservationsWatcher () {
  yield takeEvery(actions.CLEAR_RESERVATIONS_REQUEST, clearReservationsWorker)
}

export function * clearReservationsWorker () {
  yield put({ type: actions.CLEAR_RESERVATIONS })
}
// ^ clear reservations ^ //

// v cancel reservation v //
export function * cancelReservationWatcher () {
  yield takeEvery(actions.CANCEL_RESERVATION_REQUEST, cancelReservationWorker)
}

export function * cancelReservationWorker ({ payload }) {
  try {
    yield call(cancelReservation, payload)
    yield put({
      type: actions.CANCEL_RESERVATION_SUCCESS,
      reservation: { data: null }
    })
  } catch (error) {
    yield put({ type: actions.CANCEL_RESERVATION_FAILURE, error })
  }
}

export const cancelReservation = payload =>
  axios.post(
    `${ROOT_URL}/reservations/${payload.reservation}/cancel`,
    {},
    { headers: { 'x-access-token': payload.token } }
  )
// ^ cancel reservation ^ //

// v cancel invitation v //
export function * cancelInvitationWatcher () {
  yield takeEvery(actions.CANCEL_INVITATION_REQUEST, cancelInvitationWorker)
}

export function * cancelInvitationWorker ({ payload }) {
  try {
    yield call(cancelInvitation, payload)
    yield put({
      type: actions.CANCEL_INVITATION_SUCCESS,
      reservation: { data: null }
    })
  } catch (error) {
    yield put({ type: actions.CANCEL_INVITATION_FAILURE, error })
  }
}

export const cancelInvitation = payload =>
  axios.post(
    `${ROOT_URL}/reservations/${payload.reservation}/not-going`,
    {},
    { headers: { 'x-access-token': payload.token } }
  )
// ^ cancel invitation ^ //

export default function * rootSaga () {
  yield all([
    loginWatcher(),
    signupWatcher(),
    tablesWatcher(),
    makeReservationWatcher(),
    fetchMyReservationWatcher(),
    inviteUserWatcher(),
    kickUserWatcher(),
    clearReservationsWatcher(),
    cancelReservationWatcher(),
    cancelInvitationWatcher()
  ])
}
