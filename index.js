// Function to fetch data from JSON file

async function fetchPlayerData(url) {
  const resp = await fetch(url);

  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    console.error("Error fetching data:", resp.statusText);
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

  //Different elements that are included on each card
  const playerName = document.createElement("h2");
  playerName.textContent = "Player Name: " + player.name;

  const playerImage = document.createElement("img");
  playerImage.src = player.image;
  playerImage.alt = player.name + "Image";
  playerImage.classList.add("player-image");

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

  // Button that shows and hides the stats of each player on respective card, event listener
  const toggleStatsButton = document.createElement("button");
  toggleStatsButton.textContent = "Toggle Stats";
  toggleStatsButton.addEventListener("click", () => {
    if (statsContainer.style.display === "none") {
      statsContainer.style.display = "block";
    } else {
      statsContainer.style.display = "none";
    }
  });

  // two event listeners that allow background color to change on cards when mouse hovers over them
  card.addEventListener("mouseover", () => {
    card.style.backgroundColor = "#ddd";
    card.style.boxShadow = "0 2px 8px rgba (0, 0, 0, 0.2)";
  });

  card.addEventListener("mouseout", () => {
    card.style.backgroundColor = "#f9f9f9";
    card.style.boxShadow = "0 2px 4px rgba (0, 0, 0, 0.1)";
  });

  //Attaches stats to the stats container
  statsContainer.appendChild(pointsPerGame);
  statsContainer.appendChild(assistsPerGame);
  statsContainer.appendChild(reboundsPerGame);

  //Attaches elements to the player card
  card.appendChild(playerName);
  card.appendChild(playerImage);
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
