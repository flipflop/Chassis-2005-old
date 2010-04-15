/**
* 
* Chassis version 1.2 by Rozario Chivers 2008	 
* Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
*
* Homepage Module
* used to manage other objects and page display
* apply common page events, independant of components
* 
*/
site.Homepage = (function(){
	// onDomReady events
	$(function() {
		addEvents();
		site.Homepage.display();
		// usage: alt+1, alt+2 or alt+3
		Gridder.init({		
			element : "#content", 	//use name, CSS class or ID
			width : "960px", 		//optional width
			
			//grid columns and gutters (optional)
			columns : ["220px","220px","220px","220px"],
			columngutters :	["5px","20px","16px","17px","13px"],	
			//grid rows and gutters (optional)
			rows : ["230px","196px","194px","24px","194px"], 
			rowgutters :	["36px","22px","22px","22px"],
			//typographical grid (optional)
			lines: 72,
			lineheight:"12px"
		});
	});
	// jQuery UI events
	var addEvents = function() {
	 
	};
	
	// public methods
	return {
		// lazy initialisation
		init : function() {
			
		},
		// handle display
		display : function() {
			
		}
	}// end return
})(); // end site.homepage
