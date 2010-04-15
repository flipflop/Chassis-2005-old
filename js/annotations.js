/**
	 * Licensed under a Creative Commons Attribution 3.0 License
	 * Rozario Chivers January 2007
	 * jQuery annotations
	 * version 0.3 
	 * Released under a creative commons Attribution-ShareAlike 2.5 license 
	 * (http://creativecommons.org/licenses/by-sa/2.5/)
	 *
	 * Dependencies: site.events, eventsubscriber
	 *
	 * Annotation reader
	 * @param scriptSrc {String} path and name of JavaScript file
	 * @param annotation {String} name of annotation (default "@annotate")
	 * @return nothing returned
*/

$.namespace("site.annotations");

site.annotations = {
	newXmlHttpReq : {},
	jsContent : "",
	annotationToken : "@annotate",
	annotationList : [],
	get : function() {
		return this.annotationList;
	},
	
	Load : function(scriptSrc, annotation) {		
		if(annotation) this.annotationToken = annotation; 
		
		var XHR = $.ajax({
			url : scriptSrc,
			contentType : "txt/javascript",
			dataType : "javascript",
			timeout: (4000), 
			
			success : function(data) {
				site.annotations.getData(data);
			},
			
			error : function() {
				
				// handle error
			},
			
			complete : function() {
				// handle on annotation disposal
			}
		});		
	},
	
	getScriptTags : function() {
		var scriptTags = $("script");
	
		return scriptTags;
	},
	
	getTagBodies : function() {
		var tagBody = site.annotations.getScriptTags().text();
		site.annotations.getData(tagBody);
	},
	
	getSrcBodies : function() {
		$(site.annotations.getScriptTags()).each(function(i) {
			if (this.src.match(/annotations.js/i)) return;
			//console.log(this.src);
			if (this.src) site.annotations.Load(this.src);
		});
		
		//return tagBody;
	},
	
	getAll : function() {
		site.annotations.getTagBodies();
		site.annotations.getSrcBodies();
		$.publish(site.events.annotation.ready, {});
	},
	
	getData : function (data) {	
		this.jsContent = data;
		this.annotationList += site.annotations.parse();
		/*
		alert("number of annotations found: " +  this.annotationList.length);
		for (var i=0; i<this.annotationList.length; i++) {
			alert("annotation " + i + "= "  + this.annotationList[i]);
		}
		
		console.log(this.get()[0]);
		*/
	},
		
	findAnnotations : function(startIndex, content) {
		var content = this.jsContent;
		var dataList = [];
		while (startIndex >=0 && startIndex < content.length) {
			var annotationStartIndex = content.indexOf(this.annotationToken, startIndex);			
			
			if (annotationStartIndex == -1) break;
			
			var annotationEndIndex = content.indexOf(")", annotationStartIndex);
			if (annotationEndIndex == -1) break;
			
			var annotationContent = content.substring(
									annotationStartIndex + this.annotationToken.length, 
									annotationEndIndex + 1);
									
			$.publish(site.events.annotation.loaded, annotationContent);
			dataList.push(annotationContent);				
			startIndex = annotationEndIndex + 1;
		}
		
		return dataList;
	},	
	
	parse : function() {
		return this.findAnnotations(0, this.jsContent);
	}
}; // end site.annotations

site.annotations.getAll();
//site.annotations.Load("js/testscript.js");
$.subscribe(site.events.annotation.loaded, function(e) {
	console.log("success! loaded annotations = " + e.data);
});

