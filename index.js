console.log("connected");

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
