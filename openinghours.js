

OpeningHours = 
{
	forDate : function(date) 
	{
		var ret = 
		{
			"Edgar": 
			{
				"from": Date.parse(date.toString("dd-MM-yyyy") + " 16:00:00"),
				"to": Date.parse(date.toString("dd-MM-yyyy") + " 23:00:00"),
			},
			"Lyche": 
			{
				"from": Date.parse(date.toString("dd-MM-yyyy")+" 16:00:00"),
				"to": Date.parse(date.toString("dd-MM-yyyy")+" 23:00:00")
			},
			"Daglighallen": 
			{
				"from": Date.parse(date.toString("dd-MM-yyyy")+" 20:00:00"),
				"to": Date.parse(date.addDays(1).toString("dd-MM-yyyy")+" 00:00:00")
			},
			"Biblioteket": 
			{
				"from": Date.parse(date.toString("dd-MM-yyyy")+" 17:00"),
				"to": Date.parse(date.toString("dd-MM-yyyy")+" 22:00:00")
			}
		};
		return ret;
	}
};

