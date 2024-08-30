function determineAdvancingTeams(groupsRanked) {
  let advancingTeams = [];

  // Get the top teams from each group
  groupsRanked.forEach((group) => {
    advancingTeams.push(...group.teams.slice(0, 3));
  });

  // Sort the advancing teams by points or other criteria
  advancingTeams.sort((a, b) => b.points - a.points);

  // Return the top 8 teams
  return advancingTeams.slice(0, 8).map((team) => ({
    name: team.Team,
    points: team.points,
  }));
}

function rankTeams(groupResults) {
  return groupResults.map((group) => {
    if (!group.teams || !Array.isArray(group.teams)) {
      console.log(
        `Group ${group.group}: teams array is missing or not an array.`
      );
      return group;
    }

    // Calculate points, points scored, and points allowed for each team
    group.teams.forEach((team) => {
      team.points = 0;
      team.pointsScored = 0;
      team.pointsAllowed = 0;
      team.wins = 0;
      team.losses = 0;

      // Iterate over each match to accumulate statistics
      group.matches.forEach((match) => {
        const [teamScore, opponentScore] =
          match.winner.Team === team.Team
            ? match.score.split(":").map(Number)
            : match.score.split(":").map(Number).reverse();

        if (match.winner.Team === team.Team) {
          team.points += 2;
          team.wins += 1;
        } else if (match.loser.Team === team.Team) {
          team.losses += 1;
        }

        team.pointsScored += teamScore;
        team.pointsAllowed += opponentScore;
      });

      team.pointDifference = team.pointsScored - team.pointsAllowed;
    });

    // Sort teams by points, point difference, and then by points scored
    group.teams.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Higher points first
      } else if (b.pointDifference !== a.pointDifference) {
        return b.pointDifference - a.pointDifference; // Higher point difference first
      } else {
        return b.pointsScored - a.pointsScored; // Higher points scored first
      }
    });

    return group;
  });
}

module.exports = {
  rankTeams,
  determineAdvancingTeams,
};
