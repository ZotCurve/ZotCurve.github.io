/*  ZotCurve - A tool for UCI students to look at the grade distributions of classes prior.
    Copyright (C) 2019  ZotCurve

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/


function trimSelect(parsedTSV, index, selection)
{
 /**
 * Summary: Function used remove extraneous data from the parsed TSV file.
 *
 * Description: Called upon in "trimTSV," this function inspects each remaining row of the TSV to 
 * 					check if the selection from a drop down select input matches the data's index that is passed in.
 * 					e.g. parsedTSV[0] contains information pertaining to the year, so it should be passed $("#yearSelect").val()
 * 					the function then inspects the rows to ensure that any values that continue are requested by the user,
 * 					otherwise they are trimmed from the data base.
 * 					
 *
 * @param {[[String]]}	parsedTSV   Is the remainder of the database, yet to be trimmed
 * @param {Number}					index       Is the column of each row of the TSV to be inspected
 * @param {String}					selection	Is the data to be compared to each column of the TSV
 *
 * @return {[[String]]} 	The function returns the remaining values from the TSV that passed the comparison test
 * 
 */
	let newData = [];
	//the drop down select inputs have 'All' as their default value, so if the selection is 'All' there is no need to do any comparisons
	//simply return the TSV untrimmed.
	if (selection == 'All')
		return parsedTSV;
	else
	{
		for (let i = 0; i < parsedTSV.length; i++)
		{
			if (selection == parsedTSV[i][index])
				newData.push(parsedTSV[i])
		}
		return newData;
	}
}

function numberMatch(key, value)
{
/**
 * Summary: Checks if a number matches a range or set of numbers given.
 *
 * Description: This function is called upon in the "trimNumberInput" function,
 * 					it is used to check if class' course numbers and course codes are within the users' parameters
 * 					
 *
 * @param {[String]}	key		Is the set of values compared to and used as bounds.
 * 									expected in some sort of format of ([5]; [10, 20-30]; [10-15, 30-40])
 * 
 * @param {Number}		value	Is the value from a class to see if it passes the key
 *
 * @return {Boolean} 	The function returns the remaining values from the TSV that passed the comparison test
 * 
 */
	//TODO
	//Should add a regex check to ensure the user is passing in valid keys
	
	keys = key.split(',')	//separate all the given keys into an array
	for (let i = 0; i < keys.length; i++)
	{
		k = keys[i].split('-')
		//if after splitting by a hypen the length is 1 it means its a single value need to check for equality
		if (k.length === 1)
		{
			if (k[0] == value)
				return true;
		}
		//if after splitting there are two elements we need to check if its bounds are valid instead.
		else if (k.length === 2)
		{
			if (Number(k[0]) <= Number(value) && Number(k[1]) >= Number(value))
				return true;
		}
	}
	return false;
}

function trimNumberInput(parsedTSV, index, selection)
{
/**
 * Summary: Function used remove extraneous data from the parsed TSV file.
 *
 * Description: Called upon in "trimTSV," this function inspects each remaining row of the TSV to 
 * 					check if the input from the number input boxes satisfy the data's index that is passed in.
 * 					e.g. parsedTSV[3] contains information pertaining to the course number, so it should be passed $("#courseNumberInput").val()
 * 					the function then inspects the rows to ensure that any values that continue are requested by the user,
 * 					otherwise they are trimmed from the data base.
 * 					
 *
 * @param {[[String]]}	parsedTSV   Is the remainder of the database, yet to be trimmed
 * @param {Number}					index       Is the column of each row of the TSV to be inspected
 * @param {String}					selection	Is the data to be compared to each column of the TSV
 *
 * @return {[[String]]} 	The function returns the remaining values from the TSV that passed the comparison test
 * 
 */
	let newData = [];
	if (selection.trim() == '')
		return parsedTSV;
	else
	{
		for (let i = 0; i < parsedTSV.length; i++)
		{
			if (numberMatch(selection, parsedTSV[i][index]))	//because the website allows you to specify a range we use a function to check if the value falls within any special sort of parameter the user specifies
				newData.push(parsedTSV[i])
		}
	}
	return newData;		
}

