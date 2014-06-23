
_internalType = function (val) {
	return Object.prototype.toString.call(val)
}




module.exports = {
	'string': function (val) {
		return _internalType(val) === "[object String]"
	},
	'number': function (val) {
		return _internalType(val) === "[object Number]"
	},
	'array':  function (val) {
		return _internalType(val) === "[object Array]"
	},
	'function': function (val) {
		return _internalType(val) === "[object Function]"
	},
	'undefined': function (val) {
		return _internalType(val) === "[object Undefined]"
	},
	'null': function (val) {
		return _internalType(val) === "[object Null]"
	},
	'object': function (val) {
		return _internalType(val) === "[object Object]"
	}
}
