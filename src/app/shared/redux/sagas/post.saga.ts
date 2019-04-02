/* global fetch */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AC_POST } from '../actions/actionCreators/constants.actionCreators';
import {
  onPostDeleteSuccess,
  onPostUpdateSuccess,
  onPostInsertSuccess,
  onPostLoadSuccess,
  onPostError
} from '../actions/post.action';
import { PostService } from '../../services/post.service';

function* doLoadRequest(params: any) {
  const response = yield call(PostService.get, params.ctx);
  if (response.error) {
    return yield put(onPostError(response));
  }
  return yield put(onPostLoadSuccess(response));
}

function* doInsertRequest(params: any) {
  const response = yield call(PostService.insert, params.data);
  if (response.error) {
    return yield put(onPostError(response));
  }

  return yield put(onPostInsertSuccess(response));
}

function* doUpdateRequest(params: any) {
  const response = yield call(PostService.update, params.data);
  if (response.error) {
    return yield put(onPostError(response));
  }

  return yield put(onPostUpdateSuccess(response));
}

function* doDeleteRequest(params: any) {
  const response = yield call(PostService.delete, params.data);
  if (response.error) {
    return yield put(onPostError(response));
  }

  return yield put(onPostDeleteSuccess(response));
}

export function* postRootSaga() {
  yield all([
    yield takeLatest(AC_POST.POST_LOAD_REQUEST, doLoadRequest),
    yield takeLatest(AC_POST.POST_INSERT_REQUEST, doInsertRequest),
    yield takeLatest(AC_POST.POST_UPDATE_REQUEST, doUpdateRequest),
    yield takeLatest(AC_POST.POST_DELETE_REQUEST, doDeleteRequest)
  ]);
}
