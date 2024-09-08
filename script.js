const pokemonIDElem = document.getElementById("pokemon-id");
const pokemonNameElem = document.getElementById("pokemon-name");
const spriteContainerElem = document.getElementById("sprite-container");
const typesElem = document.getElementById("types");
const heightElem = document.getElementById("height");
const weightElem = document.getElementById("weight");
const hpElem = document.getElementById("hp");
const attackElem = document.getElementById("attack");
const defenseElem = document.getElementById("defense");
const specialAttackElem = document.getElementById("special-attack");
const specialDefenseElem = document.getElementById("special-defense");
const speedElem = document.getElementById("speed");
const searchFormElem = document.getElementById("search-form");
const searchInputElem = document.getElementById("search-input");

const fetchPokemon = async() => {
    const query = searchInputElem.value.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        const data = await response.json();

        // Display Pokémon information
        pokemonNameElem.textContent = data.name.toUpperCase();
        pokemonIDElem.textContent = `#${data.id}`;
        weightElem.textContent = `Weight: ${data.weight}`;
        heightElem.textContent = `Height: ${data.height}`;
        spriteContainerElem.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} sprite">`;

        // Display stats
        hpElem.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
        attackElem.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
        defenseElem.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
        specialAttackElem.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
        specialDefenseElem.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
        speedElem.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

        // Display types
        typesElem.innerHTML = data.types.map(type => `<span class="type ${type.type.name}">${type.type.name}</span>`).join(' ');
    } catch (error) {
        clearDisplay();
        alert("Pokémon not found");
        console.error(`Error fetching Pokémon: ${error}`);
    }
};

const clearDisplay = () => {
    const spriteElem = document.getElementById("sprite");
    if (spriteElem) spriteElem.remove();

    pokemonNameElem.textContent = '';
    pokemonIDElem.textContent = '';
    typesElem.innerHTML = '';
    heightElem.textContent = '';
    weightElem.textContent = '';
    hpElem.textContent = '';
    attackElem.textContent = '';
    defenseElem.textContent = '';
    specialAttackElem.textContent = '';
    specialDefenseElem.textContent = '';
    speedElem.textContent = '';
};

searchFormElem.addEventListener("submit", event => {
    event.preventDefault();
    fetchPokemon();
});