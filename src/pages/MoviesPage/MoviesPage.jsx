import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../api';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (query) {
      fetchMoviesByQuery(query)
        .then((results) => {
          if (results.length === 0) {
            setErrorMessage('По вашому запиту нічого не знайдено. Введіть іншу назву фільму.');
          } else {
            setErrorMessage('');
          }
          setMovies(results);
        })
        .catch(() => {
          setErrorMessage('Сталася помилка під час завантаження. Спробуйте ще раз.');
        });
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    setSearchParams({ query: searchTerm });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введіть назву фільму..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Пошук
        </button>
      </form>
      {errorMessage && <p className={styles.alert}>{errorMessage}</p>}
      <ul className={styles.movieList}>
        {movies.map(({ id, title, poster_path }) => (
          <li key={id} className={styles.movieItem}>
            <Link to={`/movies/${id}`} className={styles.movieLink}>
              <div className={styles.movieContainer}>
                {poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt={title}
                    className={styles.movieImage}
                  />
                ) : (
                  <div className={styles.placeholder}>Зображення відсутнє</div>
                )}
                <p className={styles.movieTitle}>{title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
