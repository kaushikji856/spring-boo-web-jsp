
var reloadFlag = false;

function exportTableToCSV(tableCtrl, contextName, fileNameKey, json,extraGridcolumn,
		groupHeaderSpace,mainLeftHeader) {
	/*
	 * To get the current grid and cell value var allJQGridData =
	 * $(tableCtrl).jqGrid('getRowData');
	 */
	if (json == null) {
		json = $(tableCtrl).jqGrid('getGridParam', 'data');
		//json = $(tableCtrl).jqGrid('getRowData'); 
	}
	//alert('json ---' +JSON.stringify(json));
	var jqgridRowIDs = $(tableCtrl).getDataIDs();
	var headerData = $(tableCtrl).getRowData(jqgridRowIDs[0]); // Fetch the list of "name" values in our colModel For each visible column in our jqGrid, fetch it's Name, and it's
	var columnNames = new Array(); // The "name" values from our jqGrid colModel
	var columnHeaders = new Array(); // The Header-Text, from the jqGrid "colNames" section
	var columnGroupHeaders = new Array();
	var columnGroupHeadersNumbers = new Array();
	var inx = 0;
	var allColumnNames = $(tableCtrl).jqGrid('getGridParam', 'colNames');

	var columnModelSetting = $(tableCtrl).jqGrid('getGridParam', 'colModel');
	var groupHeaders = $(tableCtrl).jqGrid('getGridParam', 'groupHeader');
    var mainHeader = JSON.stringify(groupHeaders);
    if (groupHeaders != null) {
    	if(mainHeader.match("colheader")){
    		for (var i = 0; i < groupHeaders.groupHeaders.length; i++) {
    			var formatedString = $(groupHeaders.groupHeaders[i].titleText).text();
    			columnGroupHeaders.push(formatedString);
    			columnGroupHeadersNumbers.push(groupHeaders.groupHeaders[i].numberOfColumns);
    		}
    	} else {
    		mainHeader = null;
    		for (var i = 0; i < groupHeaders.groupHeaders.length; i++) {
    			var formatedString = $(groupHeaders.groupHeaders[i].titleText).text();
    			columnGroupHeaders.push(formatedString);
    			columnGroupHeadersNumbers.push(groupHeaders.groupHeaders[i].numberOfColumns);
    		}
    	}
    } else {
    	mainHeader = null;
    }
    var bigNumberToString = new Array();
    var currencyToFloatDecimal = new Array();
    
    var hiddencounter = typeof(extraGridcolumn) == 'undefined'? 0 : extraGridcolumn;
    for ( var headerValue in headerData) {
		// If this column ISN'T hidden, and DOES have a column-name,
		// then we'll export its data to Excel.
    	var isColumnHidden = '"';
		var i = 0;
		for (i = 0; i < columnModelSetting.length; i++) {
			if (headerValue == columnModelSetting[i].name) {
				//alert(JSON.stringify(columnModelSetting[i]));
				//if(columnModelSetting[i].match(/index/g)){
				//	alert('index not found');
				//}
				isColumnHidden = columnModelSetting[i].hidden;
				if (isColumnHidden) {
					hiddencounter++;
				}
				var category = columnModelSetting[i].category;
				if(category != 'undefined' && category != null) {
					
					if(category.match(/bigNumber/g)){
						bigNumberToString[i - hiddencounter] = (i - hiddencounter);
					}
					if(category.match(/float/g)){
						currencyToFloatDecimal[i - hiddencounter] = (i - hiddencounter);
					}
				}
				break;
			}
		}

		if (!isColumnHidden && headerValue != null) {
			columnNames.push(headerValue);
			if (allColumnNames[i].match(/checkbox/g)) {
				var index = allColumnNames[i].lastIndexOf('>');
				if (index != -1) {
					var newStr = allColumnNames[i].substring(index + 1);
					columnHeaders.push(newStr.trim());
				}
			} else if(allColumnNames[i].match(/span/g)){
				var str = allColumnNames[i].replace(/<\/?span[^>]*>/g,"");
				columnHeaders.push(($(str).text()).trim());
			
			}else {
				var index = allColumnNames[i].lastIndexOf('>');
				if (index != -1) {
					columnHeaders.push($(allColumnNames[i]).text());
				} else {
					columnHeaders.push(allColumnNames[i].trim());
				}
			}
		}
		inx++;
	}
	// We now need to build up a (potentially very long) tab-separated
	// string containing all of the data (and a header row)
	// which we'll want to export to Excel.
	// First, let's append the header row...
	var csvData = '';
	if (mainHeader != null) {
		/*for (var m = 1; m <= groupHeaderSpace; m++) {
			csvData += ',';
			alert("first car space " +groupHeaderSpace);
		}*/
		csvData += '"';
		if (mainLeftHeader != null){
			csvData += mainLeftHeader + '","';
		}
		for (var k = 1; k < columnNames.length; k++) {
			csvData += columnGroupHeaders[0] + '","';
		}
		csvData = removeLastChar(csvData) + "/n/r";
	} else if (groupHeaders != null) {
		
		for (var m = 1; m <= groupHeaderSpace; m++) {
			csvData += ',';
		}
		csvData += '"';
		for (var k = 0; k < columnGroupHeaders.length; k++) {
			for (var l = 0; l < columnGroupHeadersNumbers[k]; l++)
				csvData += columnGroupHeaders[k] + '","';
		}
		csvData = removeLastChar(csvData) + "/n/r";
	}

	csvData += '"';
	for (var k = 0; k < columnNames.length; k++) {
		csvData += columnHeaders[k] + '","';
	}

	csvData = removeLastChar(csvData) + "/n/r";
	// ..then each row of data to be exported.
	var cellValue = '';
	for (i = 0; i < json.length; i++) {

		var data = json[i];
		csvData += '"';
		for (var j = 0; j < columnNames.length; j++) {

			// Fetch one jqGrid cell's data, but make sure it's a string
			cellValue = '' + data[columnNames[j]];
			if(columnNames[j] == 'agentList'){

                cellValue = data.assigndUserId;

          } 

			// prevent long to be converted in exponential form when open in excel
			/*if(cellValue != 'undefined' && j == longCsv-2){
				cellValue = "\'" + data[columnNames[j]];
			} */
			//-------Testing
			//for(var p = 0; p<longCsv.length/* && j == longCsv[p]-2*/;p++) {
			
			if(typeof (groupHeaderSpace) == 'undefined' || groupHeaderSpace== null) {
				groupHeaderSpace = 0;
			}
			///var columnIndex = 2 + groupHeaderSpace;
			//for(l=0;l<bigNumberToString.length;l++){
				if(cellValue != 'undefined' && bigNumberToString[j] == j) {
					//alert('cellValue'+cellValue);
					
					csvData = removeLastCharOnly(csvData);
					csvData += '\'';
					cellValue = data[columnNames[j]];
				}
			//}
			
			if(typeof (groupHeaderSpace) == 'undefined' || groupHeaderSpace== null) {
				groupHeaderSpace = 0;
			}
				//var columnIndex = 2 + groupHeaderSpace;
				//for(l=0;l<currencyToFloatDecimal.length;l++){
					if(cellValue != 'undefined' && currencyToFloatDecimal[j] == j){
					//	if($.isNumeric(cellValue) && parseInt(cellValue) !== cellValue) {
						//var formatingValue = cellValue.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						var a = parseFloat(cellValue);
					    var n = a.toFixed(2);
						csvData = removeLastCharOnly(csvData);
						csvData += '\'';
						cellValue = n;
						//}
					}
				//}
			//}

			if (cellValue == null || cellValue == 'null' || cellValue=='-1') {
				//csvData += '\t';
				csvData += '","';
			} else {
				 
				cellValue = cellValue.toString();
				cellValue = cellValue.replace('"', '');
				if (cellValue.indexOf("a href") > -1) {
					// Some of my cells have a jqGrid cell with a
					// formatter in them, making them hyperlinks.
					// We don't want to export the "<a href..> </a>"
					// tags to our Excel file, just the cell's text.
					cellValue = $(cellValue).text();
					csvData += cellValue;
					
				}
				
				if(cellValue.match('="')) {
					csvData += cellValue;
				} else if(Date.parse(cellValue) && isValidDate(cellValue)) {
						csvData = removeLastCharOnly(csvData);
						csvData += '\'';
						csvData += cellValue;
				} else {
					csvData += cellValue;
				}
				if(cellValue != 'undefined' && currencyToFloatDecimal[j] == j){
					csvData += ',"';
				}
				else if(Date.parse(cellValue) && isValidDate(cellValue)) {
					csvData += ',"';
				}
				else{
					csvData += '","';
				}
				
				// Make sure we are able to POST data containing
				// apostrophes in it
				//cellValue = cellValue.replace(/'/g, "&apos;");
				
			}
		}
		csvData = removeLastChar(csvData) + "/n/r";
	}
	csvData = replaceAll("undefined", "", csvData);
	var pom = document.getElementById('csvExport');
	
	if(pom != null) {
		
		var isIE = /*@cc_on!@*/false || !!document.documentMode; 
		
		if(isIE) {
			document.generateCSVAccount.action = contextName + '/generateCsvAccount.html?fileName='
					+ fileNameKey;
			if (contextName == null) {
				document.generateCSVAccount.action = '../generateCsvAccount.html?fileName='
						+ fileNameKey+'test';
			}
			document.getElementById('csvData').value = csvData;
			document.generateCSVAccount.submit();
		}
		else{
			csvData = replaceAll("/n/r", "\r\n", csvData);
			csvData = new Blob([csvData], { type: 'text/csv' }); 
			var csvUrl = URL.createObjectURL(csvData);
			pom.href =  csvUrl;
			pom.download = fileNameKey+'.csv';
			pom.click();
			
	}
	}
	else {
		document.generateCSVAccount.action = contextName + '/generateCsvAccount.html?fileName='
			+ fileNameKey;
	if (contextName == null) {
		document.generateCSVAccount.action = '../generateCsvAccount.html?fileName='
				+ fileNameKey;
	}
	document.getElementById('csvData').value = csvData;
	document.generateCSVAccount.submit();
	}
	/*document.generateCSVAccount.action = contextName + '/generateCsv.html?fileName='
			+ fileNameKey;
	if (contextName == null) {
		document.generateCSVAccount.action = 'generateCsv.html?fileName='
				+ fileNameKey;
	}
	document.getElementById('csvData').value = csvData;
	document.generateCSVAccount.submit();*/
}

