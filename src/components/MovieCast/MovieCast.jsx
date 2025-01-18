import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../api';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(setCast);
  }, [movieId]);

  if (!cast.length) return <div>No cast available</div>;

  return (
    <ul className={s.cast}>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
            />
          ) : (
            <div>No image</div>
          )}
          <p>{name}</p>
          <p>Character: {character || "N/A"}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
