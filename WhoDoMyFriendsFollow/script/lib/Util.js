var Util = {
	emptyFn: function() {},

	objectAsURIParams: function(params) {
		var kvps = [];
		for (var key in params) { kvps.push(key + '=' + params[key]) }
		return kvps.join('&');
	},
	
	hitch: function(context, method/*, arg1, arg2, ... */) {
		var hitchedArgs = Array.prototype.slice.call(arguments, 2);
		method = (typeof method == 'string' ? context[method] : method);
		return function() {
			var invocationArgs = Array.prototype.slice.call(arguments, 0);
			method.apply(context, hitchedArgs.concat(invocationArgs))
		}
	}
}
