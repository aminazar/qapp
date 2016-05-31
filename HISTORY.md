History
=======
This file explains the decisions and steps I took in this project that are not necessarily reflected in VCS.

Version Control System
----------------------
30 May 2016: I chose to use Git with [a github public repository](https://github.com/aminazar/qapp/).

Technical details:

`> cd quran_app/`
   
`> git init`
   
`> git add README.md`
   
`> git commit -m "first commit"`

`> git remote add origin https://github.com/aminazar/qapp.git`
   
`> git push -u origin master`

### `.gitignore`
Added webstorm and npm modules - plus an extension used in Mac. Learnt from James Shore.

### Licence
I used Creative Commons zero as license - for now.

Automated build
---------------
Installing Jake:

`> npm install jake --ignore-scripts --save-dev`

* `ignore-scripts`: avoid installing binaries
* `save-dev`: to add jake as dependency in `package.json`

Installing semver to check node version:

`> npm instal semver --ignore-scripts --save-dev`
31 May 16:
Adding jakefile.js for automated build. NodeJS version was added to package.json and semver was used to compare it with actual version.
Adding `JSHint` into jake by installing JSHint and `simplebuild-jshint`
Adding `Browserify` and `shelljs` - to make automated build
Making distribution and source directories and use `browserify` to build the app from modules in source
Adding local server using `http-server` - adding it to `jake run` command


