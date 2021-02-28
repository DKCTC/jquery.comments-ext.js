# jquery.comments-ext.js
jQuery plugin for returning all comment or text nodes within a jQuery collection in a new jQuery collection, includes regex value filtering

Requires **jQuery** - tested on version 3.3.1

**Adapted from [this](https://www.bennadel.com/blog/1563-jquery-comments-plug-in-to-access-html-comments-for-dom-templating.htm) blog post by Ben Nadel**

This version adds the ability to return text nodes, comment or text nodes whose values match a regex or are filtered by content, or the parent nodes of the matched comment or text nodes.


## Usage

**Return all comments in the target element:**
```
var _comments = $('.target-element').comments();
```

**Return filtered collection of parent nodes:**
```
var _comments = $('.target-element').comments({
		//match comment text against this regex, only include the comment if it matches
		regex: /item-id:\s*(\d{4,6})(?!-[a-z])/i,
		//return the parent nodes instead of the comments themselves
		parent: true
	}, function(node,original){
		//fire a callback that filters through each node and the original node in case parent is set to true
		
		//SAMPLE:
		//if this is a matched element, use this element and not the parent
		//-find all of the elements between this comment and the next item class
		//-filter out anything that isn't the target element
		//-use the remaining element as the node
		var _hasElement = $(original).nextUntil('.item1-class').filter('.other-class');
		if(!!_hasElement.length){
			node = _hasElement[0];
		}//if
    
		//SAMPLE:
		//remove #item2-id,.item2-class elements from node, add new-class to what's left, store the given value in the data obj
		$(node).not('#item2-id,.item2-class').addClass('new-class').data('stored-info',original.nodeValue.replace(/(\D*)(\d{4,6})(?!-[a-z])(.*)/g,'$2'));
		
		//return the node to add to the collection, else return non-true to omit it
		return (!$(node).is('#item2-id,.item2-class') && node) || false;
	});
```

**Return text nodes instead of comment nodes:**
```
var _comments = $('.target-element').comments({
	text: true
});
```

**No deep traversal:**
```
var _comments = $('.target-element').comments({
	deep: false
});
```

## Support

Please submit an issue.


## License

Copyright (c) 2021 DKCTC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
