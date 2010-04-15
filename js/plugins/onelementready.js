jQuery.extend({
	/**
	 * Licensed under a Creative Commons Attribution 3.0 License
	 * Rozario Chivers January 2008
	 * JQuery onElementReady
	 * version 0.8 
	 * Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
	 *
	 * Fire an event when a specified element is created. If multiple elements
	 * are found, only the first element will be used.
	 * @param query {String} selector, can be a class name, id or tag name. 
	 * @param callBack {function} event fired when element is created
	 * @param timeoutValue {Integer} optional, exit time in miliseconds
	 * @param pollInterval {Integer} optional, time interval for checking if 
	 * 						element is created
	 * @return nothing returned
	 */		 
		onElementReady: function(query, callBack, timeoutValue, pollInterval) {
		var _pollInterval = pollInterval || 100;
		var _timeoutValue = timeoutValue || 8500;
		var elementPoll = null;
		var elementTimeout = null;

		var endPolling = function(condition, element, callback) {
			if (condition && ( $(element).siblings().length > 0 ||
					$(element).text().length > 0) ) {
				clearInterval(elementPoll);
				clearTimeout(elementTimeout);
				elementPoll = null;
				elementTimeout = null;
				if (callBack) callBack();
			}
		}

		// poll element and execute callback if found
		elementPoll = setInterval(function() {
				var element = $(query)[0];
				// if element exists execute callback and handle IE
				// operation aborted
				endPolling(element !== undefined, element, callBack);
			}
		, _pollInterval);

		// exit if element not found after timeoutValue
		elementTimeout = setTimeout(function() {
				var element = $(query)[0];
				// handle IE operation aborted
				endPolling(element === undefined, element);
			}
		, _timeoutValue);
	} // end onElementReady
});

// examples
//$.onElementReady(".test1", function() {alert("onDomSpanThing 1");}, 10000, 250);
//$.onElementReady(".test2", function() {alert("onDomSpanThing 2");});

