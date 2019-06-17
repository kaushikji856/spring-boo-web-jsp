/**
 * Copyright: Telenore Project Name: cims Version Information: 1.0, Dinesh,
 * 05/09/2014 Modification History:
 * 
 */

function searchCorporateDetailsGetNames() {
	return ($("#searchCorporateDetailsColumns").val()).split(",");
}


/*function myCorporateDetailsGetNames() {
	return ($("#myCorporateDetailsColumns").val()).split(",");
}
*/
jQuery(document).ready(function($) {
	$('#searchCorp input:text').on('keydown', function(e) {
		var kc = e.keyCode || e.which;
		if (kc == 13) {
			$("#searchCorpBtn").click();
		}
	});

	myCorporate();
	$('#createdDate1, #dateOfExpiry1 , #dateOfAgreement1 , #companyInceptionDate1' ).unbind('keydown').keydown(function(e){
		  if(e.keyCode > 20 ) {
		    return false;
		  }
		})
	$('#dateOfExpiry1').datepicker({minDate:new Date()});	
	$('#createdDate1').datepicker({minDate:new Date(), maxDate:new Date()});
	//$('#createdDate1').datepicker({maxDate:new Date()});
	$('#companyInceptionDate1').datepicker({maxDate:new Date()});
	doa();
	//searchCorporate('','','','');
	
	if(typeof $("#addressColumns").val() != 'undefined') {
		addressDeatails();
		  
		$('.corporateTabsWrapper li').click(function() {			
			$('.corporateTabsWrapper li').removeClass('active');
			$(this).addClass('active');			
		});

/*					$('#packRowID').hide();
				     $('#usageRowID').hide();
				       $('#vidRow').hide();
					     $('#usageVID').hide();
					     $('#corporateLevel').hide();
*/					     
					     
	}	
		
	//for disabling save button
	if($('#status').val()=='PUBLISHED') {
	  $('#editCorporateSave').prop('disabled',true);
	  $('#editCorporateSubmit').prop('disabled',true);
	  document.getElementById("validateCugID").disabled = false;
	  
	  
	}
	
	if($('#status').val()=='SAVED') {
		  $('#editCorporateCancel').prop('disabled',true);
		  
		  
		  
		}
	
	
	if($('#status').val()=='SAVED') {
		  document.getElementById("validateCugID").disabled = true;
		  
		  
		  
		}
});

var firstLoadComplete = false;

/*function searchCorporateDetailsGetNames() {
	return ($("#searchCorporateDetailsColumns").val()).split(",");
}*/

$(function() {
	$(document).on('keyup', '#bsCode', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	});
});
$(function() {
	$(document).on('keyup', '#parentBSCode', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	});
});


$(function() {
	$(document).on('keyup', '#corporateName1', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (!containsNonNumeric) {	
			this.value = this.value.replace(regEx, '');
		}
	});
});
$(function() {
	$(document).on('keyup', '#corporateShortName1', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric==false) {
			this.value = this.value.replace(regEx, '');
		}
	});
});
$(function() {
	$(document).on('keyup', '#corporateId', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	});
});
$(function() {
	$(document).on('keyup', '#noOfEmployees', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	});
});

$(function() {
	$(document).on('keyup', '#slabID', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	});
});

