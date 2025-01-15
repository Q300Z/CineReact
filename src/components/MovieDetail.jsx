import React, { useEffect, useState } from "react";
import { useGlobal } from "../contexts/GlobalContext.jsx";
import { Link, useParams } from "react-router";
import MovieList from "./MovieList.jsx";
import styles from './MovieDetail.module.css';

const MovieDetail = () => {
    const { id } = useParams();
    const { token, onAddWishlist, isInWishlist } = useGlobal();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${token}`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des détails du film.");
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchMovieCast = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des acteurs.");
                const data = await response.json();
                setCast(data.cast.slice(0, 10)); // Limite aux 10 premiers acteurs
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchSimilarMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${token}`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des films similaires.");
                const data = await response.json();
                setSimilarMovies(data.results);
            } catch (err) {
                console.error("Erreur lors du fetch des films similaires :", err.message);
            }
        };

        fetchMovieDetails();
        fetchMovieCast();
        fetchSimilarMovies();
    }, [id, token]);


    if (error) {
        return <p>Erreur : {error}</p>;
    }

    if (!movie) {
        return <p className={styles.container}>Chargement des détails...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.movie_title}>{movie.title}</h1>
            <p className={styles.movie_overview}>{movie.overview}</p>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.movie_poster}
                />
            )}
            <p className={styles.movie_info}>Date de sortie : {movie.release_date}</p>
            <p className={styles.movie_info}>Note moyenne : {movie.vote_average}</p>

            <h3 className={styles.actors}>Acteurs principaux</h3>
            <ul className={styles.actors_list}>
                {cast.map((actor) => (
                    <li key={actor.cast_id}>
                        {actor.name} - {actor.character}
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={() => onAddWishlist(movie)}
                disabled={isInWishlist(movie)}
                className={styles.add_to_wishlist_btn}
            >
                {isInWishlist(movie) ? "Déjà dans la wishlist" : "Ajouter à la wishlist"}
            </button>

            <h3 className={styles.similarMoviesTitle}>Films similaires</h3>
            <MovieList listMovie={similarMovies} />
        </div>
    );
};

export default MovieDetail;
