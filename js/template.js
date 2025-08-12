const typeIcons = {
    fire: `<img class="pokemon-skill fire" src="./assets/icons/fire.svg" alt="">`,
    bug: `<img class="pokemon-skill bug" src="./assets/icons/bug.svg" alt="">`,
    electric: `<img class="pokemon-skill electric" src="./assets/icons/electric.svg" alt="">`,
    fairy: `<img class="pokemon-skill fairy" src="./assets/icons/fairy.svg" alt="">`,
    fighting: `<img class="pokemon-skill fighting" src="./assets/icons/fighting.svg" alt="">`,
    flying: `<img class="pokemon-skill flying" src="./assets/icons/flying.svg" alt="">`,
    grass: `<img class="pokemon-skill grass" src="./assets/icons/grass.svg" alt="">`,
    ground: `<img class="pokemon-skill ground" src="./assets/icons/ground.svg" alt="">`,
    poison: `<img class="pokemon-skill poison" src="./assets/icons/poison.svg" alt="">`,
    psychic: `<img class="pokemon-skill psychic" src="./assets/icons/psychic.svg" alt="">`,
    rock: `<img class="pokemon-skill rock" src="./assets/icons/rock.svg" alt="">`,
    water: `<img class="pokemon-skill water" src="./assets/icons/water.svg" alt="">`,
    normal: `<img class="pokemon-skill normal" src="./assets/icons/normal.svg" alt="">`
};

function cardTemplate(number, name, id) {
    let typesHTML = pokemonStats[number - 1].types.map(type => typeIcons[type]).join('');
    return `
            <div onclick="renderPokemonOverlay(${id - 1})" class="pokemon-card" id="${name}">
            <div class="pokemon-card-header">
                <p>#${number}</p>
                <p>${name}</p>
            </div>
            <div class="pokemon-card-images ${pokemonStats[number - 1].types[0]}">
                <img src="https://img.pokemondb.net/artwork/${name}.jpg">
            </div>
            <div id="pokemonstats${number - 1}" class="pokemon-card-footer">
            ${typesHTML}
            </div>
        </div>
    `;
}

function searchCardTemplate(number, name, id) {
    let typesHTML = pokemonStats[number].types.map(type => typeIcons[type]).join('');
    return `
            <div onclick="renderPokemonOverlay(${number})" class="pokemon-card" id="${name}">
            <div class="pokemon-card-header">
                <p>#${number + 1}</p>
                <p>${name}</p>
            </div>
            <div class="pokemon-card-images ${pokemonStats[number].types[0]}">
                <img src="https://img.pokemondb.net/artwork/${name}.jpg">
            </div>
            <div id="pokemonstats${number - 1}" class="pokemon-card-footer">
             ${typesHTML}
            </div>
        </div>
    `;
}

function cardTemplateNext(number, name, id) {
    let typesHTML = pokemonStats[number - 1].types.map(type => typeIcons[type]).join('');
    return `
            <div onclick="renderPokemonOverlay(${id - 1})" class="pokemon-card" id="${name}">
            <div class="pokemon-card-header">
                <p>#${number}</p>
                <p>${name}</p>
            </div>
            <div class="pokemon-card-images ${pokemonStats[number - 1].types[0]}">
                <img src="https://img.pokemondb.net/artwork/${name}.jpg">
            </div>
            <div id="pokemonstats${number - 1}" class="pokemon-card-footer">
            ${typesHTML}
            </div>
        </div>
    `;
}

