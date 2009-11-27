Singleton('Application', {
	
	_config: {
		'maxBreadth': 15, // limited by Twitter's 150 requests/hour
		'minLinks': 2,
		'maxResults': 6,
		'debug': false,
		'user': null,
		'useRubberData': false
	},

	// gathered data
	_friendsFriendCount: {},
	_following: {},

	// internal variables
	_outstandingRequests: 0,
	_requestManager: null,
	_logger: new Logger(),
	
	run: function(config, rubberData) {
		for (var key in config) { 
			if (typeof this._config[key] == 'number') { 
				this._config[key] = parseFloat(config[key]);
			} else if (typeof this._config[key] == 'boolean') {
				this._config[key] = (config[key].toLowerCase() == 'true');
			} else {
				this._config[key] = config[key];
			}
		}
		
		this._requestManager = new twitter.RequestManager(Util.hitch(this, 'onError'), 
			this._logger, this._config['useRubberData']);
		
		if (this._config['debug']) { 
			this._logger.activate(); 
		}
		this._requestManager.addRubberData(rubberData);
		
		var input = document.getElementById('user-input');
		var defaultText = "What's your Twitter name?";
		input.onclick = input.onfocus = function() {
			if (this.value == defaultText) { this.value = ''; }
			this.style.fontStyle = 'normal';
			this.style.color = '#000';
		}
		input.onblur = function() {
			if (this.value == '') { 
				this.value = defaultText; 
				this.style.fontStyle = 'italic';
				this.style.color = '#555';
			}
		}
		input.value = defaultText; 
		input.style.fontStyle = 'italic';
		input.style.color = '#555';
		
		input.onkeypress = Util.hitch(this, function(e) {
			e = e || event;
			var keycode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			if (keycode == 13) {
				document.getElementById('spinner').style.display = 'block';
				document.getElementById('input').style.display = 'none';
				this._config['user'] = input.value;
				this._requestManager.getFriends({screen_name: input.value}, Util.hitch(this, 'receiveUserGraph'));
			}
		});
		
	},
	
	dumpSession: function() {
		this._logger.activate();
		this._logger.log('Application', 'dumpSession', this._requestManager.getRubberData());
	},
	
	receiveUserGraph: function(ids) {
 		this._logger.log('Application', 'receiveUserGraph', ids);
		
		// Stash all the friendships
		for (var i=0; i<ids.length; i++) { this._following[ids[i]] = true; }
		// Now request the graph of each friend
		for (var i=0; i<ids.length && i<this._config['maxBreadth']; i++) { 
			var index = Math.floor(Math.random() * ids.length);
			var id = ids.splice(index, 1);
			this._outstandingRequests += 1;
			this._requestManager.getFriends({id: id}, Util.hitch(this, 'receiveFriendGraph', id));
		}
	},
	
	receiveFriendGraph: function(id, ids) {
		this._logger.log('Application', 'receiveFriendGraph', ids);
		
		for (var i=0; i<ids.length; i++) { 
			this._friendsFriendCount[ids[i]] = (this._friendsFriendCount[ids[i]] || 0) + 1;
		}
		this._outstandingRequests--;
		if (this._outstandingRequests == 0) {
			this.processData();
		}
	},
	
	processData: function() {
		this._logger.log('Application', 'processData');
		
		var userArray = [];
		for (var id in this._friendsFriendCount) {
			userArray.push({id: id, count: this._friendsFriendCount[id]});
		}
		userArray.sort(function(a, b){ return b.count - a.count });
		var shouldFollow = [];
		var alreadyFollowing = [];
		while (userArray.length && 
				userArray[0].count >= this._config['minLinks'] && 
				shouldFollow.length < this._config['maxResults']) {
			var user = userArray.shift();
			if (this._following[user.id]) {
				alreadyFollowing.push(user);
			} else {
				shouldFollow.push(user);
			}
		}
		document.getElementById('spinner').style.display = 'none';
		document.getElementById('should-follow').style.display = 'block';
		this.getInfo(shouldFollow, alreadyFollowing);
	},
	
	getInfo: function(shouldFollow, alreadyFollowing) {
		var shouldFollowspan = document.getElementById('should-follow');
		var alreadyFollowingspan = document.getElementById('already-following');
		
		for (var i=0; i < shouldFollow.length; i++) {
			var link = document.createElement('a');
			link.className = 'user';
			shouldFollowspan.appendChild(link);
			this._requestManager.getUserInfo({ id: shouldFollow[i].id }, 
				Util.hitch(this, 'receiveUserInfo', shouldFollow[i].id, link));
		}
	},
	
	receiveUserInfo: function(id, userLink, response) {
		if (response.screen_name == this._config['user']) { return; }
		this._logger.log('Application', 'receiveUserInfo', id, response);
	
		userLink.style.display = 'block';
		userLink.target = '_blank';
		userLink.href = 'http://www.twitter.com/' + response.screen_name;
		userLink.innerHTML = '' +
			'<img class="icon" src="'+ response.profile_image_url +'" />' +
			'<span class="info-bit name">' + response.name + '</span>' +
			'<span class="info-bit description">' + response.description + '</span>' +
			// '<span class="follower-stats">' +
			// 	'Follows <span class="info-bit follows">' + response.friends_count + '</span>, ' +
			// 	'Followed by <span class="info-bit followed-by">' + response.followers_count + '</span>' +
			// '</span>' +
			// '<span class="info-bit tweet-count">' + response.statuses_count + ' Tweets</span>' +
			// '<span class="info-bit status">' + response.status.text + '</span>'
			''
	},
	
	onError: function() {
		var elements = document.body.childNodes;
		for (var i=0; i < elements.length; i++) {
			if (elements[i].style) {
				elements[i].style.display = 'none';				
			}
		};
		document.getElementById('error').style.display = 'block';
	}
})