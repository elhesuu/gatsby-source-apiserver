'use strict';

var fetch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var url = _ref2.url,
        method = _ref2.method,
        headers = _ref2.headers,
        data = _ref2.data,
        name = _ref2.name,
        localSave = _ref2.localSave,
        path = _ref2.path,
        payloadKey = _ref2.payloadKey,
        auth = _ref2.auth,
        verbose = _ref2.verbose,
        reporter = _ref2.reporter;
    var allRoutes, options;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allRoutes = void 0;

            // Attempt to download the data from api

            _context.prev = 1;
            options = {
              method: method,
              url: url,
              headers: headers,
              data: data
            };

            if (auth) {
              options.auth = auth;
            }
            _context.next = 6;
            return axios(options);

          case 6:
            allRoutes = _context.sent;
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);

            console.log('\nGatsby Source Api Server response error:\n', _context.t0.response.data && _context.t0.response.data.errors);
            httpExceptionHandler(_context.t0, reporter);

          case 13:
            if (!allRoutes) {
              _context.next = 18;
              break;
            }

            // console.log(`allRoutes: `, allRoutes.data);

            // Create a local save of the json data in the user selected path
            if (localSave) {
              try {
                fs.writeFileSync('' + path + name + '.json', stringify(allRoutes.data, null, 2));
              } catch (err) {
                reporter.panic('Plugin ApiServer could not save the file.  Please make sure the folder structure is already in place.', err);
              }

              if (verbose) {
                log(chalk(_templateObject, name, path));
              }
            }

            // Return just the intended data

            if (!payloadKey) {
              _context.next = 17;
              break;
            }

            return _context.abrupt('return', allRoutes.data[payloadKey]);

          case 17:
            return _context.abrupt('return', allRoutes.data);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 9]]);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _templateObject = _taggedTemplateLiteral(['{bgCyan Plugin ApiServer} ', '.json was saved locally to ', ''], ['{bgCyan Plugin ApiServer} ', '.json was saved locally to ', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var httpExceptionHandler = require('./http-exception-handler');
var chalk = require('chalk');
var log = console.log;

module.exports = fetch;