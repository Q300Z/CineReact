import { useState } from "react";
import { useGlobal } from "../contexts/GlobalContext.jsx";
import styles from './SearchBar.module.css';

const SearchBar = ({ onUrlApi }) => {
    const [searchTerm, setSearchTerm] = useState("");  // Etat pour la recherche
    const [lastSelect, setLastSelect] = useState("");  // Etat pour la recherche
    const { token } = useGlobal();

    // Liste des filtres
    const listFilter = [
        { name: "Popular", value: "https://api.themoviedb.org/3/movie/popular" },
        { name: "Top Rated", value: "https://api.themoviedb.org/3/movie/top_rated" },
        { name: "Upcoming", value: "https://api.themoviedb.org/3/movie/upcoming" },
        { name: "Now Playing", value: "https://api.themoviedb.org/3/movie/now_playing" },
    ];

    // Gestion de la sélection du filtre
    const onSelectFilter = (event) => {
        onUrlApi(event.target.value + `?api_key=${token}`);
        setLastSelect(event.target.value + `?api_key=${token}`);
    };

    // Gestion du champ de recherche
    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== "")
            onUrlApi(`https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${event.target.value}`);
        else
            onUrlApi(lastSelect);
    };

    return (
        <div className={styles.search_bar}>


            {/* Champ de recherche */}
            <div className={styles.input}>
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </div>
            {/* Sélecteur de filtre */}
            <div className={styles.select}>
                <select onChange={onSelectFilter}>
                    {listFilter.map((filter, index) => (
                        <option key={index} value={filter.value}>
                            {filter.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
