/**
 * Calculate number of wins of each player
 * @method getWinCounts
 * @param {Array} Match scores of all players
 * @param {Object} Number of wins of all players
 * @return {Object} Number of wins for all players
 */
export const getWinCounts = (matches, winCounts = {}) => {
  for (const match of matches) {
    const [p1, p2] = Object.keys(match);
    const [p1Score, p2Score] = [match[p1], match[p2]];
    if (p1Score === p2Score) {
      winCounts[p1] = winCounts[p1] || 0;
      winCounts[p2] = winCounts[p2] || 0;
    }
    if (p1Score > p2Score) winCounts[p1] = (winCounts[p1] || 0) + 1;
    if (p1Score < p2Score) winCounts[p2] = (winCounts[p2] || 0) + 1;
  }
  return winCounts;
};

/**
 * Sort the players based on their number of wins
 * @method playersByScore
 * @param {}
 * @return {Array} Players sorted by wins count in descending order
 */
const playersByScore = (matches) => {
  const winCounts = getWinCounts(matches);                                                            // Count the winning matches of each player
  return Array.from(Object.entries(winCounts)).sort((a, b) => b[1] - a[1]).map((entry) => entry[0]);  // Sort & return the players array
};

export default playersByScore;
