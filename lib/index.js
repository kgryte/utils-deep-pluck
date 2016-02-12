'use strict';

// MODULES //

var copy = require( 'utils-copy' );
var deepGet = require( 'utils-deep-get' ).factory;
var isArray = require( 'validate.io-array' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// PLUCK //

/**
* FUNCTION: pluck( arr, path[, options] )
*	Extracts a nested property value from each element of an object array.
*
* @param {Object[]} arr - source array
* @param {String|String[]} path - key path
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new data structure
* @param {String} [options.sep="."] - key path separator
* @returns {Array} destination array
*/
function pluck( arr, path, options ) {
	var dget;
	var opts;
	var out;
	var err;
	var i;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	opts = copy( defaults );
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.copy ) {
		out = new Array( arr.length );
	} else {
		out = arr;
	}
	dget = deepGet( path, {'sep': opts.sep} );
	for ( i = 0; i < arr.length; i++ ) {
		out[ i ] = dget( arr[ i ] );
	}
	return out;
} // end FUNCTION pluck()


// EXPORTS //

module.exports = pluck;
