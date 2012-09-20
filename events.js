cache =
{
	week: {},
	events: {},
	clearWeek: function(weekno)
	{
		this.week[weekno] = [[],[],[],[],[],[],[]];
	},
	addEvent: function(item)
	{
		var wd = getWeekAndDay(item.date);
		this.events[item.uid.value] = item;
		if (!this.week[wd.week])
			this.clearWeek(wd.week);
		this.week[wd.week][wd.day].push(item.uid.value);
	},
	getDay: function(weekno, dayno)
	{
		var ret = [];
		var w = this.week[weekno];
		for (uid in w[dayno])
			ret.push(this.events[w[dayno][uid]]);
		return ret;
	}
};

events = 
{
	fetch: function(from, to, success, failure)
	{
		var ical_base_url = "/arrangement/ical_interval";
		var ical_url = ical_base_url+"/from/"+from.toString("yyyy/MM/dd")+"/to/"+to.toString("yyyy/MM/dd");
		get(ical_url, function(response)
		{
			icalParser.ical.events = [];
			icalParser.parseIcal(response);
			var events = icalParser.ical.events;
			success(events);
		}, function(response)
		{
			if (failure) failure();
		});
	},
	fetchWeek: function(weekno, success, failure)
	{
		var from = mondayOfWeek(weekno);
		//alert(from);
		var to = from.clone();
		to.addDays(7);
		this.fetch(from, to, success, failure);
	}

}