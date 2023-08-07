console.log("connected");

async function fetchData("") {
  try {
    const resp = await fetch("");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function createPlayerCard(player) {
  const card = document.createElement("div");
  card.classList.add("player-card");

  const playerName = document.createElement("h2");
  playerName.textContent = player.name;

  const pointsPerGame = document.createElement("p");
  pointsPerGame.textContent = `Points Per Game: ${player.pointspergame}`;

  const assistsPerGame = document.createElement("p");
  assistsPerGame.textContent = `Assists Per Game: ${player.assistspergame}`;

  const reboundsPerGame = document.createElement("p");
  reboundsPerGame.textContent = `Rebounds Per Game: ${player.reboundspergame}`;

  card.appendChild(playerName);
  card.appendChild(pointsPerGame);
  card.appendChild(assistsPerGame);
  card.appendChild(reboundsPerGame);

  return card;
}

async function displayPlayerCards() {
  const url = 'db.json';
  const playerContainer = document.getElementById('playerContainer');

  try {
    const data = await fetchData("");
    data.players.forEach(player => {
      const newPlayerCard = createPlayerCard(player);
      playerContainer.appendChild(newPlayerCard);
    });
  }
}
