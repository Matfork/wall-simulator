import { AC_POST } from '../actions/actionCreators/constants.actionCreators';
import { IPost } from '../../interfaces/post.model';
import { VISIBILITY_FILTER } from '../../enums/post.enums';
import produce from 'immer';
import _ from 'lodash';

export interface IPostState {
  loading: boolean;
  error?: any;
  data: IPost[];
  filter: VISIBILITY_FILTER;
}

const initialState: IPostState = {
  loading: false,
  error: null,
  data: [],
  filter: VISIBILITY_FILTER.ALL
};

const reducer = (
  state: IPostState = initialState,
  { type, data }: any
): IPostState => {
  let newState: IPostState;

  switch (type) {
    case AC_POST.POST_LOAD_REQUEST:
      newState = { ...state, loading: true };
      break;
    case AC_POST.POST_LOAD_SUCCESS:
      newState = produce(initialState, draft => {
        draft.data = data;
        draft.error = null;
        draft.loading = false;
      });
      break;
    case AC_POST.POST_INSERT_SUCCESS:
      newState = produce(state, draft => {
        draft.error = null;
        draft.data.push(data);
      });
      break;
    case AC_POST.POST_UPDATE_SUCCESS:
      newState = produce(state, draft => {
        draft.error = null;
        draft.data.forEach(el => {
          if (el.id === data.id) {
            el.content = data.content;
          }
        });
      });
      break;
    case AC_POST.POST_DELETE_SUCCESS:
      newState = produce(state, draft => {
        draft.error = null;
        _.remove(draft.data, el => {
          return el.id === data;
        });
      });
      break;

    case AC_POST.POST_SET_FILTER:
      newState = { ...state, filter: data };
      break;
    case AC_POST.POST_ERROR:
      newState = { ...state, error: data, loading: false };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
};

export default reducer;
