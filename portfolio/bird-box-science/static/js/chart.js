      //Load Pacakge
	  google.load("visualization", "1", {packages:["corechart"]});
	  
		google.setOnLoadCallback(initialize);

function initialize() {
	drawGraph();
	drawMap();
}

function drawGraph(){
	queryDB();
}


function drawMap(){
        var data = google.visualization.arrayToDataTable([
		['City',   'Activity'],
		['Seattle',     51234],
		['Spokane',     1244],
		['Tacoma',     12341],
		['Vancouver',     46292],
		['Bellevue',     53242],
		['Kent',     52354],
		['Renton',     23522],
		['Yakima',     23452],
		['Federal Way',     23452]
        ]);

        var options = {
			fontName: 'Montserrat',
			sizeAxis: { minValue: 0, maxValue: 100 },
			region: 'US-WA', 
			resolution: 'metros',
			displayMode: 'markers',
			colorAxis: {colors: ['#e7711c', '#4374e0']} // orange to blue
      };

        var chart = new google.visualization.GeoChart(document.getElementById('map_div'));

        chart.draw(data, options);
}

function queryDB(){
   var opts = {sendMethod: 'auto'};
 // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1YsOgO5kFM8FmAw6vihQHzaXzrL5IQI2b0tGuBqbz2fA/edit?usp=sharing', opts);

  var qstring = 'select A'
  if(document.graph.sensor.value == "activity"){

	//Optional request to return only column C and the sum of column B, grouped by C members.
	qstring = qstring+',B';
	if(document.graph.citycb.checked == true){
		qstring = qstring + ',C';
	}
	if(document.graph.statecb.checked == true){
		qstring = qstring + ',D';
	}
	if(document.graph.countrycb.checked == true){
		qstring = qstring + ',E';
	}
	if(document.graph.worldcb.checked == true){
		qstring = qstring + ',F';
	}

  };
  
  if(document.graph.sensor.value == "temp"){

	//Optional request to return only column C and the sum of column B, grouped by C members.
	qstring = qstring +',G';
	if(document.graph.citycb.checked == true){
		qstring = qstring + ',H';
	}
	if(document.graph.statecb.checked == true){
		qstring = qstring + ',I';
	}
	if(document.graph.countrycb.checked == true){
		qstring = qstring + ',J';
	}
	if(document.graph.worldcb.checked == true){
		qstring = qstring + ',K';
	}
  };
  
  if(document.graph.timescale.value == "year"){
	var x = document.getElementById("timerange");
	var op = x.options;
	for (var i = 0; i < op.length; i++) {
	
	  if(op[i].value != "2014") {
		 op[i].disabled = true;
	   }
	else{
		op[i].disabled = false;
		op[i].selected = true;
		}
	}
	
  }
  if(document.graph.timescale.value == "month"){
  
	var x = document.getElementById("timerange");
	var op = x.options;
	for (var i = 0; i < op.length; i++) {
	
	  if(op[i].value != "2014") {
		 op[i].disabled = false;
	   }
	
	else{
		op[i].disabled = true;
		}
		if(op[i].value == "october") {
		 op[i].selected = true;
	   }
	}
  	  if(document.graph.timerange.value == "january"){
			qstring = qstring + " where A>= date '2014-01-01' and A < date '2014-02-01'";
	}
		  if(document.graph.timerange.value == "feburary"){
			qstring = qstring + " where A>= date '2014-02-01' and A < date '2014-03-01'";
	}
		  if(document.graph.timerange.value == "march"){
			qstring = qstring + " where A>= date '2014-03-01' and A < date '2014-04-01'";
	}
	if(document.graph.timerange.value == "april"){
			qstring = qstring + " where A>= date '2014-04-01' and A < date '2014-05-01'";
	}
	if(document.graph.timerange.value == "may"){
			qstring = qstring + " where A>= date '2014-05-01' and A < date '2014-06-01'";
	}
	if(document.graph.timerange.value == "june"){
			qstring = qstring + " where A>= date '2014-06-01' and A < date '2014-07-01'";
	}
	if(document.graph.timerange.value == "july"){
			qstring = qstring + " where A>= date '2014-07-01' and A < date '2014-08-01'";
	}
	  if(document.graph.timerange.value == "august"){
			qstring = qstring + " where A>= date '2014-08-01' and A < date '2014-09-01'";
	}
	if(document.graph.timerange.value == "september"){
			qstring = qstring + " where A>= date '2014-09-01' and A < date '2014-10-01'";
	}
	if(document.graph.timerange.value == "october"){
			qstring = qstring + " where A>= date '2014-10-01' and A < date '2014-11-01'";
	}
	
  }
  	
	query.setQuery(qstring);

  

  //Send the query with a callback function.
   query.send(handleQueryResponse);
}
function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	  }
	var data = response.getDataTable();
	
	 var options = {
		fontName: 'Montserrat',
		backgroundColor: '#f5f5f5',
		chartArea: {
			backgroundColor: '#ffffff',
			width: '70%',
			height: '90%',
		},
		hAxis: {
			gridlines: { color: '#eee' },
			baselineColor: '#bbb'
		},
		vAxis: {
			gridlines: { color: '#e5e5e5' },
			baselineColor: '#bbb'
		},
		seriesType: "line",
		title: "Bluebird Activity",
	};

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

window.onresize = function() {
	drawGraph();
	drawMap();
}