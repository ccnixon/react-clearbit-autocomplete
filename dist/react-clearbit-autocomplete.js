(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactClearbitAutocomplete = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactClearbitAutocomplete = React.createClass({
  displayName: 'ReactClearbitAutocomplete',

  getInitialState: function getInitialState() {
    return {
      query: '',
      results: []
    };
  },

  appendToQuery: function appendToQuery(e) {
    this.setState({ query: e.target.value }, this.queryClearbit);
  },

  queryClearbit: function queryClearbit() {
    var query = this.state.query;
    if (query.length == 0) {
      this.setState({ results: [] });
      return;
    }
    fetch('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + query).then(function (response) {
      if (response.status != 200) {
        return Promise.reject(new Error(response.statusText));
      } else {
        return response.json();
      }
    }).then(this.updateResults)['catch'](function (err) {
      console.log(err);
    });
  },

  updateResults: function updateResults(results) {
    console.log(results);
    this.setState({ results: results });
  },

  render: function render() {

    var results = this.state.results.map(function (result, index) {
      return React.createElement(
        'div',
        { key: index, className: 'suggestion' },
        React.createElement('img', { align: 'center', src: result.logo }),
        React.createElement(
          'span',
          { className: 'company-name' },
          result.name
        ),
        React.createElement(
          'span',
          { className: 'company-domain' },
          result.domain
        )
      );
    });

    return React.createElement(
      'div',
      { id: 'autocomplete' },
      React.createElement('input', {
        type: 'text',
        id: 'input',
        ref: 'input',
        value: this.state.query,
        autcomplete: 'off',
        placeholder: 'Company name...',
        onChange: this.appendToQuery }),
      React.createElement(
        'div',
        { id: 'suggestions' },
        results
      )
    );
  }
});

exports['default'] = ReactClearbitAutocomplete;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});