$(function() {
	$(document).on('click', '#accountSearchCorporate', function() {
		$("#corporateList").css({'display':'none'});
		 $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(6).hide();
		addressDeatails();
	});
});
$(function() {
	$(document).on('click', '#modifyCorporate', function() {
		rId = $('#searchCorporateGrid').jqGrid('getGridParam','selrow')
	var	corporateId = $('#searchCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		//var corporateId=$('#searchCorporateGrid').jqGrid('getGridParam','selrow');
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
			{
			commonMessageBox('Information',  "Please Select Any Row To Modify Corporate");
			return false;
			}
		window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ corporateId;
	});
});




$(function() {
	$(document).on('click', '#myModifyCorporate', function() {
		rId = $('#myCorporateGrid').jqGrid('getGridParam','selrow')
	var	corporateId = $('#myCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		//var corporateId=$('#searchCorporateGrid').jqGrid('getGridParam','selrow');
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
			{
			commonMessageBox('Information',  "Please Select Any Row To Modify Corporate");
			return false;
			}
		window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ corporateId;
	});
});




$(function() {
	$(document).on('click', '#myViewCorporate', function() {
		rId = $('#myCorporateGrid').jqGrid('getGridParam','selrow')
	var	corporateId = $('#myCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		//var corporateId=$('#searchCorporateGrid').jqGrid('getGridParam','selrow');
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
			{
			commonMessageBox('Information',  "Please Select Any Row To Modify Corporate");
			return false;
			}
		window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ corporateId;
	});
});




$(function() {
	$(document).on('click', '#viewCorporate', function() {
		rId = $('#searchCorporateGrid').jqGrid('getGridParam','selrow')
	var	corporateId = $('#searchCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		//var corporateId=$('#searchCorporateGrid').jqGrid('getGridParam','selrow');
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
		{
		commonMessageBox('Information',  "Please Select Any Row To View Corporate");
		return false;
		}
		window.location.href = '/cims/account/viewCorporateDetails?corporateId='+ corporateId;
	});
});

$(function() {
	$(document).on('click', '#deleteCorporate', function() {
		rId = $('#searchCorporateGrid').jqGrid('getGridParam','selrow')
		var	corporateId = $('#searchCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		var	corporateName = $('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateName');
		var	corporateShortName = $('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateShortName');
		var bsCode=$('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateId');
		
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
		{
		commonMessageBox('Information',  "Please Select Any Row To Delete Corporate");
		return false;
		}
		//commented by Mohit as change in generating bs code
		//var corporateId=$('#searchCorporateGrid').jqGrid('getGridParam','selrow');
		var status = $('#status').val();
		var action='DELETED';
		corporateModify(corporateId, status,action ,corporateName ,corporateShortName ,bsCode);
		
	});
});
$(function() {
	$(document).on('click', '#enableCorporate', function() {
		rId = $('#searchCorporateGrid').jqGrid('getGridParam','selrow')
		var	corporateId = $('#searchCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		var	corporateName = $('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateName');
		var	corporateShortName = $('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateShortName');
		var bsCode=$('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateId');
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
		{
		commonMessageBox('Information',  "Please Select Any Row To Enable Corporate");
		return false;
		}
		//commented by Mohit as change in generating bs code
		//var corporateId=$('#searchCorporateGrid').jqGrid('getGridParam','selrow');
		var status = $('#status').val();
		var action='PUBLISHED';
		corporateModify(corporateId, status,action ,corporateName ,corporateShortName ,bsCode);
	});
});
$(function() {
	$(document).on('click', '#disableCorporate', function() {
		rId = $('#searchCorporateGrid').jqGrid('getGridParam','selrow')
		var	corporateId = $('#searchCorporateGrid').jqGrid('getCell', rId, 'searchCorporateID');
		var	corporateName = $('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateName');
		var	corporateShortName = $('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateShortName');
		var bsCode=$('#searchCorporateGrid').jqGrid('getCell', rId, 'corporateId');
		
		if(corporateId==""  || corporateId==undefined  || corporateId==false)
		{
		commonMessageBox('Information',  "Please Select Any Row To Disable Corporate");
		return false;
		}
		var status = $('#status').val();
		var action='DISABLED';
		corporateModify(corporateId, status,action ,corporateName ,corporateShortName ,bsCode);
	});
});

$(function() {
	$(document).on('click', '#saveCorporate', function() {
		createCorporateSave();
	});
});

$(function() {
	$(document).on('click', '#resetCorporate', function() {
		createCorporateReset();
	});
});

$(function() {
	$(document).on('click', '#editCorporateSubmit, #editCorporateSave , #editCorporateCancel',
			function() {
				var currentId = this.id;
				$('.errorSpan').text("");
				checkValidation(currentId);
				if (validationStatus == 1) {
					return false;
				}
				saveOrPublishCorporateDetails(currentId);
			});
});

$(function() {
	$(document).on('click', '#editCorporateUpdate', function() {
		var currentId = this.id;
		$('.errorSpan').text("");
		checkValidation(currentId);
		if (validationStatus == 1) {
			return false;
		}
		updateCorporateDetails();
	});
});

$(function() {
	$(document).on('click', '#creditLimitUpdate', function() {
		var currentId = this.id;
		$('.errorSpan').text("");
		checkValidation(currentId);
		if (validationStatus == 1) {
			return false;
		}
		updateCreditLimit();
	});
});

$(function() {
	$(document)
			.on(
					'click',
					'#creditLimitCancel, #registrationDetailsCancel',
					function() {
						resetSearchValues();
						createCorporateReset();
						$('.editCorporateTab').hide();
						$('.modifyRegistrationTab').hide();
						$('.creditLimitTab').hide();
						// fadeOutMessageBox();
						$('.listCorporateTab').show();
					});
});

$(function() {
	$(document).on('click', '#searchCorporate', function() {

		searchCorporateByPartner();
	});
});

function viewCorporateGrid(corporateId) {
	$('.corporateViewLoadingDiv').show();
	$.ajax({
		url : "../account/fetchCorporateDetails?corporateId=" + corporateId,
		type : "POST",
		datatype : 'json',
		success : function(item) {
			$('.corporateViewLoadingDiv').hide();
			$('#viewCorporateId').text(item.corporateId);
			$('#corporateNameHeading').text(item.corporateName);
			$('#viewCorporateName').text(item.corporateName);
			$('#viewCorporateShortName').text(item.corporateShortName);
			$('#viewStatus').text(item.status);
			$('#viewName').text(item.firstName);
			$('#viewEmail').text(item.email);
			$('#viewContactNumber').text(item.contactNumber);
			$('#viewAddress').text(item.address);
			$('#viewDistrict').text(item.district);
			$('#viewLandmark').text(item.landMark);
			$('#viewCity').text(item.cityTown);
			$('#viewState').text(item.state);
			$('#viewBillCycle').text(item.billCycle);
			$('#viewContractDuration').text(item.contractDuration);
			$('#viewRegistrationNumber').text(item.registrationNumber);
			if (item.registrationDate == undefined
					|| item.registrationDate == '') {
				$('#viewRegistrationDate').text("");
			} else {
				var regDate = item.registrationDate;
				var regDateFormat = $.datepicker.formatDate('M dd, yy',
						new Date(regDate));
				$('#viewRegistrationDate').text(regDateFormat);
			}

			$('#viewCreditLimit').text(item.creditLimit);
		},
		complete : function() {

		},
		error : function(err) {
			$('.loadingDiv').hide();
			$('.corporateViewLoadingDiv').hide();
			$('#corporateDetailsWrapper').hide();
			$('#corporateDetails').hide();
			$('#corporateAlertBox').find('p').text(
					"Unable to fetch records. Please try again.");
			$('#corporateAlertBox').removeClass("alert-success");
			$('#corporateAlertBox').addClass("alert-error");
			$('#corporateAlertBox').fadeIn(500);
		}
	});
}

function searchCorporate(corporateId, corporateName, corporateShortName, status, zone,kamUser,parentBSCode,billShareFlag) {

	var searchCorporateDetailsColNames = searchCorporateDetailsGetNames();
	var gridWidth = ($('.tableWrapper2').width() - 10) / 9;
	$('#searchCorporateGrid').jqGrid('GridUnload');
	$("#searchCorporateGrid")
			.jqGrid(
					{
						url : '../submitSearchCorporate?corporateId='
								+ corporateId + '&corporateName='
								+ corporateName + '&corporateShortName='
								+ corporateShortName + '&status=' + status+ '&zone=' + zone+ '&kamUser=' + kamUser + '&parentBSCode=' + parentBSCode, 
								//+ '&billShareFlag=' + billShareFlag,
						datatype : 'json',
						mtype : 'POST',
						colNames : searchCorporateDetailsColNames,
						colModel : [ 
						             
						             
						             {
									name : 'searchCorporateID',
									label : 'searchCorporateID',
									width : 150,
									align : 'center',
									key : true,
									hidden:true
									
								},{
									name : '',
									label : '',
									width : 50,
									align : 'center',
									formatter : function radio(cellValue,
											option) {
										return '<input type="radio" class="chk" name="radio_'
												+ option.gid + '"   />';
									}
								},{
							name : 'corporateId',
							index : 'corporateId',
							key : true,
							align : 'center',
							sortable : false,
							width : 150,
							editable : false,
							/*formatter : 'showlink',
							formatoptions : {
								baseLinkUrl : 'javascript:',
								showAction : "getCorporateInfo('",
								addParam : "');"
							}*/

						}, 
						{
							name : 'corporateName',
							index : 'corporateName',
							align : 'center',
							sortable : false,
							width : 250,
							editable : false

						}, {
							name : 'corporateShortName',
							index : 'corporateShortName',
							align : 'center',
							sortable : false,
							width : 250,
							editable : false

						}, {
							name : 'status',
							index : 'status',
							align : 'center',
							sortable : false,
							width : 200,
							editable : false,
							

						} ,
						{
							name : 'creationDate',
							index : 'creationDate',
							align : 'center',
							sortable : false,
							width : 200,
							editable : false,
							

						},
						{
							name : 'parentBSCode',
							index : 'parentBSCode',
							align : 'center',
							sortable : false,
							width : 220,
							editable : false,
							

						},
						{
							name : 'kamName',
							index : 'kamName',
							align : 'center',
							sortable : false,
							width : 220,
							editable : false
							

						},
						{
							name : 'zone',
							index : 'zone',
							align : 'center',
							sortable : false,
							width : 220,
							editable : false
							

						},
						{
							name : 'billShareFlag',
							index : 'billShareFlag',
							align : 'center',
							sortable : false,
							width : 220,
							editable : false
							

						}
						],

						gridview : true,
						toolbar : [ false, "bottom" ],
						rowNum : 5,
						loadonce : true,
						rowList : [ 5, 10, 20 ],
						pager : '#searchCorporatePager',
						sortname : 'serviceName',
						viewrecords : true,
						sortorder : "desc",
						editable : true,
						sortable : true,
						height : '100%',
						paging : true,
						onSelectRow : function(row_id) {
							if (row_id != null) {
								row_selected = row_id;
							}
						},
						
						loadComplete : function(data) {
							// commonMessageBox('Information',  "Inside Loadcomplete");
							// console.log(data);
							// commonMessageBox('Information',  $('#searchCorporateGrid tr').length);
							if ($('#searchCorporateGrid tr').length <= 1) {
								$('#searchCorporatePager').text("");
								if (data.length == 0) {
									var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>No records available.</center></h3></td></tr>';
								} else {
									var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>'
											+ data.errorCode
											+ ':'
											+ data.errorMessage
											+ '.</center></h3></td></tr>';
								}
								$('#searchCorporateGrid').html(msg);
								return false;
							}
							
							
							
							
							
							
							//LO319925 : select row on radio select
							$('#searchCorporateGrid tr').find('input[type="radio"]').click(function(){
							  $('#searchCorporateGrid tr').find('input[type="radio"]').prop('checked',false);
							  $(this).prop('checked',true);
							  $('#searchCorporateGrid').jqGrid('setSelection',$(this).parents('tr').prop('id'));
							  var st = '';
							  $('#searchCorporateGrid input[type="radio"]:checked').each(function(){ 								 
								  st= $(this).closest('tr').find('td[aria-describedby="searchCorporateGrid_status"]').text();
							  });
							  if(st=='SAVED')
								{
									document.getElementById("enableCorporate").disabled = true;
									document.getElementById("disableCorporate").disabled = true;
									document.getElementById("deleteCorporate").disabled = false;
									document.getElementById("modifyCorporate").disabled = false;
										
								}
								if(st=='PUBLISHED')
								{
									document.getElementById("enableCorporate").disabled = true;
									document.getElementById("deleteCorporate").disabled = true;
									document.getElementById("disableCorporate").disabled = false;
									document.getElementById("modifyCorporate").disabled = false;
										
								}
								if(st=='DISABLED')
								{
									document.getElementById("modifyCorporate").disabled = true;
									document.getElementById("deleteCorporate").disabled = true;
									document.getElementById("disableCorporate").disabled = true;
									document.getElementById("enableCorporate").disabled = false;
										
								}
							  
								
							});
														
						},
						loadError : function(xhr) {
						}
					});
	
	
	$('#searchCorporateGrid').jqGrid('navGrid', '#searchCorporatePager', {
		edit : false,
		add : false,
		del : false,
		view : false,
		search : false,
		viewtext : "View",
		cloneToTop : true,
		excel:true,
		refresh:false
		
	},{}, {}, {}, {
		multipleSearch : true
	});
	//export to csv
	/*csvExportButton($("#searchCorporateGrid"), null, 'cims.searchCorporate.csv.name', 'Export To Csv', true, null,1,null,null,null,'#searchCorporatePager');
	
	$("#searchCorporateGrid").jqGrid('navButtonAdd', '#searchCorporatePager', {
		caption : "",
		buttonicon : "ui-icon-calculator",
		title : "choose columns",
		onClickButton : function() {
			$("#searchCorporateGrid").jqGrid('columnChooser');
		}
	});	
	*/
	
	
	//LO319925 : select radio on row select
	$("#searchCorporateGrid").bind("jqGridBeforeSelectRow", function (e, rowid, orgClickEvent) {
	    var tmp = $('#searchCorporateGrid tr[id="'+rowid+'"]');
	  /*  console.log(tmp);
	    console.log(tmp.find('input[type="radio"]'));*/
	    tmp.find('input[type="radio"]').prop('checked',true);

	    return e.result === false || e.result === "stop" ? false : true;
	});
}


jQuery(document)
		.ready(
				function() {

					$(document).on(
							'click',
							'#searchCorpBtn',
							function() {
								var userType=$('#userType').val();
								var corporateId = $('#bsCode').val();
								var corporateName = $('#corporateName').val();
								var corporateShortName = $(
										'#corporateShortName').val();
								var status = $('#status').val();
								var zone=$('#zone').val();
								var kamUser= $('#kamUser').val();
								var billShareFlag = $('#billShareFlag').val();
								var parentBSCode=$('#parentBSCode1').val();
								document.getElementById('enableCorporate').style.visibility = 'hidden';
								 document.getElementById('disableCorporate').style.visibility = 'hidden';
								 document.getElementById('deleteCorporate').style.visibility = 'hidden';
								 document.getElementById('modifyCorporate').style.visibility = 'hidden';
								 document.getElementById('viewCorporate').style.visibility = 'hidden';
								
								if(status=='')
									{
									document.getElementById("enableCorporate").disabled = true;
									document.getElementById("disableCorporate").disabled = true;
									document.getElementById("deleteCorporate").disabled = true;
									 document.getElementById('enableCorporate').style.visibility = 'hidden';
									 document.getElementById('disableCorporate').style.visibility = 'hidden';
									 document.getElementById('deleteCorporate').style.visibility = 'hidden';
									document.getElementById("modifyCorporate").disabled = false;
									 document.getElementById('modifyCorporate').style.visibility = 'visible';
									 document.getElementById('viewCorporate').style.visibility = 'visible';
									 
									 
									}
								if(status=='SAVED')
								{
									/*document.getElementById("enableCorporate").disabled = true;
									document.getElementById("disableCorporate").disabled = true;*/
									document.getElementById("deleteCorporate").disabled = false;
									document.getElementById("modifyCorporate").disabled = false;
									 document.getElementById('viewCorporate').style.visibility = 'visible';
									 document.getElementById('enableCorporate').style.visibility = 'hidden';
									 document.getElementById('disableCorporate').style.visibility = 'hidden';
									 if(userType=='EnterpriseAdmin' || userType=='EnterpriseActivationAgent')
										 {
										 document.getElementById('deleteCorporate').style.visibility = 'visible';
										 }
									 else
										 {
										 document.getElementById('deleteCorporate').style.visibility = 'hidden';
										 }
									 document.getElementById('modifyCorporate').style.visibility = 'visible';
										
								}
								if(status=='PUBLISHED')
								{
									/*document.getElementById("enableCorporate").disabled = true;
									document.getElementById("deleteCorporate").disabled = true;*/
									document.getElementById("disableCorporate").disabled = false;
									document.getElementById("modifyCorporate").disabled = false;
									document.getElementById('modifyCorporate').style.visibility = 'visible';
									document.getElementById('enableCorporate').style.visibility = 'hidden';
									 document.getElementById('deleteCorporate').style.visibility = 'hidden';
									 if(userType=='EnterpriseAdmin' || userType=='EnterpriseActivationAgent')
										 {
										 document.getElementById('disableCorporate').style.visibility = 'visible';
										 }
									 else
										 {
										 document.getElementById('disableCorporate').style.visibility = 'hidden';
										 }
									 document.getElementById('viewCorporate').style.visibility = 'visible';
									 
									 
									 
										
								}
								if(status=='DISABLED')
								{
									/*document.getElementById("modifyCorporate").disabled = true;
									document.getElementById("deleteCorporate").disabled = true;
									document.getElementById("disableCorporate").disabled = true;*/
									document.getElementById("enableCorporate").disabled = false;
									if(userType=='EnterpriseAdmin' || userType=='EnterpriseActivationAgent')
										{
										document.getElementById('enableCorporate').style.visibility = 'visible';
										}
									else
										{
										document.getElementById('enableCorporate').style.visibility = 'hidden';
										}
									document.getElementById('modifyCorporate').style.visibility = 'hidden';
									document.getElementById('disableCorporate').style.visibility = 'hidden';
									document.getElementById('deleteCorporate').style.visibility = 'hidden';
									document.getElementById('viewCorporate').style.visibility = 'visible';
										
								}

								if (corporateId != "" || corporateName != ""
										|| corporateShortName != ""
										|| status != "" 
											|| zone!=""
												|| kamUser!=""
													||parentBSCode!="") {
									searchCorporate(corporateId, corporateName,
											corporateShortName, status ,zone,kamUser,parentBSCode,billShareFlag);
									
									$("#corporateList").css({'display':'block'});
								} else {
									commonMessageBox('Information',  "Please fill search criteria");
								}
								// $('.popWrapper').hide();
								// commonMessageBox('Information',  "inside searchCorporate call");
								$('.listWrapper').show();

							});

					$(document)
							.on(
									'click',
									'#closeBtn',
									function() {

										var oldUrl = window.location.href;
										var contextPath = oldUrl.substr(0,
												oldUrl.indexOf('account'));
										window.location.href = "/cims/account/navigateSearchCorporate/";

									});
				});

function getCorporateInfo(corporateId) {
	if(typeof $("#addressColumns").val() != 'undefined')
		{
		addressDeatails();
		}
	
	var corpId = corporateId.substr(4);
	window.location.href = '/cims/account/fetchCorporateDetails?corporateId='
			+ corpId;
	addressDeatails();

}

$(function() {
	$(document).on('click', '#corporateDetailsClose', function() {
		$('#corporateDetailsWrapper').hide();
		$('#corporateDetails').hide();
	});
});

jQuery(document).ready(function() {

	$(document).on('click', '#closeBtn', function() {

		var oldUrl = window.location.href;
		var contextPath = oldUrl.substr(0, oldUrl.indexOf('account'));
		window.location.href = "/cims/account/navigateSearchCorporate/";

	});
});

$(function() {
	$(document).on('click', '#corporateDetailsClose', function() {
		$('#corporateDetailsWrapper').hide();
		$('#corporateDetails').hide();
	});
});

function createCorporateReset() {
	$('#corporateName1').val("");
	$('#corporateShortName1').val("");
	$('#parentBSCode').val("");
}

function resetSearchValues() {
	$('#searchCorporateId').val("");
	$('#searchCorporateName').val("");
	$('#searchCorporateShortName').val("");
	$('#searchCorporateStatus').val("");
	
	//corporate
	$('#corporateName1').val("");
	$('#corporateShortName1').val("");
	$('#parentBSCode').val("");
}

function showLoadingBox() {
	$('.loadingDiv').css("width", $('.manageCorporateId').width());
	$('.loadingDiv').css("height", $('.manageCorporateId').height());
	$('.loadingDiv').show();
}

function fadeOutMessageBox() {
	$('#corporateAlertBox').removeClass("alert-success");
	$('#corporateAlertBox').removeClass("alert-error");
	$('#corporateAlertBox').fadeOut(100);
}

/*
 * function numbersonly(e){ var unicode=e.charCode? e.charCode : e.keyCode; if
 * (unicode!=8){ //if the key isn't the backspace key (which we should allow) if
 * (unicode<48||unicode>57) //if not a number return false; //disable key press } }
 */

function checkValidation(currentId) {
	fadeOutMessageBox();
	validationStatus = 0;

	if (currentId == 'editCorporateSubmit'
			|| currentId == 'editCorporateUpdate'
			|| currentId == 'editCorporateSave'
			||currentId=='editCorporateCancel'	) {

		if ($.trim($('#corporateName').val()) == "") {
			commonMessageBox('Information',  "Corporate Name is mandatory");
			validationStatus = 1;
			return false;
		}

		if ($.trim($('#corporateShortName').val()) == "") {
			commonMessageBox('Information',  "Corporate Short Name is mandatory");
			validationStatus = 1;
			return false;
		}


		if ($.trim($('#dateOfAgreement1').val()) == "") {
			commonMessageBox('Information',  "Date Of Agreement is mandatory");
			validationStatus = 1;
			return false;
		}
		
		
		
		
		if ($.trim($('#dateOfExpiry1').val()) == "") {
			commonMessageBox('Information',  "Date Of Expiry is mandatory");
			validationStatus = 1;
			return false;
		}
		if ($.trim($('#agreementType').val()) == "") {
			commonMessageBox('Information',  "Agreement Type is mandatory");
			validationStatus = 1;
			return false;
		}
		
		if ($.trim($('#createdDate1').val()) == "") {
			commonMessageBox('Information',  "Corporate Creation Date is mandatory");
			validationStatus = 1;
			return false;
		}
		
		
		
		
		/*if ($.trim($('#bsCustomerClass').val()) == "") {
			commonMessageBox('Information',  " BS Customer Class is mandatory");
			validationStatus = 1;
			return false;
		}*/
		/*if ($.trim($('#bsCustomerStatus').val()) == "") {
			commonMessageBox('Information',  " BS Customer Status is mandatory");
			validationStatus = 1;
			return false;
		}*/
		/*if ($.trim($('#createdDate').val()) == "") {
			commonMessageBox('Information',  "Created Date  is mandatory");
			validationStatus = 1;
			return false;
		}*/
		/*if ($.trim($('#priority').val()) == "") {
			commonMessageBox('Information',  "Priority  is mandatory");
			validationStatus = 1;
			return false;
		}
		if ($.trim($('#noOfEmployees').val()) == "") {
			commonMessageBox('Information',  "Number Of Employess is mandatory");
			validationStatus = 1;
			return false;
		}*/
		if ($.trim($('#channel').val()) == "") {
			commonMessageBox('Information',  "Channel  is mandatory");
			validationStatus = 1;
			return false;
		}
		/*if ($.trim($('#typeOfBusiness').val()) == "") {
			commonMessageBox('Information',  "Type Of Business  is mandatory");
			validationStatus = 1;
			return false;
		}*/
		if ($.trim($('#subSegment').val()) == "") {
			commonMessageBox('Information',  "Sub-Segment  is mandatory");
			validationStatus = 1;
			return false;
		}
		/*if ($.trim($('#industry').val()) == "") {
			commonMessageBox('Information',  "Industry  is mandatory");
			validationStatus = 1;
			return false;
		}*/
		/*if ($.trim($('#sourceOfInformation').val()) == "") {
			commonMessageBox('Information',  "Source Of Information is mandatory");
			validationStatus = 1;
			return false;
		}*/
		
		if ($.trim($('#zone').val()) == "") {
			commonMessageBox('Information',  "Zone is mandatory");
			validationStatus = 1;
			return false;
			
			
		}
		if ($.trim($('#kamOwner').val()) == "") {
			commonMessageBox('Information',  "KAM Owner is mandatory");
			validationStatus = 1;
			return false;
		}
		if ($.trim($('#billCycle').val()) == "") {
			commonMessageBox('Information',  "Bill Cycle is mandatory");
			validationStatus = 1;
			return false;
		}
		/*if ($.trim($('#dateOfExpiry').val()) == "") {
			commonMessageBox('Information',  "Date of Expiry is mandatory");
			validationStatus = 1;
			return false;
		}
		if ($.trim($('#dateOfAgreement').val()) == "") {
			commonMessageBox('Information',  "Date of Agreement is mandatory");
			validationStatus = 1;
			return false;
		}*/
		/*if ($.trim($('#kamOwner').val()) == "") {
			commonMessageBox('Information',  "KAM Owner is mandatory");
			validationStatus = 1;
			return false;
		}
		if ($.trim($('#billCycle').val()) == "") {
			commonMessageBox('Information',  "Bill Cycle is mandatory");
			validationStatus = 1;
			return false;
		}*/
		/*if ($.trim($('#slabID').val()) == "") {
			commonMessageBox('Information',  "Slab ID is mandatory");
			validationStatus = 1;
			return false;
		}
		*/
		
		
		
		
		
		

		/*
		 * else { var x = $.trim($('#editEmail').val()); var atpos =
		 * x.indexOf("@"); var dotpos = x.lastIndexOf("."); if (atpos< 1 ||
		 * dotpos<atpos+2 || dotpos+2>=x.length) {
		 * $('#errorEmail').text("Invalid Email Id"); validationStatus = 1; } }
		 */

		/*
		 * if($.trim($('#editContNo').val())=="") {
		 * $('#errorContactNumber').text("Contact Number is mandatory");
		 * validationStatus = 1; } else { var regEx = new RegExp(/\d{10,10}/);
		 * var containsTenDigitOnly =
		 * regEx.test($.trim($('#editContNo').val()));
		 * if(!containsTenDigitOnly){ $('#errorContactNumber').text("Number can
		 * be 10 digits only."); validationStatus = 1; } }
		 * 
		 * if($.trim($('#editAddress').val())=="") {
		 * $('#errorAddress').text("Address is mandatory"); validationStatus =
		 * 1; }
		 * 
		 * if($.trim($('#editDistrict').val())=="") {
		 * $('#errorDistrict').text("District is mandatory"); validationStatus =
		 * 1; }
		 * 
		 * if($.trim($('#editCity').val())=="") { $('#errorCity').text("City is
		 * mandatory"); validationStatus = 1; }
		 * 
		 * if($.trim($('#editState').val())=="") { $('#errorState').text("State
		 * is mandatory"); validationStatus = 1; }
		 * 
		 * if($.trim($('#editBillCycle').val())=="") {
		 * $('#errorBillCycle').text("Bill Cycle is mandatory");
		 * validationStatus = 1; }
		 * 
		 * if(currentId=='editCorporateSubmit') {
		 * if($.trim($('#editCreditLimitSaved').val())=="") {
		 * $('#errorCreditLimitSaved').text("Credit Limit is mandatory");
		 * validationStatus = 1; } else { var regEx =
		 * /^([0-9]{1,10})(\.\d{1,2})?$/; var containsNonNumeric =
		 * regEx.test($.trim($('#editCreditLimitSaved').val()));
		 * if(!containsNonNumeric){ $('#errorCreditLimitSaved').text("Positive
		 * number with 2 decimal value"); validationStatus = 1; } } }
		 */

	} else if (currentId == 'creditLimitUpdate') {
		if ($.trim($('#editCreditLimit').val()) == "") {
			$('#errorCreditLimit').text("Credit Limit is mandatory");
			validationStatus = 1;
		} else {
			var regEx = new RegExp(/^([0-9]{1,10})(\.\d{1,2})?$/);
			var containsNonNumeric = regEx.test($.trim($('#editCreditLimit')
					.val()));
			if (!containsNonNumeric) {
				$('#errorCreditLimit').text(
						"Positive number with 2 decimal value");
				validationStatus = 1;
			}
		}
	} else if (currentId == 'editCorporateSave') {

		if ($.trim($('#editCreditLimitSaved').val()) == "") {
			$('#errorState').text("");
		} else {
			var regEx = /^([0-9]{1,10})(\.\d{1,2})?$/;
			var containsNonNumeric = regEx.test($.trim($(
					'#editCreditLimitSaved').val()));
			if (!containsNonNumeric) {
				$('#errorCreditLimitSaved').text(
						"Positive number with 2 decimal value");
				validationStatus = 1;
			}
		}

		if ($.trim($('#editContNo').val()) == "") {
			$('#errorContactNumber').text("");
		} /*
		 * else { var regEx = new RegExp(/\d{10,10}/); var
		 * containsTenDigitOnly =
		 * regEx.test($.trim($('#editContNo').val()));
		 * if(!containsTenDigitOnly){ $('#errorContactNumber').text("Number
		 * can be 10 digits only."); validationStatus = 1; } }
		 */

		if ($.trim($('#editEmail').val()) == "") {
			$('#errorEmail').text("");
		} else {
			var x = $.trim($('#editEmail').val());
			var atpos = x.indexOf("@");
			var dotpos = x.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
				$('#errorEmail').text("Invalid Email Id");
				validationStatus = 1;
			}
		}

	}

}

function listCorporate() {
	resetSearchValues();
	createCorporateReset();
	showLoadingBox();
	$("#editCorporateId").attr('disabled', 'disabled');
	$('#deleteCorporateId').attr('disabled', 'disabled');
	$('#enableCorporateId').attr('disabled', 'disabled');
	$("#disableCorporateId").attr('disabled', 'disabled');

	var gridWidth = $('.tabContent').width() / 5;
	var pCode = $('#partCode').val();
	var listCorporateColNames = listCorporateGridGetNames();

	$("#listCorporateGrid").jqGrid('GridUnload');
	$("#listCorporateGrid")
			.jqGrid(
					{
						url : 'getCorporateList?partnerCode=' + pCode,
						datatype : 'json',
						colNames : listCorporateColNames,
						colModel : [
								{
									name : '',
									label : '',
									width : 50,
									align : 'center',
									formatter : function radio(cellValue,
											option) {
										return '<input type="radio" class="chk" name="radio_'
												+ option.gid + '"   />';
									}
								}, {
									name : 'corporateId',
									index : 'corporateId',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false,
									formatter : 'showlink',
									formatoptions : {
										baseLinkUrl : 'javascript:',
										showAction : "getCorporateInfo('",
										addParam : "');"
									}
								}, {
									name : 'corporateName',
									index : 'corporateName',
									key : true,
									align : 'center',
									width : gridWidth + gridWidth - 80,
									editable : false
								}, {
									name : 'corporateShortName',
									index : 'corporateShortName',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false
								}, {
									name : 'status',
									index : 'status',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false
								} ],
						gridview : true,
						toolbar : [ false, "bottom" ],
						rowNum : 10,
						loadonce : true,
						rowList : [ 5, 10, 20 ],
						pager : '#listCorporatePager',
						viewrecords : true,
						sortable : true,
						editable : true,
						height : '100%',
						paging : true,
						loadComplete : function(Data) {
							$('.loadingDiv').hide();
							$
									.each(
											Data,
											function(i, item) {
												if (item.faultstring) {
													var msg = '<tr><td colspan="2" align = "center" >'
															+ item.faultstring
															+ '</td></tr>';
													$('#listCorporatePager')
															.text("");
													$('#listCorporateGrid')
															.html(msg);
													return false;
												}
											});

							if ($('.listCorporateTab:visible').length > 0) {
								if ($('#listCorporateGrid tr').length <= 1) {
									var msg = '<tr><td style="border: none; overflow: hidden; text-align: center; padding: 13px 5px;" colspan="2">No Records Available.</td></tr>';
									$('#listCorporatePager').text("");
									$('#listCorporateGrid').html(msg);
									return false;
								}
							}

						},
						loadError : function(data) {
							if ($('.listCorporateTab:visible').length > 0) {
								if ($('#listCorporateGrid tr').length <= 1) {
									var msg = '<tr><td style="border: none; overflow: hidden; text-align: center; padding: 13px 5px;" colspan="2">No Records Available.</td></tr>';
									$('#listCorporatePager').text("");
									$('#listCorporateGrid').html(msg);
								}
							}
							/*
							 * $('#corporateAlertBox').find('p').text("Unable to
							 * Fetch Records. Please try again.");
							 * $('#corporateAlertBox').addClass("alert-error");
							 */
							$('.loadingDiv').hide();
							/* $('#corporateAlertBox').fadeIn(500); */
							commonMessageBox('Information',  "Unable to Fetch Records. Please try again.");
						}
					});
}

function searchCorporateByPartner() {
	// fadeOutMessageBox();
	showLoadingBox();
	$("#editCorporateId").attr('disabled', 'disabled');
	$('#deleteCorporateId').attr('disabled', 'disabled');
	$('#enableCorporateId').attr('disabled', 'disabled');
	$("#disableCorporateId").attr('disabled', 'disabled');

	var corporateId = $('#searchCorporateId').val();
	var corporateName = $('#searchCorporateName').val();
	var corporateShortName = $('#searchCorporateShortName').val();
	var status = $('#searchCorporateStatus').val();
	var partnerCode = $('#partCode').val();

	var gridWidth = $('.tabContent').width() / 5;
	var listCorporateColNames = listCorporateGridGetNames();

	$("#listCorporateGrid").jqGrid('GridUnload');
	$("#listCorporateGrid")
			.jqGrid(
					{
						url : 'searchCorporateByPartner?corporateId='
								+ corporateId + '&corporateName='
								+ corporateName + '&corporateShortName='
								+ corporateShortName + '&status=' + status
								+ '&partnerCode=' + partnerCode,
						datatype : 'json',
						colNames : listCorporateColNames,
						colModel : [
								{
									name : '',
									label : '',
									width : 50,
									align : 'center',
									formatter : function radio(cellValue,
											option) {
										return '<input type="radio" class="chk" name="radio_'
												+ option.gid + '"   />';
									}
								}, {
									name : 'corporateId',
									index : 'corporateId',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false,
									formatter : 'showlink',
									formatoptions : {
										baseLinkUrl : 'javascript:',
										showAction : "getCorporateInfo('",
										addParam : "');"
									}
								}, {
									name : 'corporateName',
									index : 'corporateName',
									key : true,
									align : 'center',
									width : gridWidth + gridWidth - 80,
									editable : false
								}, {
									name : 'corporateShortName',
									index : 'corporateShortName',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false
								}, {
									name : 'status',
									index : 'status',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false
								} ],
						gridview : true,
						toolbar : [ false, "bottom" ],
						rowNum : 10,
						loadonce : true,
						rowList : [ 5, 10, 20 ],
						pager : '#listCorporatePager',
						viewrecords : true,
						sortable : true,
						editable : true,
						height : '100%',
						paging : true,
						loadComplete : function(Data) {
							resetSearchValues();
							createCorporateReset();
							$('.loadingDiv').hide();
							// $('#gbox_listCorporateGrid').find('.ui-jqgrid-hdiv').css("line-height","15px");
							$
									.each(
											Data,
											function(i, item) {
												if (item.faultstring) {
													var msg = '<tr><td colspan="2" align = "center" >'
															+ item.faultstring
															+ '</td></tr>';
													$('#listCorporatePager')
															.text("");
													$('#listCorporateGrid')
															.html(msg);
													return false;
												}
											});

							if ($('.listCorporateTab:visible').length > 0) {
								if ($('#listCorporateGrid tr').length <= 1) {
									var msg = '<tr><td style="border: none; overflow: hidden; text-align: center; padding: 13px 5px;" colspan="2">No Records Available.</td></tr>';
									$('#listCorporatePager').text("");
									$('#listCorporateGrid').html(msg);
									return false;
								}
							}

						},
						loadError : function(data) {
							resetSearchValues();
							createCorporateReset();
							// $('#gbox_listCorporateGrid').find('.ui-jqgrid-hdiv').css("line-height","15px");
							if ($('.listCorporateTab:visible').length > 0) {
								if ($('#listCorporateGrid tr').length <= 1) {
									var msg = '<tr><td style="border: none; overflow: hidden; text-align: center; padding: 13px 5px;" colspan="2">No Records Available.</td></tr>';
									$('#listCorporatePager').text("");
									$('#listCorporateGrid').html(msg);
								}
							}
							/*
							 * $('#corporateAlertBox').find('p').text("Unable to
							 * Fetch Records. Please try again.");
							 * $('#corporateAlertBox').addClass("alert-error");
							 */
							$('.loadingDiv').hide();
							// $('#corporateAlertBox').fadeIn(500);
							commonMessageBox('Information',  "Unable to Fetch Records. Please try again.");
						}

					});

}

function saveOrPublishCorporateDetails(currentId) {
	// resetSearchValues();
	// createCorporateReset();
	// fadeOutMessageBox();

	if (currentId == "editCorporateSubmit") {
		$('#hiddenStatus').val("PUBLISHED");
		urlVal = "/cims/account/modifyCorporate";
	} else if (currentId == "editCorporateSave") {
		$('#hiddenStatus').val("SAVED");
		urlVal = "/cims/account/modifyCorporate";
	}
	 else if (currentId == "editCorporateCancel") {
		 $('#hiddenStatus').val("PUBLISHED");
		 $('#updateStatus').val("UPDATED");
		 
			urlVal = "/cims/account/modifyCorporate";
		}
	var data = $('#createCorporateForm').serialize();
	showLoadingBox();

	$
			.ajax({

				url : urlVal,
				type : "POST",
				data : data,
				success : function(response) {
					/*
					 * $('#corporateAlertBox').find('p').text("");
					 * $('#corporateAlertBox').find('p').text(data.message);
					 */
					var data = $.parseJSON(response);
					if (data.status == "Success") {
						$('.loadingDiv').hide();
						$('#manageCorporateId').click();
						
						
						//window.location.href = "/cims/account/navigateSearchCorporate/";
							
						/*
						 * $('#corporateAlertBox').removeClass("alert-error");
						 * $('#corporateAlertBox').addClass("alert-success");
						 * $('#corporateAlertBox').fadeIn(500);
						 */
					} else if (data.status == "error") {
						/*
						 * $('#corporateAlertBox').removeClass("alert-success");
						 * $('#corporateAlertBox').addClass("alert-error");
						 */
						$('.loadingDiv').hide();
						/* $('#corporateAlertBox').fadeIn(500); */
					} else if (data.status == "info") {
						$('.loadingDiv').hide();
						$('#manageCorporateId').click();
						/*
						 * $('#corporateAlertBox').removeClass("alert-error");
						 * $('#corporateAlertBox').removeClass("alert-success");
						 * $('#corporateAlertBox').fadeIn(500);
						 */
					}
					var bsCode=data.bsCode;
					$('#status').val($('#hiddenStatus').val());
					$('#bsCode').val(bsCode);
					if($('#hiddenStatus').val()=='PUBLISHED') {
						  $('#editCorporateSubmit').prop('disabled',true);
						  $('#editCorporateSave').prop('disabled',true);
						  $('#editCorporateCancel').prop('enabled',true);
						  
						  
						}
					
					commonMessageBox('Information',  data.message);
					if(data.corporateID==undefined && data.corporateID=="" )
						{
						
						}
					else
						{
						if(data.status == "Success")
							{
					window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ data.corporateID;
						}}
					
					
				},
				error : function(data) {
					/*
					 * $('#corporateAlertBox').find('p').text("Unable to publish
					 * data to CBS. Please try after some time.");
					 * $('#corporateAlertBox').addClass("alert-error");
					 */
					$('.loadingDiv').hide();
					/* $('#corporateAlertBox').fadeIn(500); */
					if (currentId == "editCorporateSubmit") {
						commonMessageBox('Information',  "Unable to publish data to CBS. Please try after some time.");
					} else if (currentId == "editCorporateSave") {
						commonMessageBox('Information',  "Unable to update data. Please try again.");
					}
				}
			});
}

function updateCorporateDetails() {
	resetSearchValues();
	createCorporateReset();
	// fadeOutMessageBox();

	var corporateId = $('#editCorpId').val();
	var corporateName = $('#editCorpName').val();
	var corporateShortName = $('#editCorpShortName').val();
	var status = $('#editStatus').val();
	var firstName = $('#editFirstName').val();
	var contactNo = $('#editContNo').val();
	var email = $('#editEmail').val();
	var address = $('#editAddress').val();
	var district = $('#editDistrict').val();
	var landMark = $('#editLandmark').val();
	var city = $('#editCity').val();
	var state = $('#editState').val();
	var billCycle = $('#editBillCycle').val();
	var contractDuration = $('#editContractDuration').val();
	var regDate = $('#regDatepicker').val();
	var userId = $("#sessionUserId").val();
	var partnerCode = $('#partCode').val();
	var acntSubId = $('#accountSubsId').val();

	showLoadingBox();

	$.ajax({

		url : "updateCorporateDetails",
		type : "POST",
		datatype : "json",
		data : {
			corporateId : corporateId,
			corporateName : corporateName,
			corporateShortName : corporateShortName,
			status : status,
			firstName : firstName,
			contactNumber : contactNo,
			email : email,
			address : address,
			district : district,
			landMark : landMark,
			cityTown : city,
			state : state,
			billCycle : billCycle,
			contractDuration : contractDuration,
			registrationDate : regDate,
			userId : userId,
			partnerCode : partnerCode,
			acntSubId : acntSubId
		},
		success : function(data) {
			/*
			 * $('#corporateAlertBox').find('p').text("");
			 * $('#corporateAlertBox').find('p').text(data.message);
			 */
			if (data.status == "success") {
				$('.loadingDiv').hide();
				$('#manageCorporateId').click();
				/*
				 * $('#corporateAlertBox').removeClass("alert-error");
				 * $('#corporateAlertBox').addClass("alert-success");
				 * $('#corporateAlertBox').fadeIn(500);
				 */
			} else if (data.status == "error") {
				/*
				 * $('#corporateAlertBox').removeClass("alert-success");
				 * $('#corporateAlertBox').addClass("alert-error");
				 */
				$('.loadingDiv').hide();
				/* $('#corporateAlertBox').fadeIn(500); */
			} else if (data.status == "info") {
				$('.loadingDiv').hide();
				$('#manageCorporateId').click();
				/*
				 * $('#corporateAlertBox').removeClass("alert-error");
				 * $('#corporateAlertBox').removeClass("alert-success");
				 * $('#corporateAlertBox').fadeIn(500);
				 */
			}
			commonMessageBox('Information',  data.message);
		},
		error : function(data) {
			/*
			 * $('#corporateAlertBox').find('p').text("Unable to update data to
			 * CBS. Please try after some time.");
			 */
			/* $('#corporateAlertBox').find('p').text(data.message); */
			/* $('#corporateAlertBox').addClass("alert-error"); */
			$('.loadingDiv').hide();
			/* $('#corporateAlertBox').fadeIn(500); */
			commonMessageBox('Information',  "Unable to update data to CBS. Please try after some time.");
		}
	});

}

function createCorporateSave() {

	// fadeOutMessageBox();

	if ($.trim($('#corporateName1').val()) == "") {
		commonMessageBox('Information',  "Kindly enter the value of Corporate Name");
		return false;
	}
	if ($.trim($('#corporateShortName1').val()) == "") {
		commonMessageBox('Information',  "Kindly enter the value of Corporate short name");
		return false;
	}
	
	if ( $("#ChildCorporate").is(":checked") ) {
		
		if ($.trim($('#parentBSCode').val()) == "") {
			commonMessageBox('Information',  "Kindly enter the value of Parent BS Code");
			return false;
		}
		
		   //chk3
		// added the below condition for COIP CR
		if($('#corporateTypeId1').val()== "" || $('#corporateTypeId1').val()== null ){
			commonMessageBox('Information',  "Kindly select the Corporate Type");
			return false;
		}
		}

	
	
	showLoadingBox();

	var corporateName = $('#corporateName1').val();
	var corporateShortName = $('#corporateShortName1').val();
	var parentBSCode = $('#parentBSCode').val();
	var corporatTypeId = $('#corporateTypeId1').val();
	
	// var userId = $("#sessionUserId").val();
	// var acntSubId = $('#accountSubsId').val();

	$.ajax({
		// added corporateTypeId for COIP CR
		url : "../createCorporate?corporateName=" + corporateName
				+ "&corporateShortName=" + corporateShortName
				+ "&parentBSCode=" + parentBSCode
				+ "&corporatTypeId=" + corporatTypeId,
		type : "POST",
		datatype : "json",
		success : function(data) {
			// $('#corporateAlertBox').find('p').text("");
			// $('#corporateAlertBox').find('p').text(data.message);

			if (data.status == "success") {
				/*
				 * $('#corporateAlertBox').removeClass("alert-error");
				 * $('#corporateAlertBox').addClass("alert-success");
				 */
				$('.loadingDiv').hide();
				resetSearchValues();
				createCorporateReset();
				// $('#corporateAlertBox').fadeIn(500);
				listCorporate();
			} else if (data.status == "error") {
				/*
				 * $('#corporateAlertBox').removeClass("alert-success");
				 * $('#corporateAlertBox').addClass("alert-error");
				 */
				$('.loadingDiv').hide();
				resetSearchValues();
				// $('#corporateAlertBox').fadeIn(500);
			} else if (data.status == "info") {
				/*
				 * $('#corporateAlertBox').removeClass("alert-error");
				 * $('#corporateAlertBox').removeClass("alert-success");
				 */
				$('.loadingDiv').hide();
				$('#manageCorporateId').click();
				resetSearchValues();
				/* $('#corporateAlertBox').fadeIn(500); */
			}
			commonMessageBox('Information',  data.message);
			if(data.corporateID==undefined && data.corporateID==null)
				{
				resetSearchValues();
				}
			else
				{
				window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ data.corporateID;
				}
			

		},
		error : function(data) {
			// $('#corporateAlertBox').find('p').text("Unable to create
			// Corporate. Please try again.");
			/* $('#corporateAlertBox').find('p').text(data.message); */
			// $('#corporateAlertBox').addClass("alert-error");
			$('.loadingDiv').hide();
			// $('#corporateAlertBox').fadeIn(500);
			resetSearchValues();
			commonMessageBox('Information',  "Unable to create Corporate. Please try again.");
		},
		complete: function(){
			resetSearchValues();
			createCorporateReset();
		}
	});
}
$(function() {
	$(document).on('click', '#address', function() {
		
	
		addressDeatails();
		
	});
});

$('#addressGrid_ilsave').unbind('click').click(function(){
	// SAVE ADDRESS
	
	var rowData = $("#addressGrid").jqGrid("getGridParam", "data");
	var types = $.map(rowData , function (item) { return item.contactType; });

	if(types.indexOf("Legal")>-1 && $("#addressGrid tr").find('select').val()=="Legal") {
	  commonMessageBox('Information',  'Legal Address Already Exist');
	  return false;
	} else {
		
		var row = $("#addressGrid tr").eq(1);
		var contactType = row.find('td[aria-describedby="addressGrid_contactType"] select').val();
		var address1 = row.find('td[aria-describedby="addressGrid_address1"] input').val();
		var address2 = row.find('td[aria-describedby="addressGrid_address2"] input').val();
		var distt = row.find('td[aria-describedby="addressGrid_district"] input').text();
		var city = row.find('td[aria-describedby="addressGrid_cityTown"] input').val();
		var zip = row.find('td[aria-describedby="addressGrid_zip"] input').val();
		var contact = row.find('td[aria-describedby="addressGrid_contactNumber"] input').val();
		var fax = row.find('td[aria-describedby="addressGrid_fax"] input').val();
		
		var dataObj = {
			'contactType': contactType,
			'address1' : address1,
			'address2' : address2,
			'district' : distt,
			'cityTown' : city,
			'zip' : zip,
			'contactNumber' : contact,
			'fax' : fax
		};
		
		$.ajax({
			url: '../account/createAddress?corporateId=' + $('#corporateId').val(),
			contentType : "application/json",
			dataType : "json",
			type : "POST",
			data: dataObj,
			success: function(res){
			    commonMessageBox('Information',  res);
			}
		});
	}
	// SAVE END
	
});
$(function() {
	$(document).on('click', '#contact', function() {
		contactDeatails();
		
		
	});
});
$(function() {
	$(document).on('click', '#bsHierachy', function() {
		
		bsHierachy();
		

	});
});
$(function() {
	$(document).on('click', '#auditTrail', function() {
		audittrail();
		
	});
});
$(function() {
	$(document).on('click', '#subscriber', function() {

	});
});
$(function() {
	$(document).on('click', '#attachment', function() {
		attachments();
		availableDocuments();
	});
	
});



function auditTrailGetNames() {
	return ($("#auditTrailColumns").val()).split(",");
}

function audittrail() {

	/* TODO TnM Start by Guru */
	var grid = $("#AuditList");
	var auditTrailColNames = auditTrailGetNames();
	/* TODO TnM END */
	// This array is used if you want to have static data
	$(".contact").hide();
	$(".bsHierachy").hide();
	$(".address").hide();
	$(".auditTrail").show();
	$('.attachment').hide();
	var srType = "";
	
	var link = window.location.href;
	var srDataField = link.substring(link.indexOf('corporateId=')+'corporateId='.length)
	//grid.jqGrid('GridUnload');
	grid
			.jqGrid(
					{
						url : "../account/viewAuditTrailCorporate?srData="
								+ srDataField + "&msisdn=" + $("#acntId").val()
								+ "&srType=" + srType,
						datatype : 'json',

						colNames : auditTrailColNames,
						/* TODO TnM END */
						colModel : [ {
							name : 'modifiedBy',
							index : 'modifiedBy',
							width : 200,
							sortable : true

						}, {
							name : 'fieldName',
							index : 'fieldName',
						width : 174,
						}, {
							
							name : 'recordId',
							index : 'recordId',
							width : 202,
							formatter: function myformatter ( cellvalue, options, rowObject ) {
								return "Modify";
							}

							
						}, {
							name : 'oldValue',
							index : 'oldValue',
							width : 182,
						}, {
							name : 'newValue',
							index : 'newValue',
							width : 203,
						}, {
							name : 'createdDt',
							index : 'createdDt',
							width : 173,
							editable : true
						}, {
							name : 'objectName',
							index : 'objectName',
							width : 148,
						} ],
						rowNum : 5,
						rowList : [ 5, 10, 20 ],
						pager : '#AuditPager',
						/*loadComplete : function(Data) {
							
							
							if(Data.length == 0){
								var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>No Records Available.</center></h3></td></tr>';
								$('#AuditList').html(msg);
								return false;
								}
							
							if ($('#AuditList tr').length != 0) {
								var ids = $("#AuditList").jqGrid('getDataIDs');
								$("#" + ids[0]).find('td').eq('3').html(
										'Modify');
								for ( var i = 1; i < ids.length; i++) {
									var rowData = jQuery('#AuditList').jqGrid(
											'getRowData', ids[i]);
									if (rowData.oldValue != rowData.newValue) {
										$("#" + ids[i]).find('td').eq('3')
												.html('Modify');
									}

								}
							}
							
							
						},*/
						toppager : false,
						gridview : true,
						rownumbers : true,
						ignoreCase : true,
						viewrecords : true,
						sortorder : "desc",
						height : "100%",
						// editurl : '/cim_main/CimSrAddActivity.htm',
						ajaxRowOptions : {
							contentType : "application/json",
							dataType : "json",
							type : "PUT"
						},
						serializeRowData : function(data) {
							return JSON.stringify(data);
						},
						loadonce : true,
						sortable : true,

						onSelectRow : function(rowid, status, e) {
							if (rowid && rowid !== lastSel) {
								jQuery('#gridid').restoreRow(lastSel);
								lastSel = rowid;
							}
							jQuery('#gridid').editRow(rowid, true);

						},
						beforeSelectRow : function(rowid) {

							if (rowid !== lastSel) {
								$(this).jqGrid('restoreRow', lastSel);
								lastSel = rowid;
							}
							return true;
						},
						loadComplete: function(data){
							
							$('#gview_AuditList .ui-jqgrid-labels > th').css({'width': '120px', 'box-sizing':'border-box'});
							$('#AuditList > tbody > tr > td').css({'width': '120px', 'box-sizing':'border-box'});
							
							if ($('#AuditList tr').length <= 1) {
								$('#AuditPager').html("");
								var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>'
									+ data.errorMessage
									+ '.</center></h3></td></tr>';
								if (data.length == 0) {
									msg = '<tr><td colspan="4"><h3 class="errMsg"><center>No Records Available.</center></h3></td></tr>';
								}
								$('#AuditList tbody').html(msg);
								window.scrollTo(0,document.body.scrollHeight);
								return false;
							}
							
							//
							window.scrollTo(0,document.body.scrollHeight);						
						}
						
						
					}).jqGrid('navGrid', '#AuditPager', {
				edit : false,
				add : false,
				del : false,
				view : false,
				search : false,
				viewtext : "View",
				cloneToTop : false,
				refreshstate : 'current',
				closeOnEscape : true
			}, {}, {}, {}, {
				multipleSearch : true
			});
	//Hiding unnecessay button from audittrail table
	$('[id="refresh_AuditList"]').hide();

}

function attachments() {
	$(".contact").hide();
	$(".bsHierachy").hide();
	$(".address").hide();
	$(".auditTrail").hide();
	$('.attachment').show();
	$('#attachemntDocId').show();
}

/*function createContactGetNames() {
	return ($("#createContactColumns").val()).split(",");
}*/

/*function createAddressGetNames() {
	return ($("#addressColumns").val().split(","));
	
}*/

function contactDeatails() {
	$(".auditTrail").hide();
	$(".contact").show();
	$(".bsHierachy").hide();
	$('.attachment').hide();
	$(".address").hide();
	// TODO TnM Start by Guru
	var createSrColNames = $("#createContactColumns").val().split(",");
	// TODO TnM END
	$('#contactList').jqGrid('GridUnload');
	var lastSel = 0;
	$("#contactList").jqGrid(
			{
				url : "../account/contactDetails?corporateId="
						+ $('#corporateId').val(),
				datatype : 'json',

				colNames : createSrColNames,
				// TODO TnM END
				colModel : [
				            {
					name : 'radio',
					index : 'radio',
					editable : false,
					//align : 'center',
					sortable : false,
					//width : 25,
					formatter : function(cellValue,option,rowObject) 
					{
						return '<input class="radioBar small"  id="radioContact'+option.rowId+'" type="radio" name="radioBar" value="" />';
					}
				},{
					name : 'contactId',
					index : 'contactId',
					editable : false,
					//width : 25,
					hidden : true,
					key:true,
					align: 'center',
				}, {
					name : 'contactType',
					index : 'contactType',
					align: 'center',
					editable : true,
					edittype : "select",
					//width:180,
					editoptions : {
						value:{Primary_KCP :'Primary KCP ',Additional_KCP:'Additional KCP',KDM:'KDM',CFO:'CFO',My_GP_Ent_KCP:'My GP Ent KCP'}
						},
					
					editrules : {
						required : true
					},
				}, {
					name : 'firstName',
					align: 'center',
					index : 'firstName',
					// width : 100,
					/*editrules:{custom:true, custom_func:function(value){
						console.log(value);
					}},*/
					editable : true,
					/*formatter : function(cellValue,option,rowObject) 
					{
						return ' <input type="text" onkeypress="return alphaInput(event)">';
					}*/
					
				}, {
					name : 'lastName',
					index : 'lastName',
					align: 'center',
					// width : 70,
					editable : true,
					editrules : {
						required : true
					}
				}, {
					name : 'workPhone',
					index : 'workPhone',
					align: 'center',
					// width : 80,
					editable : true,
					//editrules: {custom: true, custom_func: function(){alert('dfdasdf')}}
					
				}, {
					name : 'email',
					index : 'email',
					align: 'center',
					// width : 80,
					editable : true,
					editrules : {
						required : true
					}
				}, {
					name : 'email1',
					index : 'email1',
					align: 'center',
					// width : 120,
					editable : true
				}, {
					name : 'email2',
					index : 'email2',
					align: 'center',
					// width : 120,
					editable : true
				},
				{
					name : 'nid',
					index : 'nid',
					align: 'center',
					// width : 120,
					editable : true
				},
				{
					name : 'dob',
					index : 'dob',
					align: 'center',
					// width : 120,
					editable : true,
					//formatter:'date',
					editable : true,
					editoptions:{
						  size:20, 
		                  dataInit:function(el){ 
		                        $(el).datepicker({maxDate:new Date(), changeMonth: true, changeYear: true,yearRange: "-100:+0"}); 
		                  }, 
		                  
		                } 
				},
				{
					name : 'gpContactNumber',
					index : 'gpContactNumber',
					align: 'center',
					
					editable : true,
					//formatter: checkCopy,
					
					
					
				},
				{
					name : 'otpReceived',
					index : 'otpReceived',
					align: 'center',
					// width : 120,
				},
				{
					name : 'otpReceivedDateTime',
					index : 'otpReceivedDateTime',
					align: 'center',
					// width : 120,
				},
				{ 
					 name: 'biometricVerified', index: 'biometricVerified', 
					 edittype: 'checkbox', editoptions: { value: "True:False" }, 
					 formatter: "checkbox", formatoptions: { disabled: true} 
					},
					{ 
						 name: 'biometricVerifiedDate', index: 'biometricVerifiedDate', 
						 align: 'center',
						}
				],
				toolbar : [ false, "bottom" ],
				rowNum : 5,
				rowList : [ 5, 10, 20 ],				
				toppager : true,
				gridview : true,
				pager:"#contactPager",
				postData : "",
				rownumbers : true,
				ignoreCase : true,
				rownumbers : false,
				loadonce : true,
				// sortname : 'statusIdentifier',
				viewrecords : true,
				// sortorder : "asc",
				paging : true,
				height : "100%",
				editurl : '../account/createContact?corporateId='
						+ $('#corporateId').val()+'&parentBsCode='+$('#parentCompanyName').val()+'&bsCode='+$('#bsCode').val(),
				ajaxRowOptions : {
					beforeSend: function () {
						var rowData = $("#contactList").jqGrid("getGridParam", "data");
						//var types = $.map(rowData , function (item) { return item.contactType; });
						var types = $.map(rowData , function (item) { rowId = item.contactId; return item.contactType; });
						
						var rowId = {};
						var types = $.map(rowData , function (item) {  
							rowId[item.contactType] = item.contactId;
							return item.contactType; 
						});
						var curRowId = $("#contactList tr").find('select').parents('tr').attr('id');	
						
						
						
						if(types.indexOf("Primary_KCP")>-1 && $("#contactList tr").find('select').val()=="Primary_KCP" && curRowId != rowId.Primary_KCP) {
						  commonMessageBox('Information',  'Primary KCP Already Exist');
						  return false;
						}
						else if(types.indexOf("KCP2")>-1 && $("#contactList tr").find('select').val()=="KCP2" && curRowId != rowId.KCP2) {
							  commonMessageBox('Information',  'Contact KCP2 Already Exist');
							  return false;
							}
						else if(types.indexOf("KCP3")>-1 && $("#contactList tr").find('select').val()=="KCP3" && curRowId != rowId.KCP3) {
							  commonMessageBox('Information',  'Contact KCP3 Already Exist');
							  return false;
							}
						
						else if(types.indexOf("KCP4")>-1 && $("#contactList tr").find('select').val()=="KCP4" && curRowId != rowId.KCP4) {
							  commonMessageBox('Information',  'Contact KCP4 Already Exist');
							  return false;
							}
						else if(types.indexOf("KCP5")>-1 && $("#contactList tr").find('select').val()=="KCP5" && curRowId != rowId.KCP5) {
							  commonMessageBox('Information',  'Contact KCP5 Already Exist');
							  return false;
							}
						else if(types.indexOf("KDM")>-1 && $("#contactList tr").find('select').val()=="KDM" && curRowId != rowId.KDM) {
							  commonMessageBox('Information',  'Contact KDM Already Exist');
							  return false;
							}
						
						else if(types.indexOf("CFO")>-1 && $("#contactList tr").find('select').val()=="CFO" && curRowId != rowId.CFO) {
							  commonMessageBox('Information',  'Contact CFO Already Exist');
							  return false;
							}
						
			        },
					contentType : "application/json",
					dataType : "json",
					type : "POST"
				},
				serializeRowData : function(data) {
					var myGrid = $('#contactList');
					var selectedRowId = myGrid.jqGrid ('getGridParam', 'selrow');
					var biometricVerified = myGrid.jqGrid ('getCell', selectedRowId, 'biometricVerified');
					
					
					if(biometricVerified.toLowerCase() == 'true') {
						data['biometricVerified'] = 'Y';
					}
					  
					return JSON.stringify(data);
				},
				emptyrecords : "",
				/*
				 * resizeStop: function () { var $self = $(this), shrinkToFit =
				 * $self.jqGrid("getGridParam", "shrinkToFit");
				 * $self.jqGrid("setGridWidth", this.grid.newWidth,
				 * shrinkToFit); },
				 */
				loadComplete : function(Data) {
					window.scrollTo(0,document.body.scrollHeight);
					$('#contactList tr').find('input[type="radio"]').click(function(){
						  $('#contactList tr').find('input[type="radio"]').prop('checked',false);
						  $(this).prop('checked',true);
						  $('#contactList').jqGrid('setSelection',$(this).parents('tr').prop('id'));
						});
					

					$("#contactList").bind("jqGridInlineSuccessSaveRow",
											    function (e, jqXHR, rowid, options) {
											      //  alert(jqXHR.responseText);  
											        commonMessageBox('Information',  jqXHR.responseText);
													contactDeatails();      
											        return [true, jqXHR.responseText];
													
											    }
											);
					
				},
				gridComplete : function() {
					
					
					//resize col head and body [all]
					$('#gview_contactList .ui-jqgrid-labels > th')
						.css({'width': '120px', 'box-sizing':'border-box'});
					$('#contactList > tbody > tr > td')
						.css({'width': '120px', 'box-sizing':'border-box'});																		
					
					
					$('#contactList_iledit').click(function(e) {			 
						var selRowId=$('#contactList').jqGrid('getGridParam','selrow');
						var st = '';
						  $('#contactList input[type="radio"]:checked').each(function(){ 								 
							  st= $(this).closest('tr').find('select').val();
						  });
						
						if(selRowId==null)
							{
							commonMessageBox('Information',  "Please Select Row To Edit");
							return false;
							}
					
						//commonMessageBox('Information',  selRowId);
						customRowEditValidations(selRowId);						 
						  
						e.stopPropagation();
					});
								
					$( "#contactList" ).delegate( '[name *= "gpContactNumber"], [name *= "workPhone"]', "change", function() {
						checkMaxDigits(this,10);
					});
				},
				loadonce : true,
				sortable : true,
				onSelectRow : function(rowid, status, e) {
					customRowEditValidations(rowid);
				},
				beforeSelectRow : function(rowid) {

					if (rowid !== lastSel) {
						$(this).jqGrid('restoreRow', lastSel);
						lastSel = rowid;
					}
					return true;
				}
			}).jqGrid('navGrid', '#contactPager', {
		edit : false,
		add : false,
		del : false,
		view : false,
		search : false,
		viewtext : "View",
		
		cloneToTop : true,
		excel : true,
		refreshstate : 'current'
	}, {}, {}, {}, {
		multipleSearch : true
	});
	
	function customRowEditValidations(rowid) {

		if (rowid && rowid !== lastSel) {
			jQuery('#gridid').restoreRow(lastSel);
			lastSel = rowid;
		}
		jQuery('#gridid').editRow(rowid, true);
		$("#"+rowid+"_workPhone").keydown(function (e) {
			
			if($(this).val().length>=10) { 				
				if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) == -1)
		        	e.preventDefault();
		        return ; 
		    }

		    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
		        (e.keyCode >= 35 && e.keyCode <= 40)) {

		             return;
		    }

		    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		        e.preventDefault();
		    }
	    });
		$("#"+rowid+"_gpContactNumber").keydown(function (e) {
			if($(this).val().length>=10) { 				
				if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) == -1)
		        	e.preventDefault();
		        return ; 
		    }

		    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
		        (e.keyCode >= 35 && e.keyCode <= 40)) {

		             return;
		    }

		    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		        e.preventDefault();
		    }
	    });
		
		
		$("#"+rowid+"_contactNumber").keydown(function (e) {
			if($(this).val().length>=10) { 				
				if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) == -1)
		        	e.preventDefault();
		        return ; 
		    }

		    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
		        (e.keyCode >= 35 && e.keyCode <= 40)) {

		             return;
		    }

		    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		        e.preventDefault();
		    }
	    });
		
		$("#"+rowid+"_zip").keydown(function (e) {
			if($(this).val().length>=20) { 				
				if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) == -1)
		        	e.preventDefault();
		        return ; 
		    }

		    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
		        (e.keyCode >= 35 && e.keyCode <= 40)) {

		             return;
		    }

		    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		        e.preventDefault();
		    }
	    });
		
		$("#"+rowid+"_email").change(function (e) {
			var email=$(this).val();
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(email) == false) 
            {
				alert("Please Enter Correct Email");
				$(this).val('');
				 return;
            }
	      
	        
	       
	    });
		
		$("#"+rowid+"_email1").change(function (e) {
			var email=$(this).val();
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(email) == false) 
            {
				alert("Please Enter Correct Email");
				$(this).val('');
				 return;
            }
	      
	        
	       
	    });
		
		$("#"+rowid+"_email2").change(function (e) {
			var email=$(this).val();
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (reg.test(email) == false) 
            {
				alert("Please Enter Correct Email");
				$(this).val('');
				 return;
            }
	      
	        
	       
	    });
	}

	// LO319925
	// $("#grid").jqGrid().setGridParam({sortname: 'yearEdition,',
	// sortorder:'desc'}).trigger("reloadGrid");
	// $("#createSrGrid").jqGrid().setGridParam({sortname: 'statusIdentifier',
	// sortorder:'asc'}).trigger("reloadGrid");
	$("#contactList").bind("jqGridBeforeSelectRow", function (e, rowid, orgClickEvent) {
	    var tmp = $('#contactList tr[id="'+rowid+'"]');
	  /*  console.log(tmp);
	    console.log(tmp.find('input[type="radio"]'));*/
	    tmp.find('input[type="radio"]').prop('checked',true);

	    return e.result === false || e.result === "stop" ? false : true;
	});

	$('#contactList_iledit').text("Edit");
	/*$('#refresh_contactList_top').html("Reload Grid");
	$('#refresh_contactList').html("Reload Grid");*/
	$("#contactList_toppager_left table.navtable tbody tr").append(
	        '<td class="ui-pg-button ui-corner-all" title="Del Grid" id="deleteContact">Delete</td>'
	    );	
	
	$(function() {
		$(document).on('click', '#deleteContact', function(e) {
			//commonMessageBox('Information',  "");
			var selRowId=$('#contactList').jqGrid('getGridParam','selrow');
			var st = '';
			  $('#contactList input[type="radio"]:checked').each(function(){ 								 
				  st= $(this).closest('tr').find('select').val();
			  });
			
			if(selRowId==null)
				{
				commonMessageBox('Information',  "Please Select Row To Delete");
				return false;
				}
		
			//commonMessageBox('Information',  selRowId);
			$.ajax({
				url: 'deleteContact?ID=' + selRowId + '&type='+st,
				type:'GET',
				dataType: "json",
				success: function(data){
					if(data==undefined)
						{
						}
					else
						{
						commonMessageBox('Information',  data);
						}
					
					contactDeatails();
				},
				
			});
			
			e.stopPropagation();
		});
	});
	
	var myEditOptions = {
		keys : true,
		oneditfunc : function(rowid) {
		},
		aftersavefunc : function(rowid, response, options) {
			$("#contactList").jqGrid('setGridParam', {
				datatype : 'json'
			}).trigger('reloadGrid');
			commonMessageBox('Information', response.responseText);
			
		}
	};

	$("#contactList").jqGrid('inlineNav', '#contactList_toppager', {
		/*
		 * addtext : 'New', savetext : 'Save', canceltext : 'Cancel',
		 */
		addtext : $('#newButton').val(),
		savetext : $('#saveButton').val(),
		canceltext : $('#cancelButton').val(),
		edittext : $('#edit').val(),
		deletetext:$('#deleteContact').val(),

		addParams : {
			position : "first",
			addRowParams : myEditOptions
		}
	});

	$.extend(true, $.ui.multiselect, {
		locale : {
			addAll : 'Make all visible',
			removeAll : 'Hidde All',
			itemsCount : 'Avlialble Columns'
		}
	});

	$('#contactList tbody tr, #contactList_ilsave, #contactList_ilcancel').click(function(){
		$('#deleteContact').prop('disabled',false).removeClass('ui-state-disabled');
	});
	$('#contactList_iledit').click(function(){
		$('#deleteContact').prop('disabled',true).addClass('ui-state-disabled');
		var selRowId = $('#contactList').jqGrid('getGridParam','selrow')
		var bFlag = $('#contactList').jqGrid('getCell', selRowId, 'biometricVerified');
		
		setTimeout(function(){
			if(bFlag=="True") {
				$('#'+selRowId+"_nid").attr('disabled',true);
				$('#'+selRowId+"_dob").attr('disabled',true);
				$('#'+selRowId+"_gpContactNumber").attr('disabled',true);
			}					
		},200);
	});
	
	$("input", "#contactList").change(function() {
		
		checkMaxDigits(this,10);
	});

		// Live event
