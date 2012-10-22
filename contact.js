

findContent = function(doc)
{
	for (i in doc.childNodes)
	{
		var node = doc.childNodes[i];
		if (node.hasClass && node.hasClass("column span-19 last"))
			return node;
		else
		{
			var rec = findContent(node);
			if (rec != null) return rec;
		}
	}
	return null;
}

function dir(obj)
{

}

findTablesAfterH4 = function(content)
{
	var tables = {};
	for (i = 0; i< content.childNodes.length; i++)
	{
		var n = content.childNodes[i];
		if (n.tagName == "H4")
		{
			for (; content.childNodes[i].tagName != "TABLE"; i++)
				if (i >= content.childNodes.length)
					return tables;
			tables[n.innerHTML] = content.childNodes[i];
		}
	}
	return tables;
}


HTMLTableElement.prototype.getRows = function()
{
	function goChildren(elm)
	{
		var ret = [];
		for (i = 0; i<elm.childNodes.length; i++)
		{
			var e = elm.childNodes[i];
			if (e.tagName && e.tagName == "TR")
				ret.push(e)
		}
		return ret;
	}

	for (a in this.childNodes)
	{
		if (this.childNodes[a].tagName)
		{
			if (this.childNodes[a].tagName == "TBODY")
				return goChildren(this.childNodes[a]);
			if (this.childNodes[a].tagName == "TR")
				return goChildren(this);
		}
	}
	return [];
}
HTMLTableRowElement.prototype.getColumns = function()
{
	var ret = [];
	for (a in this.childNodes)
	{
		if (this.childNodes[a].tagName)
		{
			if (this.childNodes[a].tagName == "TD" || this.childNodes[a].tagName == "TH")
				ret.push(this.childNodes[a]);
		}
	}
	return ret;
}

semanticDataFromTable = function(table)
{
	var trs = table.getRows();

	var trths = trs[0].getColumns();
	var headers = [];
	for (i in trths)
	{
		var th = trths[i];
		if (!th.tagName) continue;
		headers.push(th.innerHTML);
	}

	var rows = [];
	for (tri = 1; tri < trs.length; tri++)
	{
		var tr = trs[tri];
		var data = {};
		var tds = tr.getColumns();
		for (tdi = 0; tdi < tds.length; tdi++)
		{
			var td = tds[tdi];
			data[headers[tdi]] = td.innerHTML;
		}
		rows.push(data);
	}
	return rows;
}



function fetch(html)
{
	var div = document.createElement('div');
	div.innerHTML = html;
	var tables = findTablesAfterH4(findContent(div));
	var ret = {};
	for (n in tables)
	{
		ret[n] = semanticDataFromTable(tables[n]);
	}
	return ret;
}
