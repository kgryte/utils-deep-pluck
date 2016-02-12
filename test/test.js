'use strict';

// MODULES //

var tape = require( 'tape' );
var copy = require( 'utils-copy' );
var pluck = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof pluck, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided an array', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		undefined,
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			pluck( value, 'a.b.c' );
		};
	}
});

tape( 'the function throws an error if provided an invalid option', function test( t ) {
	t.throws( badOption, TypeError, 'throws an error' );
	t.end();

	function badOption() {
		pluck( [], 'a.b.c', {'copy':null} );
	}
});

tape( 'the function returns an empty array if provided an empty array', function test( t ) {
	var out;

	out = pluck( [], 'a.b.c' );
	t.deepEqual( out, [], 'returns an empty array' );

	out = pluck( [], ['a','b','c'], {'copy':false} );
	t.deepEqual( out, [], 'returns an empty array (mutate)' );

	t.end();
});

tape( 'the function plucks a nested property value from each array element', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':1}}},
		{'a':{'b':{'c':2}}}
	];
	expected = [ 1, 2 ];

	actual = pluck( arr, 'a.b.c' );

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'by default, the function returns a new array', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':1}}},
		{'a':{'b':{'c':2}}}
	];
	expected = copy( arr );

	actual = pluck( arr, 'a.b.c' );

	t.notEqual( actual, arr, 'returns a new array reference' );
	t.deepEqual( arr, expected, 'input array is not mutated' );
	t.end();
});

tape( 'the function supports mutating an input array', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':1}}},
		{'a':{'b':{'c':2}}}
	];
	expected = [ 1, 2 ];

	actual = pluck( arr, ['a','b','c'], {'copy':false} );

	t.equal( actual, arr, 'returns same array reference' );
	t.deepEqual( arr, expected, 'input array is mutated' );
	t.end();
});

tape( 'if a key path does not exist, the function sets the plucked value as `undefined` (copy)', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':1}}},
		null,
		undefined,
		{'a':{'b':{'c':2}}}
	];

	expected = [ 1, undefined, undefined, 2 ];

	actual = pluck( arr, 'a.b.c' );

	t.deepEqual( actual, expected, 'sets non-existent key path plucked values to undefined' );
	t.end();
});

tape( 'if a key path does not exist, the function sets the plucked value as `undefined` (mutate)', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':1}}},
		null,
		undefined,
		{'a':{'b':{'c':2}}}
	];

	expected = [ 1, undefined, undefined, 2 ];

	actual = pluck( arr, ['a','b','c'], {'copy':false} );

	t.deepEqual( actual, expected, 'sets non-existent key path plucked values to undefined' );
	t.end();
});

tape( 'the function supports providing a key path as a array, which may include non-numeric values', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':[0,1,2]},
		{'a':[3,4,5]}
	];
	expected = [ 1, 4 ];

	actual = pluck( arr, ['a',1] );

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'the function does not deep copy plucked values', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':2}}},
		{'a':{'b':{'c':3}}}
	];
	expected = [ {'c':2}, {'c':3} ];

	actual = pluck( arr, 'a.b' );

	t.deepEqual( actual, expected, 'deep equal' );
	t.equal( actual[0], arr[0].a.b, 'plucked values are not deep copied' );

	t.end();
});

tape( 'the function supports specifying a custom key path separator', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':{'b':{'c':1}}},
		{'a':{'b':{'c':2}}}
	];
	expected = [ 1, 2 ];

	actual = pluck( arr, 'a|b|c', {'sep':'|'} );

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});