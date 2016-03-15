
"use strict"




const Benchmark = require('benchmark')
const is        = require('is')





const types    = Object.keys(is.always)
const testData = [

	[1,2,3,4,5],
	true,
	new Date( ),
	new Error('test-error.'),
	function (x) {x},
	null,
	42,
	{
		x: 1,
		y: 1
	},
	/foobar/g,
	"test-string",
	Symbol('shrimp'),
	undefined

]




const pairSuite = (name, test0, test1) => {

	const suite = new Benchmark.Suite(name)

	const id        = Date.now( )
	const reporters = { }

	reporters.onCycle = event => {

		const hertz = event.currentTarget.hz

		console.log( JSON.stringify({

			id,

			name:      event.currentTarget.name,
			mean:      event.currentTarget.mean,
			deviation: event.currentTarget.deviation,
			hertz:     hertz,
			rme:       event.currentTarget.stats.rme

		}) )

	}

	reporters.onComplete = ( ) => {

	}

	testData.forEach(testDatum => {

		suite
		.add(test0.name, test0.fn.bind({ }, testDatum), {
			onCycle:    reporters.onCycle,
			onComplete: reporters.onComplete
		})
		.add(test1.name, test1.fn.bind({ }, testDatum), {
			onCycle:    reporters.onCycle,
			onComplete: reporters.onComplete
		})

	})

	suite.run({
		async: true
	})

	return ( ) => {
		return suite
	}

}





const reporter = { }

reporter.onCycle = event => {
	console.log(event.target.toString( ))
}

reporter.onComplete = function ( ) {

}





const suites = { }

suites.exports = ( ) => {

	const suite = new Benchmark.Suite( )

	types.forEach(type => {

		testData.forEach(testDatum => {

			suite.add(`is.${type}`, ( ) => {
				is[type](testData)
			}, {
				onCycle:    reporter.onCycle,
				onComplete: reporter.onComplete
			})

		})

	})

	suite.run({
		async: true
	})

}





suites.array = pairSuite('Array Benchmarks.', {
	name: 'Array.isArray',
	fn:   data => Array.isArray(data)
}, {
	name: 'is.array',
	fn:   data => is.array(data)
})





suites.array( )
//suites.exports( )
