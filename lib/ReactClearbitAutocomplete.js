'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = require('react');
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