function trimStringInput(parsedTSV, index, selection)
{
 /**
 * Summary: Function used remove extraneous data from the parsed TSV file.
 *
 * Description: Called upon in "trimTSV," this function inspects each remaining row of the TSV to 
 * 					check if the input from the string input boxes satisfy the data's index that is passed in.
 * 					e.g. parsedTSV[5] contains information pertaining to the year, so it should be passed $("#courseTitleInput").val()
 * 					the function then inspects the rows to ensure that any values that continue are requested by the user,
 * 					otherwise they are trimmed from the data base.
 * 					
 *
 * @param {[[String]]}	parsedTSV   Is the remainder of the database, yet to be trimmed
 * @param {Number}					index       Is the column of each row of the TSV to be inspected
 * @param {String}					selection	Is the data to be compared to each column of the TSV
 *
 * @return {[[String]]} 	The function returns the remaining values from the TSV that passed the comparison test
 * 
 */
	let newData = [];
	selection = selection.trim().toLowerCase();

	if (selection == '')
		return parsedTSV;
	else
	{
		for (let i = 0; i < parsedTSV.length; i++)
		{
			try
			{
				if (parsedTSV[i][index].toLowerCase().includes(selection))
					newData.push(parsedTSV[i])				
			}
			catch (e){}
		}
	}
	return newData;				
}

function trimTSV(data)
{
 /**
 * Summary: Function used to call all trim functions and remove extraneous data from the parsed TSV file.
 *
 * Description: Called upon in "listClasses" this function uses all the trim functions to remove extraneous classes from the 
 * 						TSV file that is used to build the schedule of classes the user specifies.
 * 					
 *
 * @param {[[String]]}	data   	The unfiltered TSV file
 *
 * @return {[[String]]} 		The function returns the remaining values from the TSV that passed all of the user's specifications
 * 
 */
	data = trimSelect(data, 0, $('#yearSelect').val());
	data = trimSelect(data, 1, $('#termSelect').val());
	data = trimSelect(data, 2, $('#departmentSelect').val());
	data = trimNumberInput(data, 3, $('#courseNumberInput').val());
	data = trimNumberInput(data, 4, $('#courseCodeInput').val());
	data = trimStringInput(data, 8, $('#instructorInput').val());
	data = trimStringInput(data, 6, $('#courseTitleInput').val());
	return data;
}

function sum(list)
{
	let sum = 0;
	for (let i = 0; i < list.length; i++)
		sum += list[i];
	return sum;
};

function determineGrades(distribution)
{
 /**
 * Summary: Function used to return an array that contains only the appropriate grade counts
 *
 * Description: Checks if the amount of P/NP grades consist of at least 5% of the total amount of grades,
 * 					if there are less than 5% they are removed from the grades array.
 * 				Checks if there are any A-F grades, if there are none the class is a P/NP class and only those two counts are returned
 * 				Otherwise returns the full array.
 * 					
 *
 * @param {[Number]}	distribution   	An array containing the grade counts, [A, B, C, D, F, P, NP]
 *
 * @return {[[String]]} 	Returns an altered form of the grade counts array
 * 
 */
	// store p and np counts off the list
	let NP = distribution.pop(),
		P = distribution.pop();

	let percent = (P+NP)/sum(distribution)
	//if P/NP count < 5% return the list without P/NP counts
	if (percent < 0.05)
		return distribution; 
	// if remaining grades are all 0 (A-F) class is P/NP only
	if (sum(distribution) == 0)
		return [P, NP];	
	
	//otherwise add P/NP back to the array and return it in its original form
	distribution.push(P);
	distribution.push(NP);
	return distribution;
};

function determineTerm(year, term)
{
 /**
 * Summary: Converts the given year and term into a nice string
 *
 * Description: parses its year and term input
 * 					
 *
 * @param {String}	year   	Year in the form of 20XXtoXX
 * @param {String}	term   	The quarter in question, [Fall, Winter, Spring, Summer]
 *
 * @return {String} 	Returns a formatted string.
 * 
 */
	//because XML tags must begin with a character I added a 'Y' character to the front for the XML format
	//	it must be parsed out differently than the TSV file is
	
	//if the quarter is in the Fall or Summer, it needs the first year in 2010to11		e.g. 2010
	//	otherwise it is in Winter/Spring, meaning it is in the second half of the year  e.g. 2011
	if (term == 'Fall' || term == 'Summer')
		return term + ' ' + year.substring(0,4);
	else
		return term + ' ' + year.substring(0,2) + year.substring(6,8);		
};

