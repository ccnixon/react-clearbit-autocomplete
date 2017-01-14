var React = require('react');
var ReactClearbitAutocomplete = React.createClass({

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
    companyProps:React.PropTypes.object
  },

  getDefaultProps() {
    return {
      placeholder: 'Company name...',
      companiesProps: {id: 'companies'},
      companyProps: {className: 'company'}
    }
  },


  getInitialState: function() {
      return {
        query: '',
        results: [],
        highlightedIndex: null
      };
  },

  // TODO: grab query from input box not state update
  appendToQuery: function(e) {
    this.setState({ query: e.target.value }, this.queryClearbit);
  },

  handleKeyDown: function(e) {
    if (!this.state.results.length) return;
    var currentIndex = this.state.highlightedIndex;
    if (e.key === "ArrowDown"){
      if (currentIndex == null){
        currentIndex = 0;
      } else {
        currentIndex = (currentIndex + 1) % this.state.results.length;
      }
      this.setState({ highlightedIndex: currentIndex })
    }

    if (e.key == "ArrowUp"){
      e.preventDefault();
      currentIndex = (currentIndex - 1) % this.state.results.length;
      this.setState({ highlightedIndex: currentIndex })
    }
  },

  queryClearbit: function(){
    var query = this.state.query;
    if (query.length == 0){
      this.setState({ results: [], highlightedIndex: null });
      return;
    }
    fetch('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + query)
    .then(function(response){
      if (response.status != 200){
        return Promise.reject(new Error(response.statusText))
      } else {
        return response.json()
      }
    })
    .then(this.updateResults)
    .catch(function(err){
      console.log(err);
    })
  },

  updateResults: function(results){
    this.setState({ results: results })
  },

  renderResults: function(){
    var renderedResults = this.state.results.map(function(result, index){
      var companyClassName = this.props.companyProps.className;
      return (
        <div key={index} className={this.state.highlightedIndex === index ? companyClassName + " selected" : companyClassName}>
          <img align="center" src={result.logo}/>
          <span className={companyClassName + "-name"}>
            {result.name}
          </span>
          <span className={companyClassName + "-domain"}>
            {result.domain}
          </span>
        </div>
      )
    }.bind(this));
    return renderedResults
  },

  render () {
    console.log(this.props);
		return (
      <div {...this.props}>
        <input 
          {...this.props.inputProps}
          type="text" 
          ref="input"
          value={this.state.query} 
          autcomplete="off" 
          placeholder={this.props.placeholder}
          onChange={this.appendToQuery}
          onKeyDown={this.handleKeyDown}/>
        {this.state.results.length > 0 &&
        <div {...this.props.companiesProps}>{this.props.renderResults || this.renderResults()}</div>
        }
      </div>
    );
	}
});

export default ReactClearbitAutocomplete;
