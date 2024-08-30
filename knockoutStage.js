function knockoutStage(teams) {
  if (!teams || teams.length < 8) {
    throw new Error("Not enough teams to perform the knockout stage.");
  }

  const results = [];

  // Quarter-Finals
  const quarterFinals = [
    { match: `${teams[0].name} vs ${teams[7].name}`, score: "80:75" },
    { match: `${teams[1].name} vs ${teams[6].name}`, score: "85:70" },
    { match: `${teams[2].name} vs ${teams[5].name}`, score: "78:77" },
    { match: `${teams[3].name} vs ${teams[4].name}`, score: "82:80" },
  ];

  // Semi-Finals
  const semiFinals = [
    { match: `${teams[0].name} vs ${teams[3].name}`, score: "88:85" },
    { match: `${teams[1].name} vs ${teams[2].name}`, score: "90:89" },
  ];

  // Finals
  const finals = [
    { match: `${teams[0].name} vs ${teams[1].name}`, score: "95:90" },
  ];

  results.push({ stage: "Quarter-Finals", matches: quarterFinals });
  results.push({ stage: "Semi-Finals", matches: semiFinals });
  results.push({ stage: "Finals", matches: finals });

  return results;
}

function simulateKnockoutStage(teams) {
  const knockoutResults = knockoutStage(teams);
  knockoutResults.forEach((stage) => {
    console.log(`\n${stage.stage}:`);
    stage.matches.forEach((match) => {
      console.log(`${match.match} (${match.score})`);
    });
  });

  return knockoutResults;
}

module.exports = simulateKnockoutStage;
