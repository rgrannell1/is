
const a = function (str, val) {
	return Object.prototype.toString.call(val).toLowerCase() ===
		"[object " + str.toLowerCase() + "]"
}




module.exports = {
	'a': a,
	'string': function (val) {
		return a('string', val)
	},
	'number': function (val) {
		return a('number', val)
	},
	'array':  function (val) {
		return a('array', val)
	},
	'function': function (val) {
		return a('function', val)
	},
	'undefined': function (val) {
		return a('undefined', val)
	},
	'boolean': function (val) {
		return a('boolean', val)
	},
	'null': function (val) {
		return a('null', val)
	},
	'object': function (val) {
		return a('object', val)
	}
}
