(function() {
	var twitter = {};
	var _requestId = 0;
	var _cache = {};
	/* _cache = {
		"http://twitter.com/friends/ids.json?screen_name=narcvs": [15184804,30901377,20554406,14917179,41692754,5634122,31471844,14067617,818660,5854882,10776782,21626683,15282705],
		"http://twitter.com/users/show.json?id=8904922":{"description":"Javascript engineer, loving life","utc_offset":-18000,"profile_text_color":"7e430c","screen_name":"narcvs","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/5368680/hq-wallpapers-032.jpg","notifications":{},"profile_link_color":"d92f20","statuses_count":222,"profile_background_tile":true,"url":"http://blog.narcvs.com","name":"Marcus Westin","created_at":"Sat Sep 15 23:00:31 +0000 2007","profile_background_color":"C6E2EE","protected":false,"status":{"text":"FCC puts a fire under Apple, AT&T, Google http://bit.ly/m63ZE About time. Well Tweeted, everyone.","in_reply_to_user_id":{},"favorited":false,"in_reply_to_screen_name":{},"created_at":"Sat Aug 01 02:17:26 +0000 2009","truncated":false,"id":3063109699,"in_reply_to_status_id":{},"source":"TwitterFon"},"favourites_count":0,"followers_count":128,"profile_sidebar_fill_color":"dd9a64","verified":false,"time_zone":"Quito","friends_count":58,"following":{},"profile_sidebar_border_color":"89322a","location":"San Francisco","id":8904922,"profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/51598307/mwpoint3_normal.jpg"},"users/show.json?id=37570179":{"notifications":false,"profile_link_color":"0000ff","description":"TechCrunch founder. Dog Lover.","statuses_count":873,"profile_background_tile":false,"utc_offset":-28800,"created_at":"Mon May 04 02:20:17 +0000 2009","profile_background_color":"9ae4e8","favourites_count":2,"followers_count":11179,"profile_sidebar_fill_color":"e0ff92","url":"http://www.techcrunch.com","name":"Michael Arrington","verified":true,"time_zone":"Pacific Time (US & Canada)","friends_count":284,"protected":false,"status":{"favorited":false,"text":"saw Funny People with @nikcubrilovic last night. I love that movie.","in_reply_to_screen_name":{},"created_at":"Sat Aug 01 20:32:32 +0000 2009","truncated":false,"in_reply_to_status_id":{},"in_reply_to_user_id":{},"id":3075333350,"source":"Seesmic"},"profile_sidebar_border_color":"87bc44","profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/197358821/jma_copy_normal.jpg","following":false,"profile_text_color":"000000","location":"Palo Alto, CA","screen_name":"arrington","id":37570179,"profile_background_image_url":"http://static.twitter.com/images/themes/theme1/bg.gif"},"users/show.json?id=816653":{"following":{},"profile_text_color":"333333","description":"Breaking Technology News And Opinions From TechCrunch","screen_name":"TechCrunch","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/26534723/techcrunch_twitter_bg_5.png","utc_offset":-28800,"notifications":{},"profile_link_color":"0084B4","statuses_count":10155,"profile_background_tile":false,"created_at":"Wed Mar 07 01:27:09 +0000 2007","profile_background_color":"9AE4E8","url":"http://www.techcrunch.com","name":"TechCrunch","favourites_count":27,"followers_count":1011199,"protected":false,"status":{"in_reply_to_user_id":{},"text":"NSFW: Trust me on the sunscreen (and the future of journalism) http://tcrn.ch/2GWh by @paulcarr","favorited":false,"in_reply_to_screen_name":{},"created_at":"Sat Aug 01 21:37:20 +0000 2009","truncated":false,"in_reply_to_status_id":{},"id":3076207641,"source":"web"},"profile_sidebar_fill_color":"DDFFCC","verified":false,"time_zone":"Pacific Time (US & Canada)","friends_count":690,"profile_sidebar_border_color":"BDDCAD","profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/115466107/techcrunch_bigger_normal.png","location":"Silicon Valley","id":816653},"users/show.json?id=13370272":{"following":{},"profile_text_color":"333333","description":"Head of UX for Mozilla Labs. Lead for Ubiquity for Firefox. Founder of Songza.com, Bloxes.com, Humanized.com.","screen_name":"azaaza","profile_background_image_url":"http://static.twitter.com/images/themes/theme7/bg.gif","utc_offset":-28800,"notifications":{},"profile_link_color":"990000","statuses_count":2169,"profile_background_tile":false,"created_at":"Tue Feb 12 00:39:36 +0000 2008","profile_background_color":"EBEBEB","url":"http://azarask.in","name":"Aza Raskin","favourites_count":2,"followers_count":4096,"protected":false,"status":{"in_reply_to_user_id":{},"text":"Heading to @suneel\'s wedding in DC. So happy for Leena and Suneel. An amazing couple, with a bright and amazing future.","favorited":false,"in_reply_to_screen_name":{},"created_at":"Sat Aug 01 13:11:24 +0000 2009","truncated":false,"in_reply_to_status_id":{},"id":3069631923,"source":"TwitterFon"},"profile_sidebar_fill_color":"F3F3F3","verified":false,"time_zone":"Pacific Time (US & Canada)","friends_count":188,"profile_sidebar_border_color":"DFDFDF","profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/51871880/Photobooth_New_Apartment_3_normal.jpg","location":"San Francisco + The Internet","id":13370272},"users/show.json?id=14594220":{"following":false,"profile_text_color":"3E4415","followers_count":173,"description":"I just finished my Masters at Stanford and now have an awesome job at Meebo!","screen_name":"zentangerine","profile_background_image_url":"http://static.twitter.com/images/themes/theme5/bg.gif","utc_offset":-28800,"verified":false,"friends_count":141,"profile_link_color":"D02B55","profile_background_tile":false,"favourites_count":1,"created_at":"Wed Apr 30 01:45:56 +0000 2008","profile_background_color":"352726","url":"http://www.sarapetry.com","name":"Sara Petry","protected":false,"status":{"in_reply_to_user_id":16227393,"text":"@shonachica yay absinthe!!","favorited":false,"in_reply_to_screen_name":"shonachica","created_at":"Sat Aug 01 02:43:50 +0000 2009","truncated":false,"in_reply_to_status_id":3063179081,"id":3063513715,"source":"TwitterFon"},"profile_sidebar_fill_color":"99CC33","time_zone":"Pacific Time (US & Canada)","statuses_count":1281,"profile_sidebar_border_color":"829D5E","profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/269391346/sara_normal.png","location":"Sunnyvale, CA","id":14594220,"notifications":false},"users/show.json?id=7982802":{"favourites_count":1,"description":"This is my personal Twitter account. It may offend or bore you.","utc_offset":-28800,"profile_text_color":"000000","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/2486926/Picture_1.jpg","created_at":"Mon Aug 06 02:18:49 +0000 2007","verified":false,"profile_link_color":"0000ff","profile_background_tile":true,"url":{},"name":"Eric Rosser Eldon","profile_background_color":{},"protected":false,"status":{"text":"i\'ll admit. the guys who ride fixies down oak st next to my apt are pretty badass. lots of traffic. stoplights. and no great way to break","in_reply_to_user_id":{},"created_at":"Fri Jul 31 16:37:37 +0000 2009","favorited":false,"in_reply_to_screen_name":{},"truncated":false,"id":2954050075,"in_reply_to_status_id":{},"source":"TweetDeck"},"profile_sidebar_fill_color":"FFFFFF","followers_count":2738,"profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/45907962/mypic_normal.png","time_zone":"Pacific Time (US & Canada)","following":{},"notifications":{},"friends_count":881,"profile_sidebar_border_color":"FFFFFF","location":"Corvallis, OR + Silicon Valley","screen_name":"eldon","id":7982802,"statuses_count":2332},"users/show.json?id=15675252":{"following":false,"profile_text_color":"404040","followers_count":114,"description":"Visual Designer, Mozilla. Mortur Smaugtalon - Dwarf of the Lonely Mountain. Fan of Ketchup chips.","screen_name":"mart3ll","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/22212362/newBG2.gif","utc_offset":-18000,"verified":false,"friends_count":66,"profile_link_color":"6e4132","profile_background_tile":false,"favourites_count":1,"created_at":"Thu Jul 31 14:38:00 +0000 2008","profile_background_color":"171717","url":"http://www.seanmartell.com","name":"Sean Martell","protected":false,"status":{"in_reply_to_user_id":{},"text":"I must once again proclaim my love for font-face and -moz-box-shadow. <3. that is all.","favorited":false,"in_reply_to_screen_name":{},"created_at":"Sat Aug 01 17:11:33 +0000 2009","truncated":false,"in_reply_to_status_id":{},"id":3072565190,"source":"Twitterrific"},"profile_sidebar_fill_color":"171717","time_zone":"Eastern Time (US & Canada)","statuses_count":511,"profile_sidebar_border_color":"b08c86","profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/338720704/hero_normal.png","location":"Classified (LV5 Clearance)","id":15675252,"notifications":false},"users/show.json?id=20758099":{"description":"A Web based code editor, for Web developers, by Web developers","utc_offset":-32400,"profile_text_color":"333333","screen_name":"bespin","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/4447301/Picture_9.png","notifications":false,"profile_link_color":"0084B4","statuses_count":168,"profile_background_tile":false,"url":"http://bespin.mozilla.com/","name":"Project Bespin","created_at":"Fri Feb 13 09:06:14 +0000 2009","profile_background_color":"9AE4E8","protected":false,"status":{"text":"Alex Iskander just fixed a bunch of bugs. Thanks so much Alex! All of his recent work is now in tip.","in_reply_to_user_id":{},"favorited":false,"in_reply_to_screen_name":{},"created_at":"Fri Jul 31 16:56:04 +0000 2009","truncated":false,"id":3054201340,"in_reply_to_status_id":{},"source":"Tweetie"},"favourites_count":0,"followers_count":554,"profile_sidebar_fill_color":"DDFFCC","verified":false,"time_zone":"Alaska","friends_count":9,"following":false,"profile_sidebar_border_color":"BDDCAD","location":"Mozilla","id":20758099,"profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/77878576/Bespin_70x70_normal.png"},"users/show.json?id=736233":{"description":"Tweets focused on Adobe Flash Platform development, RIA, and, programming in general.","utc_offset":-28800,"profile_text_color":"000000","screen_name":"adobeted","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/44612/Blue_fiber_optic_wires_against_black_background.jpg","notifications":false,"profile_link_color":"0000ff","statuses_count":1490,"profile_background_tile":true,"url":"http://www.onflex.org","name":"Ted Patrick","created_at":"Wed Jan 31 06:06:00 +0000 2007","profile_background_color":"9ae4e8","protected":false,"status":{"text":"#FFFT Special thanks to everyone who participated today, it was way fun. See you in Sept 4 for Part2 of #FFFT","in_reply_to_user_id":{},"favorited":false,"in_reply_to_screen_name":{},"created_at":"Fri Jul 31 21:46:21 +0000 2009","truncated":false,"id":3058924368,"in_reply_to_status_id":{},"source":"DestroyTwitter"},"favourites_count":0,"followers_count":2524,"profile_sidebar_fill_color":"e0ff92","verified":false,"time_zone":"Pacific Time (US & Canada)","friends_count":153,"following":false,"profile_sidebar_border_color":"87bc44","location":"San Francisco, CA","id":736233,"profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/57839091/screenshot_02_normal.png"},"users/show.json?id=5875682":{"description":"entrepreneur, web/mobile developer, solar cell physicist, fixie rider","utc_offset":-28800,"profile_text_color":"000000","screen_name":"davejohnson","profile_background_image_url":"http://s3.amazonaws.com/twitter_production/profile_background_images/6815283/MegaManBosses_MikeM.jpg","notifications":{},"profile_link_color":"0000ff","statuses_count":3916,"profile_background_tile":true,"url":"http://nullisnotanobject.com","name":"dave johnson","created_at":"Tue May 08 20:31:21 +0000 2007","profile_background_color":"000000","protected":false,"status":{"text":"No camping trip can start until stops are made at the liquor store and canadian tire. Period.","in_reply_to_user_id":{},"favorited":false,"in_reply_to_screen_name":{},"created_at":"Sat Aug 01 19:12:04 +0000 2009","truncated":false,"id":3074220960,"in_reply_to_status_id":{},"source":"twidroid"},"favourites_count":0,"followers_count":584,"profile_sidebar_fill_color":"ffffff","verified":false,"time_zone":"Pacific Time (US & Canada)","friends_count":492,"following":{},"profile_sidebar_border_color":"000000","location":"Vancouver","id":5875682,"profile_image_url":"http://s3.amazonaws.com/twitter_production/profile_images/77078987/image_normal.jpg"},"url":{}
	}*/
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
	
	// Expose
	window.twitter = twitter;
})();