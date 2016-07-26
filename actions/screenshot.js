'use strict';

/**
 * Package dependencies
 */
var crypto = require('crypto'),
    fs     = require('fs');

/**
 * Take screenshots
 *
 * @param {object} phantomInstance Horseman phantomInstance
 * @param {string} url url to take screenshot
 * @return {void}
 */
module.exports = function (phantomInstance, url) {

    if (!url || typeof url !== 'string') {
        throw Error('Url obrigatoria');
    }

    console.log('Tirando screenshot de: ', url);

    phantomInstance
      .open(url)

      // Optionally, determine the status of the response
      .status()
      .then(function (statusCode) {

          if (Number(statusCode) >= 400) {
              throw Error('Erro status: ' + statusCode);
          }
      })

      // Take the screenshot
      .screenshotBase64('PNG')

      // Save the screenshot to a file
      .then(function (screenshotBase64) {

          // Name the file based on a sha1 hash of the url
          var urlSha1  = crypto.createHash('sha1').update(url).digest('hex'),
              filePath = 'screenshots/' + urlSha1 + '.base64.png.txt';

          fs.writeFile(filePath, screenshotBase64, function (err) {

              if (err) {
                  throw err;
              }

              console.log('Screenshot gerada em: ', filePath);
          });
      })

      .catch(function (err) {
          console.log('Erro : ', err);
      })

      // Always close the Horseman instance, or you might end up with orphaned phantom processes
      .close();
};
