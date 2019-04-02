import { AC_POST } from './actionCreators/constants.actionCreators';
import { IPost } from '../../interfaces/post.model';

export const onPostLoadRequest = (ctx: any) => {
  return {
    type: AC_POST.POST_LOAD_REQUEST,
    ctx: ctx
  };
};

export const onPostLoadSuccess = (data: IPost[]) => {
  return {
    type: AC_POST.POST_LOAD_SUCCESS,
    data
  };
};

export const onPostInsertRequest = (data: IPost) => {
  return {
    type: AC_POST.POST_INSERT_REQUEST,
    data
  };
};

export const onPostInsertSuccess = (data: IPost) => {
  return {
    type: AC_POST.POST_INSERT_SUCCESS,
    data
  };
};

export const onPostUpdateRequest = (data: IPost) => {
  return {
    type: AC_POST.POST_UPDATE_REQUEST,
    data
  };
};

export const onPostUpdateSuccess = (data: IPost) => {
  return {
    type: AC_POST.POST_UPDATE_SUCCESS,
    data
  };
};

export const onPostDeleteRequest = (postId: number) => {
  return {
    type: AC_POST.POST_DELETE_REQUEST,
    data: postId
  };
};

export const onPostDeleteSuccess = (postId: number) => {
  return {
    type: AC_POST.POST_DELETE_SUCCESS,
    data: postId
  };
};

export const onPostSetFilter = (data: string) => {
  return {
    type: AC_POST.POST_SET_FILTER,
    data
  };
};

export const onPostError = (data: any) => {
  return {
    type: AC_POST.POST_ERROR,
    data
  };
};
