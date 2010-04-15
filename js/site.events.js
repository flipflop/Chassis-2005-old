/**
* 
* Chassis version 1.2 by Rozario Chivers 2008	 
* Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
*
*/
$.namespace("site.events");

// custom event name <string>
site.events = {
	// initialisation code on dom ready
	ajax: {
		SUCCESS : "ajax.success",
		BEFORE : "ajax.before",
		COMPLETE : "ajax.complete",
		ERROR : "ajax.error"
	},
	annotation : {
		loaded : "annotation.loaded",
		ready : "annotation.ready"
	}

}; // CLOSE: site.events

