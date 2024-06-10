// chiamata api pokemon
async function fetchData() {

    try {
        const pokemonName = document.getElementById('pokemonName').value.toLowerCase()


        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!pokemon.ok) {
            throw new Error("questo non e un pokemon");
        }

        const data = await pokemon.json()


        //nome pokemon
        let pokemonName2 = document.getElementById('pokemonName2')
        pokemonName2.textContent = pokemonName

        //id pokemon
        const NumeroPokemon = document.getElementById('NumeroPokemon')
        const pokemonId = data.id
        NumeroPokemon.textContent = `#${pokemonId}`

        if (!pokemonId) {
            NumeroPokemon.textContent = ''
        }

        //immagine Pokemon
        const pokemonImg = document.getElementById('pokemonSprite2')
        const pokemonSprite = data.sprites.front_default;
        pokemonImg.src = pokemonSprite


        //altezza pokemon
        const pokemonDati = document.getElementById('heightPokemon')
        const pokemonHeight = data.height / 10
        pokemonDati.textContent = `${pokemonHeight}m`

        //peso pokemon
        const weightPokemon = document.getElementById('weightPokemon')
        const pokemonWeight = data.weight / 10
        weightPokemon.textContent = `${pokemonWeight}kg`


        //typo di pokemon
        const pokemonDati2 = document.getElementById('tipoPokemon')
        const pokemonDati3 = document.getElementById('tipo2Pokemon')

        const pokemonType = data.types[0] ? data.types[0].type.name : null
        const pokemonType2 = data.types[1] ? data.types[1].type.name : null


        if (pokemonType) {
            pokemonDati2.textContent = `${pokemonType} /`
            pokemonDati3.textContent = pokemonType2 ? pokemonType2 : ''
        } else {
            pokemonDati2.textContent = ''
            pokemonDati2.textContent = ''
            tipoNonEsiste.textContent = 'non ci sono tipi'
        }
        const tipoNonEsiste = document.getElementById('tipoNonEsiste')



        //abilità pokemon
        const abilityPokemon = document.getElementById('abilityPokemon')
        const ability2Pokemon = document.getElementById('ability2Pokemon')

        const pokemonAbilites = data.abilities[0].ability.name
        const pomekonAbilites2 = data.abilities[1].ability.name

        abilityPokemon.textContent = `${pokemonAbilites} /`
        ability2Pokemon.textContent = pomekonAbilites2


        //vita pokemon
        const hp = document.getElementById('hp')
        const vita = data.stats[0].base_stat
        hp.textContent = vita


        // attaco pokemo
        const att = document.getElementById('att')
        const attac = data.stats[1].base_stat
        att.textContent = attac


        // difesa pokemon
        const dif = document.getElementById('dif')
        const diffesa = data.stats[2].base_stat
        dif.textContent = diffesa


        //attaco speciale pokemon
        const atk = document.getElementById('atk')
        const attSpeciale = data.stats[3].base_stat
        atk.textContent = attSpeciale


        // difesa speciale pokemon
        const def = document.getElementById('def')
        const defSpeciale = data.stats[4].base_stat
        def.textContent = defSpeciale


        // velocità pokemon
        const vel = document.getElementById('vel')
        const velocita = data.stats[5].base_stat
        vel.textContent = velocita

        localStorage.setItem('currentPokemon', JSON.stringify(data));
        console.log('datiarray', data)
    }
    catch (error) {
        console.error(error);
    }
}
fetchData()

// funzione button per pokedex esterno
function togglePokedex() {
    const pokedex = document.getElementById('pokedex');
    if (pokedex.style.display === 'none' || pokedex.style.display === '') {
        pokedex.style.display = 'block';
    } else {
        pokedex.style.display = 'none';
    }


}


function savePokemon() {
    try {
        const currentPokemon = JSON.parse(localStorage.getItem('currentPokemon'));

        console.log("Dati correnti del Pokémon:", currentPokemon);
        if (!currentPokemon) {
            throw new Error('Nessun Pokémon da salvare. Effettua una ricerca prima di salvare.');
        }

        let savedPokemon = JSON.parse(localStorage.getItem('savedPokemon')) || [];

        const isAlreadySaved = savedPokemon.some(pokemon => pokemon.id === currentPokemon.id);
        
        if (!isAlreadySaved) {
            savedPokemon.push(currentPokemon);
            localStorage.setItem('savedPokemon', JSON.stringify(savedPokemon));
            
        } else {
            alert('Questo Pokémon è già stato salvato!');
        }
        loadPokedex();
    } catch (error) {
        console.error('Errore nel salvataggio dei dati del Pokémon:', error);
    }
}

async function loadPokedex() {
    try {
        const savedPokemon = JSON.parse(localStorage.getItem('savedPokemon')) || [];

        const pokedexContainer = document.getElementById('container-pokedex');

        while (pokedexContainer.firstChild) {
            pokedexContainer.removeChild(pokedexContainer.firstChild);
        }


        if (Array.isArray(savedPokemon) && savedPokemon.length > 0) {
            savedPokemon.forEach((pokemon, index) => {
                const div = document.createElement('div');
                div.classList.add('card_pokemon');
                div.innerHTML = `
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p>${pokemon.name} #${pokemon.id}</p>
                    <button onclick="deletePokemon(${index})">Elimina</button>
                `;
                pokedexContainer.appendChild(div);
            });
        } else {
            console.log('Nessun Pokémon salvato o dati salvati non validi.');
        }
    } catch (error) {
        console.error('Errore nel caricamento dei dati del Pokedex:', error);
    }
}

function deletePokemon(index) {
    try {
        let savedPokemon = JSON.parse(localStorage.getItem('savedPokemon')) || [];
        // Assicurati che savedPokemon sia un array
        if (!Array.isArray(savedPokemon)) {
            savedPokemon = [];
        }
        // Rimuovi il Pokémon dall'array in base all'indice fornito
        savedPokemon.splice(index, 1);
        // Aggiorna il localStorage con l'array modificato
        localStorage.setItem('savedPokemon', JSON.stringify(savedPokemon));

        const pokedexContainer = document.getElementById('container-pokedex');
        pokedexContainer.removeChild(pokedexContainer.childNodes[index]);

        loadPokedex(); // Aggiorna il Pokedex dopo aver eliminato il Pokémon
    } catch (error) {
        console.error(`Errore durante l'eliminazione del Pokémon:`, error);
    }
}

