// Wrapping the pokemonList in an IIFE and creating pokemonRepository
let pokemonRepository = (function () {
  // This array is now private to the IIFE
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
    { name: "Blastoise", height: 1.6, types: ["water"] },
  ];

  // Public functions that will be returned
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector(".pokemon-list"); // select the ul elemennt
    let listpokemon = document.createElement("li"); // create a new li element
    let button = document.createElement("button"); // ceate a new button element
    button.innerText = "pokemon.name"; // set the button's text to the pokemon's name
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon); // append the li element to the ul
    but;
  });
  function addListItem(pokemon) {
    let ulElement = document.querySelector("ul"); // Select the ul element
    let liElement = document.createElement("li"); // Create a new li element
    let button = document.createElement("button"); // Create a new button element
    button.innerText = pokemon.name; // Set the button's text to the Pokémon's name
    button.classList.add("pokemon-button"); // Add a class to the button
    liElement.appendChild(button); // Append the button to the li element
    ulElement.appendChild(liElement); // Append the li element to the ul
  }

  // Return an object with the public functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

// Add a new Pokémon to the repository
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });

// Iterate over each Pokémon in the repository
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
