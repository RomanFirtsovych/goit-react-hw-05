import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchMovieReviews(movieId).then(setReviews);
    }, [movieId]);

    if (!reviews.length) return <div>No reviews available</div>;

    return (
        <ul className={s.reviews}>
            {reviews.map(({ id, author, content }) => (
                <li key={id}>
                    <h4>Author: {author}</h4>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieReviews;
