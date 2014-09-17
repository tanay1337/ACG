	function exportToExcel( tableID ){
		if( tableID ){
			wind = window.open( "", "", "width=100,height=100" );
			wind.resizeTo(0, 0);
			wind.moveTo(-100, -100);
			wind.document.write( "<TABLE BORDER='1'>" );
			for( i=1; i<tableID.rows.length; i++ ){
				wind.document.write( tableID.rows[i].outerHTML );
			}
			wind.document.write( "</TABLE>" );
			wind.document.execCommand('SaveAs', true, 'ing_export.xls');
			wind.close();
		}
	}

	// This function is made to check all the checkboxes that are with the same name
	// The argument obj is the checkbox on which the user clicks
	// and the argument chkboxName is the checkboxName of the same named checkboxes.
	function selectAll( obj, chkboxName ){
		for(i=0; i<chkboxName.length; i++){
			obj.form[chkboxName][i].checked = obj.checked;
		}
	}

	// imgCachedSources is an Array that caches images e.g. imgCachedSources[n] = new Image()...
	imgCachedSources = new Array();

	// imgSources is an Array of image sources e.g. ("images/img1.gif", "images/img2.gif")
	function cacheImages(imgSources){
		for(index=0; index<imgSources.length; index++){
			imgCachedSources[index] = new Image();
			imgCachedSources[index].src = imgSources[index];
		}
	}

	imgCachedNavigationSources = new Array();

	// Image name will be like img1.gif and img1over.gif
	function cacheNavigationImages(imgSources){
		indexJ = 0;
		for(index=0; index<imgSources.length; index++){
			imgCachedNavigationSources[indexJ] = new Image();
			imgCachedNavigationSources[indexJ++].src = imgSources[index] +".gif";
			imgCachedNavigationSources[indexJ] = new Image();
			imgCachedNavigationSources[indexJ++].src = imgSources[index] +"over.gif";
		}
	}

	// The following function takes a number of arguments in the following manner:
	// ('Img1', "../images/a1.gif", "Img2", "../images/a2.gif" ....)
	// i.e., a series of imageName and imageSource.
	function changeImages(){
		for(index=0; index<arguments.length; index+=2){
			document.images[arguments[index]].src = arguments[index+1];
		}
	}

	function getParameter(parameter){
		href = location.href;
		index = href.indexOf("?");
		if(index == -1)
			return "";

		paramValue = href.substring( href.indexOf(parameter, (index+1)) );
		index = paramValue.indexOf(parameter);
		if(index == -1)
			return "";

		paramValue = paramValue.substring( ( index+(parameter.length+1) ) );
		index = paramValue.indexOf("&");
		paramValue = paramValue.substring(0, (index == -1 ? paramValue.length : index) );
		return paramValue;
	}

	function changeImagesFrame(frameObj){
		if( frameObj && arguments.length > 1 ){
			frameObj.document.images[arguments[1]].src = arguments[2];
			for(index=3; index<arguments.length; index+=2){
				document.images[arguments[index]].src = arguments[index+1];
			}
		}
	}

function popUpWindow(url, width, height, x, y){
	wind = window.open(url, "_blank", "width=" +width+ ",height=" +height+ ",scrollbars=yes,resizable=yes");
	if(x != null && y != null){
		wind.moveTo(x, y);
	}else{
		x = (screen.width/2)  - (width/2);
		y = (screen.height/2) - (height/2);
		wind.moveTo(x, y);
		//alert( width + ", " +height+ "\n" +screen.width+ "x" +screen.height +"\nx: "+ x +", y: "+ y);
	}
}

function generateOptions(selectName, arr){
	document.writeln("<select name=\"" +selectName+ "\"> ");
	for(i=0; i<arr.length; i++){
		document.writeln("<option value=\"" +arr[i]+ "\"> " +arr[i]+ " </option>");
	}
	document.writeln("</select>");
}

function selectOption(selectObject, valueToSelect){
	valueToSelect = valueToSelect.toLowerCase();
	for(i=0; i<selectObject.options.length; i++){
		if(selectObject.options[i].value.toLowerCase() == valueToSelect){
			selectObject.options.selectedIndex = i;
			break;
		}
	}
}

function validateEquality(FirstFieldValue, SecondFieldValue){
	if(FirstFieldValue != SecondFieldValue){
		return false;
	}
	return true;
}

// Function validateRequired() takes variable # of arguments with first argument
// being the form name and rest of the arguments as required fields.
// Note: Original objects have to be passed, not values.
function validateRequired(){
	var formName = "";
	if(arguments.length > 1){
		formName = arguments[0];
		for(i=1; i<arguments.length; i++){
			if(trimSpaces(arguments[i].value).length == 0){
				alert(convertVariable(arguments[i].name) +" is a required field.");
				arguments[i].select();
				return false;
			}
		}
	}
	return true;
}

// Function trimspaces()
function trimSpaces(str){
	var rtn = "";
	var len = str.length;
	var i = 0;
	var startLoc = 0;
	var endLoc = 0;
	var started = false;

	for (i=0; (i < len) && (!started) ; i++){
		if (str.charAt(i) != ' '){
			started = true;
			startLoc = i;
		}
	}

	if (!started) return rtn;

	started = false;
	for (i=len-1; (i > -1) && (!started) ; i--){
		if (str.charAt(i) != ' '){
			started = true;
			endLoc = i + 1;
		}
	}

	for (i=startLoc ; i<endLoc; i++){
		rtn = rtn+str.charAt(i);
	}
	return rtn;
}

