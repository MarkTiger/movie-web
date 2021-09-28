import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${movie.id}`);
  };

  return (
    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 p-3 d-flex align-items-center justify-content-center h-100">
      <div
        onClick={handleClick}
        className="movie-card d-flex flex-column align-items-center position-relative cursor-pointer"
      >
        <div className="card-rating p-2 rounded fw-bold">
          {movie.vote_average.toFixed(1)}
        </div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : 'https://st1.bollywoodlife.com/wp-content/uploads/2014/09/default-movie-pic-list1.jpg?impolicy=Medium_Resize&w=720&h=960'
          }
          alt={movie.title}
          className="w-100 mb-2 rounded shadow"
        />
        <h6 className="text-center">{movie.title}</h6>
      </div>
    </div>
  );
}
