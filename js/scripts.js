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

  // Show modal with Pokémon details
  function showModal(pokemon) {
    // Clear existing modal content
    modalContainer.innerHTML = "";

    // Create modal content
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", hideModal);

    let title = document.createElement("h1");
    title.innerText = pokemon.name;

    let image = document.createElement("img");
    image.src = pokemon.imageUrl;
    image.alt = pokemon.name;

    let height = document.createElement("p");
    height.innerText = `Height: ${pokemon.height}`;

    let types = document.createElement("p");
    types.innerText = `Types: ${pokemon.types.join(", ")}`;

    // Append elements to modal
    modal.appendChild(closeButton);
    modal.appendChild(title);
    modal.appendChild(image);
    modal.appendChild(height);
    modal.appendChild(types);

    // Append modal to modal container
    modalContainer.appendChild(modal);

    // Show modal
    modalContainer.classList.add("is-visible");

    // Add keyboard event listener for closing modal
    document.addEventListener("keydown", handleKeydown);
  }

  // Hide modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
    document.removeEventListener("keydown", handleKeydown);
  }

  // Handle keyboard events
  function handleKeydown(event) {
    if (event.key === "Escape") {
      hideModal();
    }
  }

  // Close modal when clicking outside of it
  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      hideModal();
    }
  });

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

function showmodal(item) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");
  let pokemonHeader = $(".modal-header");

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $("<h1>" + item.name + "</h1>");
  let imageElementFront = $('<img class="modal-img" style="width:50%">');
  imageElementFront.attr("src", item.imageUrlFront);
  let imageElementBack = $('<img class="modal-img" style="width:50%">');
  imageElementBack.attr("src", item.imageUrlBack);
  let heightElement = $("<p>" + "height: " + item.height + "</p>");
  let typesElement = $("<p>" + "types: " + item.types + "</p>");
  let abilitiesElement = $("<p>" + "abilites: " + item.abilites + "</p>");

  modalTitle.append(nameElement);
  modalBody.append(imageElementFront);
  modalBody.append(imageElementBack);
  modalBody.append(heightElement);
  modalBody.appemd(typesElement);
  modalBody.append(abilitiesElement);
}
