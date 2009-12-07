var sys = require('sys');
var http = require('http');

require.paths.push('twitter');
var twitter = require('twitter').twitter;

twitter.fetchUrl = function(url, callback) {
	var host = url.match(/^https?:\/\/search\.twitter\.com/) ? 'search.twitter.com' : 'twitter.com';
	var connection = http.createClient(80, host);
	var params = { host: host, 'User-Agent': 'twitter.js node client' };
	var request = connection.get(url, params).finish(function(response) {
		var responseBody = '';
		response.setBodyEncoding('utf8');
		response.addListener('body', function(chunk) { responseBody += chunk});
        response.addListener('complete', function() {
			callback(JSON.parse(responseBody));
		})
	})
}

exports.twitter = twitter

// twitter.getMentions('marcuswestin', function(response) {
// 	var tweets = response.results;
// 	var tweet = tweets[0];
// 	sys.puts(tweet.text);
// })