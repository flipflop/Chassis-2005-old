/* unit test examples */

//@annotate Test("");
function setName(name) {
	return name;
}

//generic function
//@annotate genericTest("thing");
function setThing(name) {
	return name;
}
		
var foo = {
	name : "",
	
	//@annotate foo.setName("string") pants
	setName : function(name) {
		this.name = name;
	},
	
	//@annotate foo.getName()
	getName : function() {
		return this.name;
	}	
	
};

//[0] = {foo : {setName : param, getName : param}} 
//[1] = {bar : {setName : param, getName : param}}

//@annotate  Test("testConfig.xml")
var bar = {
	name : "",
	
	//@annotate Test("string")
	setName : function(name) {
		this.name = name;
	},
	
	//@annotate Test()
	getName : function() {
		return this.name;
	}	
	
};
