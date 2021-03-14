const URL_API = 'https://pokeapi.co/api/v2/pokemon/'
let pokemons = [];
let bloques = document.getElementById('bloques');

chargerPokemons();

async function loadPokemons(url){
    return ((await fetch(url)).json());
}

async function chargerPokemons(){
    try{
        let callingPokemons = await loadPokemons(URL_API); //obtiene el url
        await callPokemons(callingPokemons);               //obtiene todos los pokemons en array
        await click();
        console.log(pokemons);
        
    } catch(err){
        console.error(err);
    }
}

async function callPokemons(callingPokemons){
    const F = 1;
    for(let i = 0; i < F; i++){
        pokemons = pokemons.concat((callingPokemons).results);
        callingPokemons = await loadPokemons(callingPokemons.next);
    }
    //este ciclo da a la array pokemons todos los datos de cada pokemon
    for(let i = 0; i<(F*20) ;i++){
        let pokemon = await loadPokemons(pokemons[i].url);
        pokemons[i].name = pokemons[i].name.toLocaleUpperCase();
        pokemons[i].HP = pokemon.stats[0].base_stat;
        pokemons[i].attack = pokemon.stats[1].base_stat;
        pokemons[i].defense = pokemon.stats[2].base_stat;
        pokemons[i].specialAttack = pokemon.stats[3].base_stat;
        pokemons[i].specialDefense = pokemon.stats[4].base_stat;
        pokemons[i].speed = pokemon.stats[5].base_stat;
        pokemons[i].weight = pokemon.weight;
        pokemons[i].id = pokemon.id;
        pokemons[i].img = pokemon.sprites.front_default;
        
        if(pokemon.types.length == 2){
            pokemons[i].type = pokemon.types[0].type.name +' '+ pokemon.types[1].type.name
        }else{
            pokemons[i].type = pokemon.types[0].type.name
        }
        delete pokemons[i].url;

        bloques.innerHTML += (
            `<div id="click" class='pokemon click'>
                <img class='img' src="${pokemons[i].img}"> 
                <div class="pokemon--name">${pokemons[i].name}</div>
                <div class"pokemon--type type1--${pokemons[i].type}">
                ${pokemons[i].type}</div>
                <div class="statsNone">
                    <div>HP: ${pokemons[i].HP}</div>
                    <div>Attack: ${pokemons[i].attack}</div>
                    <div>Defense :${pokemons[i].defense}</div>
                    <div>Special Attack: ${pokemons[i].specialAttack}</div>
                    <div>Special Defense: ${pokemons[i].specialDefense}</div>
                    <div>Speed: ${pokemons[i].speed}</div>
                    <div>Weight: ${pokemons[i].weight}</div>
                <div/>
            <div/>`
        )
    }
    return pokemons
}

function click(){
let aClick = document.getElementById("click");
console.log(aClick)
aClick.addEventListener("click", () =>{
    aClick.classList.add('card','stats');
    aClick.classList.remove('pokemon', 'main', 'statsNone')
})
}