function exportTableToCSVTripleHeader(tableCtrl, contextName, fileNameKey, json,extraGridcolumn,
		groupHeaderSpace, mainHeader, mainLeftHeader) { 
	/*
	 * To get the current grid and cell value var allJQGridData =
	 * $(tableCtrl).jqGrid('getRowData');
	 */
	if (json == null) {
		json = $(tableCtrl).jqGrid('getGridParam', 'data');
	}
	var jqgridRowIDs = $(tableCtrl).getDataIDs();
	var headerData = $(tableCtrl).getRowData(jqgridRowIDs[0]); // Fetch the list of "name" values in our colModel For each visible column in our jqGrid, fetch it's Name, and it's
	var columnNames = new Array(); // The "name" values from our jqGrid colModel
	var columnHeaders = new Array(); // The Header-Text, from the jqGrid "colNames" section
	var columnGroupHeaders = new Array();
	var columnGroupHeadersNumbers = new Array();
	var inx = 0;
	var allColumnNames = $(tableCtrl).jqGrid('getGridParam', 'colNames');

	var columnModelSetting = $(tableCtrl).jqGrid('getGridParam', 'colModel');
	var groupHeaders = $(tableCtrl).jqGrid('getGridParam', 'groupHeader');
	
	for (var i = 0; i < groupHeaders.groupHeaders.length; i++) {
		var formatedString = $(groupHeaders.groupHeaders[i].titleText).text();
		columnGroupHeaders.push(formatedString);
		columnGroupHeadersNumbers.push(groupHeaders.groupHeaders[i].numberOfColumns);
	}
	
	
    var bigNumberToString = new Array();
    var currencyToFloatDecimal = new Array();
      
      var hiddencounter = typeof(extraGridcolumn) == 'undefined'? 0 : extraGridcolumn;
	
	for ( var headerValue in headerData) {
		// If this column ISN'T hidden, and DOES have a column-name,
		// then we'll export its data to Excel.
		var isColumnHidden = '"';
		var i = 0;
		for (i = 0; i < columnModelSetting.length; i++) {
			if (headerValue == columnModelSetting[i].name) {
				isColumnHidden = columnModelSetting[i].hidden;
				if (isColumnHidden) {
					hiddencounter++;
				}
				var category = columnModelSetting[i].category;
				if(category != 'undefined' && category != null) {
					
					if(category.match(/bigNumber/g)){
						//longCsv = i;
						bigNumberToString[i - hiddencounter] = (i - hiddencounter);
					}
					if(category.match(/float/g)){
						//longCsv = i;
						currencyToFloatDecimal[i - hiddencounter] = (i - hiddencounter);
					}
				}
				break;
			}
		}

		if (!isColumnHidden && headerValue != null) {
			columnNames.push(headerValue);
			if (allColumnNames[i].match(/checkbox/g)) {
				var index = allColumnNames[i].lastIndexOf('>');
				if (index != -1) {
					var newStr = allColumnNames[i].substring(index + 1);
					columnHeaders.push(newStr.trim());
				}
			} else if(allColumnNames[i].match(/span/g)){
				var str = allColumnNames[i].replace(/<\/?span[^>]*>/g,"");
				columnHeaders.push(($(str).text()).trim());
			
			}else {
				var index = allColumnNames[i].lastIndexOf('>');
				if (index != -1) {
					columnHeaders.push($(allColumnNames[i]).text());
				} else {
					columnHeaders.push(allColumnNames[i].trim());
				}
			}
		}
		inx++;
	}
	// We now need to build up a (potentially very long) tab-separated
	// string containing all of the data (and a header row)
	// which we'll want to export to Excel.
	// First, let's append the header row...
	var csvData = '';

	csvData += '"';
		if (mainLeftHeader != null){
			csvData += mainLeftHeader + '","';
		}
		
		
		for (var k = 1; k < columnNames.length; k++) {
			if (mainHeader != null) {
				csvData += mainHeader + '","';
			} else {
			csvData += columnGroupHeaders[0] + '","';
			}
		}
		csvData = removeLastChar(csvData) + "/n/r";
		
		for (var m = 1; m <= groupHeaderSpace; m++) {
			csvData += ',';
		}
		csvData += '"';
		for (var k = 0; k < columnGroupHeaders.length; k++) {
			for (var l = 0; l < columnGroupHeadersNumbers[k]; l++)
				csvData += columnGroupHeaders[k] + '","';
		}
		csvData = removeLastChar(csvData) + "/n/r";


	csvData += '"';
	for (var k = 0; k < columnNames.length; k++) {
		csvData += columnHeaders[k] + '","';
	}

	csvData = removeLastChar(csvData) + "/n/r";
	// ..then each row of data to be exported.
	var cellValue = '';
	for (i = 0; i < json.length; i++) {

		var data = json[i];
		csvData += '"';
		for (var j = 0; j < columnNames.length; j++) {

			// Fetch one jqGrid cell's data, but make sure it's a string
			cellValue = '' + data[columnNames[j]];


			if(typeof (groupHeaderSpace) == 'undefined' || groupHeaderSpace== null) {
				groupHeaderSpace = 0;
			}
			///var columnIndex = 2 + groupHeaderSpace;
			//for(l=0;l<bigNumberToString.length;l++){
				if(cellValue != 'undefined' && bigNumberToString[j] == j) {
					//alert('cellValue'+cellValue);
					
					csvData = removeLastCharOnly(csvData);
					csvData += '\'';
					cellValue = data[columnNames[j]];
				}
			//}
			
			if(typeof (groupHeaderSpace) == 'undefined' || groupHeaderSpace== null) {
				groupHeaderSpace = 0;
			}
				//var columnIndex = 2 + groupHeaderSpace;
				//for(l=0;l<currencyToFloatDecimal.length;l++){
					if(cellValue != 'undefined' && currencyToFloatDecimal[j] == j){
					//	if($.isNumeric(cellValue) && parseInt(cellValue) !== cellValue) {
						var a = parseFloat(cellValue);
					    var n = a.toFixed(2);
						csvData = removeLastCharOnly(csvData);
						csvData += '\'';
						cellValue = n;
						//}
					}
			if (cellValue == null || cellValue == 'null') {
				csvData += '\t';
			} else {
				cellValue = cellValue.toString();
				cellValue = cellValue.replace('"', '');
				if (cellValue.indexOf("a href") > -1) {
					// Some of my cells have a jqGrid cell with a
					// formatter in them, making them hyperlinks.
					// We don't want to export the "<a href..> </a>"
					// tags to our Excel file, just the cell's text.
					cellValue = $(cellValue).text();
					csvData += cellValue;
				}
				// Make sure we are able to POST data containing
				// apostrophes in it
				//cellValue = cellValue.replace(/'/g, "&apos;");
				if(cellValue.match('="')) {
					csvData += cellValue;
				} else if(Date.parse(cellValue) && isValidDate(cellValue)) {
						csvData = removeLastCharOnly(csvData);
						csvData += '\'';
						csvData += cellValue;
				} else {
					csvData += cellValue;
				}
				if(cellValue != 'undefined' && currencyToFloatDecimal[j] == j){
				csvData += ',"';
				}
				else if(Date.parse(cellValue) && isValidDate(cellValue)) {
					csvData += ',"';
				}
				else{
					csvData += '","';
				}
			}
		}
		csvData = removeLastChar(csvData) + "/n/r";
		
	}
	/*document.generateCSVAccount.action = contextName + '/generateCsv.html?fileName='
			+ fileNameKey;
	if (contextName == null) {
		document.generateCSVAccount.action = 'generateCsv.html?fileName='
				+ fileNameKey;
	}
	document.getElementById('csvData').value = csvData;
	document.generateCSVAccount.submit();*/
	csvData = replaceAll("undefined", "", csvData);
	var pom = document.getElementById('csvExport');
	if(pom != null) {
		
		var isIE = /*@cc_on!@*/false || !!document.documentMode; 
		
		if(isIE) {
			document.generateCSVAccount.action = contextName + '/generateCsvAccount.html?fileName='
					+ fileNameKey;
			if (contextName == null) {
				document.generateCSVAccount.action = '../generateCsvAccount.html?fileName='
						+ fileNameKey+'test';
			}
			document.getElementById('csvData').value = csvData;
			document.generateCSVAccount.submit();
		}
		else{
			csvData = replaceAll("/n/r", "\r\n", csvData);
		
			csvData = new Blob([csvData], { type: 'text/csv' }); 
			var csvUrl = URL.createObjectURL(csvData);
			pom.href =  csvUrl;
			pom.download = fileNameKey+'.csv';
			pom.click();
			
	}
	}
	else {
		document.generateCSVAccount.action = contextName + '/generateCsvAccount.html?fileName='
			+ fileNameKey;
	if (contextName == null) {
		document.generateCSVAccount.action = '../generateCsvAccount.html?fileName='
				+ fileNameKey;
	}
	document.getElementById('csvData').value = csvData;
	document.generateCSVAccount.submit();
	}
}

