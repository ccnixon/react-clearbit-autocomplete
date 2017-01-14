'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactClearbitAutocomplete = React.createClass({
  displayName: 'ReactClearbitAutocomplete',

  propTypes: {
    /*
    * Placeholder text for input box. Defaults to 'Company name...'
     */
    placeholder: React.PropTypes.string,
    /*
    * Optional props to pass to input box (ie. className, id, etc.)
     */
    inputProps: React.PropTypes.object,
    /*
    * Optional props to pass into the dropdown box containing the returned companies.
     */
    companiesProps: React.PropTypes.object,
    /*
    * Optional props to pass into each company in the companies box.
     */
    companyProps: React.PropTypes.object
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
    if (e.key === "ArrowDown") {
      if (currentIndex == null) {
        currentIndex = 0;
      } else {
        currentIndex = (currentIndex + 1) % this.state.results.length;
      }
      this.setState({ highlightedIndex: currentIndex });
    }

    if (e.key == "ArrowUp") {
      e.preventDefault();
      currentIndex = (currentIndex - 1) % this.state.results.length;
      this.setState({ highlightedIndex: currentIndex });
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

  updateResults: function updateResults(results) {
    this.setState({ results: results });
  },

  renderResults: function renderResults() {
    var renderedResults = this.state.results.map((function (result, index) {
      var companyClassName = this.props.companyProps.className;
      return React.createElement(
        'div',
        { key: index, className: this.state.highlightedIndex === index ? companyClassName + " selected" : companyClassName },
        React.createElement('img', { align: 'center', src: result.logo }),
        React.createElement(
          'span',
          { className: companyClassName + "-name" },
          result.name
        ),
        React.createElement(
          'span',
          { className: companyClassName + "-domain" },
          result.domain
        )
      );
    }).bind(this));
    return renderedResults;
  },

  render: function render() {
    console.log(this.props);
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