//	$("input", "#contactList").live("change", function() {
//		checkMaxDigits(this,10);
//	});
	
	$("#contactList_iladd").click(
			
			function() {
				$('#deleteContact').prop('disabled',true).addClass('ui-state-disabled');
				$.ajax({
					url : '../sr/getPartnerCode?isPartner='
							+ $("#isPartnerCheck").val(),
					type : 'GET',
					success : function(response) {
						var rowId = jQuery("#contactList").jqGrid(
								'getGridParam', 'selrow');
						if (response != "" && response != undefined) {
							$("#" + rowId + "_partnerCode").val(response);
						}
					},
					error : function(e) {
						commonMessageBox('Information',  "Error");
					}
				});
			});

	jQuery("#contactList").jqGrid('setGridWidth', 3000);

/*	$('#contactList_toppager_left .ui-pg-table.navtable tr')
			.append(
					 TODO TnM start by Guru 
					
					 * '<td class="ui-pg-button ui-corner-all" id="refreshGrid" title="Refresh Grid"><div
					 * class="ui-pg-div"><button class="refresh"
					 * id="srRefreshButton">Refresh</button></div></td>');
					 
					'<td class="ui-pg-button ui-corner-all" id="refreshGrid" title="Refresh Grid"><div class="ui-pg-div">'
							+ $('#refreshButton').val()
							+ '</button></div></td>');*/
	/* TODO TnM END */
	$("#contactList_toppager_center table.ui-pg-table").remove();
	$.extend(true, $.jgrid.col, {
		width : 450,
		modal : true,
		msel_opts : {
			dividerLocation : 0.5
		},
		dialog_opts : {
			minWidth : 470,
			show : 'blind',
			hide : 'explode'
		}
	});

	var pagerId = 'contactPager', gridId = $.jgrid.jqID("contactList");
	$('#' + pagerId).find('.navtable span.ui-icon').remove();
	$('#' + gridId + '_toppager').find('.navtable span.ui-icon').remove();
	$('#refresh_contactList_top').remove();
	$('#contactPager_left').html('');

	var FeatureAttributeGridViewController = {

		FormatEditLink : function(cellvalue, options, rowObject) {

			return '< a href="#" onclick="Javascript:FeatureAttributeGridViewController.EditRow('
					+ cellvalue + ')">Edit</a>';
		},
		EditRow : function(selectedRowId) {

			$('#modal').load('../sr/CimSrGetQues').dialog({
				'title' : "Questions to be Asked",
				'height' : 600,
				'width' : 800,
				'modal' : true
			});
		}
	};

	/*
	 * $(document).ajaxComplete(function(){
	 * 
	 * });
	 */

	// export to csv
	// csvExportButton($("#contactList"), null, 'cims.sr.csv.name', 'Export To
	// Csv', true, null,1,null,null,null,'#Pager1');
}

