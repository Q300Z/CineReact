import React, { useEffect, useState } from "react";
import { useGlobal } from "../contexts/GlobalContext.jsx";
import {Link, useParams} from "react-router";

const MovieDetails = () => {
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
        return <p>Chargement des détails...</p>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                />
            )}
            <p>Date de sortie : {movie.release_date}</p>
            <p>Note moyenne : {movie.vote_average}</p>

            <h3>Acteurs principaux</h3>
            <ul>
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
                style={{
                    padding: "10px",
                    marginTop: "20px",
                    backgroundColor: isInWishlist(movie) ? "gray" : "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: isInWishlist(movie) ? "not-allowed" : "pointer",
                }}
            >
                {isInWishlist(movie) ? "Déjà dans la wishlist" : "Ajouter à la wishlist"}
            </button>

            <h3>Films similaires</h3>
            {similarMovies.length === 0 ? (
                <p>Aucun film similaire trouvé.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                    {similarMovies.map((similarMovie) => (
                        <div
                            key={similarMovie.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                width: "200px",
                                textAlign: "center",
                            }}
                        >
                            <h4>{similarMovie.title}</h4>
                            {similarMovie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${similarMovie.poster_path}`}
                                    alt={similarMovie.title}
                                    style={{ width: "100%" }}
                                />
                            )}
                            <Link
                                to={`/movie/${similarMovie.id}`}
                                style={{ color: "#007BFF", textDecoration: "none", marginTop: "10px", display: "block" }}
                            >
                                Voir les détails
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default MovieDetails;
