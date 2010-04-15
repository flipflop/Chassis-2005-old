/**
 * Gridder initialisation requires a JSON object with the following labels:
 * element - display container reference (use CSS class name or ID), 
 * 			defaults to body tag
 * width - width of the grid, defaults to 100%
 * columns - list of column widths
 * columngutters - list of gutter widths for columns
 * rows - list of row widths
 * rowgutters - list of gutter widths for rows
 * lines - number of typographical lines, defaults to 25 lines
 * lineheights - typographical line heights, defaults to 12px
 * 
 * All measurements may be in units em, px, pt, %.
 *
 * Keys :
 * Column Grid (Alt + 1)
 * Horizontal Grid (Alt + 2) 
 * Baseline grid (Alt +3)
 *
 * Copyright November 2007 Rozario Chivers
 * Released under a creative commons Attribution-ShareAlike 2.5 license (http://creativecommons.org/licenses/by-sa/2.5/)
 */

var Gridder = {
	gridHeight : 0,
	gridWidth : 0,	
	gridBox1 : null,
	gridBox2 : null,
	gridBox3 : null,
	attachTo : {},
		
	init : function(grid) {
		//get defensive
		if(!document.getElementById || !document.createElement) {
			return;
		}
		
		// find HTML element
		if (grid.element) {
			var elementRef = grid.element.substring(1);
			var isClass = grid.element.charAt(0) == ".";
			var isId = grid.element.charAt(0) == "#";

			if(isClass && Gridder.getElementsByClassName(elementRef)
					&& Gridder.getElementsByClassName(elementRef)[0]) { // get element by class name				
				Gridder.attachTo = Gridder.getElementsByClassName(elementRef)[0];
			} else if(isId) { 	// get element by ID				
				Gridder.attachTo = document.getElementById(elementRef);
			} else { 			// default to get element by ID if "#" or "." not provided
				Gridder.attachTo = document.getElementById(grid.element);		
			}
		}
		
		//default to <body>		
		if (!Gridder.attachTo || Gridder.attachTo === null) {
			Gridder.attachTo = document.getElementsByTagName("body")[0];	
		}
		
		//set to height of attached grid element - default to offsetHeight for IE 6
		Gridder.gridHeight = (Gridder.gridHeight != "NaN") ? document.body.offsetHeight : Gridder.getHeight(Gridder.attachTo);
		Gridder.gridWidth = (Gridder.gridWidth != "NaN") ? document.body.offsetWidth : Gridder.getWidth(Gridder.attachTo);
		//diplay grids if minimum data is available
		if(grid.columns) Gridder.drawColumns(grid);
		if (grid.rows) Gridder.drawRows(grid);
		if (grid.lines) Gridder.drawLines(grid);
		
		//show / hide grid depending on keys:
		//alt + 1, 2, 3
		// 1 = "49"
		// 2 = "50"
		// 3 = "51" 
		document.onkeydown = function(e) {
		//return the right event	
		e = e || window.event;	
		//get keycode
		var keyCode = (window.event) ? window.event.keyCode : e.which;
		
		if (e.altKey) {	
			if(keyCode == "49" && Gridder.gridBox1) {
				Gridder.showGrid(Gridder.gridBox1);	
			}
			
			if(keyCode == "50" && Gridder.gridBox2) {
				Gridder.showGrid(Gridder.gridBox2);	
			}
			
			if(keyCode == "51" && Gridder.gridBox3) {
				Gridder.showGrid(Gridder.gridBox3);	
				}		
			}
		}
	},

	showGrid : function(gridBox) {
		var gridVisible = gridBox.style.visibility;
			gridBox.style.visibility = (gridVisible == "hidden") ? "visible" : "hidden";
			gridBox.style.height = Gridder.gridHeight;				
	},

	setStyle : function(elementRef,cssStyles) {
		if(document.all && !window.opera) 
			elementRef.style.setAttribute("cssText",cssStyles,0); 
		else 
			elementRef.setAttribute("style",cssStyles);
	},
	
	// Get a style property (name) of a specific element (elem)
	getStyle : function( elem, name ) {
		if (elem.style[name]) return elem.style[name];
		else if (elem.currentStyle)
		return elem.currentStyle[name];
		else if (document.defaultView && document.defaultView.getComputedStyle) {
		
		name = name.replace(/([A-Z])/g,"-$1");
		name = name.toLowerCase();
		
		var s = document.defaultView.getComputedStyle(elem,"");
		return s && s.getPropertyValue(name);
		} else
		
	return null;
	},
	
	// Get the actual height (using the computed CSS) of an element
	getHeight : function( elem ) {
		return parseInt( Gridder.getStyle( elem, 'height' ) );
	},
	
	// Get the actual width (using the computed CSS) of an element
	getWidth : function( elem ) {
		return parseInt( Gridder.getStyle( elem, 'width' ) );
	},
	
	drawColumns : function(grid) {
		
		Gridder.gridBox1 = document.createElement("div");
		Gridder.setStyle(Gridder.gridBox1, "height:100%;z-index:49;"
				+ "position:absolute;top:0;left:0;opacity:.65;"
				+ "filter:alpha(opacity=65);background-color:#900;");		
		Gridder.gridBox1.style.width = grid.width || ""; //override		
		Gridder.gridBox1.style.visibility = "hidden";		
		
		var columnLen = grid.columns.length;
		var column = [];
				
		for(var i=0; i < columnLen; i++) { //iterate over columns
			column = grid.columns[i];			
			//check for invalid data
			if(!column || column === null || column === "undefined") {
				alert("invalid column data");
				return;	
			}
			
			//create divs
			var divTag=document.createElement("div");
			var gutter=document.createElement("div"); 			
			var divBorder = "border-left:1px solid #fff;";
			
			if (grid.columngutters) {
				Gridder.setStyle(gutter, "height:100%;float:left;opacity:.65;"
						+ "filter:alpha(opacity=65);background-color:#fcc;"
						+ "height:100%;width:" + grid.columngutters[i]);
			} else {
				divBorder = "";
			}
			
			gutter.innerHTML = ""; //may be redundant
			divTag.innerHTML = ""; //may be redundant
			Gridder.setStyle(divTag, "height:100%;float:left;margin:0;"
					 + "border-right:1px solid #fff;" + divBorder 
					 + "height:100%;width:" + column);
			if (grid.columngutters) Gridder.gridBox1.appendChild(gutter);
			Gridder.gridBox1.appendChild(divTag);
			
			//add outer gutter
			if(i == grid.columns.length-1) {
				gutter = document.createElement("div"); 
				if (grid.columngutters) {
					Gridder.setStyle(gutter,"height:100%;float:left;"
							+ "opacity:.65;filter:alpha(opacity=65);"
							+ "background-color:#fcc;width:"
							+ grid.columngutters[i+1]);
					Gridder.gridBox1.appendChild(gutter);
				}
			}
		}
		
		Gridder.attachTo.appendChild(Gridder.gridBox1);
	},			
		
	drawRows : function(grid) {
		Gridder.gridBox2 = document.createElement("div");
		Gridder.setStyle(Gridder.gridBox2, "height:100%;z-index:49;" 
				+ "position:absolute;top:0;left:0;opacity:.65;"
				+ "filter:alpha(opacity=65);background-color:#900;");		
		Gridder.gridBox2.style.width = grid.width || ""; //override
		Gridder.gridBox2.style.visibility = "hidden";			
		
		var rowLen = grid.rows.length;
		var row = [];
		
		//iterate over rows
		for(var i=0; i < rowLen; i++) {
			row = grid.rows[i];
			//check for invalid data
			if(!row || row === null || row === "undefined") {
				alert("invalid row data");
				return;	
			}
			
			//create divs
			var divTag=document.createElement("div");
			var gutter=document.createElement("div"); 			
			var divBorder = "border-top:1px solid #fff;";
			
			if(grid.rowgutters) {
				Gridder.setStyle(gutter, "width:100%;clear:both;opacity:.65;"
						+ "filter:alpha(opacity=65);padding:0;margin:0;background-color:#fcc;"
						+ "height:" + grid.rowgutters[i]);
			} else {
				divBorder = "";
			}
			
			gutter.style.width = grid.width || ""; //override
			Gridder.setStyle(divTag, "width:"+grid.width+";clear:both;margin:-2px;"
					+ divBorder + "border-bottom:1px solid #fff;height:" + row);
					
			divTag.innerHTML="";
			if(grid.rowgutters) Gridder.gridBox2.appendChild(gutter);
			Gridder.gridBox2.appendChild(divTag);
			
			//add outer gutter
			if(i == grid.rows.length-1) {				
				if(grid.rowgutters) {
					gutter=document.createElement("div");  
					Gridder.setStyle(gutter,"width:"+grid.width+";opacity:.65;"
							+ "filter:alpha(opacity=65);background-color:#fcc;"
							+ "height:" + grid.rowgutters[i+1]);					
					gutter.style.width = grid.width; //override
					Gridder.gridBox2.appendChild(gutter);
				}
			}
		}
		
		Gridder.attachTo.appendChild(Gridder.gridBox2);
	},	
	
	//draw typographical grid
	drawLines : function(grid) {
		var lineheight = grid.lineheight || "12px"; //default to 12px
		var lines = grid.lines || 25;				//default to 25 lines

		Gridder.gridBox3 = document.createElement("div");
		Gridder.setStyle(Gridder.gridBox3, "height:100%;z-index:49;"
				+ "position:absolute;top:0;left:0;");
		Gridder.gridBox3.style.visibility = "hidden";	

		//iterate over lines
		for(var i=0; i < lines; i++) {			
			var divTag=document.createElement("div"); //create divs
			Gridder.setStyle(divTag, "width:" + grid.width 
					+ ";clear:both;margin:0;border-bottom:1px solid #9cc;"
					+ "height:100%;height:" + lineheight);
			divTag.style.width = grid.width;
			divTag.innerHTML = ""; //may be redundant
			Gridder.gridBox3.appendChild(divTag);
		}

		Gridder.attachTo.appendChild(Gridder.gridBox3);
	},	
			
	//utility
	getElementsByClassName : function(name,type) {
		//from J Resig's Pro JS Techniques
		var r = [];
		var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
		var e = document.getElementsByTagName(type || "*");	
		for ( var j = 0; j < e.length; j++ ) {
			if ( re.test(e[j].className) ) r.push( e[j] );
		}
	
		return r;
	}
};


/**
 * Gridder initialisation requires a JSON object with the following labels:
 * element - display container reference (use CSS class name or ID), 
 * 			defaults to body tag
 * width - width of the grid, defaults to 100%
 * columns - list of column widths
 * columngutters - list of gutter widths for columns
 * rows - list of row widths
 * rowgutters - list of gutter widths for rows
 * lines - number lines for baseline grid, defaults to 25 lines
 * lineheights - typographical line heights, defaults to 12px
 * 
 * use CTRL + 1, 2 or 3 to view each grid
 * 
 * All measurements may be in units em, px, pt, %.
 *
 * Copyright November 2007 Rozario Chivers, all rights reserved and that
 
 * Example :
 * 
$(document).ready(function() {
	Gridder.init({		
		element : "#content", 	//use name, CSS class or ID
		width : "950px", 		//optional width
		
		//grid columns and gutters (optional)
		columns : ["218px","438px"],
				
		//grid rows and gutters (optional)
		rows : ["130px","154px","34px","92px","314px","194px","34px"], 
		
		//typographical grid (optional)
		lines: 72,
		lineheight:"12px"
	});

});

*/