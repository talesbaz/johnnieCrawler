'use strict';

/**
 * Package dependencies
 */
var Horseman   = require('node-horseman'),
    validUrl   = require('valid-url'),
    fs         = require('fs'),
    prompt     = require('prompt'),
    program    = require('commander'),
    gimmeproxy = require('gimmeproxy');

/**
 * Parse arguments
 */
program
  .version('0.0.1')
  .option('-x --action-to-perform [string]', 'Acao a executar.')
  .option('-u --url [string]',               'Url opcional')
  .option('-p --enable-proxy',               'Ativar proxy')
  .parse(process.argv);

/**
 * Stores an array of actions support by this utility framework.
 * Populated on script load based on files present in the 'actions' directory
 */
var supportedActions = [],
    self             = this;

/**
 * Loads a Horseman instance to facilitate interaction with PhantomJS
 *
 * @return {object} phantomInstance phantom instance
 */
var loadPhantomInstance = function () {

    var options = {
        'phantomPath':     '/usr/local/bin/phantomjs',
        'loadImages':      true,
        'injectJquery':    true,
        'webSecurity':     true,
        'ignoreSSLErrors': true
    };

    if( !program.enableProxy ) {
        console.log('Crawler usando conexao transparente');
    }else{

        console.log('Crawler usando proxy/port:' + self.proxyIpPort);
        options.proxy = self.proxyIpPort;
    }

    var phantomInstance = new Horseman(options);

    phantomInstance.on('consoleMessage', function (msg) {
        console.log('Phantom log: ', msg);
    });

    phantomInstance.on('error', function (msg) {
        console.log('Phantom erro: ', msg);
    });

    return phantomInstance;
};

/**
 * Triggers execution of the appropriate action
 *
 * @return {void}
 */
var main = function () {

    if (!program.actionToPerform) {
        throw 'Informe uma acao. Acoes suportadas: ', supportedActions.join(', ');
    } else if (supportedActions.indexOf(program.actionToPerform) < 0) {
        throw 'Acao invalida. Acoes suportadas: ', supportedActions.join(', ');
    }

    console.log('Executando: ', program.actionToPerform);

    var performAction   = require('./actions/' + program.actionToPerform),
        phantomInstance = loadPhantomInstance();

    prompt.start();
    prompt.override = program;

    switch (program.actionToPerform) {

    case 'screenshot':

        prompt.get([{
            'name': 'url',
            'description': 'Informe a URL tirar o screenshot',
            'required': true,
            conform: function (value) { // eslint-disable-line
                return validUrl.isWebUri(value);
            }
        }], function (err, result) {
            performAction(phantomInstance, result.url);
        });
        break;

    case 'get_links':

        prompt.get([{
            'name': 'url',
            'description': 'Informe a URL para buscar os links',
            'required': true,
            conform: function (value) { // eslint-disable-line
                return validUrl.isWebUri(value);
            }
        }], function (err, result) {
            performAction(phantomInstance, result.url);
        });
        break;

    default:

        phantomInstance.close();
        throw 'Acao invalida. Acoes suportadas: ', supportedActions.join(', ');
    }
};

/**
 * Run immediately on script load to determine available actions and attempt to run the specified action
 * @return {void}
 */
(function () {

    // Generate an array of supported actions based on the files present in the 'actions' directory
    fs.readdir('./actions', function (err, files) {

        files.forEach(function (filename) {
            supportedActions.push(filename.split('.')[0]);
        });

        gimmeproxy.getProxy(100).then(function(proxyData) {
            self.proxyIpPort = proxyData.ipPort;
            main();
        });

    });
})();
