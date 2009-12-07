var twitter = {};
if (typeof exports != 'undefined') { exports.twitter = twitter; } // for node.js
(function() {
	// expose this so that it can be overwritten if in e.g. node.js
	twitter.fetchUrl = function(url, callback) {
		var callbackName = '_callback' + (_requestId++);
		
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url + '&callback=twitter.' + callbackName;
		script.charset = 'charset="utf-8"';
		
		function cleanup() {
			for (var prop in script) { delete script[prop]; }
			head.removeChild(script);
			delete twitter[callbackName];
		}
		
		var errorTimeout = setTimeout(function onError() {
			cleanup();
			callback(null, "Timeout");
		}, _timeout);
		
		twitter[callbackName] = function(response) {
			clearTimeout(errorTimeout);
			cleanup();
			twitter.addToCache(url, response);
			callback(response);
		}
		
		head.appendChild(script);
	}
	
	var _requestId = 0;
	var _cache = {}; // maps urls to response objects
	var _requests = {};
	var _timeout = 3000;
	
	function _getObjectAsURIParams(params) {
		var result = [];
		for (var key in params) {
			result.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		}
		return result.join('&');
	}
	
	function _doRequest(api, action, args, callback) {
		if (api == 'search') {
			var url = 'http://search.twitter.com/search.json?' + _getObjectAsURIParams(args);
		} else {
			var url = 'http://twitter.com/' + api + '/' + action + '.json?' + _getObjectAsURIParams(args);
		}
		if (_cache[url]) {
			setTimeout(function(){ callback(_cache[url]); }, 0);
			return;
		}
		
		twitter.fetchUrl(url, callback);
	}
	
	twitter.getTimeline = function(userId, callback) {
		_doRequest('statuses', 'user_timeline', { id: userId }, callback);
	}
	
	twitter.getFriends = function(userId, callback) {
		_doRequest('friends', 'ids', { id: userId }, callback);
	}
	
	twitter.getUserInfo = function(userId, callback) {
		_doRequest('users', 'show', { id: userId }, callback);
	}
	
	twitter.getMentions = function(userId, callback) {
		_doRequest('search', null, { q: '@' + userId }, callback);
	}
	
	twitter.getLoggedInStatus = function(callback) {
		_doRequest('account', 'verify_credentials', callback);
	}
	
	twitter.addToCache = function(url, data) { 
		_cache[url] = data;
	}
	
	twitter.setCache = function(cache) { _cache = cache; }
	twitter.getCache = function() { return _cache; }
})();


