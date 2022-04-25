const poke_container = document.getElementById('poke_container');
const pokemons_number = 45;
const colors = {
	fire: '#FFA500',
	grass: '#008000',
	electric: '#FF00FF',
	water: '#FFFFFF',
	ground: '#8B4513',
	rock: '#708090',
	fairy: '#00FFFF',
	poison: '#6B8E23',
	bug: '#A0522D',
	dragon: '#FF0000',
	psychic: '#1E90FF',
	flying: '#E6E6FA',
	fighting: '#BDB76B',
	normal: '#FFE4E1'
};
const main_types = Object.keys(colors);

const fetchPokemon = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        
        <div class="info">
            <h3 class="name">${name}</h3>
            <span class="number">${pokemon.id
							.toString()
							.padStart(3)}</span>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemon();