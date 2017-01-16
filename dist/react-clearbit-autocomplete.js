(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactClearbitAutocomplete = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactClearbitAutocomplete = React.createClass({
  displayName: 'ReactClearbitAutocomplete',

  propTypes: {
    /*
    * Optional props to pass into the dropdown box containing the returned companies.
     */
    companiesProps: React.PropTypes.object,
    /*
    * Optional props to pass into each company in the companies box.
     */
    companyProps: React.PropTypes.object,
    /*
    * Optional props to pass to input box (ie. className, id, etc.)
     */
    inputProps: React.PropTypes.object,
    /*
    * Required function to call after a user has selected a company.
     */
    onClick: React.PropTypes.func.isRequired,
    /*
    * Placeholder text for input box. Defaults to 'Company name...'
     */
    placeholder: React.PropTypes.string,
    /*
    * Optional function to specify how results should be rendered.
     */
    renderResults: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: 'Company name...',
      companiesProps: { id: 'companies' },
      companyProps: { className: 'company' }
    };
  },

  getInitialState: function getInitialState() {
    return {
      query: '',
      results: [],
      highlightedIndex: null
    };
  },

  // TODO: grab query from input box not state update
  appendToQuery: function appendToQuery(e) {
    this.setState({ query: e.target.value }, this.queryClearbit);
  },

  handleKeyDown: function handleKeyDown(e) {
    if (!this.state.results.length) return;
    var currentIndex = this.state.highlightedIndex;

    if (e.key === 'ArrowDown') {
      if (currentIndex === null) {
        currentIndex = 0;
      } else {
        currentIndex = (currentIndex + 1) % this.state.results.length;
      }
      this.setState({ highlightedIndex: currentIndex });
    }

    if (e.key == 'ArrowUp') {
      e.preventDefault();
      if (currentIndex === -1) {
        currentIndex = this.state.results.length;
      }
      currentIndex = currentIndex - 1;
      this.setState({ highlightedIndex: currentIndex });
    }

    if (e.key == 'Enter') {
      currentIndex = this.state.highlightedIndex;
      if (currentIndex < 0) return;
      var company = this.state.results[currentIndex];
      this.onSelect(company);
    }
  },

  queryClearbit: function queryClearbit() {
    var query = this.state.query;
    if (query.length == 0) {
      this.setState({ results: [], highlightedIndex: null });
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

  onSelect: function onSelect(company) {
    this.setState({ query: company.name, results: [] });
    this.props.onClick(company);
  },

  updateResults: function updateResults(results) {
    this.setState({ results: results });
  },

  renderResults: function renderResults() {
    var renderedResults = this.state.results.map((function (result, index) {
      var companyClassName = this.props.companyProps.className;
      return React.createElement(
        'div',
        { key: index, className: this.state.highlightedIndex === index ? companyClassName + ' selected' : companyClassName },
        React.createElement('img', { align: 'center', src: result.logo }),
        React.createElement(
          'span',
          { className: companyClassName + '-name' },
          result.name
        ),
        React.createElement(
          'span',
          { className: companyClassName + '-domain' },
          result.domain
        )
      );
    }).bind(this));
    return renderedResults;
  },

  render: function render() {
    return React.createElement(
      'div',
      this.props,
      React.createElement('input', _extends({}, this.props.inputProps, {
        type: 'text',
        ref: 'input',
        value: this.state.query,
        autcomplete: 'off',
        placeholder: this.props.placeholder,
        onChange: this.appendToQuery,
        onKeyDown: this.handleKeyDown })),
      this.state.results.length > 0 && React.createElement(
        'div',
        this.props.companiesProps,
        this.props.renderResults || this.renderResults()
      )
    );
  }
});

exports['default'] = ReactClearbitAutocomplete;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});