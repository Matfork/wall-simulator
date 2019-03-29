import { all, fork } from 'redux-saga/effects';
import * as testSagas from './test.saga';

export default function* rootSaga() {
  yield all([...Object.values(testSagas)].map(fork));
}
