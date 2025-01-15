import {useEffect, useState} from "react";
import {useGlobal} from "../contexts/GlobalContext.jsx";
import {Link} from "react-router";

const MovieList = (listMovie) => {
    const {token, debounce} = useGlobal();
    const [listMovie, setListMovie] = useState([]);
    const [urlApi, setUrlApi] = useState("https://api.themoviedb.org/3/movie/popular");
    const [searchTerm, setSearchTerm] = useState("");  // Etat pour la recherche
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Liste des filtres
    const listFilter = [
        {name: "Popular", value: "https://api.themoviedb.org/3/movie/popular"},
        {name: "Top Rated", value: "https://api.themoviedb.org/3/movie/top_rated"},
        {name: "Upcoming", value: "https://api.themoviedb.org/3/movie/upcoming"},
        {name: "Now Playing", value: "https://api.themoviedb.org/3/movie/now_playing"},
    ];

    // Fetch des données
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${urlApi}?api_key=${token}`);
                const data = await response.json();

                if (data.results) {
                    setListMovie(data.results);
                } else {
                    console.error("Aucune donnée trouvée :", data);
                }
            } catch (error) {
                console.error("Erreur lors du fetch des Movies :", error);
            }
        };

        const fetchQuery = async (query) => {
            if (!query) return;

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${query}`
                );
                if (!response.ok) throw new Error("Error fetching search results.");
                const data = await response.json();
                setListMovie(data.results);
            } catch (err) {
                console.error("Error fetching search results:", err.message);
            }
        };

        const handler = debounce((newTerm) => {
            setDebouncedSearchTerm(newTerm);
        }, 1000);
        handler(searchTerm);

        fetchQuery(debouncedSearchTerm);
        if (debouncedSearchTerm === "") {
            fetchMovies();
        }


        return () => {
            handler.cancel && handler.cancel();
        };

    }, [urlApi, token, debouncedSearchTerm, searchTerm]);

    // Gestion de la sélection du filtre
    const onSelectFilter = (event) => {
        setUrlApi(event.target.value);
    };

    // Gestion du champ de recherche
    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrage des films en fonction du texte de recherche
    const filteredMovies = listMovie.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Sélecteur de filtre */}
            <div>
                <select onChange={onSelectFilter}>
                    {listFilter.map((filter, index) => (
                        <option key={index} value={filter.value}>
                            {filter.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Champ de recherche */}
            <div style={{margin: "20px 0"}}>
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    style={{padding: "10px", width: "75%", fontSize: "16px"}}
                />
            </div>

            {/* Affichage des films */}
            {filteredMovies.length === 0 ? (
                <p>Chargement des Movies...</p>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center"}}>
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "15px",
                                width: "200px",
                                textAlign: "center",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            }}
                        >
                            <h3 style={{fontSize: "16px", margin: "10px 0"}}>{movie.title}</h3>
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{borderRadius: "8px", width: "100%"}}
                                />
                            ) : (
                                <p style={{
                                    borderRadius: "8px",
                                    height: "278px",
                                    alignContent: "center",
                                    backgroundColor: "gainsboro"
                                }}>Pas d'image</p>
                            )}
                            <p style={{margin: "10px 0", fontSize: "14px"}}>
                                <strong>Note :</strong> {movie.vote_average}/10
                            </p>
                            <Link
                                to={`/movie/${movie.id}`}
                                style={{
                                    display: "inline-block",
                                    marginTop: "10px",
                                    padding: "10px 15px",
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                }}
                            >
                                Voir les détails
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
export default MovieList;
