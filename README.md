Deep Pluck
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Extract a nested property value from each element of an object array.


## Installation

``` bash
$ npm install utils-deep-pluck
```


## Usage

``` javascript
var pluck = require( 'utils-deep-pluck' );
```

#### pluck( arr, path[, opts] )

Extracts a nested property value from each element of an object `array` based on a key `path`.

``` javascript
var arr = [
	{'a':{'b':{'c':1}}},
	{'a':{'b':{'c':2}}}
];

var out = pluck( arr, 'a.b.c' );
// returns [ 1, 2 ]
```

A key `path` may be specified as either a `string` or as an `array`.

``` javascript
var arr = [
	{'a':[0,1,2]},
	{'a':[3,4,5]}
];

var out = pluck( arr, ['a',1] );
// returns [ 1, 4 ]
```

The `function` accepts the following `options`:
*	__copy__: `boolean` indicating whether to return a new data structure. Default: `true`.
*	__sep__: key path [separator][utils-deep-get]. Default: `'.'`.

By default, the `function` returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [
	{'a':{'b':{'c':1}}},
	{'a':{'b':{'c':2}}}
];

var out = pluck( arr, 'a.b.c', {'copy':false} );
// returns [ 1, 2 ]

var bool = ( arr[ 0 ] === out[ 0 ] );
// returns true
```

The default key `path` separator is `.`. To specify an alternative separator, set the `sep` option.

``` javascript
var arr = [
	{'a':{'b':{'c':1}}},
	{'a':{'b':{'c':2}}}
];

var out = pluck( arr, 'a|b|c', {'sep':'|'} );
// returns [ 1, 2 ]
```


## Notes

*	If a key path does __not__ exist, the `function` sets the plucked value as `undefined`.
	
	``` javascript
	var arr = [
		{'a':{'b':{'c':1}}},
		null,
		undefined,
		{'a':{'b':{'c':2}}}
	];

	var out = pluck( arr, 'a.b.c' );
	// returns [ 1, undefined, undefined, 2 ]
	```

*	Extracted values are __not__ cloned.

	``` javascript
	var arr = [
		{'a':{'b':{'c':2}}},
		{'a':{'b':{'c':3}}}
	];

	var out = pluck( arr, 'a.b' );
	// returns [ {'c':2}, {'c':3} ]

	var bool = ( arr[ 0 ].a.b === out[ 0 ] );
	// returns true
	``` 

	To prevent subsequent unintended mutation, use [utils-copy][utils-copy].

	``` javascript
	var copy = require( 'utils-copy' );

	var arr = [
		{'a':{'b':{'c':2}}},
		{'a':{'b':{'c':3}}}
	];

	var out = pluck( arr, 'a.b' );
	// returns [ {'c':2}, {'c':3} ]

	// Perform a deep copy:
	out = copy( out );

	var bool = ( arr[ 0 ].a.b === out[ 0 ] );
	// returns false
	```


---
## Examples

``` javascript
var round = require( 'math-round' );
var pluck = require( 'utils-deep-pluck' );

var arr = new Array( 100 );
var tmp;
var i;

for ( i = 0; i < arr.length; i++ ) {
	tmp = {'a':{'b':{'c':{'d':null}}}};
	tmp.a.b.c.d = round( Math.random()*100 );
	arr[ i ] = tmp;
}

// Pluck the deeply nested values:
var out = pluck( arr, 'a.b.c.d' );

console.log( out );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-deep-pluck.svg
[npm-url]: https://npmjs.org/package/utils-deep-pluck

[build-image]: http://img.shields.io/travis/kgryte/utils-deep-pluck/master.svg
[build-url]: https://travis-ci.org/kgryte/utils-deep-pluck

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/utils-deep-pluck/master.svg
[coverage-url]: https://codecov.io/github/kgryte/utils-deep-pluck?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-deep-pluck.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-deep-pluck

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-deep-pluck.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-deep-pluck

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-deep-pluck.svg
[github-issues-url]: https://github.com/kgryte/utils-deep-pluck/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[utils-copy]: https://github.com/kgryte/utils-copy
[utils-deep-get]: https://github.com/kgryte/utils-deep-get