# react-clearbit-autocomplete

A simple React input component that will autocomplete company names, logos, and domains from the [Clearbit Autocomplete API](http://blog.clearbit.com/company-autocomplete-api/). Useful in all types of user registration flows.


## Demo & Examples

Live demo: [ccnixon.github.io/react-clearbit-autocomplete](http://ccnixon.github.io/react-clearbit-autocomplete/)

Live PlayGround: [https://www.webpackbin.com/bins/-Kl-xoPzf4vNaeYouui_](https://www.webpackbin.com/bins/-Kl-xoPzf4vNaeYouui_)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-clearbit-autocomplete is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-clearbit-autocomplete.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-clearbit-autocomplete --save
```


## Usage

Example usage:

```js
var ClearbitAutocomplete = require('react-clearbit-autocomplete');

var App = React.createClass({

  processCompany: function(company){
    console.log(company);
  },

  render () {
    return (
      <div>
        <ClearbitAutocomplete 
          id="autocomplete"
          onClick={this.processCompany} />
      </div>
    );
  }
});
```

### Properties

### `companiesProps: Object` (optional)
Default Value: `{ id: 'companies' }`

Object of properties to pass into the autocomplete results menu. This is div that will contain the return company results after each keystroke. Useful to designate an id, className, or styles.

### `companyProps: Object` (optional)
Default Value: `{ className: 'company' }`

Object of properties to pass into each individual company result in the autocomplete menu.

### `inputProps: Object` (optional)
Default Value: `{}`

Object of properties to pass into actual user input element.

### `onClick: Function` (required)

Handler function to be called after a user has selected a company.

### `placeholder: String`
Default Value: `'Company name...'`

String to use as the placeholder value of the input element.

### `renderResults: Function`
Default Value: (see below)

Optional function to be used to render the returned query results. Defaults to a basic div with nested span and img tags.


### Notes

This is an early version. Tests are forthcoming. Any feedback is greatly appreciated.


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Copyright (c) 2017 Chris Nixon.

