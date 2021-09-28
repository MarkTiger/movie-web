import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { fetchMovieDetail } from '../stores/action';

export default function Detail() {
  const { movieDetail, isLoading, similarMovies } = useSelector(
    ({ movieDetail, isLoading, similarMovies }) => {
      return {
        movieDetail,
        isLoading,
        similarMovies,
      };
    }
  );

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchMovieDetail(params.id));
  }, [dispatch, params.id]);

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="row p-3">
          <div className="col-12 text-center">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row p-3">
          <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 p-3">
            <div className="d-flex flex-column align-items-center">
              <img
                src={`https://image.tmdb.org/t/p/original${movieDetail.poster_path}`}
                alt="movie"
                className="movie-detail-image w-100 rounded shadow"
              />
              <div className="d-flex justify-content-center flex-wrap">
                {movieDetail.genres?.map((genre) => {
                  return (
                    <span className="badge bg-red m-2" key={genre.id}>
                      {genre.name}
                    </span>
                  );
                })}
              </div>
              <h4 className="text-center">{movieDetail.release_date}</h4>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 p-3 d-flex flex-column">
            <div
              className="w-100 h-100 rounded shadow"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
              }}
            >
              <div className="movie-detail-backdrop p-3 h-100 d-flex flex-column justify-content-end rounded">
                <h1>{movieDetail.title}</h1>
                <h4 className="text-red">Overview</h4>
                <p style={{ textAlign: 'justify' }}>{movieDetail.overview}</p>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-red mb-3">Similar Movies</h3>
              <div className="d-flex overflow-auto">
                {similarMovies.map((similarMovie) => {
                  return (
                    <MovieCard key={similarMovie.id} movie={similarMovie} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