function bsHierachy()

{
	$(".auditTrail").hide();
	$(".contact").hide();
	$(".address").hide();
	$('.attachment').hide();
	$(".bsHierachy").show();
	var bsHierachyGridColNames = $('#bshierachyColumns').val().split(',');
	var gridWidth = ($('#bsHierachyGrid').closest('td').width())
			/ bsHierachyGridColNames.length;
	$('#bsHierachyGrid').jqGrid('GridUnload');
	var bsCode = $('#bsCode').val();
	$("#bsHierachyGrid")
			.jqGrid(
					{
						url : 'corporateBSHierachy?bsCode=' + bsCode
								+ '&parentbsCode='
								+ $('#parentCompanyName').val(),
						mtype : 'GET',
						datatype : 'json',
						colNames : bsHierachyGridColNames,
						colModel : [ {
							name : "corporateName",
							width : gridWidth,
							align : "center",
							sortable : false
						}, {
							name : "corporateType",
							width : gridWidth,
							align : "center",
							sortable : false
						}, {
							name : "bsCode",
							width : gridWidth,
							align : "center",
							sortable : false,
							resizable : false
						}, {
							name : "cugID",
							width : gridWidth,
							align : "center",
							sortable : false,
							hidden : true
						}

						],

						loadOnce : true,
						rowNum : 8,
						rowList : [ 8 ],
						gridview : true,
						ignoreCase : true,
						viewrecords : true,
						sortorder : 'desc',
						height : '100%',
						resizeStop : function() {
							var $self = $(this), shrinkToFit = $self.jqGrid(
									"getGridParam", "shrinkToFit");
							$self.jqGrid("setGridWidth", this.grid.newWidth,
									shrinkToFit);
						},
						loadComplete : function(Data) {
							
							if ($('#bsHierachyGrid tr').length <= 1) {
								$('#bsHierachyGridPager').text("");
								if (Data==null || Data.length == 0) {
									var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>No Records Available.</center></h3></td></tr>';
								} else {
									var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>'
											+ Data.errorMessage
											+ '.</center></h3></td></tr>';
								}
								$('#bsHierachyGrid').html(msg);
								return false;
							}
							window.scrollTo(0,document.body.scrollHeight);
							/* } */
						},
						loadError : function(xhr) {
							$('#bsHierachyGridPager').text("");
							var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>An unexpected error has occurred.</center></h3></td></tr>';
							$('#bsHierachyGrid').html(msg);
							return false;
						}

					});

}