function pokemonOverlayTemplate(id) {
    let typesHTML = pokemonStats[id].types.map(type => typeIcons[type]).join('');
    return `
        <section class="pokemon-overlay" id="pokemon-overlay">
        <div class="pokemon-overlay-frame">
            <div class="pokemon-overlay-header">
                <p id="pokemon-overlay-number">#${pokemonStats[id].data.id}</p>
                <h2 id="pokemon-overlay-name">${pokemonStats[id].name}</h2>
                <button class="button" onclick="closeOverlay()">
                    <span class="X"></span>
                    <span class="Y"></span>
                    <div class="close">Close</div>
                </button>
            </div>
            <div class="pokemon-overlay-image ${pokemonStats[id].types[0]}">
                <img src="https://img.pokemondb.net/artwork/${pokemonStats[id].name}.jpg" alt="">
            </div>
            <div class="pokemon-overlay-type">
            ${typesHTML}
            </div>
            <div class="pokemon-overlay-nav">
                <button id="main" onclick="renderPokemonOverlay(${id})" class="pokemon-overlay-nav-button-active">Main</button>
                <button id="stats" onclick="showStats(${id})" >Stats</button>
                <button id="evo" onclick="showEvoChain(${id})" >Evo Chain</button>
            </div>
            <div id="pokemon-infomation" class="pokemon-overlay-main">
                <p>Height : ${pokemonStats[id].data.height}m</p>
                <p>Weight: ${(pokemonStats[id].data.weight / 10).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg</p>
                <p>Base esperience : ${pokemonStats[id].data.base_experience}</p>
                <p>Abilities : ${pokemonStats[id].data.abilities.map(abbilites => abbilites.ability.name)}</p>
            <div class="nextButton">
            <button onclick="backCard(${id})" class="${pokemonStats[id].types[0]}">
            <img src="./assets/icons/pfeil.png" alt="">
            </button>
             <button onclick="nextCard(${id})" class="${pokemonStats[id].types[0]}">
            <img class="rotate" src="./assets/icons/pfeil.png" alt="">
             </button>
             </div>
            </div>
        </div>
    </section>
    `
}

function showEvoChainWithOnePokemon(firstPokemonOfEvoJson) {
    return `
        <div class="evo-chain-one">
            <img class="one-evo-img" src="${firstPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
        </div>
    `;
}

function showEvoChainWithTwoPokemon(firstPokemonOfEvoJson, secondPokemonOfEvoJson) {
    return `
        <div class="evo-chain-images">
            <img class="two-evo-img" src="${firstPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
            <img class="right-arrow" src="./assets/icons/arrow-right.svg">
            <img class="two-evo-img" src="${secondPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
        </div>
    `;
}

function showEvoChainWithThreePokemon(firstPokemonOfEvoJson, secondPokemonOfEvoJson, thridPokemonOfEvoJson) {
    return `
        <div class="evo-chain-images">
            <img class="evo-img" src="${firstPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
            <img class="right-arrow" src="./assets/icons/arrow-right.svg">
            <img class="evo-img" src="${secondPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
            <img class="right-arrow" src="./assets/icons/arrow-right.svg">
            <img class="evo-img" src="${thridPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
        </div>
    `;
}

function showPokemonStats(id) {
    return `
    <div class="pokemon-stats">
                        <div>
                            <p>Hp</p>
                            <div class="pokemon-stats-bar">
                                <div style="width: ${pokemonStats[id].data.stats[0].base_stat}%;" class="pokemon-stats-bar-width ${pokemonStats[id].types[0]}">
                                    <p>${pokemonStats[id].data.stats[0].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pokemon-stats">
                        <div>
                            <p>Attack</p>
                            <div class="pokemon-stats-bar">
                                <div style="width: ${pokemonStats[id].data.stats[1].base_stat}%;" class="pokemon-stats-bar-width ${pokemonStats[id].types[0]}">
                                    <p>${pokemonStats[id].data.stats[1].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pokemon-stats">
                        <div>
                            <p>Defence</p>
                            <div class="pokemon-stats-bar">
                                <div style="width: ${pokemonStats[id].data.stats[2].base_stat}%;" class="pokemon-stats-bar-width ${pokemonStats[id].types[0]}">
                                    <p>${pokemonStats[id].data.stats[2].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pokemon-stats">
                        <div>
                            <p>Special Attack</p>
                            <div class="pokemon-stats-bar">
                                <div style="width: ${pokemonStats[id].data.stats[3].base_stat}%;" class="pokemon-stats-bar-width ${pokemonStats[id].types[0]}">
                                    <p>${pokemonStats[id].data.stats[3].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pokemon-stats">
                        <div>
                            <p>Special Defence</p>
                            <div class="pokemon-stats-bar">
                                <div style="width: ${pokemonStats[id].data.stats[4].base_stat}%;" class="pokemon-stats-bar-width ${pokemonStats[id].types[0]}">
                                    <p>${pokemonStats[id].data.stats[4].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pokemon-stats">
                        <div>
                            <p>Speed</p>
                            <div class="pokemon-stats-bar">
                                <div style="width: ${pokemonStats[id].data.stats[5].base_stat}%;" class="pokemon-stats-bar-width ${pokemonStats[id].types[0]}">
                                    <p>${pokemonStats[id].data.stats[5].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
}

function loaderTemplate() {
    return `
    <div class="loader"></div>
    `
}
