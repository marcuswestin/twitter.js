/* Twitter API
 *************/
twitter.getFriends('marcuswestin', function(userIds){})
twitter.getUserInfo('marcuswestin', function(userInfo){})
twitter.getTimeline('marcuswestin', function(tweets){})
twitter.getLoggedInStatus(function(status){})

/* Twitter search API
 ********************/
twitter.getMentions('marcuswestin', function(response))

/* Tweet cache - useful for development and testing
 **************************************************/
twitter.addToCache(url, data);
twitter.getCache();
twitter.setCache({ url1: response1, url2: response2 });

// very useful for debugging, to avoid hitting your rate limit while testing.
var cacheString = twitter.getCache().toSource();
twitter.setCache(eval(cacheString));

/* Examples
 **********/
twitter.getMentions('marcuswestin', function(response) {
	response.profile_image_url
	response.max_id
	response.since_id
	response.refresh_url
	response.total
	response.results_per_page
	response.page
	response.completed_in
	response.query
	
	var tweets = response.results;
	var tweet = tweets[0];
	tweet.profile_image_url
	tweet.created_at
	tweet.from_user
	tweet.to_user_id
	tweet.text
	tweet.id
	tweet.from_user_id
	tweet.geo
	tweet.iso_language_code
	tweet.source
})

twitter.getTimeline('marcuswestin', function(tweets){
	var tweet = tweets[0];
	tweet.truncated
	tweet.favorited
	tweet.source
	tweet.in_reply_to_user_id
	tweet.in_reply_to_status_id
	tweet.in_reply_to_screen_name
	tweet.created_at
	tweet.id
	tweet.geo
	tweet.text

	var userInfo = tweet.user;
	userInfo.notifications
	userInfo.favourites_count
	userInfo.profile_background_color
	userInfo.description
	userInfo.following
	userInfo.verified
	userInfo.profile_sidebar_fill_color
	userInfo.profile_image_url
	userInfo.time_zone
	userInfo.profile_sidebar_border_color
	userInfo.url
	userInfo.screen_name
	userInfo.statuses_count
	userInfo.profile_text_color
	userInfo.followers_count
	userInfo['protected']
	userInfo.profile_background_image_url
	userInfo.created_at
	userInfo.location
	userInfo.name
	userInfo.geo_enabled
	userInfo.friends_count
	userInfo.profile_link_color
	userInfo.id
	userInfo.profile_background_tile
	userInfo.utc_offset
})
