# Prerequisites
* npm

Run `npm install` in the project root.

# Execution
1. Run `npm start` to run the solution.
2. Run `npm test` to run the tests.

# Description
A function that returns the names of players sorted by their number of wins. Use `playerScores.js` to get the player scores. It returns an array of match results, where each element contains the scores of two players. The higher score wins and there can be ties. For example, the following return value means that Alice has won two games: 
```
[{
   'alice': 10, 
   'bob': 6
}, {
     'charlie': 4, 
    'alice': 10
}]
```
If two or more players have won the same number of games, they can be returned in any order. In the above example, the function should return:
```
['alice', 'bob', 'charlie']  // or ['alice', 'charlie', 'bob]
```

The exported function in `index.js` could be used like this:
```
import playersByScore from 'path/to/thisfolder/index.js'

async function printLeaderBoard() {
  console.log(await playersByScore()); // Prints ['alice', 'bob', 'charlie']
}

printLeaderBoard();
```

# Tests
Mocha package will be installed when running `npm install`.
