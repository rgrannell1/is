
const a = function (str, val) {
	return Object.prototype.toString.call(val) === "[object " + str.toLowerCase() + "]"
}




module.exports = {
	'a': is,
	'string': function (val) {
		return is('string', val)
	},
	'number': function (val) {
		return is('number', val)
	},
	'array':  function (val) {
		return is('array', val)
	},
	'function': function (val) {
		return is('function', val)
	},
	'undefined': function (val) {
		return is('undefined', val)
	},
	'null': function (val) {
		return is('null', val)
	},
	'object': function (val) {
		return is('object', val)
	}
}