function createSubtext(data)
{
 /**
 * Summary: Creates the subtitle for the grades graph
 *
 * Description: Calls various functions and access specific pieces of data from the class data array passed in
 * 					
 *
 * @param {[String]}	data	Is an array containing data from the class the user selected
 *							In format:
 *	 						[year, term, coursecode, coursetitle, instructor, department and course number (e.g. CS 161), 
 *	  							section, and an array that contains the count of each grade in the format of [A,B,C,D,F,P,NP]
 *
 *
 * @return {String} 	Returns a formatted string.
 * 
 */	
	return determineTerm(data[0], data[1], true) + " " + data[5] + " Section " + data[6] + " - " + capitalizeName(data[4]);
};

function capitalizeName(name)
{
	//self explanatory function
	let n = name.split(' '),
		r = '';
	for (let i = 0; i < n.length; i++)
		if (n[i].length > 0)
			r += n[i][0].toUpperCase() + n[i].slice(1).toLowerCase() + ' ';
	return r; 
}

function adjustLabel(chart, grades)
{
 /**
 * Summary: Adjusts the labels on the graph.
 *
 * Description: Looks at the size of the grades array and adjusts the labels to have the appropriate labels on the chart
 * 					
 * @param {Chart}		chart	The chart object used to plot the graph
 * @param {[Number]}	grades	The array containing the grades, its length is used to determine the appropriate labels
 *
 */		
	//if the length is 7 we need all labels
	if (grades.length == 7)
		chart.data.labels = ['A', 'B', 'C', 'D', 'F', 'P', 'NP'];
	//if the length is 5 we only need A-F
	else if (grades.length == 5)
		chart.data.labels = ['A', 'B', 'C', 'D', 'F'];
	// if the length is 2 we need only P/NP
	else
		chart.data.labels = ['P', 'NP'];
};
		
function replaceData(chart, grades)
{
	// pretty obvious
	chart.data.datasets.forEach((dataset) => {
		dataset.data = grades;
	});
};

function gpa(grades)
{
 /**
 * Summary: Calculates the pass rate or the average gpa of a class
 *
 * Description: Observes the grades array length to return the proper output
 * 					
 * @param {[Number]}	grades	An array containing the grades to be graphed
 *
 * @return {String} 	Returns either the pass rate or the average gpa of the class
 * 
 */		
	if (grades.length == 2)
	{
		//      P count	   P+NP count
		return (grades[0]/sum(grades)*100).toFixed(2) + '%';
	}
	else
	{
		let total = 0,
			totalGradePoints = 0;
			
		for (let i = 0; i < 5; i++)
		{
			total += grades[i];
			totalGradePoints += grades[i]*(4-i);
		}
		return (totalGradePoints/total).toFixed(3);
	}
};	

function createGPAText(grades)
{
	//simply appends the appropriate string to the front of the pass rate/gpa
	if (grades.length == 2)
		return "Pass rate: " + gpa(grades);
	else
		return "Average GPA: " + gpa(grades);
};
	
function validSearch()
{
 /**
 * Summary: Checks to see if the user has used at least one of the bold search terms on the page
 *
 * Description: Accesses each of those search terms values to see if they have been changed,
 * 					all input types will have "" as their default value, the dept select has 'All' as it default,
 * 					the concatonation of these will result in simply the string 'All'
 * 					
 * @return {Boolean} 	Returns either the pass rate or the average gpa of the class
 * 
 */		
	let x = ($("#courseTitleInput").val() + $("#instructorInput").val() + $("#courseCodeInput").val() + $("#departmentSelect").val()).trim();
	if (x == 'All')
		return false;
	return true;
}

function listClasses(fn)
{
 /**
 * Summary: Parses the TSV file
 *
 * Description: Accesses the TSV file stored on the server and uses a callback function to access its value because it is an asynchronous function
 * 					see 'buildClassList' if you're still confused about the callback situation	
 * @param {function()}	fn	Callback function needed to access the TSV file
 *
 */	
	$.get('grades.tsv', function(data)
	{
		var parsedTSV = data.split('\n');
		for(var i = 0; i < parsedTSV.length; i++)
			parsedTSV[i] = parsedTSV[i].split('\t');				
		fn(trimTSV(parsedTSV)); //use callback to work with the value, has a call to 'trimTSV' before it is handed to the callback
	})
	.fail(function() {
		alert("Failed to load classList.dat, please report this error.");
	});	
}

