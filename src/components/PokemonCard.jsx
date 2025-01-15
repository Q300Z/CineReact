import {useEffect, useState} from "react";

const PokemonCard = (props) => {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        fetch(props.url)
            .then(response => response.json())
            .then(data => {
                setPokemon(data)
            });
    }, []);


    if (!pokemon) return (
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="LOGO : Pokemon API"
             className="animate-[pulse_2s_linear_infinite] w-1/6"/>
    )
    else
        return (

            <div
                className="hover:bg-amber-200 w-1/5 text-center justify-items-center shadow-lg drop-shadow border rounded-2xl">
                <div>
                    {pokemon.sprites?.front_default ? (
                        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    ) : pokemon.sprites?.other?.dream_world?.front_default ? (
                        <img
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.name}
                        />
                    ) : (
                        <p>Aucune image disponible</p>
                    )}
                </div>
                <div className="p-2 w-full">
                    <div className="text-blue-600 font-bold capitalize rounded-2xl p-2 w-full">{pokemon.name}</div>
                    <div className="bg-gray-200 rounded-2xl p-2 flex flex-row gap-1 justify-center">
                        {pokemon.types?.map((type, index) => (
                            <div
                                key={index}>{index === pokemon.types.length - 1 ? (type.type.name) : (type.type.name + ",")}</div>
                        ))}
                    </div>
                    <div className="flex flex-row flex-wrap gap-3 justify-center mt-5">
                        <div className="bg-cyan-100 rounded-2xl p-2">
                            <div className="text-pink-500 font-bold">Weight</div>
                            <div>{pokemon.weight} kg</div>
                        </div>
                        <div className="bg-cyan-100 rounded-2xl p-2">
                            <div className="text-pink-500 font-bold">Height</div>
                            <div>{pokemon.weight} kg</div>
                        </div>
                        <div className="bg-cyan-100 rounded-2xl p-2">
                            <div className="text-pink-500 font-bold">Speed</div>
                            <div>{pokemon.weight} kg</div>
                        </div>
                        <div className="bg-cyan-100 rounded-2xl p-2">
                            <div className="text-pink-500 font-bold">Experience</div>
                            <div>{pokemon.weight} kg</div>
                        </div>
                        <div className="bg-cyan-100 rounded-2xl p-2">
                            <div className="text-pink-500 font-bold">Attack</div>
                            <div>{pokemon.weight} kg</div>
                        </div>
                        <div className="bg-cyan-100 rounded-2xl p-2 w-fit">
                            <div className="text-pink-500 font-bold">Abilities</div>
                            <div className="flex flex-row flex-wrap gap-1 justify-center">
                                {pokemon.abilities?.map((ability, index) => (
                                    <div
                                        key={index}>{index === pokemon.types.length - 1 ? (ability.ability.name) : (ability.ability.name + ",")}</div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        );
}

export default PokemonCard;