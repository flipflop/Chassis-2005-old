jQuery.extend({
	/**
	 * Code example from Zach Leatherman's blog, based on the YUI namespacer
	 * Returns the namespace specified and creates it if it doesn't exist
	 * <pre>
	 * YAHOO.namespace("property.package");
	 * YAHOO.namespace("YAHOO.property.package");
	 * </pre>
	 * Either of the above would create YAHOO.property, then
	 * YAHOO.property.package
	 *
	 * Be careful when naming packages. Reserved words may work in some browsers
	 * and not others. For instance, the following will fail in Safari:
	 * <pre>
	 * YAHOO.namespace("really.long.nested.namespace");
	 * </pre>
	 * This fails because "long" is a future reserved word in ECMAScript
	 *
	 * @method namespace
	 * @static
	 * @param  {String*} arguments 1-n namespaces to create 
	 * @return {Object}  A reference to the last namespace object created
	 */
	namespace: function(){
		var a = arguments, o = null, i, j, d;
		for (i = 0; i < a.length; i = i + 1) {
			d = a[i].split(".");
			o = window;
			for (j = 0; j < d.length; j = j + 1) {
				o[d[j]] = o[d[j]] ||
				{};
				o = o[d[j]];
			}
		}
		return o;
	}	
});




