

//jQuery sample usage

//-return all comments in the target element
var _comments = $('.target-element').comments();


//-return filtered collection of parent nodes
var _comments = $('.target-element').comments({
		//match comment text against this regex, only include the comment if it matches
		regex: /item-id:\s*(\d{4,6})(?!-[a-z])/i,
		//return the parent nodes instead of the comments themselves
		parent: true
	}, function(node,original){
		//fire a callback that filters through each node and the original node in case parent is set to true
		
		//if this is a matched element, use this element and not the parent
		//-find all of the elements between this comment and the next item class
		//-filter out anything that isn't the target element
		//-use the remaining element as the node
		_hasElement = $(original).nextUntil('.item1-class').filter('.other-class');
		if(!!_hasElement.length){
			node = _hasElement[0];
		}//if
		
		//if this is not #item2-id, add .new-class and store the info in the data obj after modifying it
		$(node).not('#item2-id,.item2-class').addClass('new-class').data('stored-info',original.nodeValue.replace(/(\D*)(\d{4,6})(?!-[a-z])(.*)/g,'$2'));
		
		//return the node to add to the collection, else return non-true to omit it
		return (!$(node).is('#item2-id,.item2-class') && node) || false;
	});


//-return text nodes instead of comment nodes
var _comments = $('.target-element').comments({
	text: true
});


//-no deep traversal
var _comments = $('.target-element').comments({
	deep: false
});
