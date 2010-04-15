/**
* 
* Chassis version 1.2 by Rozario Chivers 2008	 
* Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
*
* dependencies: namespace.js, eventsubscriber.js, site.events.js
*/
$.namespace("site.comms.xhrLoad");

site.comms.xhrLoad =(function(config) {
	// provide default xhr events based on constants
	// override if custom event is provided
	var ajaxSuccess = config.successEvent || site.events.ajax.SUCCESS;
	var ajaxBefore = config.beforeSendEvent || site.events.ajax.BEFORE;
	var ajaxComplete = config.completeEvent || site.events.ajax.COMPLETE;
	var ajaxError = config.errorEvent || site.events.ajax.ERROR;
			
	config.success = function(data) {
		$.publish(ajaxSuccess, data);
	}
	config.beforeSend = function(data) {
		$.publish(ajaxBefore, data);
	}
	config.complete = function() {
		$.publish(ajaxComplete);
	}
	config.error = function(xhr, strError) {
		$.publish(ajaxError, strError);
	}
	return $.ajax(config);
});

/** 
	example:
		
		$.subscribe(site.events.ajax.SUCCESS, function(e) {
			alert("success! content = " + e.data);
		});
		
		$.subscribe("test.BEFORE", function(e) {
			alert("before!");
		});
		
		$.subscribe("test.ERROR", function(xhr, errorStr) {
			alert("error!" + errorStr);
		});
		
		$.subscribe(site.events.ajax.COMPLETE, function() {
			alert("All Ajax events complete!");
		});
		
		$(function() {
			
			site.comms.xhrLoad({
				url : "test1.txt",
				contentType : "appliction/ajax",
				dataType : "html",
				timeout: (4000),  
				successEvent : "test.SUCCESS",
				beforeSendEvent : "test.BEFORE",
				completeEvent : "test.COMPLETE",
				errorEvent : "test.ERROR"		
			});
			
			site.comms.xhrLoad({
				url : "test2.txts",
				contentType : "appliction/ajax",
				dataType : "html",
				successEvent : "site.events.ajax.SUCCESS"
			});
		}); 
**/

// allow the parsing of XML with jQuery
jQuery.parseXML = function( xml ) {
        if( window.ActiveXObject && window.GetObject ) {
            var dom = new ActiveXObject( 'Microsoft.XMLDOM' );
            dom.loadXML( xml );
            return dom;
        }
        if( window.DOMParser )
            return new DOMParser().parseFromString( xml, 'text/xml' );
        throw new Error( 'No XML parser available' );
}

/** 
  example: 
 	var test1 = new site.comms.xhrLoad({
         type: "GET",
         url: "Web.config",
		 processData : false,
         data: 'xml',
         success: function(xml) {
         	var dom = $.parseXML(xml);
			var $dom = $(dom);
			var deploySite = ($dom.find('firstNode').attr('Site') || ""); 
            console.log(deploySite);
         }
     }); //end $.xhrLoad
**/