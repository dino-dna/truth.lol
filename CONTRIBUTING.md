# contributing

- clone
- hack
- commit (please use [the angular style commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit))
  - the linters should auto kickoff.  otherwise, manually run whichever linting is specified in the subpackage you're working on
- test the build as necessary
  - `truth.lol $ node ./build.js`
  - you can test run the build by running `docker run -it -p 4000:4000 dino-dna/truth.lol`
- pull request!

