
 async function fetchData(){


     try{
         const pokemonName = document.getElementById('pokemonName').value.toLowerCase()

         const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

         if(!pokemon.ok){
             throw new Error("questo non e un pokemon");
         }

         const data = await pokemon.json()
         const pokemonSprite = data.sprites.front_default;
         const pokemonImg = document.getElementById('pokemonSprite2')


         console.log(data)

         pokemonImg.src = pokemonSprite

     }
     catch(error){
         console.error(error);
     }
 }

 fetchData()




