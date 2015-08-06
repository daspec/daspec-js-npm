"It's in da spec"

DaSpec console runner for Node.js

# What is DaSpec?

DaSpec is an automation framework for [Executable Specifications](http://daspec.com/guides/executable_specifications.html) in Markdown. It can help you:

* Share information about planned features with non-technical stakeholders easily, and get actionable unambiguous feedback from them 
* Ensure and document shared understanding of the planned software, making the definition of done stronger and more objective
* Document software features and APIs in a way that is easy to understand and maintain, so you can reduce the bus factor of your team and onboard new team members easily
* Make any kind of automated tests readable to non-technical team members and stakeholders

DaSpec helps teams achieve those benefits by validating human-readable documents against a piece of software. This makes it easy to argue if the software really does what the document claims, and also quickly points out to places in your documentation that need to be updated. Because of that, DaSpec can support you in moving from  confidence-based to evidence-based acceptance testing, and creating a living documentation system to remove knowledge bottlenecks.

DaSpec's primary target are teams practising Behaviour Driven Development, Specification by Example, ATDD and generally running short, frequent delivery cycles with a heavy dependency on test automation. It can, however, be useful to anyone looking to reduce the cost of discovering outdated information in documentation and tests. 

## Installation

You can run DaSpec directly from the console, as a standalone utility, or you can integrate it using NPM scripts.

##Console runner
 
Install daspec globally:

    npm install daspec -g

You can now run daspec in the console:

    daspec --specs ...  --steps ... --output-dir ... [--sources ...]

* __--specs__: (required) list of markdown files containing specifications. All the usual wildcard patterns are supported
* __--steps__: (required) list of javascript files containing step definitions. All the usual wildcard patterns are supported
* __--output-dir__: (required) where to store the result files
* __--sources__: (optional) list of javascript files that will be loaded into global scope before step definitions. Not necessary if step definition files load the relevant source as node modules. All the usual wildcard patterns are supported.

or 

	daspec --config <configuration file>

* __--config__: (required) path to a config file that contains a JSON with the relevant options

You can also save the default configuration options into a file called __daspec.json__ in the working directory, and run __daspec__ without arguments.

## NPM script

Install daspec to your project repository

    npm install daspec --save-dev

Create a config file telling daspec where your specs and JS sources are:

    {
    	"specs": ["specs/*.md"],
    	"steps": ["steps/**/*.js"],
    	"sources": ["src/**/*.js"],
    	"output-dir": "daspec-output"
    }

Add a NPM test script using daspec to __package.json__, pointing to your config file

    "scripts": {
      "test": "daspec --config config-path.json"
    },

Alternatively, save the config file as __daspec.json__ in your project root, and you won't have to supply the __--config__ argument. Now run 

    npm test

and DaSpec will execute the tests, printing the results to the console, and saving the resulting files to the output dir specified in the config file (in the previous example, __daspec-output__).

For en example, see the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) repository on GitHub.

## Support

* Documentation: Check out [DaSpec.com](http://daspec.com)
* Questions or ideas: Please send an e-mail to the [DaSpec Google Group](https://groups.google.com/forum/#!forum/daspec)
* Bugs: please create an issue directly in the [daspec-js-npm project on GitHub](https://github.com/daspec/daspec-js-npm/issues)
* News and updates: subscribe via [RSS](http://daspec.com/feed.xml) or follow [@indaspec](https://twitter.com/indaspec) on Twitter
