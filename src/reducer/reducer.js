import { actionType } from './actionTypes';

export const initialState = {
  query: '',
  page: 1,
  images: [],
  total: 0,
  isLoading: false,
  largeImgUrl: '',
};

export function galleryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case actionType.SET_QUERY:
      return { ...state, query: payload, images: [], page: 1 };

    case actionType.NEXT_PAGE:
      return { ...state, page: state.page + 1 };

    case actionType.GET_IMAGES:
      return { ...state, images: [...state.images, ...payload] };

    case actionType.GET_TOTAL:
      return { ...state, total: payload };

    case actionType.LOADING_START:
      return { ...state, loading: true };

    case actionType.LOADING_END:
      return { ...state, loading: false };

    case actionType.SET_IMG_URL:
      return { ...state, largeImgUrl: payload };

    default:
      return state;
  }
}
