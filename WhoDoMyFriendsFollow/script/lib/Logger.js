Class('Logger', {
	
	activate: function() {
		this._active = true;
	},
	
	log: function() {
		if (!this._active) { return; }
		var logEntry = document.createElement('span');
		for (var i=0; i < arguments.length; i++) {
			logEntry.innerHTML += this.toJson(arguments[i]) + '<br />';
		}
		logEntry.innerHTML += '<br />';
		this.getLoggerDiv().appendChild(logEntry);
	},
	
	getLoggerDiv: function() {
		if (this._div) { return this._div; }
		this._div = document.createElement('div');
		this._div.style.position = 'absolute';
		this._div.style.top = '10px';
		this._div.style.right = '10px';
		this._div.style.backgroundColor = '#333';
		this._div.style.border = '5px solid #333';
		this._div.style.color = 'white';
		this._div.style.width = '400px';
		this._div.style.height = '300px';
		this._div.style.overflow = 'auto';
		this._div.style.fontFamily = 'courier new';
		this._div.style.fontSize = '10px';
		this._div.style.whiteSpace = 'nowrap';
		
		document.body.appendChild(this._div);
		return this._div;
	},

	toJson: function(obj) {
		if (typeof obj == 'object') {
			if (!obj) { return 'null'; }
			var list = [];
			if (obj instanceof Array) {
				for (var i=0;i < obj.length;i++) { list.push(this.toJson(obj[i])); }
				return '[' + list.join(',') + ']';
			} else {
				for (var prop in obj) { list.push('"' + prop + '":' + this.toJson(obj[prop])); }
				return '{' + list.join(',') + '}';
			}
		} else if (typeof obj == 'string') {
			return '"' + obj.replace(/(["'])/g, '\\$1') + '"';
		} else {
			return new String(obj);
		}
	}
})