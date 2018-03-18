import { expectSaga } from 'redux-saga-test-plan'

import * as actions from './constants/actions'
import { loginWorker } from './sagas'
import sessionReducer from './reducers/sessionReducer'

describe('sagas', () => {
  describe('when logging in', () => {
    it('should create a new session with reducer and succeed', () => {
      const payload = {
        token: 'abcdef',
        username: 'user1',
        id: '1'
      }
      return expectSaga(loginWorker, payload)
        .withReducer(sessionReducer)
        .run()
        .then(result => {
          expect(result.storeState.session).toEqual(payload)
        })
    })
  })
})
