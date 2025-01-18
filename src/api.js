import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0c0a87bd4e3d898bc1d81b9301e09b26';

export const fetchTrendingMovies = async () => {
    const response = await axios.get(`${API_URL}/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await axios.get(`${API_URL}/search/movie`, {
        params: {
            api_key: API_KEY,
            query,
        },
    });
    return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
};

export const fetchMovieCredits = async (movieId) => {
    const response = await axios.get(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`${API_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
    return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${API_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return response.data.results;
};

export const fetchMovieTrailer = async (movieId) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results.filter((video) => video.site === 'YouTube' && video.type === 'Trailer');
};