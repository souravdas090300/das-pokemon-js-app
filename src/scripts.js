// pokemon repository module.
let pokemonRepository = (function () {
  // Private variables
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let currentPage = 1;
  const itemsPerPage = 30;

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

  // Get paginated Pokémon
  function getPaginatedItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pokemonList.slice(startIndex, endIndex);
  }

  // Add a Pokémon list item to the DOM
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("div");
    listItem.classList.add("col-md-4", "col-12");

    let listPokemon = document.createElement("li");
    listPokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-item");

    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokemonModal");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listPokemon.appendChild(button);
    listItem.appendChild(listPokemon);
    pokemonListElement.appendChild(listItem);
  }

  // Update pagination buttons
  function updatePaginationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * itemsPerPage >= pokemonList.length;
  }

  // Load Pokémon for current page
  function loadPage(page) {
    currentPage = page;
    const paginatedItems = getPaginatedItems(page);
    const pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";

    paginatedItems.forEach(function (pokemon) {
      addListItem(pokemon);
    });

    updatePaginationButtons();
  }

  // Initialize pagination
  function initPagination() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        loadPage(currentPage - 1);
      }
    });

    nextBtn.addEventListener("click", function () {
      if (currentPage * itemsPerPage < pokemonList.length) {
        loadPage(currentPage + 1);
      }
    });

    updatePaginationButtons();
  }

  // show modal with Pokemon details.
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
    let typesElement = $(
      "<p>" + "types : " + pokemon.types.join(", ") + "</p>"
    );
    let abilitiesElement = $(
      "<p>" + "abilities : " + pokemon.abilities + "</p>"
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // Filter Pokémon based on search term
  function filterPokemon(searchTerm) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Clear the Pokémon list in the DOM
  function clearPokemonList() {
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";
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
        // Initialize pagination after loading Pokémon
        loadPage(1);
        initPagination();
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
        item.weight = details.weight;
        item.types = details.types.map((type) => type.type.name);
        item.abilities = details.abilities
          .map((ability) => ability.ability.name)
          .join(", ");
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

  // Initialize search functionality
  function initSearch() {
    let searchInput = document.getElementById("pokemonSearch");
    searchInput.addEventListener("input", function () {
      let searchTerm = searchInput.value.trim();
      let filteredPokemon = filterPokemon(searchTerm);

      clearPokemonList();
      if (searchTerm === "") {
        loadPage(currentPage);
      } else {
        filteredPokemon.forEach(function (pokemon) {
          addListItem(pokemon);
        });
      }
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
    initSearch: initSearch,
    loadPage: loadPage,
  };
})();

// Load Pokémon list and display it
pokemonRepository.loadList().then(function () {
  // Initialize search after loading Pokémon
  pokemonRepository.initSearch();
});
