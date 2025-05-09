let pokemonRepository = (function () {
  // Private variables
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150";

  // Create modal container
  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  document.body.appendChild(modalContainer);

  // Add a Pokémon to the list
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("Invalid Pokemon object");
    }
  }

  // Get all Pokémon
  function getAll() {
    return pokemonList;
  }

  // Add a Pokémon list item to the DOM
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-item");
    listPokemon.appendChild(button);
    pokemonListElement.appendChild(listPokemon);

    // Add event listener to the button
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Load Pokémon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Load Pokémon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map((type) => type.type.name);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Show Pokémon details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Hide modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
    document.removeEventListener("keydown", handleKeydown);
  }

  // Return an object with the public functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Load Pokémon list and display it
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
