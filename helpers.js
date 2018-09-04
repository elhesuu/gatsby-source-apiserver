'use strict';

exports.objectRef = function (obj, str) {
  var levels = str.split('.');
  for (var i = 0; i < levels.length; i++) {
    obj = obj[levels[i]];
  }
  return obj;
};