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

const baseURL = 'https://api.themoviedb.org/3/movie';

export function setMovies(movies) {
  return {
    type: MOVIES_SET,
    payload: movies,
  };
}

export function addMovies(movies) {
  return {
    type: MOVIES_ADD,
    payload: movies,
  };
}

export function setPage(page) {
  return {
    type: PAGE_SET,
    payload: page,
  };
}

export function setTotalPage(totalPage) {
  return {
    type: TOTALPAGE_SET,
    payload: totalPage,
  };
}

export function setTotalResults(totalResults) {
  return {
    type: TOTALRESULTS_SET,
    payload: totalResults,
  };
}

export function setHasMore(bool) {
  return {
    type: HASMORE_SET,
    payload: bool,
  };
}

export function setMovieDetail(movieDetail) {
  return {
    type: MOVIEDETAIL_SET,
    payload: movieDetail,
  };
}

export function setSimilarMovies(similarMovies) {
  return {
    type: SIMILARMOVIES_SET,
    payload: similarMovies,
  };
}

export function setIsLoading(bool) {
  return {
    type: ISLOADING_SET,
    payload: bool,
  };
}

export function fetchMovies() {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(
        baseURL + `/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await response.json();
      dispatch(setPage(data.page));
      dispatch(setTotalPage(data.total_pages));
      dispatch(setTotalResults(data.total_results));
      dispatch(setHasMore(true));
      dispatch(setMovies(data.results));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function addMoreMovies() {
  return async function (dispatch, getState) {
    try {
      const { page, totalPage } = getState();
      const response = await fetch(
        baseURL +
          `/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${
            page + 1
          }`
      );
      const data = await response.json();

      dispatch(setPage(data.page));
      if (data.page >= totalPage) {
        dispatch(setHasMore(false));
      }
      dispatch(addMovies(data.results));
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchMovieDetail(id) {
  return async function (dispatch, getState) {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(
        baseURL + `/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await response.json();
      dispatch(setMovieDetail(data));

      const similarMoviesResponse = await fetch(
        baseURL + `/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const similarMoviesData = await similarMoviesResponse.json();
      dispatch(setSimilarMovies(similarMoviesData.results));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}
