'use strict';

var round = require( 'math-round' );
var pluck = require( './../lib' );

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