/* globals jake: false, directory: false, desc:false, task:false, complete:false, fail:false */
(function(){
   "use strict";
    var semver = require("semver");
    var lint   = require("simplebuild-jshint");
    var shell = require("shelljs");

    var DIST_DIR = "generated/dist";

    desc("Default build");
    task("default", [ "version", "lint", "build" ], function() {
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

    desc("Lint JavaScript code");
    task("lint", function() {
        process.stdout.write("Linting JavaScript: ");

        lint.checkFiles({
            files: [ "Jakefile.js", "src/javascript/**/*.js" ],
            options: {
                bitwise:true,
                eqeqeq:true,
                forin:true,
                freeze:true,
                futurehostile:true,
                latedef:"nofunc",
                noarg:true,
                nocomma:true,
                nonbsp:true,
                nonew:true,
                strict:true,
                undef:true,
                unused: true,

                node: true,
                browser: true,
            },
            globals: {
                // Mocha
                describe: false,
                it: false,
                before: false,
                after: false,
                beforeEach: false,
                afterEach: false
            },
        }, complete, fail);
    }, { async: true });

    desc("Build distribution directory");
    task("build", [ DIST_DIR ], function() {
        console.log("Building distribution directory: .");

        shell.rm("-rf", DIST_DIR + "/*");
        shell.cp("src/content/*", DIST_DIR);

        jake.exec(
            "node node_modules/browserify/bin/cmd.js -r ./src/javascript/app.js:tabs -o " + DIST_DIR + "/bundle.js",
            { interactive: true },
            complete);
    }, { async: true });

    // Dependency on this directory actually exists
    directory(DIST_DIR);
}());