function removeLastChar(str) {
	// Remove the last character from a string
	return str.substring(0, str.length - 2);
}

function removeLastCharOnly(str) {
	// Remove the last character from a string
	return str.substring(0, str.length - 1);
}

function replaceAll(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	}

function isValidDate(date)
{
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    var m = matches[2] - 1;
    var d = matches[1];
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d &&
            composedDate.getMonth() == m &&
            composedDate.getFullYear() == y;
}

function csvExportButton(gridName, contextUri, fileName, caption, stopLogic,
		json,extraGridcolumn, groupHeaderSpace, mainLeftHeader, mainHeader, myPager) {
	if (!reloadFlag || stopLogic) {
		var pagerId = '#pager';
		if(typeof myPager != 'undefined') {
			 pagerId = myPager;
		}
		gridName.jqGrid('navButtonAdd', pagerId, {
			caption : " ",
			title : caption,
			buttonicon : "ui-icon-arrowthick-1-s",
			onClickButton : function(event) {
				// gridName.jqGrid('getGridParam', 'data');
				// exportTableToCSV.apply(this, [gridName, contextUri,fileName,json,groupHeaderSpace]);
				if(mainHeader != null && mainLeftHeader != null) {
					exportTableToCSVTripleHeader(gridName, contextUri, fileName, json,extraGridcolumn,
							groupHeaderSpace, mainHeader, mainLeftHeader);
				}
				else {
				exportTableToCSV(gridName, contextUri, fileName, json,extraGridcolumn,
						groupHeaderSpace,mainLeftHeader);
				}
			}
		});

	}
	reloadFlag = true;
}