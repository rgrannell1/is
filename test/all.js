
const is = require('../lib/is.js')



console.assert(is.string(''))
console.assert(is.string('string'))
console.assert(is.a('string', 'string'))

console.assert(is.number(-1))
console.assert(is.number(0))
console.assert(is.number(+1))
console.assert(is.a('number', +1))

console.assert(is.number(NaN))
console.assert(is.number(+Infinity))
console.assert(is.number(-Infinity))
console.assert(is.a('number', +Infinity))

console.assert(is.function(Math.max))

console.assert(is.undefined(undefined))
console.assert(is.null(null))

console.assert( is.object({}) )
console.assert( is.object({a: 1, b:2}) )

// 2.0.0
console.assert(is('string', 'me'))

is.always('number', NaN)
is.always.number(NaN)
is.always.undefined(undefined)

is.never('string', 0)
is.never.string(false)
is.never.undefined('')




;( function () {

	var errored;

	try {
		is.always('number', 'not a number')
	} catch (err) {
		errored = true
	}

	console.assert(errored === true)

} )()

;( function () {

	var errored;

	try {
		is.always.number('not a number')
	} catch (err) {
		errored = true
	}

	console.assert(errored === true)

} )()

;( function () {

	var errored;

	try {
		is.never('number', NaN)
	} catch (err) {
		errored = true
	}

	console.assert(errored === true)

} )()

;( function () {

	var errored;

	try {
		is.never.number(NaN)
	} catch (err) {
		errored = true
	}

	console.assert(errored === true)

} )()
