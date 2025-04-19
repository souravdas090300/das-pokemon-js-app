let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ["Grass", "Poison"],
  },
  {
    name: "Charizard",
    height: 1.7,
    comment: "Wow that's big!",
    type: ["Fire", "Flying"],
  },
  {
    name: "Blastoise",
    height: 1.6,
    type: ["Water"],
  },
];

let output = "";
for (let i = 0; i < pokemonList.length; i++) {
  output += `${pokemonList[i].name} (Height: ${pokemonList[i].height})`;
  if (pokemonList[i].comment) {
    output += ` - ${pokemonList[i].comment}`;
  }
  output += `<br>`;
}

document.body.innerHTML = output;
