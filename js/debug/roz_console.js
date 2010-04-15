/**
	 * 
	 * Rozario Chivers June 2008
	 * version 0.1 
	 * very temporary (hackish) console
	 *
**/

if (!console) var console = {};

$(document).ready(
	function() {
		// don't run in Firefox (yet)
		if ($.browser.mozilla) return;
		
		console = {
			
			bodyRef : document.getElementsByTagName("BODY")[0],
			consoleArea : null,
			
			logAreaInit : function() {
				
				// set CSS styles for container
				console.consoleArea = document.createElement("DIV");
				console.consoleArea.style.height="100px";
				console.consoleArea.style.width="99%";
				console.consoleArea.style.overflow="auto";
				console.consoleArea.style.fontFamily="courier";
				console.consoleArea.style.fontSize="7px";
				//console.consoleArea.style.border="1px solid red";
				console.consoleArea.style.position = "absolute";
				//console.consoleArea.style.top = parseInt(console.bodyRef.scrollHeight) - parseInt(console.consoleArea.scrollHeight) + "px";
				console.consoleArea.style.top = console.bodyRef.scrollHeight + 20;
				//console.consoleArea.style = "font-family:courier;size:12px;height:240px;position:absolute;overflow:auto";
			
				console.bodyRef.appendChild(console.consoleArea);
			},
				
			log : function(message) {	

				if (console.consoleArea === null) console.logAreaInit();	
				var logLine = document.createElement("DIV");
				// set global CSS styles for container
				logLine.style.height="16px";
				logLine.style.width="98%";
				logLine.style.paddingTop="1px";
				logLine.style.paddingLeft="5px";
				logLine.innerHTML=message;
				logLine.style.borderBottom="1px solid #eee";	
				console.consoleArea.appendChild(logLine);
				console.consoleArea.scrollTop = console.consoleArea.scrollHeight;
				
			},
			
			 assert : function(condition, msg, verbose) {
			
				if (condition === false) {
					
					var message = msg || "";
				
					// log to console
					console.log ( message );
				} // end if (condition === false)
			} // end assert
			
		}// end console

});