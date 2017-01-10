var React = require('react');
var ReactDOM = require('react-dom');
var ReactClearbitAutocomplete = require('react-clearbit-autocomplete');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactClearbitAutocomplete />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
