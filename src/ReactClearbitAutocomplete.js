var React = require('react');
var ReactClearbitAutocomplete = React.createClass({

  getInitialState: function() {
      return {
        query: '',
        results: []
      };
  },

  appendToQuery: function(e) {
    console.log(global.window.getComputedStyle(this.refs.input))
    console.log(this.refs.input.getBoundingClientRect());
    this.setState({ query: e.target.value }, this.queryClearbit);
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
      console.log(err)
    })
  },

  updateResults: function(results){
    this.setState({ results: results })
  },

	render () {

    var results = this.state.results.map(function(result, index){
      return (
        <div key={index} className="autocomplete-suggestion">
          {result.name}
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
          onChange={this.appendToQuery}/>
        <div id="suggestions">{results}</div>
      </div>
    );
	}
});

export default ReactClearbitAutocomplete;
