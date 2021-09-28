import {
  HASMORE_SET,
  ISLOADING_SET,
  MOVIEDETAIL_SET,
  MOVIES_ADD,
  MOVIES_SET,
  PAGE_SET,
  SIMILARMOVIES_SET,
  TOTALPAGE_SET,
  TOTALRESULTS_SET,
} from './actionType';

const initialState = {
  movies: [],
  page: 0,
  totalPage: 0,
  totalResults: 0,
  isLoading: true,
  hasMore: true,
  movieDetail: {},
  similarMovies: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVIES_SET:
      return {
        ...state,
        movies: action.payload,
      };
    case MOVIES_ADD:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    case PAGE_SET:
      return {
        ...state,
        page: action.payload,
      };
    case TOTALPAGE_SET:
      return {
        ...state,
        totalPage: action.payload,
      };
    case TOTALRESULTS_SET:
      return {
        ...state,
        totalResults: action.payload,
      };
    case HASMORE_SET:
      return {
        ...state,
        hasMore: action.payload,
      };
    case MOVIEDETAIL_SET:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case SIMILARMOVIES_SET:
      return {
        ...state,
        similarMovies: action.payload,
      };
    case ISLOADING_SET:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
