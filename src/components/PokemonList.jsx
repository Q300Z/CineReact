import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard.jsx";

const PokemonList = () => {
    const [listPokemon, setListPokemon] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            console.log("PokemonList Component Mounted");
            let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

            try {
                const response = await fetch(nextUrl);
                const data = await response.json();

                setListPokemon(data.results);
            } catch (error) {
                console.error("Erreur lors du fetch des Pokémon :", error);
            }
        };

        fetchPokemon();

        return () => {
            console.log("PokemonList Component Unmounted");
        };
    }, []);

    return (
        <>
            {listPokemon > 0 ? ( // Affiche un message ou un spinner pendant le chargement
                <p>Chargement des Pokémon...</p>
            ) : (
                <div className="flex flex-row flex-wrap gap-5 justify-center select-none">
                    {listPokemon.map((pokemon, index) => (
                        <PokemonCard url={pokemon.url} key={index}/>
                    ))}
                </div>
            )}
        </>
    );
};

export default PokemonList;
