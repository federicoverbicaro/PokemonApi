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


        console.log('datiarray', data)
        console.log(vita)
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

