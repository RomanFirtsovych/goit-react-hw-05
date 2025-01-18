import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../../api';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>В тренді сьогодні</h1>
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

export default HomePage;
