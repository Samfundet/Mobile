//
// Usage: 
// dom.appendElement("h1", "Hei", {"class": "minklasse"});
// dom.appendElement("h1", "Hei");
// dom.appendElement("h1", {"class": "minklasse"});
//

HTMLElement.prototype.appendElement = function (elmtype, html_or_attribs, attribs)
{
	var elm = document.createElement(elmtype);

	if (typeof html_or_attribs == "string")
		elm.innerHTML = html_or_attribs;
	if (typeof html_or_attribs == "object")
		for (key in html_or_attribs)
			elm.setAttribute(key, html_or_attribs[key]);
	if (attribs)
		for (key in attribs)
			elm.setAttribute(key, attribs[key]);

	this.appendChild(elm);
	return elm;
};
HTMLElement.prototype.addClass = function(klass)
{
	var oldclass = this.getAttribute("class");
	if (oldclass)
	{
		if (oldclass.indexOf(klass) == -1)
			this.setAttribute("class", oldclass + " " + klass);
	}
	else 
		this.setAttribute("class", klass);
};
HTMLElement.prototype.removeClass = function(klass)
{
	var oldclass = this.getAttribute("class");
	if (oldclass && oldclass.indexOf(klass) != -1)
		this.setAttribute("class", oldclass.replace(klass, ""));
};
HTMLElement.prototype.hasClass = function(klass)
{
	var oldclass = this.getAttribute("class");
	return (oldclass && oldclass.indexOf(klass) != -1);
};
HTMLElement.prototype.toggleClass = function(klass)
{
	if (this.hasClass(klass))
	{
		this.removeClass(klass);
		return false;
	}
	else
	{
		this.addClass(klass);		
		return true;
	}
};
HTMLElement.prototype.css3 = function(map)
{
	function upperish(str)
	{
		return str.substring(0,1).toUpperCase() + str.substring(1,str.length);
	}
	for (key in map)
	{
	    this.style[key] = map[key];
	    this.style["o"+upperish(key)] =  map[key];
	    this.style["ms"+upperish(key)] =  map[key];
	    this.style["webkit"+upperish(key)] = map[key];
	    this.style["moz"+upperish(key)] = map[key];
	}
}

HTMLElement.prototype.css = function(map)
{
	for (key in map)
	    this.style[key] = map[key];
}


HTMLElement.prototype.appendText = function (text)
{
	this.appendChild(document.createTextNode(text));
};


HTMLElement.prototype.measureHeight = function()
{
	var origOverflow = this.style.overflow;
	var origHeight = this.style.height;
	this.style.overflow = "";
	this.style.height = "";
	var height = this.offsetHeight;
	this.style.height = origHeight;
	this.style.overflow = origOverflow;
	return height;
};
