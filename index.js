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
  playerName.textContent = "Player Name: " + player.name;

  const playerImage = document.createElement("img");
  playerImage.src = player.image;
  playerImage.alt = player.name + "Image";

  const pointsPerGame = document.createElement("p");
  pointsPerGame.textContent = "Points Per Game: " + player.pointspergame;

  const assistsPerGame = document.createElement("p");
  assistsPerGame.textContent = "Assists Per Game: " + player.assistspergame;

  const reboundsPerGame = document.createElement("p");
  reboundsPerGame.textContent = "Rebounds Per Game: " + player.reboundspergame;

  // Container for the stats
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");
  statsContainer.style.display = "none";

  // Button that shows and hides the stats of each player on respective card
  const toggleStatsButton = document.createElement("button");
  toggleStatsButton.textContent = "Toggle Stats";
  toggleStatsButton.addEventListener("click", () => {
    if (statsContainer.style.display === "none") {
      statsContainer.style.display = "block";
    } else {
      statsContainer.style.display = "none";
    }
  });

  statsContainer.appendChild(pointsPerGame);
  statsContainer.appendChild(assistsPerGame);
  statsContainer.appendChild(reboundsPerGame);

  card.appendChild(playerName);
  card.appendChild(toggleStatsButton);
  card.appendChild(statsContainer);

  return card;
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
