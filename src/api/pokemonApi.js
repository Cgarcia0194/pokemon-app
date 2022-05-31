import axios from 'axios';
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonApi = axios.create({
    baseURL
});

export default pokemonApi;