document.createWeek = function()
{
	var week_dom = document.createElement("section");
	week_dom.setAttribute("class", "weekview");

	week_dom.next = function() { };
	week_dom.previous = function() { };
	week_dom.current = function() { };


	var nava = week_dom.appendElement("nav", { class: "top" });
	
	nava.appendElement("button", "Forrige uke", { 
		"class": "radius_tl",
		"data-action": "previous",
	}).onclick =function() {  week_dom.previous(); };

	var	weeka = nava.appendElement("button", "Laster..");
	weeka.onclick = function() { week_dom.current(); };

	nava.appendElement("button", "Neste uke", {
		"class": "radius_tr",
		"data-action": "next",
	}).onclick = function() { week_dom.next(); };
	
	var days = week_dom.appendElement("div");

	var navb = week_dom.appendElement("nav", { class: "bottom" });
	
	navb.appendElement("button", "Forrige uke", { 
		"class": "radius_bl",
		"data-action": "previous",
	}).onclick = function() { week_dom.previous() };

	var	weekb = navb.appendElement("button", "Laster..");
	weekb.onclick =  function() { week_dom.current() };

	navb.appendElement("button", "Neste uke", {
		"class": "radius_br",
		"data-action": "next",
	}).onclick = function() { week_dom.next(); };

	week_dom.setCurrentWeek = function(weekno)
	{
		weekb.innerHTML = "Uke "+ weekno;
		weeka.innerHTML = "Uke "+ weekno;	
	}

	week_dom.clearDays = function()
	{
		days.innerHTML = "";
	}
	week_dom.addDay = function(date)
	{
		var day = days.appendElement("article", "", { class: "day grayed" });



		day.header = day.appendElement("header");
		var h2 = day.header.appendElement("h2");
		var time = h2.appendElement("time", { datetime: date });
		time.appendElement("strong", date.toString("dddd"));
		time.appendText(" " + date.toString("d. MMMM"));

		day.eventTypes = {};
		day.eventTypeCounts = {};

		day.event_list = day.appendElement("ul", {"class":"notop nobottom"});

		//day.event_list.hide();
		
		day.event_list.css({
			height: "0px",
			overflow: "hidden"
		});

		day.event_list.css3({transition: "height 0.4s ease-in-out"});
		
		day.header.onclick = function() 
		{ 
			if (day.event_list.toggle()) 
				day.event_list.removeClass("notop nobottom"); 
			else
				window.setTimeout(function(){day.event_list.addClass("notop nobottom");}, 200);
		};
		if (date.toString("ddMMyyyy") == Date.today().toString("ddMMyyyy"))
			day.header.setAttribute("id", "today");
		
		day.addEvent = function(event)
		{
			var type = categoryToType(event.categories[0].value);

			var li = this.event_list.appendElement("li", { class: "cat-"+type });

			var eventart = li.appendElement("article", { class: "event cat-"+type });

			eventart.header = eventart.appendElement("header");
			eventart.header.appendElement("time", event.date.toString("HH:mm"), { datetime: event.date });
			eventart.header.appendElement("h3", event.summary.value);
			eventart.header.appendElement("h4", event.categories[0].value+' i '+event.location.value);

			eventart.appendElement("p", event.description.value);
			
			if (!(type in day.eventTypeCounts))
			{
				day.eventTypeCounts[type] = 1;
				var bullet = h2.appendElement("span", "1", { class: "bullet "+"bg_"+type });
				day.removeClass("grayed")
				day.eventTypes[type] = bullet;
			}
			else
			{
				day.eventTypeCounts[type] += 1;
				day.eventTypes[type].innerHTML = day.eventTypeCounts[type]; 
			}
			return eventart;
		};
		return day;
	};

	return week_dom;
};