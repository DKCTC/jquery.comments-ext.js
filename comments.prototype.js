
//Node closest comment prototype
//-we really should not extend the DOM, but in this case, I did it anyway
//http://perfectionkills.com/whats-wrong-with-extending-the-dom/

//https://github.com/DKCTC/jquery.comments-ext.js

Node.prototype.closestComment = function(notThis){
	switch(true){
		//if this is a comment and this element is not being skipped, return it
		case(!notThis && this.nodeType === document.COMMENT_NODE):
			return this;
		break;
		//if there is no previous sibling, return null
		case(!this.previousSibling):
			return null;
		break;
		//if the previous sibling is a comment, return it
		case(this.previousSibling.nodeType === document.COMMENT_NODE):
			return this.previousSibling;
		break;
		//else get the previous sibling and look for its closest comment
		default:
			return this.previousSibling.closestComment();
		break;
	}//switch
}//func
