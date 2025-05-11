let pokemonRepository = (function () {
  // Private variables
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150";

  // Create modal container
  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  document.body.appendChild(modalContainer);

  // Add CSS styles
  let styleElement = document.createElement("style");
  styleElement.textContent = `
    .pokemon-list {
      margin: 50px auto;
      max-width: 500px;
    }

    .pokemon-list li {
      text-align: center;
    }

    .pokemon-list li button {
      width: 70%;
      font-size: 1.2em;
    }
  `;
  document.head.appendChild(styleElement);

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
    listPokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-item");
    listPokemon.appendChild(button);
    pokemonListElement.appendChild(listPokemon);
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
