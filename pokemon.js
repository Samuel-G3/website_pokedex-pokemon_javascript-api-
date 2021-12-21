const pokelista$$ = document.querySelector(".pokelista");

const MyPokemonArray = () => {
  const pokemonArray = [];

  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    pokemonArray.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(pokemonArray).then((results) => {
    print(results);
  });

};

const print = (pokemonData) => {
  for (const pokemon of pokemonData) {
    const li$$ = document.createElement("li");
    li$$.innerHTML = `
        <li class="display">
        <h2>${pokemon.name}</h2>
         <img
           class="pokemonimage"
           src="${pokemon.sprites.other["official-artwork"]["front_default"]}"
           alt="${pokemon.name}"
         />
         <p>Type: ${pokemon.types.map((type) => type.type.name).join(", ")} </p>
         <p>Weight: ${pokemon.weight / 10} Kg.</p>
         <p>Height: ${pokemon.height * 10} cm.</p>
        <p>Number: ${pokemon.id} </p>
        </li>`;
    pokelista$$.appendChild(li$$);
  }
};

//_______________BOTÓN:

document.querySelector("#button-search").addEventListener("click", () => {
  let busquedaPokemon = document.querySelector("#formulario").value;

  const searchPokemon = async (busquedaPokemon) => {
    let pokemonAPI = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${busquedaPokemon}`
    );
    pokemonRES = await pokemonAPI.json();

    imprimirPokemon(pokemonRES);
  };
  searchPokemon(busquedaPokemon);

  //_____________POKÉMON CAZADO

  const imprimirPokemon = (pokemonRES) => {
    const btn = document.querySelector("#pickedPokemon");
    btn.innerHTML = `
    <div class="display">
     <h2>${pokemonRES.name}</h2>
    <img
      class="pokemonimage"
      src="${pokemonRES.sprites.other["official-artwork"]["front_default"]}"
      alt="${pokemonRES.name}"
    />
    <p>Type: ${pokemonRES.types.map((type) => type.type.name).join(", ")} </p>
    <p>Weight: ${pokemonRES.weight / 10} Kg.</p>
   <p>Height: ${pokemonRES.height * 10} cm.</p>
   <p>Number: ${pokemonRES.id} </p>
   </div>`;
  };
});

MyPokemonArray();
