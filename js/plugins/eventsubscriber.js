/**
	 * Licensed under a Creative Commons Attribution 3.0 License
	 * Rozario Chivers January 2008
	 * jQuery eventsubscriber
	 * version 0.1 
	 * Released under a creative commons Attribution-ShareAlike 2.5 license 
	 * (http://creativecommons.org/licenses/by-sa/2.5/)
	 *
	 * Publish and Subscribe event model for jQuery
	 * Namespaced events can be published and listened to
	 * @param customEvent {String} namespace for event
	 * @param func {Function} callback function
	 * @param data {Object} optional, (Array): Additional data to pass as arguments 
	 * (after the event object) to the event handler 
	 * @return jQuery {this} returned
*/	
	
	(function($) {
			$.publish = function(customEvent, data) {
				$(window).trigger(customEvent, data);	
			}; 
			
			$.subscribe = function(customEvent, func) {
				$(window).bind(customEvent, function(e) {
					e.data = Array.prototype.slice.call(arguments, 1);
					func(e);
					}
				);	
			};
			
			$.unSubscribe = function(customEvent) {
				$(window).unbind(customEvent);	
			}
	})(jQuery);
