// This jQuery plugin will gather the comments within
// the current jQuery collection, returning all the
// comments in a new jQuery collection.
//
// https://github.com/dkline03/jquery.comments-ext.js
//
// adapted from:
// https://www.bennadel.com/blog/1563-jquery-comments-plug-in-to-access-html-comments-for-dom-templating.htm

jQuery.fn.comments = function(obj,callback){
	//set default obj
	(typeof(obj) == 'object' && !obj.hasOwnProperty('length')) ? '' : obj = {};
	//set default callback
	(typeof(callback) != 'function') ? callback = function(n,o){ return n; } : '';
	//set default opt
	var opt = $.extend({
			deep: true, //deep traversal
			regex: false, //can be a regex that is used to match against the comment text
			parent: false, //return the parent nodes instead of the comments themselves
			text: false //match text nodes instead of comment nodes
		},obj),
		//comments collection
		jComments = $( [] ),
		//regex matching
		rMatch = false,
		//node to be added to the collection
		addNode,
		//value returned by the callback
		callbackNode = false;

	//create the regex based upon the value supplied
	//-anything other than a regex, string, or number is ignored
	switch(true){
		//if it's a string or a number, create the regex
		case(typeof(opt.regex) == 'string' || typeof(opt.regex) == 'number'):
			rMatch = new RegExp(opt.regex+'' || '');
		break;
		//if it's already a regex, use it
		case(typeof(opt.regex) == 'object' && typeof(opt.regex.exec) == 'function'):
			rMatch = opt.regex;
		break;
	}//switch

	// Loop over each node to search its children for comment nodes and element nodes (if deep search)
	// also filter by regex if it's included
	this.each(
		function( intI, objNode ){
			var objChildNode = objNode.firstChild;

			// Keep looping over the top-level children while we have a node to examine
			while (objChildNode){
				// Check to see if this node is a comment or a text node
				switch(true){
					case(objChildNode.nodeType === 8 || (objChildNode.nodeType === 3 && !!opt.text)):
						// this is a comment node, or it is a text node and a text node was requested
						// if parent is requested, set addNode to the parent element, else use the comment element itself
						addNode = (!!opt.parent && objChildNode.parentElement) || objChildNode;
					
						// if there is a regex to match against, add if test passes and fire the callback, else just add it
						if((!!rMatch && !!rMatch.test(objChildNode.nodeValue)) || !rMatch){
							//fire the callback, if it returns non-false or undefined, add:
							//--if it returns a valid node, use the returned node
							//--if it returns true or if the return statement is omitted from the callback (undefined), use addNode
							callbackNode = callback(addNode,objChildNode);
							if(!!callbackNode || typeof(callbackNode) == 'undefined'){
								jComments = jComments.add(
									(!!callbackNode && !isNaN(callbackNode.nodeType) && callbackNode) || addNode	);
							}//if
						}//if
					break;
					case(!!opt.deep && (objChildNode.nodeType === 1)):
						// Traverse this node deeply, also pass the original regex var
						jComments = jComments.add($( objChildNode ).comments( obj, callback ));
					break;
				}//switch

				// Move to the next sibling
				objChildNode = objChildNode.nextSibling;
			}//while
		});//each

	// Return the jQuery comments collection
	return( jComments );
}//func
