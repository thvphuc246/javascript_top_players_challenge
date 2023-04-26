import assert from "assert";
import { performance } from "perf_hooks";
import playersByScore, { getWinCounts } from "./index.js";

const smallDataThreshold = 1;
const bigDataThreshold = 1000;

describe("getWinCounts", () => {
  it("should return an object with the correct win counts for the given matches within acceptable threshold", () => {
    const startTime = performance.now();
    const matches = [
      { alice: 5, bob: 2 },
      { charlie: 3, david: 7 },
      { alice: 10, charlie: 8 },
      { david: 6, bob: 6 },
      { bob: 1, charlie: 9 },
    ];
    const expectedWinCounts = {
      alice: 2,
      bob: 0,
      charlie: 1,
      david: 1,
    };
    const actualWinCounts = getWinCounts(matches);
    const endTime = performance.now();
    const duration = endTime - startTime;
    assert.ok(duration < smallDataThreshold, `Runtime: (${duration} ms) exceeds acceptable threshold: (${smallDataThreshold} ms)`);
    assert.deepStrictEqual(actualWinCounts, expectedWinCounts);
  });

  it("should return an empty object if no matches are given", () => {
    const matches = [];
    const expectedWinCounts = {};
    const actualWinCounts = getWinCounts(matches);
    assert.deepStrictEqual(actualWinCounts, expectedWinCounts);
  });

  it("should not count the ties", () => {
    const startTime = performance.now();
    const matches = [
      { alice: 5, bob: 5 },
      { charlie: 2, david: 2 },
      { alice: 3, charlie: 4 },
      { david: 1, bob: 0 },
      { bob: 1, charlie: 1 },
    ];
    const expectedWinCounts = {
      alice: 0,
      bob: 0,
      charlie: 1,
      david: 1,
    };
    const actualWinCounts = getWinCounts(matches);
    const endTime = performance.now();
    const duration = endTime - startTime;
    assert.ok(duration < smallDataThreshold, `Runtime: (${duration} ms) exceeds acceptable threshold: (${smallDataThreshold} ms)`);
    assert.deepStrictEqual(actualWinCounts, expectedWinCounts);
  });
});

describe("playersByScore", () => {
  it("should sort the players array by their win counts within acceptable threshold", () => {
    const startTime = performance.now();
    const matches = [
      { alice: 6, george: 7 },
      { alice: 0, charlie: 3 },
      { alice: 2, viktor: 6 },
      { alice: 0, anthony: 0 },
      { alice: 6, romano: 2 },
      { alice: 4, roger: 4 },
      { george: 5, charlie: 9 },
      { george: 7, viktor: 1 },
      { george: 1, anthony: 10 },
      { george: 10, romano: 10 },
      { george: 0, roger: 4 },
      { charlie: 3, viktor: 7 },
      { charlie: 1, anthony: 7 },
      { charlie: 1, romano: 0 },
      { charlie: 10, roger: 8 },
      { viktor: 4, anthony: 7 },
      { viktor: 2, romano: 6 },
      { viktor: 0, roger: 9 },
      { anthony: 3, romano: 2 },
      { anthony: 0, roger: 6 },
      { romano: 9, roger: 3 },
    ];
    const expected = [
      "charlie",
      "anthony",
      "roger",
      "george",
      "viktor",
      "romano",
      "alice"
    ];
    const result = playersByScore(matches);
    const endTime = performance.now();
    const duration = endTime - startTime;
    assert.ok(duration < smallDataThreshold, `Runtime: (${duration} ms) exceeds acceptable threshold: (${smallDataThreshold} ms)`);
    assert.deepStrictEqual(result, expected);
  });

  it("should handle an empty matches object", () => {
    const matches = [];
    const expected = [];
    const result = playersByScore(matches);
    assert.deepStrictEqual(result, expected);
  });

  it("should handle object with 10000000 matches within acceptable threshold", () => {
    // Generate random data with 10 million matches
    const players = ['alice', 'george', 'charlie', 'viktor', 'anthony', 'romano', 'roger'];
    const matches = [];
    for (let i = 0; i < 10000000; i++) {
      const player1 = players[Math.floor(Math.random() * players.length)];
      let player2 = players[Math.floor(Math.random() * players.length)];
      while (player2 === player1) {
        player2 = players[Math.floor(Math.random() * players.length)];
      }
      const match = {};
      match[player1] = Math.floor(Math.random() * 11);
      match[player2] = Math.floor(Math.random() * 11);
      matches.push(match);
    }
    // Test the main function's performance
    const startTime = performance.now();
    playersByScore(matches);
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Duration: ${duration}ms`);
    assert.ok(duration < bigDataThreshold, `Runtime: (${duration} ms) exceeds acceptable threshold: (${bigDataThreshold} ms)`);
  });
});
