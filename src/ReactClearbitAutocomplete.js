var React = require('react');
var ReactClearbitAutocomplete = React.createClass({

  getInitialState: function() {
      return {
        query: '',
        results: []
      };
  },

  appendToQuery: function(e) {
    this.setState({ query: e.target.value }, this.queryClearbit);
  },

  handleKeyDown: function(e) {
    if (!this.state.results.length) return;
    
  },

  queryClearbit: function(){
    var query = this.state.query;
    if (query.length == 0){
      this.setState({ results: [] });
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

	render () {

    var results = this.state.results.map(function(result, index){
      return (
        <div key={index} className="suggestion">
          <img align="center" src={result.logo}/>
          <span className="company-name">
            {result.name}
          </span>
          <span className="company-domain">
            {result.domain}
          </span>
        </div>
      )
    });

		return (
      <div id="autocomplete">
        <input 
          type="text" 
          id="input" 
          ref="input"
          value={this.state.query} 
          autcomplete="off" 
          placeholder='Company name...'
          onChange={this.appendToQuery}
          onKeyDown={this.handleKeyDown}/>
        {this.state.results.length > 0 &&
        <div id="suggestions">{results}</div>
        }
      </div>
    );
	}
});

export default ReactClearbitAutocomplete;
