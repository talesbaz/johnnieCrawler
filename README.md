
Um simples Cli-crawler
==

[![Circle CI](https://circleci.com/gh/talesbaz/johnnieCrawler.svg?style=shield&circle-token=0e8e0bbeb7beb325e9efd5d13b60a97e0ca58ead)](https://circleci.com/gh/talesbaz/johnnieCrawler/)

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
