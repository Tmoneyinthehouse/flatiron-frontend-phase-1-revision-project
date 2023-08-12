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

fetch("http://localhost:3000/players")
  .then((resp) => resp.json())
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

  //Event listener that displays a player's stats upon click of button on card
  const displayStatsButton = document.createElement("button");
  displayStatsButton.textContent = "Display Stats";
  displayStatsButton.addEventListener("click", () => {
    displayPlayerStats(player);
  });

  card.appendChild(playerName);
  card.appendChild(pointsPerGame);
  card.appendChild(assistsPerGame);
  card.appendChild(reboundsPerGame);
  card.appendChild(displayStatsButton);

  return card;
}

function displayPlayerStats(player) {
  alert(`Player: ${player.name}
  Points Per Game: ${player.pointspergame}
  Assists Per Game: ${player.assistspergame}
  Rebounds Per Game: ${player.reboundspergame}`);
}

// Function to display player cards with JSON data

async function displayPlayerCards() {
  const url = "http://localhost:3000/players";
  const playerContainer = document.getElementById("playerContainer");

  try {
    const data = await fetchPlayerData(url);

    console.log("Fetched data:", data);

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((player) => {
        const newPlayerCard = createPlayerCard(player);
        playerContainer.appendChild(newPlayerCard);
      });
    } else {
      console.error("Error displaying player cards: Invalid data format");
    }
  } catch (error) {
    console.error("Error displaying player cards:", error);
  }
}

displayPlayerCards();
