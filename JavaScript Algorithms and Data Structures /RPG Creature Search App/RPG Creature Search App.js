const APIResults = document.getElementById('APIResults');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const firstResults = document.getElementById('first-results');
const creatureName = document.getElementById('creature-name');
const creatureID = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const specialName = document.getElementById('special-name');
const specialDescription = document.getElementById('special-description');
const hpValue = document.getElementById('hp');
const attackValue = document.getElementById('attack');
const defenseValue = document.getElementById('defense');
const specialDefenseValue = document.getElementById('special-defense');
const specialAttackValue = document.getElementById('special-attack');
const speedValue = document.getElementById('speed');
const loader = document.getElementById('loading');

async function fetchDataController(userInput) {
  try {
    UIDesactivate();
    const data = await fetchData(userInput);
    if (!data || !data.name) {
      throw new Error("Creature not found");
    }
    displayData(data);
  } catch (error) {
    dataNotLoaded();
    alert("Creature not found");
  }
}

async function fetchData(userInput) {
  const rawData = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${userInput.toLowerCase()}`);
  if (!rawData.ok) {
    throw new Error("Creature not found");
  }
  const filteredData = await rawData.json();
  return filteredData;
}

function UIDesactivate() {
  loader.style.visibility = 'visible';
  
}

function UIActivate(data) {
  creatureName.innerHTML = makeCapital(data.name);
  
  creatureID.innerHTML = data.id;
  weight.innerHTML = `Weight: ${data.weight}`;
  height.innerHTML = `Height: ${data.height}`;

  
  types.innerHTML = '';
  data.types.forEach(type => {
    const li = document.createElement('li');
    li.textContent = type.name.toUpperCase();
    li.classList.add('types-list');
    
    types.appendChild(li);
  });

  specialName.innerHTML = data.special.name;
  specialDescription.innerText = data.special.description;

  hpValue.innerText = data.stats[0].base_stat;
  attackValue.innerText = data.stats[1].base_stat;
  defenseValue.innerText = data.stats[2].base_stat;
  specialAttackValue.innerText = data.stats[3].base_stat;
  specialDefenseValue.innerText = data.stats[4].base_stat;
  speedValue.innerText = data.stats[5].base_stat;

  firstResults.style.visibility = 'visible';
  desactivateUITempComponents();
}

function dataNotLoaded() {
  hpValue.innerText = '';
  attackValue.innerText = '';
  defenseValue.innerText = '';
  specialDefenseValue.innerText = '';
  specialAttackValue.innerText = '';
  speedValue.innerText = '';
  firstResults.style.visibility = 'hidden';
  types.innerHTML = '';
  specialName.innerText = '';
  specialDescription.innerText = '';
  desactivateUITempComponents();
}

function desactivateUITempComponents() {
  loader.style.visibility = 'hidden';
  searchInput.value = '';

}

function makeCapital(str) {
  return str.toUpperCase();
}

function displayData(data) {
  UIActivate(data);
}

searchButton.addEventListener('click', e => {
  e.preventDefault();
  if (!searchInput.value.trim()) return; 
  fetchDataController(searchInput.value.trim());
});
