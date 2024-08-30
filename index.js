const fs = require("fs");
const { rankTeams, determineAdvancingTeams } = require("./ranking");
const simulateKnockoutStage = require("./knockoutStage");
const { groupStage } = require("./groupStage");

// Load the groups data from groups.json
const groupsData = JSON.parse(fs.readFileSync("groups.json", "utf-8"));

// Function to display the group stage results
function displayGroupResults(groupResults) {
  groupResults.forEach((group) => {
    console.log(`\nGroup ${group.group}:`);
    group.matches.forEach((match) => {
      console.log(
        `${match.winner.Team} - ${match.loser.Team} (${match.score})`
      );
    });
  });
}

// Run the group stage
const groupResults = groupStage(groupsData);

// Display the group stage results
displayGroupResults(groupResults);

// Rank teams after the group stage
const groupsRanked = rankTeams(groupResults);

// Determine which teams advance to the knockout stage
const advancingTeams = determineAdvancingTeams(groupsRanked);

// Simulate the knockout stage
const knockoutResults = simulateKnockoutStage(advancingTeams);

// Display the knockout stage results in detail
knockoutResults.forEach((stage) => {
  console.log(`\n${stage.stage}:`);
  stage.matches.forEach((match) => {
    console.log(`${match.match} (${match.score})`);
  });
});
