const fs = require("fs");

// Load teams and groups
const groupsData = JSON.parse(fs.readFileSync("groups.json"));
const exhibitionsData = JSON.parse(fs.readFileSync("exhibitions.json"));

// Calculate the probability of winning based on FIBA rankings
function calculateWinProbability(team1, team2) {
  const rankDifference = team2.FIBARanking - team1.FIBARanking;
  const probability = 0.5 + rankDifference / 100;
  return probability;
}

// Simulate a match between two teams
function simulateMatch(team1, team2) {
  const probability = calculateWinProbability(team1, team2);
  const randomValue = Math.random();

  let result = {};
  if (randomValue < probability) {
    result.winner = team1;
    result.loser = team2;
    result.score = `${Math.floor(Math.random() * 100)}:${Math.floor(
      Math.random() * 90
    )}`;
  } else {
    result.winner = team2;
    result.loser = team1;
    result.score = `${Math.floor(Math.random() * 90)}:${Math.floor(
      Math.random() * 100
    )}`;
  }
  return result;
}

// Process the group stage
function groupStage(groups) {
  const results = [];
  Object.keys(groups).forEach((groupName) => {
    let groupResults = [];
    let teams = groups[groupName];

    // Each team plays with every other team in the group
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const matchResult = simulateMatch(teams[i], teams[j]);
        groupResults.push(matchResult);
      }
    }

    results.push({
      group: groupName,
      teams: teams,
      matches: groupResults,
    });
  });

  return results;
}

module.exports = {
  groupStage,
};
