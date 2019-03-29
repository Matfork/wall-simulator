import { actionTypes } from './actionCreators/constants.actionCreators';

export function failure(error: any) {
  return {
    type: actionTypes.TEST_FAILURE,
    error
  };
}

export function increment() {
  return { type: actionTypes.TEST_INCREMENT };
}

export function decrement() {
  return { type: actionTypes.TEST_DECREMENT };
}

export function reset() {
  return { type: actionTypes.TEST_RESET };
}

export function loadData() {
  return { type: actionTypes.TEST_LOAD_DATA };
}

export function loadDataSuccess(data: any) {
  return {
    type: actionTypes.TEST_LOAD_DATA_SUCCESS,
    data
  };
}

export function startClock() {
  return { type: actionTypes.TEST_START_CLOCK };
}

export function tickClock(isServer: boolean) {
  return {
    type: actionTypes.TEST_TICK_CLOCK,
    light: !isServer,
    ts: Date.now()
  };
}