function createTableEntry(data)
{
 /**
 * Summary: Creates an html table row object
 *
 * Description: Given the data for a class it creates the html representation of that to be added to the webpage table
 * 					
 * @param {[String]}	data	An array containing information for a class
 * 
 * @return {jquery object}		Contructed table object in html format
 */		
	
	metadata = 'data-year="' + data[0] + '" '; 
	metadata += 'data-quarter="' + data[1] + '" ';
	metadata += 'data-dept="' + data[2] + '" ';
	metadata += 'data-number="' + data[3] + '" ';
	metadata += 'data-code="' + data[4] + '" ';
	metadata += 'data-section="' + data[5] + '" ';
	metadata += 'data-title="' + data[6] + '" ';
	metadata += 'data-instructor="' + data[8] + '" ';
	metadata += 'data-a="' + data[9] + '" ';
	metadata += 'data-b="' + data[10] + '" ';
	metadata += 'data-c="' + data[11] + '" ';
	metadata += 'data-d="' + data[12] + '" ';
	metadata += 'data-f="' + data[13] + '" ';
	metadata += 'data-p="' + data[14] + '" ';
	metadata += 'data-np="' + data[15] + '" ';
	
	let html = '<tr '+ metadata + 'class="classEntry">';
	html += '<td align="center">' + determineTerm(data[0], data[1], false) + '</td>';	//the first and second index contain the term data, specially passed to the function to be formatted
	html += '<td align="center">' + data[2] + '</td>';
	html += '<td align="center">' + data[3] + '</td>';
	html += '<td align="center">' + data[4] + '</td>';
	html += '<td align="center">' + data[6] + '</td>';
	html += '<td align="center">' + capitalizeName(data[8]) + '</td>'	//the final index contains the professor name, passed to this function to be capatilized
	html += '</tr>';
	return $(html);
}

function buildClassList()
{
 /**
 * Summary: Builds the table on the webpage
 *
 * Description: Constructs the table for the webpage based on the users specifications
 * 					
 */	
	//only build the table if the search is valid
	if (validSearch())
	{	
		$("#dataInput").hide();		//hide the input boxes on the webpage
		
		//use the callback function to work with the value
		listClasses(function(totalList){						
			//if the database given back has a length of 0, there were no results
			if (totalList.length == 0)
			{
				$("#noResults").show();		//reveal the no results element
			}
			else
			{
				//iterate through each class that was returned to the callback 
				for (let i = 0; i < totalList.length; i++)
				{
					$("#classList").append(createTableEntry(totalList[i]));
				}
			}
		});
		$("#invalidSearch").hide();				//ensure any invalid search element is hidden
		$("#scheduleOfClasses").show();			//reveal the table on the webpage
	}
	else
	{
		invalidSearchAlert();
	}
}

function resetSearch()
{
	//simply resets the webpage elements to their default values, removes the error result from the webpage.
    $(".box").fadeOut();
	$("#yearSelect").val("2018to19");
	$("#termSelect").val("All");
	$("#departmentSelect").val("All");
	$("#courseNumberInput").val('');
	$("#courseCodeInput").val('');
	$("#instructorInput").val('');
	$("#courseTitleInput").val('');
}

function invalidSearchAlert(myYes) {
    //var confirmBox = $(".box");
    //confirmBox.find("#message").text("Invalid search parameters,\nuse at least one of the bold search tools.");
    //confirmBox.find("#OK").unbind().click(function() {
    //   confirmBox.fadeOut();
    //});
    //confirmBox.find(".yes").click(myYes);
    //confirmBox.fadeIn();
    alert("Invalid search parameters,\nuse at least one of the bold search tools.")
}

function returnToSearch()
{
	//clears the list that has been build from the previous search and changes visibility on webpage elements to show only search tools
	$("tr").remove(".classEntry, .error"); 
	$("#scheduleOfClasses").hide();
	$("#noResults").hide()
	$('#dataInput').show();
}

