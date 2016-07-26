'use strict';

/**
 * Get links using url
 *
 * @param {object} phantomInstance Horseman phantomInstance
 * @param {string} url url to take screenshot
 * @return {void}
 */
module.exports = function (phantomInstance, url) {

    if (!url || typeof url !== 'string') {
        throw Error('Url obrigatoria');
    }

    console.log('Buscando links de: ', url);

    phantomInstance
      .open(url)
      .status()
      .then(function (statusCode) {

          if (Number(statusCode) >= 400) {
              throw Error('Erro status: ' + statusCode);
          }
      })

      // Interact with the page. This code is run in the browser.
      .evaluate(function () {

          $ = window.$ || window.jQuery;

          // Return a single result object with properties for
          // whatever intelligence you want to derive from the page
          var result = {
              'links': []
          };

          if ($) {

              $('a').each(function (i, el) {

                  var href = $(el).attr('href');

                  if (href) {
                      if (!href.match(/^(#|javascript|mailto)/) && result.links.indexOf(href) === -1) {
                          result.links.push(href);
                      }
                  }
              });
          }
          // jQuery should be present, but if it's not, then collect the links using pure javascript
          else {

              var links = document.getElementsByTagName('a');

              for (var i = 0; i < links.length; i++) {

                  var href = links[i].href;
                  
                  if (href) {
                      if (!href.match(/^(#|javascript|mailto)/) && result.links.indexOf(href) === -1) {
                          result.links.push(href);
                      }
                  }
              }
          }

          return result;
      })
      .then(function (result) {
          console.log('Links encontrados: \n', result.links);
      })

      .catch(function (err) {
          console.log('Error buscando links: ', err);
      })

      // Always close the Horseman instance, or you might end up with orphaned phantom processes
      .close();
};
