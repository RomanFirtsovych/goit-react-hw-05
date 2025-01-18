import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieTrailer } from '../../api';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(() => {
      setErrorMessage('Сталася помилка під час завантаження фільму.');
    });
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from ?? '/');
  };

  const handleWatchTrailer = () => {
    fetchMovieTrailer(movieId)
      .then((trailers) => {
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        } else {
          setErrorMessage('Трейлер для цього фільму недоступний.');
        }
      })
      .catch(() => {
        setErrorMessage('Сталася помилка під час завантаження трейлера.');
      });
  };

  if (!movie) return <div>Завантаження...</div>;

  const { title, release_date, vote_average, overview, genres, poster_path } = movie;

  return (
    <div className={s.container}>
      <button onClick={handleGoBack} className={s.goBack}>
        ← Назад
      </button>
      <div className={s.details}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className={s.poster}
        />
        <div className={s.info}>
          <h1>
            {title} ({new Date(release_date).getFullYear()})
          </h1>
          <p>Оцінка користувачів: {Math.round(vote_average * 10)}%</p>
          <h2>Опис</h2>
          <p>{overview}</p>
          <h3>Жанри</h3>
          <ul className={s.genres}>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <button onClick={handleWatchTrailer} className={s.trailerButton}>
            Переглянути трейлер
          </button>
          {errorMessage && <p className={s.error}>{errorMessage}</p>}
        </div>
      </div>
      {trailerKey && (
        <div className={s.trailer}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <h3>Додаткова інформація</h3>
      <ul className={s.additionalInfo}>
        <li>
          <Link to="cast" state={{ from: location.state?.from }}>
            Акторський склад
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location.state?.from }}>
            Відгуки
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
