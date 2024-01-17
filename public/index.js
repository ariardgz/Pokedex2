const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokeTypes = document.querySelector('.description__pokemon');
const pokemonImage = document.querySelector('.pokemon__image');
const buttonNext = document.querySelector('.btn__next');
const descriptionModal = document.querySelector('.modal__paragraph');

const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const pokeStats = document.querySelector('[data-poke-stats]');

let searchPokemon = 1;

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};
const fetchPokemon = async(pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    

}

const getPokemonDescription = async(pokemon)=>{
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const description = await response.json();
    const descriptionPoke = description['flavor_text_entries'][6]['flavor_text'];
    descriptionModal.textContent = descriptionPoke;

}

const renderPokemon = async(pokemon) =>{
    
    const data = await fetchPokemon(pokemon);
    if(data){
        const {stats, types, name} = data;
        renderPokemonTypes(types);
        renderPokemonStats(stats);
        getPokemonDescription(name);
        
        searchPokemon = data.id
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = `No.${data.id}`;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    

    }else{
        pokemonName.innerHTML = '';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png'
        pokeTypes.innerHTML='No found :('
        pokeStats.innerHTML = 'No found :(';
        descriptionModal.textContent = '';
    }
    
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}




form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const search= inputSearch.value.toLowerCase();
    renderPokemon(search)
    inputSearch.value='';
})

buttonNext.addEventListener('click', (event) =>{
    event.preventDefault();
    searchPokemon += 1;
    renderPokemon(searchPokemon);
}) 

renderPokemon(searchPokemon);

///// Busqueda

const datalist = document.querySelector('#pokemon-options');

inputSearch.addEventListener('input', async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000');
    const datos = await response.json();
    const pokemonNames = datos.results.map(result => result.name);
    const matchingPokemonNames = pokemonNames.filter(name => name.includes(inputSearch.value));
    datalist.innerHTML = matchingPokemonNames.map(name => `<option value="${name}"></option>`).join('');

  // Agregar opciones a la lista desplegable  

    matchingPokemonNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        datalist.appendChild(option);
      });
  });

////OPEN MODAL

const openModal = document.querySelector('.hero__cta');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');

});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');

});

//Libreria estilo
const typed = new Typed('.typed',{
    strings: [
        '<i class="text-color">Trainee!</i>',
        '<i class="text-color">Adventure!</i>',
        '<i class="text-color">Master!</i>',
        '<i class="text-color">Control 2000!</i>'
         ],
    //stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
	typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
	startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
	backSpeed: 50, // Velocidad en milisegundos para borrrar una letra,
	//smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
	shuffle: true, // Alterar el orden en el que escribe las palabras.
	backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
	loop: true, // Repetir el array de strings
	loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
	showCursor: true, // Mostrar cursor palpitanto
	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
})
//Descsription

