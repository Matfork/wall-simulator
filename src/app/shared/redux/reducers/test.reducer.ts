import { actionTypes } from '../actions/actionCreators/constants.actionCreators';

export interface ITestState {
  count: number;
  error: any;
  lastUpdate: number;
  light: boolean;
  placeholderData: null;
}

export const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
};

function reducer(state: ITestState = exampleInitialState, action: any) {
  switch (action.type) {
    case actionTypes.TEST_FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case actionTypes.TEST_INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 }
      };

    case actionTypes.TEST_DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 }
      };

    case actionTypes.TEST_RESET:
      return {
        ...state,
        ...{ count: exampleInitialState.count }
      };

    case actionTypes.TEST_LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.data }
      };

    case actionTypes.TEST_TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light }
      };

    default:
      return state;
  }
}

export default reducer;
