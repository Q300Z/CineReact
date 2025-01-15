import MovieList from "../components/MovieList.jsx";
import {useGlobal} from "../contexts/GlobalContext.jsx";
import {useCallback, useEffect, useState} from "react";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";


function Index() {
    const {} = useGlobal();
    const {token} = useGlobal();
    const [urlApi, setUrlApi] = useState("");
    const [listMovie, setListMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
    const [totalPages, setTotalPages] = useState(1);


    const handlerCallback = useCallback(() => {
        const fetchUrl = async () => {
            try {
                const baseApi = urlApi || `https://api.themoviedb.org/3/movie/popular?api_key=${token}`;
                const paginatedApi = `${baseApi}&page=${currentPage}`; // Ajouter le paramètre de page
                const response = await fetch(paginatedApi);
                const data = await response.json();

                if (data.results) {
                    setListMovie(data.results);
                    setTotalPages(data.total_pages);
                } else {
                    console.error("Aucune donnée trouvée :", data);
                }
            } catch (error) {
                console.error("Erreur lors du fetch des Movies :", error);
            }
        };

        fetchUrl()
    }, [urlApi, currentPage])


    // Fetch des données
    useEffect(() => {
        const timer = setTimeout(() => {
            handlerCallback()
        }, 500);

        return () => {
            handlerCallback.cancel && handlerCallback.cancel();
            clearTimeout(timer);
        };

    }, [handlerCallback]);

    const handleUrlApi = (data) => {
        setUrlApi(data);
        setCurrentPage(1);
    };

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <SearchBar onUrlApi={handleUrlApi}/>
            <Pagination currentPage={currentPage} onCurrentPage={handleCurrentPage} totalPages={totalPages}/>
            <MovieList listMovie={listMovie}/>
            <Pagination currentPage={currentPage} onCurrentPage={handleCurrentPage} totalPages={totalPages}/>
        </>
    )
}

export default Index
