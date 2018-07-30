
A simple Cli-crawler
==

[![Circle CI](https://circleci.com/gh/talesbaz/johnnieCrawler.svg?style=shield&circle-token=0e8e0bbeb7beb325e9efd5d13b60a97e0ca58ead)](https://circleci.com/gh/talesbaz/johnnieCrawler/) 

Dependencies
============
* PhatomJs: [phatomJs](http://phantomjs.org/download.html)
* NodeJS: [nodejs.org](http://nodejs.org)

Install Dependencies
============
$ npm install

Using
============

$ node run.js -x get_links

> `prompt: Informe a URL para buscar os links:`

or:

$ node run.js -x get_links --url https://www.myurl.com

============

$ node run.js -x screenshot

> `prompt: URL for the screenshot:`

or:

$ node run.js -x screenshot --url https://www.myurl.com
