# Health Tracker Project
A Backbone JS webapp for track daily calorie intake. Project is live at [Calorie-Tracker](http://calorie-tracker.alamastor.me/).

## Features
- Search the [Nutritionix](https://www.nutritionix.com/) API for foods, and add them to a list of foods, grouped by day.
- Daily average calories for the last week and last month.
- Chart of daily calorie intake.
- Test sample project without logging in, or login with a Google account or anonymously.

## Usage
A built version of project is inside the *dist* directory, the project can be view by running a local HTTP server:
``` bash
$ cd /path/to/project/dir/dist
$ python -m SimpleHTTPServer
```

### Rebuild from source
``` bash
$ cd /path/to/project/dir
$ grunt build
```

### Build and run in debug mode
``` bash
$ cd /path/to/project/dir
$ grunt
```

## Dependencies
This project has the following dependencies:
- [Backbone JS](http://backbonejs.org/)
- [Firebase](https://firebase.google.com/)
- [D3](https://d3js.org/)
- [JQuery](https://jquery.com/)
- [Underscore JS](http://underscorejs.org/)
- [Backbonefire](https://github.com/firebase/backbonefire)
### Dev dependencies
- [Grunt JS](http://gruntjs.com/)
- [Webpack](http://webpack.github.io/)
- [Sass](http://sass-lang.com/)
- [Pleeease](http://pleeease.io/)

## Notes
- API keys are kept in src/js/lib/tokens.js. This is bad practice,
on a real project they should be kept on the the server, and out of version
control, with API calls also made server side.

## Contributors
Alistair McKelvie
