_"It's in da spec!"_

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

## Console runner
 
Install daspec globally:

    npm install daspec -g

You can now run daspec in the console:

    daspec --specs ...  --steps ... --output-dir ... [--sources ...] [--formatters ...]

For a list of supported options, run `daspec --help` or see the [DaSpec Command Usage Page](lib/usage.txt). You can also save the default configuration options into a file called `daspec.json` in the working directory, and run `daspec` without arguments.

## NPM script

Install `daspec` to your project repository

    npm install daspec --save-dev

Create a config file pointing `daspec` to your specs and step files. For a list of supported options, see the [DaSpec Command Usage Page](lib/usage.txt). Each command line argument corresponds to the configuration key of the same name, just without the `--` prefix. For example:

    {
    	"specs": ["specs/*.md"],
    	"steps": ["steps/**/*.js"],
    	"sources": ["src/**/*.js"],
    	"output-dir": "daspec-output"
    }

Add a NPM test script using `daspec` to `package.json`, pointing to your config file:

    "scripts": {
      "test": "daspec --config config-path.json"
    },

Alternatively, save the config file as `daspec.json` in your project root, and you won't have to supply the `--config` argument. Now run: 

    npm test

DaSpec will execute the tests, printing the results to the console, and saving the resulting files to the output dir specified in the config file (in the previous example, `daspec-output`).

For en example, see the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) repository on GitHub.

## Continuous integration

Both the console tool and the NPM script set-up will report a non-zero exit code in case of any failures or exceptions during processing. This means that you can use those scripts straight away in a continuous integration setup. However, it's a good idea to change the standard list of formatters to something more easily machine consumable. See the [Installation Guide](http://daspec.com/guides/install.html) for more information about this.

The [JUnit XML formatter](https://github.com/daspec/daspec-js-junit-xml-formatter) produces an output that can be consumed by most continuous integration servers.

## Support

* Documentation: Check out [DaSpec.com](http://daspec.com)
* Questions or ideas: Please send an e-mail to the [DaSpec Google Group](https://groups.google.com/forum/#!forum/daspec)
* Bugs: please create an issue directly in the [daspec-js-npm project on GitHub](https://github.com/daspec/daspec-js-npm/issues)
* News and updates: subscribe via [RSS](http://daspec.com/feed.xml) or follow [@indaspec](https://twitter.com/indaspec) on Twitter
