const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [0];
let allPokemons = [0];
let cards = document.getElementById('cards');

loadPokemons();

//llama a la api
async function callApi(url){
    return ((await fetch(url)).json());
}

//carga los pokemones
async function loadPokemons(){
    try{
        for(let i = 1; i< 25; i++){
            pokemons.push(await callApi(`${URL_API}${i}`));
            allPokemons.push(new Pokemon(pokemons[i]));
            await innerPokemonHTML(allPokemons[i]);
        }
        console.log(allPokemons);
    } catch(err){
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
            `<section id="click" class='pokemon click ${pokemons.type1}'>
                <div class='pokemon--left'>
                    <img class='img' src="${pokemons.img}">
                    <div class="pokemon--name">${pokemons.name.toUpperCase()}</div>
                    <div class"pokemon--type">
                    ${pokemons.type}</div>
                </div>
                <div class="statsNone">
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

function click(){
let aClick = document.getElementById("click");
console.log(aClick)
// aClick.addEventListener("click", () =>{
//     aClick.classList.add('card','stats');
//     aClick.classList.remove('pokemon', 'main', 'statsNone')
// })
}