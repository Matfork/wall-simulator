import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux/reducers';
import rootSaga from '../redux/sagas';

import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  ) as any;
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export default function(BaseComponent: any) {
  return withRedux(configureStore)(withReduxSaga(BaseComponent) as any);
}
