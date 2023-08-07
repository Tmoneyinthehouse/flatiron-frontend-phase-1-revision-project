console.log("connected");

// Function to fetch data from JSON file

async function fetchPlayerData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const url = "http://localhost:3000/players";
fetchPlayerData(url)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Function to create a dynamic player card element

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

// Function to display player cards with JSON data

async function displayPlayerCards() {
  const url = "http://localhost:3000/players";
  const playerContainer = document.getElementById("playerContainer");

  try {
    const data = await fetchPlayerData(url);
    data.players.forEach((player) => {
      const newPlayerCard = createPlayerCard(player);
      playerContainer.appendChild(newPlayerCard);
    });
  } catch (error) {
    console.error("Error displaying player cards:", error);
  }
}

displayPlayerCards();