// Function convertVariable()
// This function changes the text of a variable name such as "retypePassword" to 
// "Retype Password" So that alert messages come comprehensible.
function convertVariable(varName){
	varNewName = "";
	for(j=0; j<varName.length; j++){
		ch = varName.charAt(j);
		if(ch >= 'A' && ch <= 'Z')
			varNewName += " " +ch;
		else
			varNewName += ch;
	}
	varName = varNewName;
	varNewName = varName.charAt(0).toUpperCase();
	varNewName += varName.substring(1);
	return varNewName;
}

function parseDT(dateString){ // Date should be in MM/DD/YYYY format
	dt1 = new Date( dateString );
	arr_Month = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
	return arr_Month[dt1.getDay()];
}

// Function validateDouble(value, dataType)
// e.g. validateDouble(25.99, "dec");
// e.g. validateDouble(25,    "int");
// e.g. validateDouble(-57,   "int");
function validateDouble(value, dataType){
	dataType = dataType.toLowerCase();

	for(i=0; i<value.length; i++){
		val = value.charAt(i);
		if(!(val >= 0 && val <= 9)){ // If not in between 0-9
			if(dataType == "dec" && val != "."){
				if(i == 0 && val == '-')
					continue;
					
				return false;
			}

			if(dataType == "int"){
				if(i == 0 && val == '-')
					continue;
					
				return false;
			}
		}
	}
	return true;
}

// Function validateEmail( "emailId@email.com" ) for email validation
function validateEmail(email){
	invalidChars = " /:,;"
	if(email == ""){                 //email cannot be empty
		return false;
	}

	for(i=0; i<invalidChars.length; i++){ //check for invalid characters
		badChar = invalidChars.charAt(i);
		if(email.indexOf(badChar,0) != -1){
			return false;
		}
	}

	atPos = email.indexOf("@",1);         //there must be one "@" symbol
	if(atPos == -1){
		return false;
	}
	if(email.indexOf("@",atPos+1) != -1){ //check to make sure only one "@" symbol
		return false;
	}

	periodPos = email.indexOf(".",atPos);
	if (periodPos == -1){ // make sure there is one "." after the "@"
		return false;
	}

	if(periodPos+3 > email.length){ // must be at least 2 chars after the "."
		return false;
	}
	return true;
}


// Function validateSelect()
// Forces selection of options other than first one in a select control.
function validateSelect(selectObject){
	val = selectObject[selectObject.selectedIndex].value;
	if( val == 0 || val == "" ){
		alert("Please choose another option from '" +convertVariable(selectObject.name)+ "'" );
		selectObject.focus();
		return false;
	}else{
		return true;
	}
}

//add by jagdish
function delRec()
{
	confirm("Are you sure you want to delete this record? ")
}

function tblHide(obj,obj2,obj3,obj4)
{
	document.all(obj).style.display = "";
	document.all(obj2).style.display = "";
	document.all(obj3).style.display = "";
	document.all(obj4).style.display = "";
}

function containerShowHide(obj,arrImg) {
    if (document.getElementById(obj).style.display == "none") {
        document.getElementById(obj).style.display = "";
        document.getElementById(arrImg).src = "images/arrow_collapse.png";
        //document.getElementById(arrID).src = "images/" + arrImg + ".png";
    }
    else {
        document.getElementById(obj).style.display = "none";
        document.getElementById(arrImg).src = "images/arrow_expand.png";
        //document.getElementById(arrID).src = "images/" + arrImg + ".png";
    }
}

function controlShowHide(obj,arrImg)
{
	if(document.getElementById(obj).style.display == "none")
	{
	    document.getElementById(obj).style.display = "";
	    document.getElementById(arrImg).src = "images/arrow_down.png";
	}
	else
	{
	    document.getElementById(obj).style.display = "none";
	    document.getElementById(arrImg).src = "images/arrow_right.png";
	}
}

function tblHideShow2(obj, objfw) {
    if (document.getElementById(obj).style.display == "none") {
        document.getElementById(obj).style.display = "";
        document.getElementById(objfw).style.display = "";
    }
    else {
        document.getElementById(obj).style.display = "none";
        document.getElementById(objfw).style.display = "none";
    }
}

function hide(obj,val)
{
	document.all(obj).style.display = "none";
	document.all(val).style.display = "none";
}

function delRow(obj)
{
	document.all(obj).style.display = "none";
}

function openWindow(url)
{
	//alert("Jag");
	var myWind = window.open(url,"EmpWin","scrollbars=yes,status=yes,width=800,height=600");
	//var myWind = window.open(url,"EmpWin","scrollbars=yes,menubar=yes,toolbar=yes,status=yes,width=800,height=600");
	myWind.moveTo(10,10)
				
}

function openTime(controlObjStr){
	wind = window.open('timeEditable.html?' +controlObjStr, '', 'resizable');
	wind.resizeTo(210, 10);
}