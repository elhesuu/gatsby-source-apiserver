'use strict';

var _templateObject = _taggedTemplateLiteral(['{bgRed Plugin ApiServer} The request failed. Error Code: ', ''], ['{bgRed Plugin ApiServer} The request failed. Error Code: ', '']),
    _templateObject2 = _taggedTemplateLiteral(['\n{bgRed Plugin ApiServer} The server response was "', ' ', '"'], ['\\n{bgRed Plugin ApiServer} The server response was "', ' ', '"']),
    _templateObject3 = _taggedTemplateLiteral(['{bgRed Plugin ApiServer} Inner exception message : "', '"'], ['{bgRed Plugin ApiServer} Inner exception message : "', '"']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var chalk = require('chalk');
var log = console.log;

/**
 * Handles HTTP Exceptions (axios)
 *
 * @param {any} e
 */

function httpExceptionHandler(e, reporter) {
  var response = e.response,
      code = e.code;

  if (!response) {
    log(chalk(_templateObject, code));
    return reporter.error('Plugin ApiServer http request failed. Error Code: ' + code, e);
  }
  var _e$response = e.response,
      status = _e$response.status,
      statusText = _e$response.statusText,
      message = _e$response.data.message;

  log(chalk(_templateObject2, status, statusText));
  if (message) {
    log(chalk(_templateObject3, message));
  }
  return reporter.error('Plugin ApiServer http request failed. The server response was "' + status + ' ' + statusText + '"', e);
}

module.exports = httpExceptionHandler;