import { all, fork } from 'redux-saga/effects';
import * as postSagas from './post.saga';

export default function* rootSaga() {
  yield all([...Object.values(postSagas)].map(fork));
}
