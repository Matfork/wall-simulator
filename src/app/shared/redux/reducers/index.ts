import { combineReducers } from 'redux';
import postReducer from './post.reducer';

export default combineReducers({
  postList: postReducer
});
