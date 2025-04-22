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

  // Return an object with the public functions
  return {
    getAll: getAll,
    add: add,
  };
})();

// Add a new Pokémon to the repository
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] });

// Iterate over each Pokémon in the repository
pokemonRepository.getAll().forEach(function (pokemon) {
  let output = `${pokemon.name} (Height: ${pokemon.height})`;
  if (pokemon.height > 1.5) {
    output += " - Wow that's big!";
  }
  document.writeln(output + `<br>`);
});