/*function addressDeatails() {
	$(".auditTrail").hide();
	$(".contact").hide();
	$('.attachment').hide();
	$(".bsHierachy").hide();
	$(".address").show();
	// TODO TnM Start by Guru
	var createSrColNames = $("#addressColumns").val().split(",");	
	// TODO TnM END
	$('#addressGrid').jqGrid('GridUnload');
	var lastSel = 0;

	$("#addressGrid").jqGrid(
			{
				url : "../account/addressDetails?corporateId="
						+ $('#corporateId').val(),
				datatype : 'json',

				colNames : createSrColNames,
				// TODO TnM END
				colModel : [{
					name : 'radio',
					index : 'radio',
					
					editable : false,
					//align : 'center',
					sortable : false,
					hidden: flag,
			//	width : gridWidth,
					formatter : function(cellValue,option,rowObject) {
						return '<input class="radioBar small" type="radio" name="radioBar" value="" />';
					}
				},{
			            		name : 'contactId',
			            		index : 'contactId',
			            		align: 'center',
			            		editable : false,
//			            		width : 25,
			            		hidden:true,
			            		key:true
							},{
								name : 'contactType',
								index : 'addressType',
								align: 'center',
								editable : true,
								edittype : "select",
								editoptions : {
									value:{Legal:'Legal',Billing:'Billing',Additional_Address:'Additional Address'}
									},
								
							},
							{
								name : 'address1',
								align: 'center',
								index : 'address1',
//								width : gridWidth,
								editable : true,
								editrules : {
									required : true
								},
							},
							{
								name : 'address2',
								index : 'address2',
								align: 'center',
//								width : gridWidth,
								editable : true
							},
							{
								name : 'district',
								index : 'district',
								align: 'center',
//								width : gridWidth,
								edittype :  'select',
								formatter : 'text',
								editable : true,
								editrules : {
									required : true
								},
								editoptions : {
									dataUrl: '../account/locationOnchange?type=DISTRICT&parentId=' + "",
									useDefValues : true,
									 dataEvents: [
							                      {
							                        type: 'change',
							                        fn: function (e) {
							                           // commonMessageBox('Information',  "I changed");
							                    		
														$
																.ajax({
																	type : 'GET',
																	url : '../account/locationOnchange?type=THANA&parentId='
																			+ $(e.currentTarget).find(':selected').attr("data-val"),
																			
																	datatype : 'json',
																	success : function(
																			response) {
																		
																		var res = eval(response);
																		var resHtml = "<option value=''>Select</option>";
																		
																		$(res)
																				.each(
																						function(
																								i,
																								option) {
																							resHtml += "<option data-val='"
																									+ option.id
																									+ "' value='"
																									+ option.name
																									+ "'>"
																									+ option.name
																									+ "</option>";
																						});
																		var row = $(
																				e.target)
																				.closest(
																						'tr.jqgrow');
																		var rowId = row
																				.attr('id');
																		var rowId = jQuery(
																				"#addressGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		jQuery(
																				"select#"
																						+ rowId
																						+ "_cityTown")
																				.html(
																						resHtml);
																		//functionTesting();
																		//testingQuesAns();
																		
																	},
																	error : function(e) {
																		commonMessageBox('Error', "Error fetching THANA!!!");
																	}
																});
							                            }
							                      }],
								    buildSelect: function (data) {
								    	 
								    	 data = $.parseJSON(data);
								    	
								    	 var resHtml = "<select>";
								    	 resHtml += '<option value="select">select</option>'
							             if (data != null && data.length) {
							                 for (var i in data) {
							                     item = data[i];
							                     resHtml += '<option data-val="' + data[i].id + '" value="' + data[i].name + '">' + data[i].name + '</option>';
							                     //console.log(item);
							                 }
							             }
							             resHtml += "</select>"
							             //console.log(resHtml);
							             return resHtml;
							             
								    }
								},
					
							},
							{
								name : 'cityTown',
								index : 'cityTown',
//								width : gridWidth,
								align: 'center',
								editable : true,
								edittype :  'select',
								//edittype : 'select',
								editrules : {
									required : true
								},
								editoptions : {
									useDefValues : true,
									
									value : {
										'' : 'Select'
									},
									 dataEvents: [
							                      {
							                        type: 'change',
							                        fn: function (e) {
							                         //   commonMessageBox('Information',  "I changed");
							                    		if($(e.currentTarget).val() == '') {
							                    			return;
							                    		}
							                    		
														$
																.ajax({
																	type : 'GET',
																	url : '../account/locationOnchange?type=POSTCODE&parentId='
																			+ $(e.currentTarget).find(':selected').attr("data-val"),
																			
																	datatype : 'json',
																	success : function(
																			response) {
																		
																		var res = eval(response);
																		var resHtml = "";
																		//resHtml = "<option value=''>Select</option>";
																		$(res)
																				.each(
																						function(
																								i,
																								option) {
																							resHtml += "<option value='"
																									+ option.name
																									+ "'>"
																									+ option.name
																									+ "</option>";
																						});
																		var row = $(
																				e.target)
																				.closest(
																						'tr.jqgrow');
																		var rowId = row
																				.attr('id');
																		var rowId = jQuery(
																				"#addressGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		jQuery(
																				"select#"
																						+ rowId
																						+ "_zip")
																				.html(
																						resHtml);
																		//functionTesting();
																		//testingQuesAns();
																		
																	},
																	error : function(ex) {																																				
																		commonMessageBox('Error', "Error fetching POSTCODE!!!");
																	}
																});
							                            }
							                      }],
								
								},
							}, {
								name : 'zip',
								index : 'zip',
								align: 'center',
								editrules : {
									required : true
								},
//								width : gridWidth,
								edittype :  'select',
								editable : true,
								editoptions : {
									useDefValues : true,
									
									value : {
										'' : 'Select'
									},
								
								
								},
					                  
							}, {
								name : 'contactNumber',
								index : 'contactNumber',
								align: 'center',
//								width : gridWidth,
								editable : true,
								editoptions:{
									  size:10
								}
							},{
								name : 'fax',
								index : 'fax',
								align: 'center',
//								width : gridWidth,
								editable : true,
								
							}],
				toolbar : [ false, "bottom" ],
				rowNum : 5,
				rowList : [ 5, 10, 20 ],
				shrinkToFit : true,
				toppager : true,
				gridview : true,
				rownumbers : true,
				ignoreCase : true,
				rownumbers : false,
				pager:"#addressGridPager",
				postData : "",
				// sortname : 'statusIdentifier',
				viewrecords : true,
				// sortorder : "asc",
				paging : true,
				height : "100%",
				editurl : '../account/createAddress?corporateId='
						+ $('#corporateId').val(),
				ajaxRowOptions : {
					beforeSend: function () {
						var rowData = $("#addressGrid").jqGrid("getGridParam", "data");						
//						var types = $.map(rowData , function (item) { rowId = item.contactId; return item.contactType; });
						
						var rowId = {};
						var types = $.map(rowData , function (item) {  
							rowId[item.contactType] = item.contactId;
							return item.contactType; 
						});
						
						var curRowId = $("#addressGrid tr").find('select').parents('tr').attr('id');						
						
						if(types.indexOf("Legal")>-1 && $("#addressGrid tr").find('select').val()=="Legal" && curRowId != rowId.Legal) {
						  commonMessageBox('Information',  'Legal Address Already Exist');
						  return false;
						}
						else if(types.indexOf("Billing")>-1 && $("#addressGrid tr").find('select').val()=="Billing" && curRowId != rowId.Billing) {
							  commonMessageBox('Information',  'Billing Address Already Exist');
							  return false;
							}
			        },
					contentType : "application/json",
					dataType : "json",
					type : "POST"
				},
				serializeRowData : function(data) {
					return JSON.stringify(data);
				},
				success: function(data){
					
					console.log(data);
					if(data==undefined) {
					} else {
						commonMessageBox('Information',  data);
					}
				},
				emptyrecords : "",
				
				 * resizeStop: function () { var $self = $(this), shrinkToFit =
				 * $self.jqGrid("getGridParam", "shrinkToFit");
				 * $self.jqGrid("setGridWidth", this.grid.newWidth,
				 * shrinkToFit); },
				 
				loadComplete : function(Data) {
					$("#addressGrid").jqGrid('saveRow', lastSel, {
						successfunc: function (response) { 
							commonMessageBox('Information',  response);
							var data = JSON.parse(response.responseText);
							var thisArray = data.someArray; var thisProperty = data.someProperty;
							return true; } 
					});
					if(firstLoadComplete)
						window.scrollTo(0,document.body.scrollHeight);
					
					else 
						firstLoadComplete = true;
					//LO319925 : select row on radio select
					$('#addressGrid tr').find('input[type="radio"]').click(function(){
						
					  $('#addressGrid tr').find('input[type="radio"]').prop('checked',false);
					  $(this).prop('checked',true);
					  $('#addressGrid').jqGrid('setSelection',$(this).parents('tr').prop('id'));
					});
				},
			
				
				loadComplete: function (Data) {
					if ($('.pushsmswrapper:visible').length > 0) {
						if ($('#addressGrid tr').length <= 1) {
						$('#addressGridPager').text("");
						if(Data.length == 0){
							var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>No Records Available.</center></h3></td></tr>';
							}else{
							var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>'+Data.errorMessage +'.</center></h3></td></tr>';
							}
						$('#addressGrid').html(msg);
						return false;
						}
					} 
				},
				gridComplete : function() {
					$('#addressGrid_iledit').click(function(e) {			 
						var selRowId=$('#addressGrid').jqGrid('getGridParam','selrow');
						var st = '';
						  $('#contactList input[type="radio"]:checked').each(function(){ 								 
							  st= $(this).closest('tr').find('select').val();
						  });
						
						if(selRowId==null)
							{
							commonMessageBox('Information',  "Please Select Row To Edit");
							return false;
							}
					
						
						$("#"+selRowId+"_contactNumber").keydown(function (e) {
							if($(this).val().length>10) { 
								e.preventDefault();
								return ; 
								}

					        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
					            (e.keyCode >= 35 && e.keyCode <= 40)) {
					        
					                 return;
					        }
					        
					        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					            e.preventDefault();
					        }
					    });
						$("#"+selRowId+"_zip").keydown(function (e) {
							if($(this).val().length>6) { 
								e.preventDefault();
								return ; 
								}

					        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
					            (e.keyCode >= 35 && e.keyCode <= 40)) {
					        
					                 return;
					        }
					        
					        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					            e.preventDefault();
					        }
					    });
						e.stopPropagation();
					});
				},
				loadonce : true,
				sortable : true,
				onSelectRow : function(rowid, status, e) {
					if (rowid && rowid !== lastSel) {
						jQuery('#addressGrid').restoreRow(lastSel);
						lastSel = rowid;
					}
					var r = $('#addressGrid').getRowData(rowid);
					var col = r.contactNumber;
					$('#addressGrid #' + rowid).keyup(function(e){
						if(e.keyCode<47 || e.keyCode>58) {
							return false;
						}
					});	
					
					//numeric input only
					$("#"+rowid+"_contactNumber").keydown(function (e) {
						if($(this).val().length>10) { 
							e.preventDefault();
							return ; 
							}

				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
				            (e.keyCode >= 35 && e.keyCode <= 40)) {
				        
				                 return;
				        }
				        
				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				            e.preventDefault();
				        }
				    });
					$("#"+rowid+"_zip").keydown(function (e) {
						if($(this).val().length>6) { 
							e.preventDefault();
							return ; 
							}

				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
				            (e.keyCode >= 35 && e.keyCode <= 40)) {
				        
				                 return;
				        }
				        
				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				            e.preventDefault();
				        }
				    });
					// $("#addressGrid").setGridParam('editurl',
					// '../account/createContact?contactId='+$('#'+rowid+"_contactId").val()+"&address1="+$('#'+rowid+"_address1").val()+"&address2="+$('#'+rowid+"_address2").val());
					jQuery('#addressGrid').editRow(rowid, true);

				},
				beforeSelectRow : function(rowid) {

					if (rowid !== lastSel) {
						$(this).jqGrid('restoreRow', lastSel);
						lastSel = rowid;
					}
					return true;
				}
			}).jqGrid('navGrid', '#addressGridPager', {
		edit : false,
		add : false,
		del : false,
		view : false,
		loadonce : true,
		search : false,
		viewtext : "View",
		cloneToTop : true,
		excel : true,
		refreshstate : 'current',
		
	}, {}, {}, {}, {
		multipleSearch : true
	});

	$("#addressGrid").bind("jqGridBeforeSelectRow", function (e, rowid, orgClickEvent) {
	    var tmp = $('#addressGrid tr[id="'+rowid+'"]');
	    console.log(tmp);
	    console.log(tmp.find('input[type="radio"]'));
	    tmp.find('input[type="radio"]').prop('checked',true);

	    return e.result === false || e.result === "stop" ? false : true;
	});
	// LO319925
	// $("#grid").jqGrid().setGridParam({sortname: 'yearEdition,',
	// sortorder:'desc'}).trigger("reloadGrid");
	// $("#createSrGrid").jqGrid().setGridParam({sortname: 'statusIdentifier',
	// sortorder:'asc'}).trigger("reloadGrid");

	$('#addressGrid_iledit').text("Edit");
	$('#refresh_addressGrid_top').html("Reload Grid");
	$('#refresh_addressGrid').html("Reload Grid");
	$("#addressGrid_toppager_left table.navtable tbody tr").append(
	        '<td class="ui-pg-button ui-corner-all" title="Del Grid" id="deleteaddress">Delete</td>'
	    );
	$(function() {
		$(document).on('click', '#deleteaddress', function(e) {
			//commonMessageBox('Information',  "");
			 
			var selRowId=$('#addressGrid').jqGrid('getGridParam','selrow');
			var st = '';
			  $('#addressGrid input[type="radio"]:checked').each(function(){ 								 
				  st= $(this).closest('tr').find('select').val();
			  });
			
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			if(selRowId==null) {
			  commonMessageBox('Information',  "Please Select Row To Delete");
			  return false;
			} 
			
			//commonMessageBox('Information',  selRowId);
			$.ajax({
				url: 'deleteContact?ID=' + selRowId + '&type='+st,
				type:'GET',
				dataType: "json",
				success: function(data){
					if(data==undefined) {
					} else {
						commonMessageBox('Information',  data);
					}
					addressDeatails();
				},
				
			});			
			
		});
	});
	
	
	
	
	var myEditOptions = {
		keys : true,
		oneditfunc : function(rowid) {
		},
		aftersavefunc : function(rowid, response, options) {
			$("#addressGrid").jqGrid('setGridParam', {
				datatype : 'json'
			}).trigger('reloadGrid');
		}
	};

	$("#addressGrid").jqGrid('inlineNav', '#addressGrid_toppager', {
		
		 * addtext : 'New', savetext : 'Save', canceltext : 'Cancel',
		 
		addtext : $('#newButton').val(),
		savetext : $('#saveButton').val(),
		canceltext : $('#cancelButton').val(),
		edittext : $('#edit').val(),

		addParams : {
			position : "first",
			addRowParams : myEditOptions
		}
	});

	$.extend(true, $.ui.multiselect, {
		locale : {
			addAll : 'Make all visible',
			removeAll : 'Hidde All',
			itemsCount : 'Avlialble Columns'
		}
	});

	$('#addressGrid tbody tr, #addressGrid_ilsave, #addressGrid_ilcancel').click(function(){
		$('#deleteaddress').prop('disabled',false).removeClass('ui-state-disabled');
	});
	$('#addressGrid_iledit').click(function(){
		$('#deleteaddress').prop('disabled',true).addClass('ui-state-disabled');
	})
	$("#addressGrid_iladd").click(			
			function() {
				$('#deleteaddress').prop('disabled',true).addClass('ui-state-disabled');
				$.ajax({
					url : '../sr/getPartnerCode?isPartner='
							+ $("#isPartnerCheck").val(),
					type : 'GET',
					success : function(response) {
						var rowId = jQuery("#addressGrid").jqGrid(
								'getGridParam', 'selrow');
						preId = rowId;
						if (response != "" && response != undefined) {
							$("#" + rowId + "_partnerCode").val(response);
						}
					},
					error : function(e) {
						commonMessageBox('Information',  "Error");
					}
				});
			});

	//jQuery("#addressGrid").jqGrid('setGridWidth', 1600);
	jQuery("#addressGrid").jqGrid('setGridWidth', $(window).width(), true);

	$('#addressGrid_toppager_left .ui-pg-table.navtable tr')
			.append(
					 TODO TnM start by Guru 
					
					 * '<td class="ui-pg-button ui-corner-all" id="refreshGrid" title="Refresh Grid"><div
					 * class="ui-pg-div"><button class="refresh"
					 * id="srRefreshButton">Refresh</button></div></td>');
					 
					'<td class="ui-pg-button ui-corner-all" id="refreshGrid" title="Refresh Grid"><div class="ui-pg-div">'
							+ $('#refreshButton').val()
							+ '</button></div></td>');
	 TODO TnM END 
	$("#addressGrid_toppager_center table.ui-pg-table").remove();
	$.extend(true, $.jgrid.col, {
		width : 450,
		modal : true,
		msel_opts : {
			dividerLocation : 0.5
		},
		dialog_opts : {
			minWidth : 470,
			show : 'blind',
			hide : 'explode'
		}
	});

	var pagerId = 'addressGridPager', gridId = $.jgrid.jqID("addressGrid");
	$('#' + pagerId).find('.navtable span.ui-icon').remove();
	$('#' + gridId + '_toppager').find('.navtable span.ui-icon').remove();
	$('#refresh_addressGrid_top').remove();
	$('#addressGridPager_left').html('');

	var FeatureAttributeGridViewController = {

		FormatEditLink : function(cellvalue, options, rowObject) {

			return '< a href="#" onclick="Javascript:FeatureAttributeGridViewController.EditRow('
					+ cellvalue + ')">Edit</a>';
		},
		EditRow : function(selectedRowId) {

			$('#modal').load('../sr/CimSrGetQues').dialog({
				'title' : "Questions to be Asked",
				'height' : 600,
				'width' : 800,
				'modal' : true
			});
		}
	};

	
	 * $(document).ajaxComplete(function(){
	 * 
	 * });
	 

	// export to csv
	// csvExportButton($("#contactList"), null, 'cims.sr.csv.name', 'Export To
	// Csv', true, null,1,null,null,null,'#Pager1');
}*/

