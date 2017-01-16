var React = require('react');
var ReactDOM = require('react-dom');
var ReactClearbitAutocomplete = require('react-clearbit-autocomplete');

var App = React.createClass({
  processCompany: function(company){
    console.log(company);
  },
	render () {
		return (
			<div>
				<ReactClearbitAutocomplete 
          id="autocomplete"
          onClick={this.processCompany} />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
