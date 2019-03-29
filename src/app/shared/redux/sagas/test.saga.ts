/* global fetch */
import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionCreators/constants.actionCreators';
// import es6promise from 'es6-promise';
import { tickClock, loadDataSuccess, failure } from '../actions/test.action';
//import 'isomorphic-unfetch';

// es6promise.polyfill();

function* runClockSaga() {
  yield take(actionTypes.TEST_START_CLOCK);
  while (true) {
    yield put(tickClock(false));
    yield delay(1000);
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users');
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(actionTypes.TEST_LOAD_DATA, loadDataSaga)
  ]);
}

export default rootSaga;
