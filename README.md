
Um simples Cli-crawler
==

[![CircleCI](https://circleci.com/gh/talesbaz/johnnieCrawler/tree/master.svg?style=svg)](https://circleci.com/gh/talesbaz/johnnieCrawler/tree/master)

Dependencias
============
* PhatomJs: [phatomJs](http://phantomjs.org/download.html)
* NodeJS: [nodejs.org](http://nodejs.org)

Instalando as Dependencies
============
$ npm install

Usando
============

$ node run.js -x get_links

> `prompt: Informe a URL para buscar os links:`

ou:

$ node run.js -x get_links --url https://www.meuovo.com

============

$ node run.js -x screenshot

> `prompt: Informe a URL tirar o screenshot:`

OR:

$ node run.js -x screenshot --url https://www.meuovo.com
