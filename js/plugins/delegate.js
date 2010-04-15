jQuery.extend({
	/**
	 * Dan Webbs event delegation made easy for JQuery
	 * http://www.danwebb.net/2008/2/8/event-delegation-made-easy-in-jquery
	 */
	delegate: function(rules){
		return function(e) {
	    var target = $(e.target);
	    for (var selector in rules)
	      if (target.is(selector)) return rules[selector].apply(this, $.makeArray(arguments));
	  }
	}	
});




