// Wrapping the pokemonList in an IIFE and creating the pokemonRepository object
let pokemonRepository = (function () {
  // This array is now private to the IIFE
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
    { name: "Blastoise", height: 1.6, types: ["water"] },
    { name: "pikachu", height: 0.4, types: ["electric"] },
  ];

  // Public functions that will be returned
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-list");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    // Add event listener to the button
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Return an object with the public functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

// Iterate over each Pokémon in the repository
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
