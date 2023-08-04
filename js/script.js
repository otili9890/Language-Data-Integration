// Using APIs from https://data.gov.au/dataset/ds-qld-3fa7a159-f280-48f9-9a83-9209f73942ef/details?q=state%20library%20of%20queensland%20language 

function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/); // This is regex: https://en.wikipedia.org/wiki/Regular_expression
	}
}

function iterateRecords(results) {

	console.log(results);
	var recordTemplate = $(".record-template");
	var fieldResults = results.result.fields; 
	var fields = [];
	for (const key in fieldResults) {
		fields.push(String(fieldResults[key].id)); // Pushes the key and the field name to the fields array
	}

	console.log(fields);

	$.each(results.result.records, function(recordID, recordValue) {

		const dynamicVars = {}; // Creates an object that will store the dynamic field names

		var recID = recordValue["_id"];
		
		// Attempting to make it dynamic
		/**for (let i = 0; i < fields.length; i++) {
			var varName = String("record" + capitalizeFirstLetter(String(fields[i])));
			console.log("varname is " + capitalizeFirstLetter(String(fields[i])));
			dynamicVars[varName] = recordValue[capitalizeFirstLetter(String(fields[i]))];
			console.log(dynamicVars);
		} */


		var recordEnglish = recordValue["English"];
		var recordYugara = recordValue["Yugara"];
		var recordYugarabul = recordValue["Yugarabul"];
		var recordYugambeh = recordValue["Yugambeh"];
		var recordTurubul = recordValue["Turubul"];
		console.log(recID, recordEnglish);

		if(recID) { //if(dynamicVars.recordEnglish) {

			var clonedRecordTemplate = recordTemplate.clone();
			clonedRecordTemplate.attr("id", "record-" + recordID).removeClass("record-template");
			clonedRecordTemplate.appendTo("#records");
			
			$("#record-" + recordID + " .id").html(recID);
			$("#record-" + recordID + " h2").html(recordEnglish);
			$("#record-" + recordID + " .yugara").html(recordYugara);
			$("#record-" + recordID + " .yugarabul").html(recordYugarabul);
			$("#record-" + recordID + " .yugambeh").html(recordYugambeh);
			$("#record-" + recordID + " .turubul").html(recordTurubul);
		}

	});

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getData1() {
	var data = {
		resource_id: "ebd00c34-d5d1-4266-8f6b-d9424104a307", //Brisbane Animal Words
		limit: 50
	}

	$.ajax({
		url: "https://data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
		cache: true,
		success: function(results) {
			iterateRecords(results);
			console.log("Total results for data1: " + results.result.total);
		}
	});
}

function getData2() {
	var data = {
		resource_id: "e877c83a-be8a-4475-a496-7e808fa07935", // Barunggam word list
		limit: 50
	}

	$.ajax({
		url: "https://data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
		cache: true,
		success: function(results) {
			iterateRecords(results);
			console.log("Total results for data2: " + results.result.total);
		}
	});
}


$(document).ready(function() {
	getData1();
	getData2();

});