function addressDeatails() {
	$(".auditTrail").hide();
	$(".contact").hide();
	$('.attachment').hide();
	$(".bsHierachy").hide();
	$(".address").show();
	
	var selectedDistrict = "";
	var selectedCity = "";
	var selectedZip = "";

	// TODO TnM Start by Guru
	var createSrColNames = $("#addressColumns").val().split(",");	
	// TODO TnM END
	$('#addressGrid').jqGrid('GridUnload');
	var lastSel = 0;
	var newFlag = false;
	$("#addressGrid").jqGrid(
			{
				url : "../account/addressDetails?corporateId="
						+ $('#corporateId').val(),
				datatype : 'json',

				colNames : createSrColNames,
				// TODO TnM END
				colModel : [{
					name : 'radio',
					index : 'radio',
					
					editable : false,
					//align : 'center',
					sortable : false,
					hidden: flag,
			//	width : gridWidth,
					formatter : function(cellValue,option,rowObject) {
						return '<input class="radioBar small" type="radio" name="radioBar" value="" />';
					}
				},{
			            		name : 'contactId',
			            		index : 'contactId',
			            		align: 'center',
			            		editable : false,
//			            		width : 25,
			            		hidden:true,
			            		key:true
							},{
								name : 'contactType',
								index : 'addressType',
								align: 'center',
								editable : true,
								edittype : "select",
								editoptions : {
									value:{Legal:'Legal',Billing:'Billing',Additional_Address:'Additional Address'}
									},
								
							},
							{
								name : 'address1',
								align: 'center',
								index : 'address1',
//								width : gridWidth,
								editable : true,
								editoptions:{
									  size:70
								}
							},
							{
								name : 'address2',
								index : 'address2',
								align: 'center',
//								width : gridWidth,
								editable : true,
								editoptions:{
									  size:15
								}
							},
							{
								name : 'district',
								index : 'district',
								align: 'center',
//								width : gridWidth,
								edittype :  'select',
								formatter : 'text',
								editable : true,
								editrules : {
									required : true
								},
								editoptions : {
									dataUrl: '../account/locationOnchange?type=DISTRICT&parentId=' + "",
									useDefValues : true,
									 dataEvents: [
							                      {
							                        type: 'change',
							                        fn: function (e) {
							                           // commonMessageBox('Information',  "I changed");
							                    		
														$
																.ajax({
																	type : 'GET',
																	url : '../account/locationOnchange?type=THANA&parentId='
																			+ $(e.currentTarget).find(':selected').attr("data-val"),
																			
																	datatype : 'json',
																	success : function(
																			response) {
																		
																		var res = eval(response);
																		var resHtml = "<option value=''>Select</option>";
																		
																		$(res)
																				.each(
																						function(
																								i,
																								option) {

																							resHtml += "<option data-val='"
																									+ option.id
																									+ "' value='"
																									+ option.name
																									+ "'"
if(selectedCity==option.name) 
	resHtml += "selected"																						
resHtml += ">"
																									+ option.name
																							
																									+ "</option>";
																						});
																		var row = $(
																				e.target)
																				.closest(
																						'tr.jqgrow');
																		var rowId = row
																				.attr('id');
																		var rowId = jQuery(
																				"#addressGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		

																		jQuery(
																				"select#"
																						+ rowId
																						+ "_cityTown")
																				.html(
																						resHtml);
										jQuery("select#"+ rowId+ "_cityTown").change();
																		
																		//functionTesting();
																		//testingQuesAns();
																		
																	},
																	error : function(e) {
																		commonMessageBox('Error', "Error fetching THANA!!!");
																	}
																});
							                            }
							                      }],
								    buildSelect: function (data) {
								    	 
								    	 data = $.parseJSON(data);
								    	
								    	 var resHtml = "<select>";
								    	 resHtml += '<option value="select">select</option>'
							             if (data != null && data.length) {
							                 for (var i in data) {
							                     item = data[i];
							                     resHtml += '<option data-val="' + data[i].id + '" value="' + data[i].name + '">' + data[i].name + '</option>';
							                     //console.log(item);
							                 }
							             }
							             resHtml += "</select>"
							             //console.log(resHtml);
							             return resHtml;
							             
								    }
								},
					
							},
							{
								name : 'cityTown',
								index : 'cityTown',
//								width : gridWidth,
								align: 'center',
								editable : true,
								edittype :  'select',
								//edittype : 'select',
								editrules : {
									required : true
								},
								editoptions : {
									useDefValues : true,
									
									value : {
										'' : 'Select'
									},
									 dataEvents: [
							                      {
							                        type: 'change',
							                        fn: function (e) {
							                         //   commonMessageBox('Information',  "I changed");
							                    		if($(e.currentTarget).val() == '') {
							                    			return;
							                    		}
							                    		
														$
																.ajax({
																	type : 'GET',
																	url : '../account/locationOnchange?type=POSTCODE&parentId='
																			+ $(e.currentTarget).find(':selected').attr("data-val"),
																			
																	datatype : 'json',
																	success : function(
																			response) {
																		
																		var res = eval(response);
																		var resHtml = "";
																		//resHtml = "<option value=''>Select</option>";
																		$(res)
																				.each(
																						function(
																								i,
																								option) {
																							resHtml += "<option value='"
																									+ option.name
																									+ "'"
if(selectedZip==option.name) 
	resHtml += "selected"																						
resHtml += ">"
																									+ option.name
																									+ "</option>";
																						});
																		var row = $(
																				e.target)
																				.closest(
																						'tr.jqgrow');
																		var rowId = row
																				.attr('id');
																		var rowId = jQuery(
																				"#addressGrid")
																				.jqGrid(
																						'getGridParam',
																						'selrow');
																		jQuery(
																				"select#"
																						+ rowId
																						+ "_zip")
																				.html(
																						resHtml);
																		//functionTesting();
																		//testingQuesAns();																																		
							
																	},
																	error : function(ex) {																																				
																		commonMessageBox('Error', "Error fetching POSTCODE!!!");
																	}
																});
							                            }
							                      }],
								
								},
							}, {
								name : 'zip',
								index : 'zip',
								align: 'center',
								editrules : {
									required : true
								},
//								width : gridWidth,
								edittype :  'select',
								editable : true,
								editoptions : {
									useDefValues : true,
									
									value : {
										'' : 'Select'
									},
								
								
								},
					                  
							}, {
								name : 'contactNumber',
								index : 'contactNumber',
								align: 'center',
//								width : gridWidth,
								editable : true,
								editoptions:{
									  size:10
								}
							},{
								name : 'fax',
								index : 'fax',
								align: 'center',
//								width : gridWidth,
								editable : true,
								
							}],
				toolbar : [ false, "bottom" ],
				rowNum : 5,
				rowList : [ 5, 10, 20 ],
				shrinkToFit : true,
				toppager : true,
				gridview : true,
				rownumbers : true,
				ignoreCase : true,
				rownumbers : false,
				pager:"#addressGridPager",
				postData : "",
				// sortname : 'statusIdentifier',
				viewrecords : true,
				// sortorder : "asc",
				paging : true,
				height : "100%",
				editurl : '../account/createAddress?corporateId='
						+ $('#corporateId').val(),
				ajaxRowOptions : {
					beforeSend: function () {
						var rowData = $("#addressGrid").jqGrid("getGridParam", "data");						
//						var types = $.map(rowData , function (item) { rowId = item.contactId; return item.contactType; });
						
						var rowId = {};
						var types = $.map(rowData , function (item) {  
							rowId[item.contactType] = item.contactId;
							return item.contactType; 
						});
						
						var curRowId = $("#addressGrid tr").find('select').parents('tr').attr('id');						
						
						if(types.indexOf("Legal")>-1 && $("#addressGrid tr").find('select').val()=="Legal" && curRowId != rowId.Legal) {
						  commonMessageBox('Information',  'Legal Address Already Exist');
						  return false;
						}
						else if(types.indexOf("Billing")>-1 && $("#addressGrid tr").find('select').val()=="Billing" && curRowId != rowId.Billing) {
							  commonMessageBox('Information',  'Billing Address Already Exist');
							  return false;
							}
			        },
					contentType : "application/json",
					dataType : "json",
					type : "POST"
				},
				serializeRowData : function(data) {
					return JSON.stringify(data);
				},
				success: function(data){
					
					console.log(data);
					if(data==undefined) {
					} else {
						commonMessageBox('Information',  data);
					}
				},
				emptyrecords : "",
				/*
				 * resizeStop: function () { var $self = $(this), shrinkToFit =
				 * $self.jqGrid("getGridParam", "shrinkToFit");
				 * $self.jqGrid("setGridWidth", this.grid.newWidth,
				 * shrinkToFit); },
				 */
				loadComplete : function(Data) {
					$("#addressGrid").jqGrid('saveRow', lastSel, {
						successfunc: function (response) { 
							commonMessageBox('Information',  response);
							var data = JSON.parse(response.responseText);
							var thisArray = data.someArray; var thisProperty = data.someProperty;
							return true; } 
					});
					if(firstLoadComplete)
						window.scrollTo(0,document.body.scrollHeight);
					
					else 
						firstLoadComplete = true;
					//LO319925 : select row on radio select
					$('#addressGrid tr').find('input[type="radio"]').click(function(){
						selectedCity = $(this).closest('tr').find('td[aria-describedby="addressGrid_cityTown"]').text();
						selectedZip = $(this).closest('tr').find('td[aria-describedby="addressGrid_zip"]').text();
						console.log('city, zip',selectedCity,selectedZip);
					  $('#addressGrid tr').find('input[type="radio"]').prop('checked',false);
					  $(this).prop('checked',true);
					  $('#addressGrid').jqGrid('setSelection',$(this).parents('tr').prop('id'));
					});
				},
			
				/*
				loadComplete: function (Data) {
					if ($('.pushsmswrapper:visible').length > 0) {
						if ($('#addressGrid tr').length <= 1) {
						$('#addressGridPager').text("");
						if(Data.length == 0){
							var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>No Records Available.</center></h3></td></tr>';
							}else{
							var msg = '<tr><td colspan="4"><h3 class="errMsg"><center>'+Data.errorMessage +'.</center></h3></td></tr>';
							}
						$('#addressGrid').html(msg);
						return false;
						}
					} 
				},*/
				gridComplete : function() {
					$('#addressGrid_iladd').click(function(){
						newFlag = true;						
					})
					$('#addressGrid tbody tr').click(function(){						
						if(newFlag) {
							if($(this).is($('#addressGrid tbody tr').eq(1)) == false){
                                $('#deleteaddress').prop('disabled',false).removeClass('ui-state-disabled');		
                                $('#addressGrid_ilsave, #addressGrid_ilcancel').prop('disabled',true).addClass('ui-state-disabled');
                                $('#addressGrid_iledit, #addressGrid_iladd,#deleteaddress').prop('disabled',false).removeClass('ui-state-disabled');
								newFlag=false;
                            }
						} 
							
                    }); 
					$('#addressGrid_ilsave, #addressGrid_ilcancel').click(function(){						
						$('#deleteaddress').prop('disabled',false).removeClass('ui-state-disabled');		
                    	$('#addressGrid_ilcancel').prop('disabled',true).addClass('ui-state-disabled');
                    	$('#addressGrid_iledit, #addressGrid_iladd,#deleteaddress').prop('disabled',false).removeClass('ui-state-disabled');
                    	newFlag=false;
                    });
					
					$('#addressGrid_iledit').click(function(e) {			 
						var selRowId=$('#addressGrid').jqGrid('getGridParam','selrow');

						console.log(selRowId);
						setTimeout(function(){
							selectedDistrict = $('#'+selRowId+"_district :selected").text();
					

							console.log(selectedDistrict);
							$('#'+selRowId+"_district").change();
							
						},1000);
						
						
						var st = '';
						  $('#contactList input[type="radio"]:checked').each(function(){ 								 
							  st= $(this).closest('tr').find('select').val();
						  });
						
						if(selRowId==null)
							{
							commonMessageBox('Information',  "Please Select Row To Edit");
							return false;
							}
					
					
						
						$("#"+selRowId+"_contactNumber").keydown(function (e) {
							if($(this).val().length>9) { 
								e.preventDefault();
								return ; 
								}

					        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
					            (e.keyCode >= 35 && e.keyCode <= 40)) {
					        
					                 return;
					        }
					        
					        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					            e.preventDefault();
					        }
					    });
						
						$("#"+selRowId+"_address2").keypress(function (e) {
							if($(this).val().length>14) { 
								e.preventDefault();
								return ; 
								}					
							if(e.keyCode == 38 || e.keyCode == 60 || e.keyCode == 62){
								return false;
						    }
							
					    
					    });
						
						$("#"+selRowId + "_address1").keypress(function (e) {
							if($(this).val().length>69) { 
								e.preventDefault();
								return ; 
								}					
							if(e.keyCode == 38 || e.keyCode == 60 || e.keyCode == 62){
								return false;
						    }
							
					    
					    });
						$('#'+selRowId+"_district").change();
						$("#"+selRowId+"_zip").keydown(function (e) {
							if($(this).val().length>6) { 
								e.preventDefault();
								return ; 
								}

					        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
					            (e.keyCode >= 35 && e.keyCode <= 40)) {
					        
					                 return;
					        }
					        
					        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					            e.preventDefault();
					        }
					    });
						e.stopPropagation();
					});
				},
				loadonce : true,
				sortable : true,
				onSelectRow : function(rowid, status, e) {
					if (rowid && rowid !== lastSel) {
						jQuery('#addressGrid').restoreRow(lastSel);
						lastSel = rowid;
					}
					var r = $('#addressGrid').getRowData(rowid);
					var col = r.contactNumber;
					/*$('#addressGrid #' + rowid).keyup(function(e){
						if(e.keyCode<47 || e.keyCode>58) {
							return false;
						}
					});	*/

					
					$("#"+rowid+"_address2").keypress(function (e) {
						if($(this).val().length>14) { 
							e.preventDefault();
							return ; 
							}					
						if(e.keyCode == 38 || e.keyCode == 60 || e.keyCode == 62){
							return false;
					    }
						
				    
				    });
					$("#"+rowid + "_address1").keypress(function (e) {
						if($(this).val().length>69) { 
							e.preventDefault();
							return ; 
							}					
						if(e.keyCode == 38 || e.keyCode == 60 || e.keyCode == 62){
							return false;
					    }
						
				    
				    });

					//numeric input only
					$("#"+rowid+"_contactNumber").keydown(function (e) {
						if($(this).val().length>10) { 
							e.preventDefault();
							return ; 
							}

				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
				            (e.keyCode >= 35 && e.keyCode <= 40)) {
				        
				                 return;
				        }
				        
				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				            e.preventDefault();
				        }
				    });
					$("#"+rowid+"_zip").keydown(function (e) {
						if($(this).val().length>6) { 
							e.preventDefault();
							return ; 
							}

				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||         
				            (e.keyCode >= 35 && e.keyCode <= 40)) {
				        
				                 return;
				        }
				        
				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				            e.preventDefault();
				        }
				    });
					// $("#addressGrid").setGridParam('editurl',
					// '../account/createContact?contactId='+$('#'+rowid+"_contactId").val()+"&address1="+$('#'+rowid+"_address1").val()+"&address2="+$('#'+rowid+"_address2").val());
					//jQuery('#addressGrid').editRow(rowid, true);

				},
				beforeSelectRow : function(rowid) {

					if (rowid !== lastSel) {
						$(this).jqGrid('restoreRow', lastSel);
						lastSel = rowid;
					}
					return true;
				}
			}).jqGrid('navGrid', '#addressGridPager', {
		edit : false,
		add : false,
		del : false,
		view : false,
		loadonce : true,
		search : false,
		viewtext : "View",
		cloneToTop : true,
		excel : true,
		refreshstate : 'current',
		
	}, {}, {}, {}, {
		multipleSearch : true
	});

	$("#addressGrid").bind("jqGridBeforeSelectRow", function (e, rowid, orgClickEvent) {
	    var tmp = $('#addressGrid tr[id="'+rowid+'"]');
	  /*  console.log(tmp);
	    console.log(tmp.find('input[type="radio"]'));*/
	    tmp.find('input[type="radio"]').prop('checked',true);

	    return e.result === false || e.result === "stop" ? false : true;
	});
	// LO319925
	// $("#grid").jqGrid().setGridParam({sortname: 'yearEdition,',
	// sortorder:'desc'}).trigger("reloadGrid");
	// $("#createSrGrid").jqGrid().setGridParam({sortname: 'statusIdentifier',
	// sortorder:'asc'}).trigger("reloadGrid");

	$('#addressGrid_iledit').text("Edit");
	/*$('#refresh_addressGrid_top').html("Reload Grid");
	$('#refresh_addressGrid').html("Reload Grid");*/
	$("#addressGrid_toppager_left table.navtable tbody tr").append(
	        '<td class="ui-pg-button ui-corner-all" title="Del Grid" id="deleteaddress">Delete</td>'
	    );
	$(function() {
		$(document).on('click', '#deleteaddress', function(e) {
			//commonMessageBox('Information',  "");
			 
			var selRowId=$('#addressGrid').jqGrid('getGridParam','selrow');
			var st = '';
			  $('#addressGrid input[type="radio"]:checked').each(function(){ 								 
				  st= $(this).closest('tr').find('select').val();
			  });
			
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			if(selRowId==null) {
			  commonMessageBox('Information',  "Please Select Row To Delete");
			  return false;
			} 
			
			//commonMessageBox('Information',  selRowId);
			$.ajax({
				url: 'deleteContact?ID=' + selRowId + '&type='+st,
				type:'GET',
				dataType: "json",
				success: function(data){
					if(data==undefined) {
					} else {
						commonMessageBox('Information',  data);
					}
					addressDeatails();
				},
				
			});			
			
		});
	});
	
	
	
	
	var myEditOptions = {
		keys : true,
		oneditfunc : function(rowid) {
		},
		aftersavefunc : function(rowid, response, options) {
			$("#addressGrid").jqGrid('setGridParam', {
				datatype : 'json'
			}).trigger('reloadGrid');
		}
	};

	$("#addressGrid").jqGrid('inlineNav', '#addressGrid_toppager', {
		/*
		 * addtext : 'New', savetext : 'Save', canceltext : 'Cancel',
		 */
		addtext : $('#newButton').val(),
		savetext : $('#saveButton').val(),
		canceltext : $('#cancelButton').val(),
		edittext : $('#edit').val(),

		addParams : {
			position : "first",
			addRowParams : myEditOptions
		}
	});

	$.extend(true, $.ui.multiselect, {
		locale : {
			addAll : 'Make all visible',
			removeAll : 'Hidde All',
			itemsCount : 'Avlialble Columns'
		}
	});

	
	
	$('#addressGrid_iledit').click(function(){
		$('#deleteaddress').prop('disabled',true).addClass('ui-state-disabled');
	})
	$("#addressGrid_iladd").click(			
			function() {
				$('#deleteaddress').prop('disabled',true).addClass('ui-state-disabled');
				$.ajax({
					url : '../sr/getPartnerCode?isPartner='
							+ $("#isPartnerCheck").val(),
					type : 'GET',
					success : function(response) {
						var rowId = jQuery("#addressGrid").jqGrid(
								'getGridParam', 'selrow');
						preId = rowId;
						if (response != "" && response != undefined) {
							$("#" + rowId + "_partnerCode").val(response);
						}
					},
					error : function(e) {
						commonMessageBox('Information',  "Error");
					}
				});
			});

	//jQuery("#addressGrid").jqGrid('setGridWidth', 1600);
	jQuery("#addressGrid").jqGrid('setGridWidth', $(window).width(), true);

	/*$('#addressGrid_toppager_left .ui-pg-table.navtable tr')
			.append(
					 TODO TnM start by Guru 
					
					 * '<td class="ui-pg-button ui-corner-all" id="refreshGrid" title="Refresh Grid"><div
					 * class="ui-pg-div"><button class="refresh"
					 * id="srRefreshButton">Refresh</button></div></td>');
					 
					'<td class="ui-pg-button ui-corner-all" id="refreshGrid" title="Refresh Grid"><div class="ui-pg-div">'
							+ $('#refreshButton').val()
							+ '</button></div></td>');*/
	/* TODO TnM END */
	$("#addressGrid_toppager_center table.ui-pg-table").remove();
	$.extend(true, $.jgrid.col, {
		width : 450,
		modal : true,
		msel_opts : {
			dividerLocation : 0.5
		},
		dialog_opts : {
			minWidth : 470,
			show : 'blind',
			hide : 'explode'
		}
	});

	var pagerId = 'addressGridPager', gridId = $.jgrid.jqID("addressGrid");
	$('#' + pagerId).find('.navtable span.ui-icon').remove();
	$('#' + gridId + '_toppager').find('.navtable span.ui-icon').remove();
	$('#refresh_addressGrid_top').remove();
	$('#addressGridPager_left').html('');

}

