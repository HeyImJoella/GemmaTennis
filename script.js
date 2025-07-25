const playerNames = [
  "Gemma",
  "Mariska",
  "Ellen",
  "Jolanda",
  "Els T",
  "Els H",
  "Paulien",
  "José",
  "Sonja",
  "Irene",
  "Reserve",
];

let playerCount = playerNames.length;
const playerContainer = document.getElementById("players");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const generateTeamsBtn = document.getElementById("generateTeamsBtn");

function createPlayerRow(name = "", checked = false) {
  const row = document.createElement("div");
  row.innerHTML = `
    <input type="text" id="name${playerCount}" value="${name}" />
    <label class="present-label">
      Aanwezig
      <input type="checkbox" id="check${playerCount}" ${checked ? "checked" : ""} />
    </label>
  `;
  playerContainer.appendChild(row);
  playerCount++;
}

playerNames.forEach(name => createPlayerRow(name));

addPlayerBtn.addEventListener("click", () => {
  createPlayerRow("", true);
});

generateTeamsBtn.addEventListener("click", () => {
  const activePlayers = [];

  for (let i = 0; i < playerCount; i++) {
    const nameInput = document.getElementById(`name${i}`);
    const checkInput = document.getElementById(`check${i}`);
    if (
      nameInput &&
      checkInput &&
      nameInput.value.trim() &&
      checkInput.checked
    ) {
      activePlayers.push(nameInput.value.trim());
    }
  }

  // Shuffle players
  for (let i = activePlayers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [activePlayers[i], activePlayers[j]] = [activePlayers[j], activePlayers[i]];
  }

  // Generate teams
  const teamsOutput = document.getElementById("teams");
  teamsOutput.innerHTML = "";

  for (let i = 0; i < activePlayers.length; i += 2) {
    if (i + 1 < activePlayers.length) {
      teamsOutput.innerHTML += `<div class="team">🎾 Team: ${activePlayers[i]} & ${activePlayers[i + 1]}</div>`;
    } else {
      teamsOutput.innerHTML += `<div class="team">🚨 Odd one out: ${activePlayers[i]}</div>`;
    }
  }
});