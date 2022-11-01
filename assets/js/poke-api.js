const pokeApi = {}

// const offset = 0;
// const limit = 10;

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.type = type
    pokemon.types = types
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`  
    return fetch(url)
    .then((response) => response.json())
    .then(json => json.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailsRequests => Promise.all(detailsRequests))
    .then(pokemonDetails => pokemonDetails)
}
