
const a = function (str, val) {

	if (Object.prototype.toString.call(str) !== '[object String]') {
		throw TypeError('a: the argument matching "str" must be a string.')
	}

	return Object.prototype.toString.call(val).toLowerCase() ===
		"[object " + str.toLowerCase() + "]"
}





const what = function (val) {
	return Object.prototype.toString.call(val).toLowerCase().slice(8, -1)
}





const is = {
	'array':     a.bind(null, 'array'),
	'boolean':   a.bind(null, 'boolean'),
	'date':      a.bind(null, 'date'),
	'error':     a.bind(null, 'error'),
	'function':  a.bind(null, 'function'),
	'null':      a.bind(null, 'null'),
	'number':    a.bind(null, 'number'),
	'object':    a.bind(null, 'object'),
	'regexp':    a.bind(null, 'regexp'),
	'string':    a.bind(null, 'string'),
	'undefined': a.bind(null, 'undefined')
}





const _always = function (str, val) {
	if (!is[str](val)) {
		throw 'always.' + str + ': value was not a ' + str + ' (actual type was ' + what(z) + ')'
	}
}

const always = {

}

module.exports = {
	'a': a,
	'what':      what,

	'array':     is.array,
	'boolean':   is.boolean,
	'date':      is.date,
	'error':     is.error,
	'function':  is.function,
	'null':      is.null,
	'number':    is.number,
	'object':    is.object,
	'regexp':    is.regexp,
	'string':    is.string,
	'undefined': is.undefined

}
