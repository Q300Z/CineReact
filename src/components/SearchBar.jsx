import {useState} from "react";
import {useGlobal} from "../contexts/GlobalContext.jsx";
import styles from './SearchBar.module.css';

const SearchBar = ({onUrlApi}) => {
    const [searchTerm, setSearchTerm] = useState("");  // Etat pour la recherche
    const [lastSelect, setLastSelect] = useState("");  // Etat pour la recherche
    const {token} = useGlobal();

    // Liste des filtres
    const listFilter = [
        {name: "Populaire", value: "https://api.themoviedb.org/3/movie/popular?language=fr-FR&region=FR"},
        {name: "Les mieux notés", value: "https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&region=FR"},
        {name: "À venir", value: "https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&region=FR"},
        {
            name: "En cours de diffusion",
            value: "https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&region=FR"
        },
    ];

    // Gestion de la sélection du filtre
    const onSelectFilter = (event) => {
        onUrlApi(event.target.value + `&api_key=${token}`);
        setLastSelect(event.target.value + `&api_key=${token}`);
    };

    let timer = ""
    // Gestion du champ de recherche
    const onSearchChange = (event) => {
        clearInterval(timer)
        setSearchTerm(event.target.value);
        timer = setTimeout(() => {

            if (event.target.value !== "")
                onUrlApi(`https://api.themoviedb.org/3/search/movie?language=fr-FR&region=FR&api_key=${token}&query=${event.target.value}`);
            else
                onUrlApi(lastSelect);
        }, 500)

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
