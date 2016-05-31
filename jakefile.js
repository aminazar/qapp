(function(){
   "use strict";
    var semver = require("semver");

    desc("Default build");
    task("default", [ "version" ], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version");
    task("version", function() {
        console.log("Checking Node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = packageJson.engines.node;

        var actualVersion = process.version;
        if (semver.gt(expectedVersion, actualVersion)) {
            fail("Incorrect Node version: expected at least " + expectedVersion + ", but was " + actualVersion);
        }
    });
}());