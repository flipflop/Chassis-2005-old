/**
 * Homepage Module
 * used to manage other objects and page display
 * apply common page events, independant of components
 */
// temporary assignment 
// (replace with appropriate analytics provider)
$.namespace("analytics");

site.homepage = (function(){
	
	// private page data
	var data = [];
	// private method
	var populateAnalyticsData = function() {
		// connect to analytics provider
		site.ui.SITENAME = analytics.sitename;
		site.ui.CATEGORY = analytics.category;
		site.ui.PAGENAME = analytics.pagename;
		site.ui.SECTION = analytics.section;
		site.ui.URL = analytics.Url;
	};
	// onDomReady events
	$(function() {
		// check if methods are use appropriately
		populateAnalyticsData();
		site.homepage.display();
	}); // end onDomReady
	
	// public methods
	return {
		// lazy initialisation
		init : function() {
			
		},
		// handle display
		display : function() {
			
		},
		// jQuery UI events
		addEvents : function() {
			
		}
	}// end return
	
})();