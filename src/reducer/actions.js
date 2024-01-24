import { actionType } from './actionTypes';

export const setLoading = () => ({ type: actionType.SET_LOADING });

export const getImg = res => ({ type: actionType.GET_IMAGES, payload: res });

export const loadingEnd = () => ({ type: actionType.LOADING_END });

export const nextPage = () => ({ type: actionType.NEXT_PAGE });

export const getTotal = total => ({
  type: actionType.GET_TOTAL,
  payload: total,
});

export const setQuery = query => ({
  type: actionType.SET_QUERY,
  payload: query,
});

export const closeModal = str => ({
  type: actionType.SET_IMG_URL,
  payload: str,
});