function locationOnChange(id) {
	var value = $(id).val();
	$.ajax({
		url : '../account/locationOnchange?type=THANA&parentId=' + value,
		type : 'GET',
		dataType : "json",
		success : function(data) {

			
			$('#thana').html('').append('<option value="">Select</option>');
			for ( var i = 0; i < data.length; i++) {
				$('#thana').append(
						'<option value=' + data[i].id + '>' + data[i].name
								+ '</option>');
			}
		},

	});

}
function locationOnChangeThana(id) {
	var value = $(id).val();
	$.ajax({
		url : '../account/locationOnchange?type=THANA&parentId=' + value,
		type : 'GET',
		dataType : "json",
		success : function(data) {

			//$('#zone').html('').append('<option value="">Select</option>');
			$('#thana').html('').append('<option value="">Select</option>');
			for ( var i = 0; i < data.length; i++) {
				$('#thana').append(
						'<option value=' + data[i].id + '>' + data[i].name
								+ '</option>');
			}
		},

	});

}

function alphaInput(e) {
    if( (e.which>=65 && e.which<=90) || (e.which>=97 && e.which<=122) ) {
      return true;
    }
    return false;
  }

function numericInput(e) {
    if(e.which<48 || e.which>57) {
      return false;
    }
  }

function corporateModify(corporateId, status,action,corporateName ,corporateShortName ,bsCode)
{
	/*commonMessageBox('Information',  corporateId);
	commonMessageBox('Information',  status);*/
	$.ajax({
		url: "../corporatemodify?corporateId=" + corporateId
		+ "&status=" + status+ "&action=" + action+ "&corporateName=" + corporateName+ "&corporateShortName=" + corporateShortName+ "&bsCode=" + bsCode,
		type:'GET',
		dataType: "json",
		success: function(data){
			commonMessageBox('Information',  data);
			searchCorporate("", "",
					"", status,"","","","");
		},
		
	});
	
	
}

