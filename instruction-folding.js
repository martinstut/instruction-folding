/* before the user can click anything, scan for elements with class="set-variable-value" */
window.addEventListener("load", function(){performRecursive(document, scanForSet );});
function globalSetVarToVal(setVariable, setValue) {
	/*	set variable to value for the entire document. 
		this is the onclick event handler for set-variable-value class elements 
	*/
	performRecursive(document, function(workNode){ nodeSetVarVal(workNode, setVariable, setValue);});
}
function nodeSetVarVal(workNode, setVariable, setValue) {
	/*	apply to workNode all changes required for reflecting setting of setVariable to setValue,
		in particular:
		- hide or unhide "if-var-val" nodes
		- mark or unmark "set-var-val" nodes with class setter or setter-active
		this is the core function of the entire library
	*/
	var classesSet = new classSet(workNode.className);
	if (classesSet.containsVariable(setVariable)) {
		/* this node does deal with setVariable*/
		if (classesSet.containsValue(setVariable, setValue)) {
			/*	this node does apply for setVariable having setValue
				=> show/mark */
			if (classesSet.isSetter(setVariable)) {
				/*MARK*/
				classesSet.addStringClass("setter-active")
				workNode.className = classesSet.to_s()
			}
			if (classesSet.isIffer(setVariable)) {
				/*SHOW*/
				workNode.style.display = null; /* removes 'none', avoids 'block', which in inappropriate for span etc. */
			}
		} else {
			/*	this node does deal with setVariable, but does _not_ apply for setValue 
				=> hide/unmark */
			if (classesSet.isSetter(setVariable)) {
				/*UNMARK*/
				classesSet.deleteStringClass("setter-active");
				workNode.className = classesSet.to_s();
			}
			if (classesSet.isIffer(setVariable)) {
				/*HIDE*/
				workNode.style.display = 'none';
			}
		}
	}
}
function scanForSet(currentNode) {
	/*	check whether this is a set-nnn-vvv node ;
		if it is, add an onclick event handler and perform default checking/setting
		*/
	var classesSet = new classSet(currentNode.className);
	var settingClass; /* the class this node is a setter for. Intentionally left undefined here. */
	classesSet.each( function(c) {
		if (c.verb === "set") {
			/* alert("setting onclick for " + c.to_s()); */
			currentNode.addEventListener("click", function() {
				globalSetVarToVal(c.variable, c.value);
			});
			settingClass = c;
		}		
	});
	if (settingClass !== undefined) {
		/* this node is a setter */
		/* check whether it is the default value */
		if (classesSet.containsStringClass("var-default")) {
			globalSetVarToVal(settingClass.variable, settingClass.value)
		}
	}
}
function performRecursive(currentNode, f) {
	/* 	very generic helper function:
		perform f for currentNode and all descendants
		f must take one (1) parameter: the DOM node element
	*/
	f(currentNode);
	/* check all subnodes */
	var cns = currentNode.childNodes;
	var i;
	for (i = 0; i < cns.length; i++) {
		performRecursive(cns[i], f);
	}
}
function singleClassString(classString) {
	/*	constructor of a little helper class: a single CSS class name, split to verb-variable-value,
		creating an object like {verb:"set", variable:"windowsversion", value:"7"}
		for e.g. "set-windowsversion-7"
		verb === "invalid" if there are not 3 elements or a non-recognized verb. */
	this.verb = "invalid";
	this.rawString = classString;
	var classPartArray = classString.split("-");
	if (classPartArray.length === 3) {
		var tmpverb = classPartArray[0];
		if ( (tmpverb === "set") || (tmpverb === "if") ) {
			this.verb = classPartArray[0];
			this.variable = classPartArray[1];
			this.value = classPartArray[2];
		}
	}
	this.to_s = function() {
		if (this.verb === "invalid")  {
			return this.rawString;
		} else {
			return this.verb + '-' + this.variable + '-' + this.value;
		}
	}
}
function classSet(classesString) {
	/*	constructor of a helper class: set of CSS classes, usually supplied by a string like "setter setter-active set-windowsversion-7" */
	this.classes = [];
	this.length = 0
	var classesStringArray = []
	if (classesString !== undefined) classesStringArray = classesString.split(" ");
	var i;
	for (i = 0; i < classesStringArray.length; i++) {
		this.classes[this.classes.length] = new singleClassString(classesStringArray[i]);
		this.length++;
	};
	this.addStringClass = function(classString) {
		if (!(this.containsStringClass(classString))) {
			this.classes[this.classes.length] = new singleClassString(classString);
			this.length++;			
		}
	}
	this.classNr = function(i) {
		return this.classes[i];
	}
	this.containsStringClass = function(classString) {
		var res = false;
		this.each( function(c) {
			if (c.to_s() === classString) {res = true;}
		});
		return res;		
	}
	this.containsValue = function(varName, varValue) {
		var res = false;
		this.each( function(c) {
			if ((c.variable === varName) && (c.value == varValue)) {res = true;}
		});
		return res;
	}
	this.containsVariable = function(varName) {
		var res = false;
		this.each( function(c) {
			if (c.variable === varName) {res = true;}
		});
		return res;
	};
	this.deleteStringClass = function(classString) {
		if (this.containsStringClass(classString)) {
			var i;
			for (i = 0; i < this.classes.length; i++) {
				if (this.classes[i].to_s() === classString) {
					this.classes.splice(i, 1);
					this.length = this.classes.length;			
					break;
				}
			}
		}
	}
	this.each = function(f) {
		/* perform f(classString) for each class */
		var i;
		for (i = 0; i < this.classes.length; i++) {
			f(this.classes[i])
		}
	}
	this.isIffer = function(varName) {
		var res = false;
		this.each( function(c){
			if ((c.verb === "if") && (c.variable === varName)) {res = true;}
		});
		return res;
	}
	this.isSetter = function(varName) {
		var res = false;
		this.each( function(c){
			if ((c.verb === "set") && (c.variable === varName)) {res = true;}
		});
		return res;
	}
	this.to_s = function() {
		var res = "";
		this.each( function(c){
			res += c.to_s() + " "
		});
		return res.trim();
	}
}
