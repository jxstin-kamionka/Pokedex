function init() {
    loadPokemons();
    firstLoad();
}

async function firstLoad() {
    let contentRef = document.getElementById('pokemon-list');
    loader();
    contentRef.classList.toggle('d_none');
    loaderComplete();
}

async function loadPokemons() {
    await fetchPokemonList();
    for (let index = 0; index < pokemonList.length; index++) {
        await fetchPokemonStats(pokemonList[index].url);
        getPokemonEvolutionChain(index);
    }
    renderCards();
}

function loader() {
    let contentRef = document.getElementById('loader');
    contentRef.innerHTML += loaderTemplate();
}

function loaderComplete() {
    let contentRef = document.getElementById('loader');
    let pokemonListRef = document.getElementById('pokemon-list');
    setTimeout(() => {
        contentRef.innerHTML = "";
        contentRef.classList.toggle('d_none');
        pokemonListRef.classList.toggle('d_none');
    }, "2000");
}