function changeCreateCorporate(type){

	  if(type == 'Parent') {
	     //$('#id1, #id2').hide();
	     $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(4).hide();
	     $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(5).hide();
	     $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(6).hide();
	  } else if (type == 'Child') {
	     //$('#id1, #id2').show();
	     $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(4).show();
	     $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(5).show();
	     $('#searchedCorporate+div').eq(0).find('tbody tr td').eq(6).show();
	  }

};

$(document).ready(function(){
	$('#kamOwner').change(function(){
		  if($(this).val()=='gpuser10') {
		   $('#kamName').val('Abhishek');
		   $('#kamPhoneNumber').val('1701237612');
		  } else {
		   $('#kamName').val('');
		   $('#kamPhoneNumber').val('');
		  }
		})	
});

/*$(document).ready(function(){
	
		  if($('#kamOwner').val()=='gpuser1') {
		   $('#kamName').val('Abhishek');
		   $('#kamPhoneNumber').val('1701237612');
		  } else {
		   $('#kamName').val('');
		   $('#kamPhoneNumber').val('');
		  }
		  
});

$('#kamName').val('Abhishek');
$('#kamPhoneNumber').val('1701237612');
*/
////active tab fix 
//$('.corporateTabsWrapper li').click(function() {
//	$('.corporateTabsWrapper li').removeClass('active');
//	$(this).addClass('active');
//});


function locationOnSelectVID() {

	 var type=$('#selectVID option:selected').text();
	$.ajax({
		url : '../account/locationOnSelectVID?type='+type,
		type : 'GET',
		dataType : "json",
		success : function(data) {

			
			//$('#corporateVIDDiscount').html('').append('<option value="">Select</option>');
			for ( var i = 0; i < data.length; i++) {
				 document.getElementById("corporateVIDDiscount").value = data[i].lovName;
                 
				/*$('#corporateVIDDiscount').append(
						'<option value=' + data[i].lovName + '>' + data[i].lovName
								+ '</option>');*/
			}
		},

	});

}


function locationOnSelectPackID() {

	 var type=$('#productName option:selected').text();
	 
	$.ajax({
		url : '../account/locationOnSelectVID?type='+type,
		type : 'GET',
		dataType : "json",
		success : function(data) {
			var html = "";
        //$('#usage').html('').append('<option value="">Select</option>');
        for ( var i = 0; i < data.length; i++) {
              html += data[i].lovName;
              //document.getElementById('usage').style.height="200px";
              /*$('#usage').append(
                          '<option value=' + data[i].lovName + '>' + data[i].lovName
                                      + '</option>');*/
        }
        			html += "";
        			document.getElementById("cugTariff").value = html
        			var ht="";
        			 for ( var i = 0; i < data.length; i++) {
        				 ht += data[i].lovVal;
        	              //document.getElementById('usage').style.height="200px";
        	              /*$('#usage').append(
        	                          '<option value=' + data[i].lovName + '>' + data[i].lovName
        	                                      + '</option>');*/
        	        }
        			
        			 ht += "";
        			document.getElementById("cugPulse").value = ht
        			
        			
  },

	});

}


function locationOnSelectUsageBasedVID() {

	 var type=$('#productName option:selected').text();
	 
	var name=$('#productName option:selected').text(); 
	$.ajax({
		url : '../account/locationOnSelectUsageBasedVID?type='+type+ "&name=" +name,
		type : 'GET',
		dataType : "json",
		success : function(data) {

			
			$('#cugTariff').html('').append('<option value="">Select</option>');
			for ( var i = 0; i < data.length; i++) {
				$('#cugTariff').append(
						'<option value=' + data[i].lovVal + '>' + data[i].lovVal
								+ '</option>');
			}
		},

	});

}

function hideRow(type){
	 if($("#packID").val())
  	{
  	 $('#create1').prop('checked', true);
  	}
	if(type == 'No') {
		     //$('#id1, #id2').hide();
		     $('#vidRow').hide();
		     $('#packRowID').hide();
		     $('#usageRowID').hide();
		     $('#usageVID').hide();
		     $('#corporateLevel').hide();
		     
		     
		     
	 } else if (type == 'Yes') {
		     //$('#id1, #id2').show();
	$('#vidRow').show();
	$('#packRowID').show();
    $('#usageRowID').show();
    $('#usageVID').show();
    $('#corporateLevel').show();
    
    if($('#usageVID input:last').prop('checked') == true) {
    	hideRow1('No');
    } else {
    	hideRow1('Yes');
    }
    
	  }
}


function hideRow1(type){
	 if(type == 'No') {
		     //$('#id1, #id2').hide();
		     $('#packRowID').hide();
		     $('#usageRowID').hide();
		     
		  } else if (type == 'Yes') {
		     //$('#id1, #id2').show();
			  $('#packRowID').show();
			     $('#usageRowID').show();
			     
		  }
	}



function locationOnChangeZone(id) {
	var value = $(id).val();
	$.ajax({
		url : '../account/locationOnchangeZone?type=Zone&parentId=' + value,
		type : 'GET',
		dataType : "json",
		success : function(data) {

			//$('#zone').html('').append('<option value="">Select</option>');
			$('#kamOwner').html('').append('<option value="">Select</option>');
			 document.getElementById("kamName").value = "";
			for ( var i = 0; i < data.length; i++) {
				$('#kamOwner').append(
						'<option value=' + data[i].userID + '>' + data[i].userID
								+ '</option>');
			}
		},

	});

}


function locationOnSelectKam() {

	 var kamOwner=$('#kamOwner option:selected').text();
	 
	$.ajax({
		url : '../account/locationOnSelectKam?kamOwner='+kamOwner,
		type : 'GET',
		dataType : "json",
		success : function(data) {

			
			document.getElementById("kamName").value = data;
            
			/*for ( var i = 0; i < data.length; i++) {
				$('#usageBasedVID').append(
						'<option value=' + data[i].lovVal + '>' + data[i].lovVal
								+ '</option>');
			}*/
		},

	});

}







function myCorporate() {

	var corporateId='';
	var corporateName='';
	var corporateShortName='';
	var status='Undefined';
	/*var myCorporateDetailsColNames = myCorporateDetailsGetNames();*/
	var myCorporateDetailsColNames=["SearchCorporateID", "", "BS Code", "Corporate Name", "Corporate Short Name", "Status" ,"Creation Date"];
	
	var gridWidth = ($('.tableWrapper2').width() - 10) / 4;
	$('#myCorporateGrid').jqGrid('GridUnload');
	$("#myCorporateGrid")
			.jqGrid(
					{
						url : '../submitSearchCorporate?corporateId='
								+ corporateId + '&corporateName='
								+ corporateName + '&corporateShortName='
								+ corporateShortName + '&status=' + status,
						datatype : 'json',
						mtype : 'POST',
						colNames : myCorporateDetailsColNames,
						colModel : [ 
						             
						             
						             {
									name : 'searchCorporateID',
									label : 'searchCorporateID',
									width : 150,
									align : 'center',
									key : true,
									hidden:true
									
								},{
									name : '',
									label : '',
									width : 80,
									align : 'center',
									hidden:true,
									formatter : function radio(cellValue,
											option) {
										return '<input type="radio" class="chk" name="radio_'
												+ option.gid + '"   />';
									}
								},{
							name : 'corporateId',
							index : 'corporateId',
							key : true,
							align : 'center',
							sortable : false,
							width : 200,
							editable : false,
							formatter : 'showlink', 
							formatoptions : {baseLinkUrl : "javascript:", 
											showAction:"findSr($('#myCorporateGrid'),'','",
											addParam :"');"},
							/*formatter : 'showlink',
							formatoptions : {
								baseLinkUrl : 'javascript:',
								showAction : "getCorporateInfo('",
								addParam : "');"
							}*/

						}, {
							name : 'corporateName',
							index : 'corporateName',
							align : 'center',
							sortable : false,
							width : 300,
							editable : false

						}, {
							name : 'corporateShortName',
							index : 'corporateShortName',
							align : 'center',
							sortable : false,
							width : 300,
							editable : false

						}, {
							name : 'status',
							index : 'status',
							align : 'center',
							sortable : false,
							width : 270,
							editable : false,
							

						},
						{
							name : 'creationDate',
							index : 'creationDate',
							align : 'center',
							sortable : false,
							width : 270,
							editable : false,
							

						}],

						gridview : true,
						toolbar : [ false, "bottom" ],
						rowNum : 5,
						loadonce : true,
						rowList : [ 5, 10, 20 ],
						pager : '#mysearchCorporatePager',
						sortname : 'serviceName',
						viewrecords : true,
						sortorder : "desc",
						editable : true,
						sortable : true,
						height : '100%',
						paging : true,
						onSelectRow : function(row_id) {
							if (row_id != null) {
								row_selected = row_id;
							}
						},

						loadComplete : function(data) {
							// commonMessageBox('Information',  "Inside Loadcomplete");
							// console.log(data);
							// commonMessageBox('Information',  $('#searchCorporateGrid tr').length);
							if ($('#myCorporateGrid tr').length <= 1) {
								$('#mysearchCorporatePager').text("");
								if (data.length == 0) {
									var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>No records available.</center></h3></td></tr>';
								} else {
									var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>'
											+ data.errorCode
											+ ':'
											+ data.errorMessage
											+ '.</center></h3></td></tr>';
								}
								$('#myCorporateGrid').html(msg);
								return false;
							}
							
							
							
							
							
							
							//LO319925 : select row on radio select
							$('#myCorporateGrid tr').find('input[type="radio"]').click(function(){
							  $('#myCorporateGrid tr').find('input[type="radio"]').prop('checked',false);
							  $(this).prop('checked',true);
							  $('#myCorporateGrid').jqGrid('setSelection',$(this).parents('tr').prop('id'));
							  
							});
														
						},
						loadError : function(xhr) {
						}
					});

	$("#myCorporateGrid").jqGrid('navButtonAdd', '#mysearchCorporatePager', {
		caption : "",
		buttonicon : "ui-icon-calculator",
		title : "choose columns",
		onClickButton : function() {
			$("#myCorporateGrid").jqGrid('columnChooser');
		}
	});
	
	//LO319925 : select radio on row select
	$("#myCorporateGrid").bind("jqGridBeforeSelectRow", function (e, rowid, orgClickEvent) {
	    var tmp = $('#myCorporateGrid tr[id="'+rowid+'"]');
	  /*  console.log(tmp);
	    console.log(tmp.find('input[type="radio"]'));*/
	    tmp.find('input[type="radio"]').prop('checked',true);

	    return e.result === false || e.result === "stop" ? false : true;
	});
}




/*function viewCorporate(cellvalue, options, rowObject) {
	var viewID=rowObject.corporateId;
	//return '<a href="javascript:complaintDetailsGrid('+rowObject.complaintID+',' + rowObject.pageSize+');">'+rowObject.callType+'</a>'
	
	return '<a href="window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ corporateId;">'+rowObject.corporateId+'</a>'
}
*/




findSr = function(grid, target, param) {
	var ar = param.split("=");
	var index = ar[1];
	var corporateId = jQuery('#myCorporateGrid').jqGrid('getCell', index, 'searchCorporateID');
	//alert(corporateId);
	window.location.href = '/cims/account/viewCorporateDetails?corporateId='+ corporateId;
//	var srNo = jQuery('#createSrGrid').jqGrid('getCell', index, 'srNo');
//	window.location.href = '../sr/CimSrDetail?srNo=' + srNo + '&acntSubId='
//			+ $("#acntSubId").val();
}






$(function() {
	$(document).on('click', '#validateCugID', function() {

		var link = window.location.href;
		var corporateId = link.substring(link.indexOf('corporateId=')+'corporateId='.length)
		
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	
		var cugList = $('#cugList').val();
		if(cugList==""  || cugList==undefined  || cugList==false)
		{
		commonMessageBox('Information',  "Please Enter CUGID To Validate");
		return false;
		}
		
		$.ajax({
			type: "POST",
			url:'/cims/account/validateCugId?cugList=' + cugList+'&corporateId='+corporateId,
			datatype: 'json',
			success: function(data){
				commonMessageBox('Information', data);
				setTimeout(function(){
					window.location.href = '/cims/account/fetchCorporateDetails?corporateId='+ corporateId;
					}, 2000);
				
			},
			error: function(err){
			}
		});
		
		
		
	});
});



$(function() {
	$(document).on('keyup', '#cugList', function() {
		var regEx = new RegExp(/[^0-9]/g);
		var containsNonNumeric = this.value.match(regEx);
		if (containsNonNumeric) {
			this.value = this.value.replace(regEx, '');
		}
	});
});







function locationOnSelectPackID1() {

	 var type=$('#packID option:selected').text();
	$.ajax({
		url : '../account/locationOnSelectVID?type='+type,
		type : 'GET',
		dataType : "json",
		success : function(data) {
			var html = "";
       //$('#usage').html('').append('<option value="">Select</option>');
       for ( var i = 0; i < data.length; i++) {
             html += data[i].lovName + '-' + data[i].lovVal + '\n';
             //document.getElementById('usage').style.height="200px";
             /*$('#usage').append(
                         '<option value=' + data[i].lovName + '>' + data[i].lovName
                                     + '</option>');*/
       }
       			html += "";
       			document.getElementById("usage").value = html
 },

	});

}

function doa(){
	var bsType = $('#corporateTypeId').val();
	if(bsType=="")
		{
			$("#corporateTypeId").val("COCP");
			document.getElementById("corporateTypeId").disabled = true;
		}
	$('#dateOfAgreement1').datepicker('destroy');
	$('#dateOfAgreement1').datepicker({'minDate': new Date($('#createdDate1').val()), 'maxDate':$('#dateOfExpiry1').val()});
    if($('#dateOfAgreement1').val() != ''){ 
		var expDate = new Date($('#dateOfExpiry1').val());
        var agreeDate = new Date($('#dateOfAgreement1').val());
		console.log(expDate,agreeDate)
        if(expDate-agreeDate < 0) {
			$("#dateOfAgreement1").datepicker('setDate', expDate);
        }
    }
    
    if($("#selectVID").val())
    {
    	 if($("#packID").val())
     	{
     	 $('#create1').prop('checked', true);
     	}
        
        $('#create').prop('checked', true);
        hideRow('Yes');
       
    }
    else
    	{
    	hideRow('No');
    	}
    
}
// COIP CR Code Starts
$(document).ready(function(){
	if ( $("#parentCorporate").is(":checked") ) {
		$('#searchedCorporate+div').eq(0).find('tbody tr td').eq(6).hide();
	}
	
	if($("#status").val() == "PUBLISHED" ){
		document.getElementById("corporateTypeId").disabled = true;
	}
});
//COIP CR Code Ends

jQuery(document).on('click', '#makeCSVCorporate',
		function() {
	var userType=$('#userType').val();
	var corporateId = $('#bsCode').val();
	var corporateName = $('#corporateName').val();
	var corporateShortName = $(
			'#corporateShortName').val();
	var status = $('#status').val();
	var zone=$('#zone').val();
	var kamUser= $('#kamUser').val();
	var parentBSCode=$('#parentBSCode1').val();
	if (corporateId != "" || corporateName != ""
			|| corporateShortName != ""
			|| status != "" 
				|| zone!=""
					|| kamUser!=""
						||parentBSCode!="") {
		window.location='/cims/account/exportCorporateDetails?corporateId=' + corporateId+'&corporateName='+corporateName+'&corporateShortName='+corporateShortName+'&status='+status+'&zone='+zone+'&kamUser='+kamUser+'&parentBSCode='+parentBSCode;
		/*searchCorporate(corporateId, corporateName,
				corporateShortName, status ,zone,kamUser,parentBSCode);
		*/
		//$("#corporateList").css({'display':'block'});
	} else {
		commonMessageBox('Information',  "Please fill search criteria");
	}
});



function checkMaxDigits(el, max){
	var val = $(el).val();
	if(val.length > max) {
		$(el).val( val.substr(0,max));
    }
}



function addressValidation(e){
	if(e.charCode == "38" || e.charCode == "60" || e.charCode == "62"){
		return false;
    }
	return true;
}