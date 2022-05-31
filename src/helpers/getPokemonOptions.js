import pokemonApi from "@/api/pokemonApi";

//Se crea un arreglo del pokemon 1 al 650
const getPokemons = () => {
    const pokemones = Array.from(Array(650));

    return pokemones.map((_, index) => index + 1)
};

//se tran los 650 números y con random los desordena
const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

    return pokemons;
    // console.table(pokemons);
};

//se desestructura los 4 que se quieren y son los ids de los 4 pokemones que se van a mostrar
const getPokemonNames = async ([a, b, c, d] = []) => {

    const promiseArr = [
        pokemonApi.get(`${a}`),
        pokemonApi.get(`${b}`),
        pokemonApi.get(`${c}`),
        pokemonApi.get(`${d}`),
    ]

    const [pok1, pok2, pok3, pok4] = await Promise.all(promiseArr)

    return [{
            name: pok1.data.name,
            id: pok1.data.id
        },
        {
            name: pok2.data.name,
            id: pok2.data.id
        },
        {
            name: pok3.data.name,
            id: pok3.data.id
        },
        {
            name: pok4.data.name,
            id: pok4.data.id
        }
    ];

};

export default getPokemonOptions;