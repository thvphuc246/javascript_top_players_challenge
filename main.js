import getPlayerScores from "./playerScores.js";
import playersByScore from "./index.js";

const printLeaderBoard = async () => {
  console.log("RESULT:", playersByScore(await getPlayerScores()));
};

printLeaderBoard();
