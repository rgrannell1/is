
"use strict"




const Benchmark = require('benchmark')
const is        = require('is')





const compareBenchmarks = function ( ) {

	const suite = new Benchmark.Suite( )

	const args  = arguments.length === 1
		? [arguments[0]]
		: Array.apply(null, arguments)

	args.forEach(testcase => {
		suite.add(testcase.name, testcase.fn)
	})

	suite
	.on('complete', function ( ) {

		const slowest = this.filter('slowest')
		const fastest = this.filter('fastest')

		const formatted = {
			slowest: {
				hz: Number( Math.round(slowest.map('hz')) ).toLocaleString( )
			},
			fastest: {
				hz: Number( Math.round(fastest.map('hz')) ).toLocaleString( )
			}
		}

		console.log(`fastest: ${fastest.map('name')} ${formatted.fastest.hz}`)
		console.log(`slowest: ${slowest.map('name')} ${formatted.slowest.hz}`)
		console.log('')

	})

	suite.run({
		async: true
	})

}





const suites = { }

{

	let data = [1,2,3,4,5]

	suites.array = compareBenchmarks.bind({ }, {

		name: 'Array.isArray',
		fn:   ( ) => Array.isArray(data)

	}, {

		name: 'is.array',
		fn:   ( ) => is.array(data)

	})

}

{

	let data = true

	suites.boolean = compareBenchmarks.bind({ }, {

		name: 'custom',
		fn:   ( ) => data === true || data === false

	}, {

		name: 'is.boolean',
		fn:   ( ) => is.boolean(data)

	})


}

{

	let data = new Date( )

	suites.date = compareBenchmarks.bind({ }, {

		name: 'is.date',
		fn:   ( ) => is.date(data)

	})


}

{

	let data = new Error( )

	suites.error = compareBenchmarks.bind({ }, {

		name: 'is.error',
		fn:   ( ) => is.error(data)

	})


}

{

	let data = function (x) {x}

	suites.function = compareBenchmarks.bind({ }, {

		name: 'is.function',
		fn:   ( ) => is.function(data)

	})


}

{

	let data = null

	suites.null = compareBenchmarks.bind({ }, {

		name: 'is.null',
		fn:   ( ) => is.null(data)

	})

}

{

	let data = 10

	suites.number = compareBenchmarks.bind({ }, {

		name: 'is.number',
		fn:   ( ) => is.number(data)

	})

}

{

	let data = {x: 1}

	suites.object = compareBenchmarks.bind({ }, {

		name: 'is.object',
		fn:   ( ) => is.object(data)

	})

}

{

	let data = /./g

	suites.regexp = compareBenchmarks.bind({ }, {

		name: 'is.regexp',
		fn:   ( ) => is.regexp(data)

	})

}

{

	let data = "."

	suites.string = compareBenchmarks.bind({ }, {

		name: 'is.string',
		fn:   ( ) => is.string(data)

	})

}

{

	let data = Symbol('x')

	suites.symbol = compareBenchmarks.bind({ }, {

		name: 'is.symbol',
		fn:   ( ) => is.symbol(data)

	})

}

{

	let data = undefined

	suites.undefined = compareBenchmarks.bind({ }, {

		name: 'is.undefined',
		fn:   ( ) => is.undefined(data)

	})

}



suites.array( )
suites.boolean( )
suites.date( )
suites.error( )
suites.function( )
suites.null( )
suites.number( )
suites.object( )
suites.regexp( )
suites.string( )
suites.symbol( )
suites.undefined( )
