function Class(packageName, declaration) {

	// create the namespace
	var namespace = window;
	var packageParts = packageName.split('.');
	var className = packageParts.pop();
	for (var i=0, part; part = packageParts[i]; i++) {
		if (!namespace[part]) { namespace[part] = {}; }
		namespace = namespace[part];
	}

	namespace[className] = declaration.initialize || Util.emptyFn;
	namespace[className].prototype = declaration;
}

function Singleton(className, declaration) {
	Class(className, declaration);
	window[className] = new window[className]();
}
