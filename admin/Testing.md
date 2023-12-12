# Testing

This repository utilizes the NodeJS Test Runner framework to run our Unit Tests. The tests are found in the [/test](../test) directory. 

The test for a file `src/**/*.js` is found in `test/**/*.test.js`. For example, the test for `src/fetchers/LemmyFetcher.js` is found in `test/fetches/LemmyFetcher.test.js`.

## Running Tests

With a terminal in the repo's directory, run `npm test`. This will run all tests and display basic coverage of the repository. 

## Code Coverage

Our code coverage is automatically analyzed with Codecov. To see the current report, go [here](https://app.codecov.io/gh/cse210-works-on-my-machine/CSE210-Fall23-Team-3) for the full details.