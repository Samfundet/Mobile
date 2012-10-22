

document.createWeek = function()
{
	var week_dom = document.createElement("section");
	week_dom.setAttribute("class", "weekview");

	week_dom.next = function() { };
	week_dom.previous = function() { };
	week_dom.current = function() { };
	week_dom.showDetails = function() { };

	week_dom.hide = function() 
	{
		week_dom.css3({"transition": "all 0.4s"});
		week_dom.css3({"transform": "translateX(-"+(week_dom.measureWidth()+20)+"px)"});
		setTimeout(function() {
			week_dom.css({display: "none"});
		}, 400);
	}

	var nava = week_dom.appendElement("section", { class: "top" });
	weeka = nava.appendElement("h2", "UKE 43");
	weeka.css({"font-size":"34px", "color":"#641b17","font-weight":"bold","letter-spacing":"-3px", "margin":"12px 10px 0px"});
	nava.appendElement("a", "Legg til hele kalenderen", {
		"href": "/arrangement/ical",
	}).css({"font-size":"12px", "color":"#2F3E46", "display":"inline-block", "min-height":"16px", "vertical-align":"middle", "padding-top":"1px","margin":"2px 13px", "padding-left":"20px", "background":"url('http://www.starwoodhotels.com/stregis/images/calendar/calendarIcon.png') /*http://www.icul.org/media/calendar_icon.gif')*/ no-repeat"});

	nava.css({"padding": "0px"});
	
/*	
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
*/	
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
		weeka.innerHTML = "UKE "+ weekno;	
	}

	week_dom.clearDays = function()
	{
		days.innerHTML = "";
	}
	week_dom.addDay = function(date)
	{
		var day = days.appendElement("article", "", { class: "day" }); // grayed

		day.header = day.appendElement("header");
		var h2 = day.header.appendElement("h2");
		var time = h2.appendElement("time", { datetime: date });
		

		if (date.toString("ddMMyyyy") == Date.today().toString("ddMMyyyy"))
		{
			time.appendElement("strong", "I dag");
			time.appendText(" ( " + date.toString("dddd") + " " + date.toString("d. MMMM")+" )");
			day.header.setAttribute("id", "today");

		}
		else
		{
			time.appendElement("strong", date.toString("dddd"));
			time.appendText(" " + date.toString("d. MMMM"));
		}

		day.eventTypes = {};
		day.eventTypeCounts = {};

		day.event_list = day.appendElement("ul", {"class":"notop nobottom"});
	
		var dl = day.event_list.appendElement("li").appendElement("dl");
		var hours = OpeningHours.forDate(date);
		for (area in hours)
		{
			dl.appendElement("dt", area);
			dl.appendElement("dd",  hours[area].from.toString("HH:mm") + " - " + hours[area].to.toString("hh:mm"));
		}

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

		
		day.addEvent = function(event)
		{
			var type = categoryToType(event.categories[0].value);
			if (!(type in filters) || !filters[type]) return;

			var li = this.event_list.appendElement("li", { class: "cat-"+type });

			li.onclick = function() 
			{
				var parts = event.url.value.split("/");
				var id = parts[parts.length-1];
				week_dom.showDetails(id);
			};

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
				//day.removeClass("grayed")
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