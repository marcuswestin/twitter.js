Class('twitter.RequestManager', {

	initialize: function(onError, logger, useRubberData) {
		this._requestId = 0;
		this._rubberData = {};
		this._logger = logger;
		this._onError = onError;
		this._useRubberData = useRubberData;
		this._timeout = null;
	},
	
	getRubberData: function() {
		return this._rubberData;
	},
	
	addRubberData: function(data) {
		for (var requestUrl in data) {
			var requestId = requestUrl.split('twitter.com/').pop();
			this._rubberData[requestId] = data[requestId];
		}
	},

	request: function(url, callback) {
		var requestId = url.split('twitter.com/').pop();
		if (this._useRubberData && this._rubberData[requestId]) {
			this._logger.log('twitter.RequestManager', 'request', 'Rubber response', requestId);
			setTimeout(Util.hitch(this, callback, this._rubberData[requestId]), 10);
			return;
		}
		
		var callbackName = 'callback' + (this._requestId++);
		url = (url.match(/\?/) ? url : url + '?') + '&callback=twitter.RequestManager.' + callbackName;

		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.charset = 'charset="utf-8"';

		if (this._timeout) { clearTimeout(this._timeout); }
		this._timeout = setTimeout(Util.hitch(this, function(){
			this._onError();
		}), 3000);
		twitter.RequestManager[callbackName] = Util.hitch(this, function receiveResponse(response){
			clearTimeout(this._timeout);
			this._logger.log('twitter.RequestManager', 'receiveResponse', requestId, arguments);

			// clean up
			for (var prop in script) { delete script[prop]; }
			// head.removeChild(script);
			delete twitter.RequestManager[callbackName];
			
			if (response && response.error) {
				this._onError();
				return;
			} else {
				this.addRubberData({ url: arguments });
				callback.apply(this, arguments);
			}
		});
		
		this._logger.log('twitter.RequestManager', 'request', 'Sending request', requestId);
		head.appendChild(script);
	},
	
	getFriends: function(params, callback) {
		this.request('http://twitter.com/friends/ids.json?' + Util.objectAsURIParams(params), callback);
	},

	getLoggedInStatus: function(callback) {
		this.request('http://twitter.com/account/verify_credentials.json', callback)
	},
	
	getUserInfo: function(params, callback) {
		this.request('http://twitter.com/users/show.json?' + Util.objectAsURIParams(params), callback);
	}
})
