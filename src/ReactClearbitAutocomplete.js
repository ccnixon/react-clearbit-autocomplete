var React = require('react');

var ReactClearbitAutocomplete = React.createClass({

  getInitialState: function() {
      return {
        query: '',
        results: ['apples', 'pears', 'oranges']
      };
  },

  appendToQuery: function(e) {
    if (e.key.length === 1){
      this.state.query += e.key.toLowerCase();
      console.log(this.state.query);
      this.setState(function(state) {
        return {
         results: state.results.concat('peaches')
        }
      });
    }
  },

  queryClearbit: function(){
    return true;
  },

	render () {
    var results = this.state.results.map(function(result, index){
      return <li key={index}>{result}</li>
    });

		return (
      <div>
        <input type="text" id="autocomplete" autcomplete="off" onKeyDown={this.appendToQuery}/>
        <div>{results}</div>
      </div>
    );
	}
});

export default ReactClearbitAutocomplete;
