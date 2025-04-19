let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ["Grass", "Poison"],
  },
  {
    name: "Charizard",
    height: 1.7,
    type: ["Fire", "Flying"],
  },
  {
    name: "Blastoise",
    height: 1.6,
    type: ["Water"],
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  let output = `${pokemonList[i].name} (Height: ${pokemonList[i].height})`;
  if (pokemonList[i].height > 1.5) {
    output += " - Wow that's big!";
  }
  document.writeln(output + `<br>`);
}
