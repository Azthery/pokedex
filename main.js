const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [0];
let allPokemons = [0];
let cards = document.getElementById('cards');
const numTotalPokemons = 90; // cantidad de pokemons que se obtendran

loadPokemons();
interactionWithTheFilter();
filter();
search();

//llama a la api
async function callApi(url){
    return ((await fetch(url)).json());
}

//carga los pokemones
async function loadPokemons(){
    let numPokemon = 0;
    try{
        for(let i = 1; i< numTotalPokemons; i++){
            pokemons.push(await callApi(`${URL_API}${i}`));
            allPokemons.push(new Pokemon(pokemons[i]));
            innerPokemonHTML(allPokemons[i]);
            numPokemon = i;
        }
        
        click();
    } catch(err){
        console.log(`Pokemon ID with error is: ${numPokemon+1}`);
        console.error(err);
    }
}

//crea un pokemon como objeto
class Pokemon{
    constructor(pokemons){
        this.name = pokemons.name;
        this.HP = pokemons.stats[0].base_stat;
        this.attack = pokemons.stats[1].base_stat;
        this.defense = pokemons.stats[2].base_stat;
        this.specialAttack = pokemons.stats[3].base_stat;
        this.specialDefense = pokemons.stats[4].base_stat;
        this.speed = pokemons.stats[5].base_stat;
        this.id = pokemons.id;
        this.img = pokemons.sprites.front_default;
        this.weight = pokemons.weight;
        this.type1 = pokemons.types[0].type.name;
        this.id = pokemons.id;
        if(pokemons.types.length == 2){
            this.type2 = pokemons.types[1].type.name;
            this.type = this.type1 + ' '+ this.type2;
        }else{
            this.type = this.type1;
        }
    }
}

//integra la carta del pokemon en el html
async function innerPokemonHTML(pokemons){
    cards.innerHTML += (
        `<section id="${pokemons.type1}" class='${pokemons.name} ${pokemons.type} card pokemon click'>
            <div class='pokemon--basic'>
                <img class='img' src="${pokemons.img}">
                <div class="pokemon--name">${pokemons.name.toUpperCase()}</div>
                <div class"pokemon--type">
                ${pokemons.type}</div>
            </div>
            <div class="stats">
                <div>HP: ${pokemons.HP}</div>
                <div>Attack: ${pokemons.attack}</div>
                <div>Defense :${pokemons.defense}</div>
                <div>Special Attack: ${pokemons.specialAttack}</div>
                <div>Special Defense: ${pokemons.specialDefense}</div>
                <div>Speed: ${pokemons.speed}</div>
                <div>Weight: ${pokemons.weight}</div>
                <div>ID: ${pokemons.id}</div>
            <div/>
        <section/>`
    )
}

//funcion que detecta cuando una carta de un pokemon recibe un click
function click(){
    let onClick = document.getElementsByClassName('click');
    let lastElementOnTheClick;
    //a numTotalPokemons se le resta uno, ya que el ciclo empieza desde el 0
    //no como el ciclo de loadPokemons() que inicia desde el 1
    for(let i = 0; i < numTotalPokemons-1; i++){
        onClick[i].addEventListener('click', () => {
            onClick[i].classList.add('clicked');
            if(lastElementOnTheClick){
                lastElementOnTheClick.classList.remove('clicked');
            }
            lastElementOnTheClick = onClick[i];
            console.log(lastElementOnTheClick);
        });
    }
}

//genera la interaccion del filtro
function interactionWithTheFilter(){
    let filtro = document.getElementById('filter');
    let filtroList = document.getElementById('filter-list');
    let openFilter = false;
    filtroList.classList.add('display--none');
    filtro.addEventListener('click', ()=>{
        if(openFilter){
            filtroList.classList.add('display--none');
            filtro.classList.remove('filter--display');
            openFilter = false;
        }else{
            filtroList.classList.remove('display--none');
            filtro.classList.add('filter--display');
            openFilter = true;
        }
    })
}

async function filter(){
    let filterType = document.getElementsByClassName('filterType');
    let cards = document.getElementsByClassName('card');
    for(let i = 0 ; i < filterType.length ; i++){
        // console.log((filterType[i].innerText).toLowerCase());
        filterType[i].addEventListener("click", (type) => {
            //numTotalPokemons-1 ya que este ciclo empieza de desde el 0
            //no desde el 1
            for(let i = 0 ; i < numTotalPokemons-1 ; i++){
                cards[i].classList.add('display--none');
                if(type.target.id == cards[i].classList[1]){
                    cards[i].classList.remove('display--none');
                }
                if(type.target.id == cards[i].classList[2]){
                    cards[i].classList.remove('display--none');
                }
                //Si es 'all' se desplegan todos
                if(type.target.id == "all"){
                    cards[i].classList.remove('display--none');
                }
            }
        });
    }
}

function search(){
    let elSearch = document.getElementById('search');
    console.log(elSearch);
    elSearch.addEventListener( 'keydown', (el) => {
        if(el.key == 'Enter')
        console.log('awa')
    })
}
let elSearch = document.getElementById('search');
    console.log(elSearch.value);