function revertTerm(term)
{
	//takes the TSV format of the term "Term 20XX"
	//and converts it into the term and year for xml, year in XML format needs to be "Y20XXtoXX"
	x = term.split(' ');
	month = x[0];
	year = x[1];
	if (month == 'Fall' || month == 'Summer')
		return 'Y' + year + 'to' + String(Number(year.substring(2)) + 1) + ' ' + month
	else
		return 'Y' + String(Number(year) - 1) + 'to' + year.substring(2) + ' ' + month
}

function run(data)
{
 /**
 * Summary: Creates the graph on the webpage
 *
 * Description: Receives its parameters from a click on the table generated from the user
 * 					
 * @param {String}	YEAR	The year from the class desired
 * @param {String}	TERM	The term from the class desired
 * @param {String}	CODE	The course code from the class desired
 * 
 */		
	let	grades = determineGrades(data[7]);		
	adjustLabel(chart, grades);
	replaceData(chart, grades);
	
	if (data[3] === "")
	{
		$('#class').text("Error");
	}
	else
	{
		$('#class').text(data[3]);				//sets title for the chart
		$('#subtext').text(createSubtext(data));
		$('#average').text(createGPAText(grades));
		$('.chartTitle').css('visibility', 'visible');		
	}
	chart.update();
};

//initializations on the page
var cvs = $("#canvas")[0].getContext('2d'),
	labels = ['A', 'B', 'C', 'D', 'F', 'P', 'NP'],
	backgroundColor = [
		'rgba(030, 150, 000, 0.5)',
		'rgba(143, 196, 000, 0.5)',
		'rgba(255, 242, 000, 0.5)',
		'rgba(255, 121, 000, 0.5)',
		'rgba(255, 000, 000, 0.5)',
		'rgba(140, 073, 198, 0.5)',
		'rgba(073, 132, 198, 0.5)'],
	borderColor = [
		'rgba(030, 150, 000, 1)',
		'rgba(143, 196, 000, 1)',
		'rgba(255, 242, 000, 1)',
		'rgba(255, 121, 000, 1)',
		'rgba(255, 000, 000, 1)',
		'rgba(140, 073, 198, 1)',
		'rgba(073, 132, 198, 1)'],
	chart = new Chart(cvs, {
	type: 'bar',
	data: {
		labels: labels,
		datasets: [{
			label: '# of Grade',
			data: [0,0,0,0,0,0,0],
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderWidth: 1
		}]
	},
	options:
	{
		legend:
		{
			display: false
		},
		scales:
		{
			yAxes:
			[{
				gridLines:
				{
					color: 'rgba(000, 000, 000, .3)'
				},
				ticks:
				{
					fontSize: 18,
					fontColor: 'rgba(000, 000, 000, 1)',
					beginAtZero: true
				}
			}],

			xAxes:
			[{
				gridLines:
				{
					color: 'rgba(000, 000, 000, .3)'
				},
				ticks:
				{
					fontSize: 24,
					fontColor: 'rgba(000, 000, 000, 1)'
				}
			}]
		}
	}
});	

var targetClass = null,
	targetClassColor,
	highlighted = 'rgb(255,255,100)';
//adds events to recognize clicking on the Class

$('table').on("click", function (event) {

	row = $(event.target.parentNode)
	if (row.hasClass('classEntry'))
	{
		let data = [row.data('year'), row.data('quarter'), row.data('code'), row.data('title'), row.data('instructor'), 
			row.data('dept') + ' ' + row.data('number'), row.data('section'), 
				[row.data('a'),row.data('b'),row.data('c'),row.data('d'),row.data('f'),row.data('p'),row.data('np')]]

		run(data);		
		
		if (targetClass != null)
			targetClass.css('background-color', targetClassColor);

		targetClass = $(event.target.parentNode);
		targetClassColor = targetClass.css('background-color');
		targetClass.css('background-color', highlighted);
	}	
});


$('table').on("touch", function (event) {
	if (event.target.parentNode.innerHTML.substring(0, 19) == '<td align="center">')
	{
		let selection = event.target.parentNode.innerHTML.substring(19).split('</td><td align="center">'),
			term = revertTerm(selection[0]).split(' '),
			year = term[0],
			quarter = term[1],
			code = 'C' + selection[3];
		
		run(year, quarter, code);
	}	
});

//final call, fades the body in after all the calculations have been done so that user only sees the built page
$('body').fadeIn();
