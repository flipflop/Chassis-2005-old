/**
* 
* Chassis version 1.2 by Rozario Chivers 2008	 
* Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
*
*/
$.namespace("site");

// all common code here
site.common = {
	// initialisation code on dom ready
	init: $(function() {
		/** 
		* provide site wide page contexts to JavaScript
		* populate only if classes are present
		* rule : application constants must be the first class name
		* "notfound" used to allow for error recovery if no classes found
		**/
		site.ui = {
			SITENAME : ($("body").attr("class")) ? $("body").attr("class").split(" ")[0] : "notfound",
			PAGENAME : ($("#content").attr("class")) ? $("#content").attr("class").split(" ")[0] : "notfound",
			LANGUAGE : ($("#main").attr("class")) ? $("#main").attr("class").split(" ")[0] : "notfound",
			
			IMAGEPATH : "img/",
			URL : window.location.href
		};
		
		// fix png transparency in IE6
		$("#contentarea").pngFix( );
		
		$(window).unload(function () {
			// Clear down all namespaced objects
			site = null;
		}); 	
	})// end : site.common.init

}; // CLOSE: site.common

// utilities
site.util = {
	/**
	 * return a comma separated list of methods available on an object. 
	 */	
	getMethodList : function(o) {
		var info = [];
		for (var i in o) {
			if(typeof o[i] === "function") {
				info.push(i);	
			} 
		}
		return info.toString();
	},
	/**
 	 * does variable substitution on the string. 
	 * It scans through the string looking for expressions enclosed in { } braces. 
	 * If an expression is found, use it as a key on the object, 
	 * and if the key has a string value or number value, 
	 * it is substituted for the bracket expression and it repeats. 
	 * This is useful for automatically fixing URLs.
	 * 
	 * http://javascript.crockford.com/remedial.html
	 */
	supplant : function (o) {
	    return this.replace(/{([^{}]*)}/g,
	        function (a, b) {
	            var r = o[b];
	            return typeof r === 'string' || typeof r === 'number' ? r : a;
	        }
	    );
	},
	/**
	 * JavaScript does not provide an infallible mechanism for distinguishing arrays from objects, 
	 * so if we want to recognize arrays that are constructed in a different frame, 
	 * then we need to do something more complicated.
	 * 
	 * http://javascript.crockford.com/remedial.html
	 */
	typeOf : function(value) {
	    var s = typeof value;
	    if (s === 'object') {
	        if (value) {
	            if (typeof value.length === 'number' &&
	                    !(value.propertyIsEnumerable('length')) &&
	                    typeof value.splice === 'function') {
	                s = 'array';
	            }
	        } else {
	            s = 'null';
	        }
	    }
	    return s;
	}
}; // end site.utils

$.namespace("site.util.mobile");

site.util.mobile.iphoneOS = function() {
	var mobileRequest = false;
	if (navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPod/i)) {
		mobileRequest = true;
	}
	return mobileRequest;	
};

site.util.mobile.androidOS = function() {
	var mobileRequest = false;
	if (navigator.userAgent.match(/Android/i)) {
		mobileRequest = true;
	}
	return mobileRequest;	
};
