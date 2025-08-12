const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";
let buttonMain = document.getElementById("main");
let buttonStats = document.getElementById("stats");
let buttonEvo = document.getElementById("evo");
let loadValue = 10;
async function fetchPokemonList() {
    const baseurl = await fetch(BASE_URL);
    const data = await baseurl.json();
    pokemonList = data.results.map(pokemon => ({
        name: pokemon.name,
        url: pokemon.url
    }));
}

async function fetchPokemonStats(url) {
    const basicurl = await fetch(url);
    const data = await basicurl.json();
    const name = data.name
    const types = data.types.map(typeInfo => typeInfo.type.name);
    pokemonStats.push({ name, data, types });
}

async function getPokemonEvolutionChain(i) {
    let pokemonSpecies = await fetch(pokemonStats[i].data.species.url);
    let pokemonSpeciesJson = await pokemonSpecies.json();
    let pokemonEvo = await fetch(pokemonSpeciesJson.evolution_chain.url);
    let pokemonEvoJson = await pokemonEvo.json();
    let evolutionChain = [];
    let currentEvolution = pokemonEvoJson.chain;
    while (currentEvolution) {
        let pokemonName = currentEvolution.species.name;
        let pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
        let pokemonJson = await pokemonData.json();
        evolutionChain.push(pokemonJson);
        if (currentEvolution.evolves_to.length > 0) {
            currentEvolution = currentEvolution.evolves_to[0];
        } else {
            break;
        }
    }
    pokemonStats[i].evolutionChain = evolutionChain;
}


async function renderCards() {
    let contentRef = document.getElementById("pokemon-list");
    for (let index = 0; index < 10; index++) {
        contentRef.innerHTML += cardTemplate(index + 1, pokemonList[index].name, pokemonStats[index].data.id);
        pokemonLoadList.push(pokemonList[index].name);
    }
}

async function renderCardsNext() {
    let contentRef = document.getElementById("pokemon-list");
    for (let index = (loadValue - 10); index < loadValue; index++) {
        await getPokemonEvolutionChain(index);
        contentRef.innerHTML += await cardTemplateNext(index + 1, pokemonList[index].name, pokemonStats[index].data.id);
        pokemonLoadList.push(pokemonList[index].name);
    }
}

async function loadMore(event) {
    if (document.getElementById("search").value.length === 0) {
        event.preventDefault();
        loadValue += 10;
        setTimeout(() => {
            renderCardsNext();
            loadMax();
        }, 2200);
    } else {
        alert("Bitte leeren Sie erst die suchleiste bevor Sie mehr Pokemons laden.");
    }
}

function loadMax() {
    let contentRef = document.getElementById("load-more-container");
    if (loadValue === 50) {
        contentRef.classList.add("d_none");
    }
}

async function searchPokemon() {
    const searchValue = document.getElementById("search").value.trim().toLowerCase();
    const contentRef = document.getElementById("pokemon-list");
    contentRef.innerHTML = "";
    if (searchValue.length === 0) {
        await renderCards();
    } else {
        const filteredList = pokemonList.filter(p =>
            p.name.toLowerCase().includes(searchValue)
        );
        for (let i = 0; i < filteredList.length; i++) {
            const p = filteredList[i];
            if (!pokemonStats[p.name]) {
                currentPokemon = [];
                const stats = await fetchPokemonStats(p.url);
                pokemonStats[p.name] = stats;
                currentPokemon.push(p.name, pokemonStats[i].data.id, pokemonStats.findIndex(pokemon => pokemon.name === p.name));
            }
            contentRef.innerHTML += searchCardTemplate(currentPokemon[2], currentPokemon[0], currentPokemon[1]);
        }
    }
}

function tranformWeight(id) {
    let weight = pokemonStats[id].data.weight.toString();
    tranform = `${weight},${weight.slice(1)} kg`;
}

async function renderPokemonOverlay(id) {
    closeOverlay();
    let contentRef = document.getElementById("pokemon-overlay-load");
    contentRef.innerHTML += pokemonOverlayTemplate(id);
}

function showStats(id) {
    let buttonMain = document.getElementById("main");
    let buttonStats = document.getElementById("stats");
    let buttonEvo = document.getElementById("evo");
    buttonMain.classList.remove("pokemon-overlay-nav-button-active");
    buttonStats.classList.add("pokemon-overlay-nav-button-active");
    buttonEvo.classList.remove("pokemon-overlay-nav-button-active");
    let pokemonStats = document.getElementById("pokemon-infomation");
    pokemonStats.innerHTML = "";
    pokemonStats.innerHTML += showPokemonStats(id);
}

function showEvoChain(id) {
    let buttonMain = document.getElementById("main");
    let buttonStats = document.getElementById("stats");
    let buttonEvo = document.getElementById("evo");
    buttonMain.classList.remove("pokemon-overlay-nav-button-active");
    buttonStats.classList.remove("pokemon-overlay-nav-button-active");
    buttonEvo.classList.add("pokemon-overlay-nav-button-active");
    let pokemonDetails = document.getElementById("pokemon-infomation");
    const evolutionChain = pokemonStats[id].evolutionChain;
    switch (evolutionChain.length) {
        case 1:
            pokemonDetails.innerHTML = showEvoChainWithOnePokemon(evolutionChain[0]);
            break;
        case 2:
            pokemonDetails.innerHTML = showEvoChainWithTwoPokemon(evolutionChain[0], evolutionChain[1]);
            break;
        case 3:
            pokemonDetails.innerHTML = showEvoChainWithThreePokemon(evolutionChain[0], evolutionChain[1], evolutionChain[2]);
            break;
    }
}

function closeOverlay() {
    let contentRef = document.getElementById("pokemon-overlay-load");
    contentRef.innerHTML = "";
}


function nextCard(id) {
    if (id < pokemonLoadList.length - 1) {
        closeOverlay();
        renderPokemonOverlay(id + 1);
    } else {
        closeOverlay();
        renderPokemonOverlay(0);
    }
}
function backCard(id) {
    if (id > 0) {
        closeOverlay();
        renderPokemonOverlay(id - 1);
    } else {
        closeOverlay();
        renderPokemonOverlay(id + pokemonLoadList.length - 1);
    }
}