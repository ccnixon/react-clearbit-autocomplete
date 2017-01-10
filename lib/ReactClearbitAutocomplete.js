'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = require('react');

var ReactClearbitAutocomplete = React.createClass({
  displayName: 'ReactClearbitAutocomplete',

  queryClearbit: function queryClearbit() {
    console.log('hello');
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', { type: 'text', id: 'autocomplete', autcomplete: 'off', onkeydown: 'queryClearbit' })
    );
  }
});

exports['default'] = ReactClearbitAutocomplete;
module.exports = exports['default'];