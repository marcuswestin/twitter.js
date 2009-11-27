window.onload = function() {
	var queryParams = location.search.substr(1).split('&');
	var config = {};
	for (var i=0; i<queryParams.length; i++) { 
		var parts = queryParams[i].split('=');
		config[parts[0]] = parts[1];
	}
	
	var rubberData = RubberData;
	if (!config['useRubberData']) {
		rubberData = {};
	}
	
	Application.run(config, rubberData);
}
