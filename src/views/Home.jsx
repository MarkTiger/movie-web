import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard';
import { addMoreMovies, fetchMovies } from '../stores/action';

export default function Home() {
  const { isLoading, movies, hasMore } = useSelector(
    ({ isLoading, movies, hasMore }) => {
      return {
        isLoading,
        movies,
        hasMore,
      };
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(addMoreMovies());
  };

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
        <InfiniteScroll
          dataLength={movies.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more movies to load</b>
            </p>
          }
        >
          <div className="row p-3">
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
