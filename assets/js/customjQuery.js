(function($) {
	
	function toggleTable(ele) {
        if ($('.maximizer').text() === "[-]") {
            $('.maximizer').text('[+]');
            $('.DetailWrapper').find('table table tr').hide();
            $('table#segmentation_info').closest('tr').show();
            $('.DetailWrapper').find('table#account_info tr:eq(1), table#personal_info tr:eq(1), table#circleZone_info tr:eq(1), table#mnp_info tr:eq(1), table#segmentation_info tr:eq(0)').show();
            $('table#personal_info').css('width', '200px');
            $('table#personal_info input').css({'width': '42px', 'float': 'left'});
            $('#fName, #mName').next('br').remove();
        } else {
            $('.maximizer').text('[-]');
            $('.DetailWrapper').find('tr:hidden').show();
            $('table#personal_info, table#personal_info input').removeAttr('style');
            $('#fName, #mName').after('<br class="clear" />');
        }
    }

 function expandCollapseViewOf($this) {
    var divv = '[class^="tableWrapper"]';
        if ($this.text() === '[-]') {
            $this.text('[+]');
            $this.parent().siblings(divv).hide();
            $this.closest('div').css({'height': 'auto'}).removeClass('heightAuto');
        } else {
            $this.text('[-]');
            $this.parent().siblings(divv).show();
            $this.closest('div').removeAttr('style').addClass('heightAuto');
        }
    }

    function showMinViewOf($this, $maxTable, $minTable) {
        if ($this.text() === '[-]') {
            $this.text('[+]');
            $maxTable.closest('.acTbl').hide();
            $minTable.show();
        } else {
            $this.text('[-]');
            $maxTable.closest('.acTbl').show();
            $minTable.hide();
        }
    }
    
    function showMinViewOfURL($maxTable, $minTable) {
        if ($('#maximizerValue').text() === '[-]') {
            $('#maximizerValue').text('[+]');
            $maxTable.closest('.acTbl').hide();
            $minTable.show();
        } else {
            $('#maximizerValue').text('[-]');
            $maxTable.closest('.acTbl').show();
            $minTable.hide();
        }
    }

    function showCustPopup() {
        $('.popup').css('top', '-60px').fadeIn('fast', function() {
            $(this).animate({'top': '+=' + 65}, 600).draggable({containment : "#wrapper", scroll: false});
        });
    }

    function showPopUpFor(page) {
    	        var custInfo = $('input[name="custInfo"]').val(),
                myWindow = 'cust-info.html?' + custInfo,
                myWindow2 = 'ques2ask.html?' + custInfo,
                myWindow3 = 'changemsisdn.html',
                myWindow4 = 'changeimsi.html',
                myWindow5 = 'addchangerider.html',
                myWindow6 = 'disconnect.html',
                campaignshowdetails = 'campaignsShowDetails.html',
                campaignshowusage = 'campaignsShowUsage.html',
                winOptions = 'width=380, height=160, resizable=no, status=no',
                winOptions2 = 'width=728, height=252, resizable=no, status=no',
                winOptions3 = 'width=' + ($(window).width() * (75 / 100)) + ', height=252, resizable=no, status=no',
                campaignOptions = 'width=' + ($(window).width() - 20) + ', height=252, resizable=no, status=no';

        if (page == "summary"/* && custInfo == "Sell VAS"*/) {
            //window.open(myWindow, 'self', winOptions);
            showCustPopup();
            //repeatCaller(); 
        }
        if (page == "partSummary"/* && custInfo == "Sell Commissions"*/) {
            //window.open(myWindow, 'self', winOptions);
            showCustPopup();
        }
        if (page == "changeMSISDN") {
            window.open(myWindow3, 'blank', winOptions3);
        }
        if (page == "changeIMSI") {
            window.open(myWindow4, 'self', winOptions3);
        }
        if (page == "addchangeRider") {
            window.open(myWindow5, 'self', winOptions3);
        }
        if (page == "permanent_disconnected") {
            window.open(myWindow6, 'self', winOptions3);
        }
        if (page === "campaignsShowDetails") {
            window.open(campaignshowdetails, 'self', campaignOptions);
        }
        if (page === "campaignsShowUsage") {
            window.open(campaignshowusage, 'self', campaignOptions);
        }
    }
	
    $(function() { // <-----document ready's shorter way
    	
    	accountTabsLoadStatus = 0;
    	
    	  if($('#partnerFlag').val() == "N"){
			  $('.gotoPartnerDiv').hide();
		  }
		  if($('#partnerFlag').val() == "Y"){
			  $('.gotoPartnerDiv').show();
		  }
    	
		  // Comment to resolve bug of open multiple url's window in url integration.
		  /*$(document).on('click',	'.callURL a, .callURL[type="button"]', function(e) {
			 if($('#urlPartnerFlag').val() != "Y"){
				e.preventDefault();
				$this = $(this);
				var source = $this.text() || this.value;
				var msdnVal = $.trim($('#customerMSISDN').val()) || $.trim($('#msisdn').val()) || "";
				var acntSubId = $("#acntSubId").val();
				$.ajax({
					url:"getUrlDetails?source=" + source + "&msdnVal=" +msdnVal + "&accntSubsId=" +acntSubId,
					type:"post",
					dataType:"json",
					success: function(data){
						
						$.each(data, function(key, item){
							if(item.errorMessagePage == "" || item.errorMessagePage == undefined){
								window.open(item.url, 'self', 'top=10');
							}else{
								commonMessageBox('Information', item.errorMessagePage);
								return false;
							}
							
						});
					}, error: function(data){
						commonMessageBox('Information', "Request cannot be processed at this page.");
					}
				});
			 }
			});*/
		  
		  $(document).on('click',	'.callURL , .callURL[type="button"]', function(e) {

				//, .callURL[type="button"]
				e.preventDefault();
				$this = $(this);
				var source = $this.text() || this.value;
				var msdnVal = $.trim($('#customerMSISDN').val()) || $.trim($('#msisdn').val()) || "";
				var msisdn ="880"+msdnVal;
				var acntSubId = $("#acntSubId").val();
				
				var loyalityStatus = $('#loyalityStatus').val();
				var loginUser = $('#sessionUserId').val();
				var customerName = $('.bgHead h2 #cName').text();
				var Companyname = $('#corporateName').val();
				var bsCode = $('#corporateShortName1').val();
				var product = $('#customerType').val();
				var ratePlan=$('#plan').val();
				
				if(customerName==null ||customerName==""){
					customerName=null;
				}
				if(Companyname==null ||Companyname==""){
					Companyname=null;
				}
				if(bsCode==null ||bsCode==""){
					bsCode=null;
				}
				if(loyalityStatus==null ||loyalityStatus==""){
					customerName=null;
				}
				
				
				$.ajax({
					url:"getUrlDetails?source=" + source + "&msdnVal=" +msdnVal + "&accntSubsId=" +acntSubId,
					type:"GET",
					dataType:"json",
					success: function(data){
						
						$.each(data, function(key, item){
							if(item.errorMessagePage == "" || item.errorMessagePage == undefined){
								if($this.closest('ul').attr('id')  == "urlClickId")
									{
									   var params = ['height='+screen.height,
									              'width='+screen.width,
									              'fullscreen=yes'].join(',');
									   /*var popup = window.open(item.url,"bfs",params);
									   //popup.moveTo(0,0);
									   // Anubha...
									    if (window.focus) {popup.focus()}
									       return false;*/
									   var win = window.open(item.url,'_blank');
									   if (win) {
										    //Browser has allowed it to be opened
										   win.focus();
										} /*else {
										    //Browser has blocked it
										    alert('Please allow popups for this website');
										}*/
									  
									}
								else
									{
									  //window.open(item.url, "urlIntegration-a");
										if(source =="SRMS"){
											 //console.log(data[0].url);
											 a =item.url;
											 url= a+ 'msisdn='+msisdn
														+ '&crmloginuser='+loginUser
														+ '&customername='+customerName
														+ '&companyname='+Companyname
														+ '&product='+ratePlan
														+ '&loyaltyindicator='+loyalityStatus
														+ '&bscode='+bsCode;
											 document.getElementById('urlIntegration-a').src = url;
										}else{
											document.getElementById('urlIntegration-a').src = item.url;
										}
									}
								
							}else{
								alert(item.errorMessagePage);
								return false;
							}
							
						});
					}
				});

			});
		  
		  
    	// For go to partner //
    	var msdnVal = $('#customerMSISDN').val();
    	$('.gotopartner').on('click', function(e){
    		//commonMessageBox('Information', "In Go To Partner**** value of msisdn is:::::"+msdnVal);
    		e.preventDefault(); // ==  return false;
    		
    		$.ajax({
    			 	url: 'getPartnerCode?msisdn='+msdnVal,
    			 	type: 'POST',
    		     	datatype: 'json',
    		        cache: false,
    		        contentType: "application/json; charset=utf-8",
    		       /* beforeSend: function(){
    	    			var loading = "<div id='progress' style='position:absolute; width:150px; height:20px; text-align:center; line-height:20px; left:50%; top:50%; margin:-10px 0 0 -75px; border:2px orange solid; background:white; color:blue; font-size: 11px;'>Loading...</div>";
    	    			$(document).append(loading);
    	    		},*/
    		        success: function (data) {
    		        	
    		        	var oldUrl = window.location.href;
    		        	var contextPath = oldUrl.substr(0, oldUrl.indexOf('/account/'));
    		        	var partnerLink ='/partner/getPartnerDetails?partnerCode=';
    		        	
    		        	$.each(data, function(i, item){
    		        		window.location.href =contextPath+partnerLink+item.partnerCode;
						});
    		        	
    		        },
    		        error: function (xhr, st, err) {
    		        	commonMessageBox('Information', xhr.responseText);
    		        }/*,
    		        complete: function(){
    		        	$('#progress').toggle('explode').remove();
    		        }*/
    		});
    		
    	});
    	// For go to partner //
    	
    	// For go to account //
    	
    	
    
    	$('.gotoaccount').on('click', function(e){
    		//var pCode = 'Partner3';
			var pCode = $('#partCode').val();
    		//commonMessageBox('Information', "In Go To Account**** value of p code is:::::"+pCode);
    		e.preventDefault(); // ==  return false;
    		
    		$.ajax({
    			 	url: 'getPartnerMsisdn?partnerCode='+pCode,
    			 	type: 'POST',
    		     	datatype: 'json',
    		        cache: false,
    		        contentType: "application/json; charset=utf-8",
    		        /*beforeSend: function(){
    	    			var loading = "<div id='progress' style='position:absolute; width:150px; height:20px; text-align:center; line-height:20px; left:50%; top:50%; margin:-10px 0 0 -75px; border:2px orange solid; background:white; color:blue; font-size: 11px;'>Loading...</div>";
    	    			$(document).append(loading);
    	    		},*/
    		        success: function (data) {
    		        	
    		        	var oldUrl = window.location.href;
    		        	var contextPath = oldUrl.substr(0, oldUrl.indexOf('/partner/'));
    		        	var accountLink ='/account/submitAccountDetails?msisdn=';
    		        	
    		        	$.each(data, function(i, item){
    		        		window.location.href =contextPath+accountLink+item.partnerMsisdn;
						});
    		        	
    		        },
    		        error: function (xhr, st, err) {
    		        	commonMessageBox('Information', xhr.responseText);
    		        }/*,
    		        complete: function(){
    		        	$('#progress').toggle('explode').remove();
    		        }*/
    		});
    		
    	});
    	
    	
    	// For go to account //
    	
    	$('.srDetailsWrapper :input').not('textarea[name="resolution"], input[type="submit"]').prop('disabled', true);
        $('.srDetailsWrapper :disabled').css({'background': '#e5e5e5', 'border': 'solid 1px #ccc'});
        $('.cafDetailsWrapper :input').not('#cafRefresh').prop("disabled", true);

        $('.navigation li, .navigation li a').on('mouseenter', function() {
            $('ul', this).css({'top': $(this).closest('li')[0].scrollHeight + 5, 'left': $(this).position().left + 20}).slideDown('fast');
        }).on('mouseleave', function() {
            $('ul', this).stop().slideUp('fast');
        });
        
        $('.latInfoWrapper img').on('click', function() {
            var whichClass = this.className;
            if (whichClass === "min") {
                $('.latInfo ol').stop().slideToggle('fast');
            } else {
                $('.latInfoWrapper').stop().slideUp('fast', function() {
                    $(this).fadeOut();
                });
            }
        });

        $('.goRight:not(:first)').each(function() {
            // $(this).width($(this).closest('.binRow').width() - 2);
        });
        $('.navigation ul:not(.submenu)').width($(window).width() - 300);
        
        $('.cafTblWrapper:odd').css('float', 'right');

        $('.tableWrapper tr, .tableWrapper2 tr, .tableWrapper3 tr, .tableWrapper4 tr, .tableWrapper5 tr').each(function() {
            $('th:last', this).css('border-right', 'none');
            $('td:last', this).css('border-right', 'none');
        });
        
        //var custName = $('#firstName').val() + " " + $('#middleName').val() + " " + $('#lastName').val() + " - " + $('#customerMSISDN').val()
        var custName = $('#name').val()+ " - " + $('#customerMSISDN').val()
        $('.CustName').html(custName);
        var partnerInfo = $('#partName').val() + " - " + $('#eloadMsisdn').val() + " - " + $('#partType').val() + " - " + $('#territoryName').val() + ", " + $('#zoneName').val() + ", " + $('#circleName').val()
        $('.partInfo').html(partnerInfo);

        
        $(window).on('resize', function() {
            if (window.location.href.indexOf('login.html') > 0) {
                $('.loginBox').height($(window).height() - $('#header').height());
                $('#content').css('padding', '0');
                $('#header').css('margin', '0');
            }
        }).resize();
        
        
        if ($('#partSummary').is(':visible')) { //$('#partSummary').is(':visible')
        	showPopUpFor("partSummary"); // showPopUpFor("partSummary");
        }

        $('.maximizer').on('click', function() {
            //toggleTable($(this));
            showMinViewOf($(this), $('.maxInfo'), $('.minInfo'));
        });
        
        $('.maximizerText').on('click', function() {
            //toggleTable($(this));
            showMinViewOfURL($('.maxInfo'), $('.minInfo'));
        });

        $('.expander').on('click', function() {
            expandCollapseViewOf($(this));
        });

        $('.partnerMaximizer').on('click', function() {
            showMinViewOf($(this), $('#maxInfoParent'), $('.minInfo'));
        }).click();
        
        $('.serviceTabContentWrapper a').on('click', function(e) {
            e.preventDefault();
            $('#partSummary').click();
        });

        $('.getQues').on('click', function() {
            window.open('ques2ask.html', 'blank', 'width=728, height=252, resizable=no, status=no');
        });
        
        $('.popup.default strong').click(function() {
            $('.overlay, .popup.default').fadeOut('fast', function() {
                $('.popup.default').css('top', '0');
            });
        });
        $('.popup.sr strong').click(function() {
            $('.overlay, .popup.sr').fadeOut('fast', function() {
                $('.popup.sr').css('top', '0');
            });
        });

        $(document).on('keyup keypress', function(e) {
            var kc = e.keyCode || e.which;
            if (kc == 27) {
                $('.popup strong').click();
            }
        });

        $('.details table td:even').css('text-align', 'right');

        $('.minimize img').on('click', function() {
            $(this).parent().siblings('.viewed-box').find('.details').slideToggle('fast');
        });
        $('.close img').on('click', function() {
            if ($(this).closest('.frequentBox').length > 0) {
                $(this).closest(".frequentBox").fadeOut('fast', function() {
                    $(this).closest(".frequentBox").remove();
                });
            } else {
                $(this).closest(".recordsRecent").fadeOut('fast', function() {
                    $(this).closest(".recordsRecent").remove();
                });
            }
        });
        
        
        $('.tabContentWrapper').on('click', 'button', function() {
        	
            $('button').removeAttr('style');
            $(this).css('font-weight', 'bold');
        });
        
        /**
         * Show inactive list
         */
		//TODO TnM Start by Guru
        $('.rht [type="button"]').on('click', function() {
			var accountSearchResults = $('#accSearchResults').val();
			var latestExpiredAccount = $('#lExpiredAccount').val();
			var partnerSearchResults = $('#partSearchResults').val();
			var latestExpiredPartner = $('#lExpiredPartner').val();
			
            if (this.id === "showInactiveAccount") {
                //$('.lft').text('Latest Expired Account');
                $('.lft').text(latestExpiredAccount);
                
                var msisdn = $.trim($('#msisdn').val());
    			var simNumber = $.trim($('#simNumber').val());
    			var mnpNumber = $.trim($('#mnpNumber').val());
    			
    			$('.showOthers').hide();
                $('.showInactive').show();
                
                customerGridShowExpired(msisdn, simNumber, mnpNumber);
                
            } else if(this.id=="showOthersAccount"){ 
                //$('.lft').text('Accounts Search Results');
                $('.lft').text(accountSearchResults);
                $('.showInactive').hide();
                $('.showOthers').show();
            }else if (this.id === "showInactivePartner") {
                //$('.lft').text('Latest Expired Partner');
                $('.lft').text(latestExpiredPartner);
                $('.showOthers').hide();
                $('.showInactive').show();
            } else if(this.id=="showOthersPartner"){
                //$('.lft').text('Partner Search Results');
                $('.lft').text(partnerSearchResults);
                $('.showInactive').hide();
                $('.showOthers').show();
            }
            $(this).hide().siblings('[type=button]').show();
            
        });            
        
        $('.sbmtbtn').on('click', function(){
        	var $btnID = this.id;
			var accountSearchResults = $('#accSearchResults').val();
			var partnerSearchResults = $('#partSearchResults').val();
			($btnID == "aSearch")? $('.lft').text(accountSearchResults) : $('.lft').text(partnerSearchResults);
        	//($btnID == "aSearch")? $('.lft').text('Accounts Search Results') : $('.lft').text('Partners Search Results');
        });
         //TODO TnM END
       
        /*
         * Common tabs li click for all the tabs in account's details page.
         */
        $(function(){
			 
			 $(document).on('click', '.acTabsWrapper ul li', function() {
		            var page = this.id;
		            
		            $('#tabAction').val(page);
		            
		            if(page=='' || page=='summary' || page=='activity' || page=='account'){
		            	$('#accountTabsLoading').css("display","none");
						$('#includeAccountTabs').css("display","block");
		            }
		            
		            $(this).addClass('active').siblings().removeClass('active');
		            if(page=='realCDR' || page=='profile' || page=='waivers' || page=='orders' || page=='vas' || page=='barUnbarBin' || page=='caf' || page=='pushsmswrapper' || page=='accountAttachment' || page=='postPaidBill' || page=='hlrView'|| page=='mfs' || page=='accountDnd' || page=='irDepositView') {
			            if(accountTabsLoadStatus==0){
							 $('#accountTabsLoading').css("display","block");
							 $('#includeAccountTabs').css("display","none");
						 } else if(accountTabsLoadStatus==1){
							 $('#accountTabsLoading').css("display","none");
							 $('#includeAccountTabs').css("display","block");
						 }
		            }
		            
		            $('.' + page).siblings(':not(ul)').hide();
		            $('.' + page).show();
		            $(this).addClass('active').siblings().removeClass('active');
		            
		            if (page == "summary") {
		                showPopUpFor(page);
		            }
		            
		            var $tabWrapWidth = $('.tabContentWrapper').width();
		            $('.tableWrapper2, .tableWrapper4, .tableWrapper5').each(function() {
		                $(this).width($tabWrapWidth - 2);
		            });
			
			 }); 
		});
        
        
        /**
         * On click of buttons show and hide the tables in the view of bins.
         */

        $('.tabcontentControlBar').on('click', 'button', function() {
        	
            var tbl = this.id;
            $(this).addClass('activeTbl').siblings('button').removeClass('activeTbl');
            $('.' + tbl).siblings('table').hide();
            $('.' + tbl).show();
        });
        $(window).load(function() {
            $("#prpTable1, #pcTable1").addClass('activeTbl');
        });
        
        
        /**
         * CAMPAIGNS BUTTONS CLICK EVENT TO SHOW POPUPS
         * FOR --> SHOWDETAILS BTN <--
         * AND --> SHOWUSAGE BTN   <--
         */
        $('.activecamp button').on('click', function() {
            showPopUpFor(this.id);
        });


        /**
         * function for changing the PASS WAIVERS btn
         * on change of dci select and btn should appear at all
         * cdr views except 
         * "talk time transfer", 
         * "all charged details", 
         * "drop call details", 
         * "recharge details"
         */
        $('#cdrViews').on('change', function() {
            var $id = this.value, txt = $('option:selected', this).text();
            $(this).siblings('strong').text(txt);
            $(this).closest('.binRow').find('table').hide();
            $('table[id="' + $id + '"]').show();
            $('.recieveCust, .sent2Cust, .unsuccTrans').hide();
            if (txt === "Talktime Details") {
                $(this).siblings('input[type="button"]:not(.refresh)').hide();
                $('.recieveCust, .sent2Cust, .unsuccTrans').show();
            } else if (txt === "All Charged Details") {
            	$(this).siblings('input[type="button"]:not(.refresh)').hide();
            } else if (txt === "Drop Call Details") {
            	$(this).siblings('input[type="button"]:not(.refresh)').hide();
            } /*else if (txt === "Recharge Details") {
            	$(this).siblings('input[type="button"]:not(.refresh)').hide();
            } */else if (txt === "Free Voice/SMS Details") {
            	$(this).siblings('input[type="button"]:not(.refresh)').hide();
            } else {
                $(this).siblings('button, input[type="button"]').show();
                $('.recieveCust, .sent2Cust, .unsuccTrans').hide();
            }
        }).change();

        /**
         * push sms template changer
         */
        
        $(document).on('change','#template',function(){
        	
            $(this).closest('tr').find('input[type="text"]').val(this.value);
           
        });



        /**
         * Last 20 select changer
         */
        $('#last20').on('change', function() {
            var currDiv = $(this).val();
            var currTxt = $('option:selected', this).text();
            $(this).siblings('strong').text(currTxt);
            $('.' + currDiv).show().siblings(':not(.tabcontentControlBar)').hide();
        }).change();



        /**
         * .acTransHis button click show tables
         */
        $('.acTransHis button').on('click', function() {
            var tblId = this.id;
            $('.acTransHis table').hide();
            $('.' + tblId).show();
        });

        /**
         * ADMINISTRATION STUFF
         */

        $('#empresultrows a').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.Rows').siblings('.hidden').removeClass('hidden');
            $('#assignmentSkills').click();
        });

        $('#fromDate, #toDate').addClass('calendar').datepicker({maxDate : new Date()});

        $('.bulkSearch').on('click', '.srbtnGo', function() {
            $(this).closest('.bulkSearch').siblings('.bulkSRsearchResult').show();
        });

        $('.orderTypes').on('change', function() {
            var select2show = this.value;
            $('.ordersubtype').hide();
            $('select.' + select2show).show();
        });
        
        /**
         * USER MANAGEMENT
         */
        $('.roleFuncs table a').on('click', function(e) {
            e.preventDefault();
            var clicked = $(this).closest('td').siblings('td').text();
            var myWindow = 'role-funcs.html?' + clicked, winOpt = 'width=534, height=508, menubar=no, addressbar=no, resizable=no, status=no';
            window.open(myWindow, 'self', winOpt);
        });
        
        $('#tvBtnWrapper input[type="button"]:not(#approve)').on('click', function(){
            var btnid = this.id;
            //console.log('[id="'+btnid+'Tbl"]');
            $('#rejectPending').show();
            $('[id="'+btnid+'Tbl"]').show().siblings('[id$="Tbl"]').hide();
        });

        
        
        
        // =================================================== Account Telescreen Starts =================================================================
        
    	$('#approve , #reject, #pending').prop('disabled', true);
    	
    	$('#tagHead').hide();

    	$('.tvHead').css('border', 'none');

    	$('[id$="Remarks"]').on('keydown',function(){
    		
    	if(this.id == 'pendingRemarks'){
    			
    			if(this.value.length >= 200){
    			    commonMessageBox('Information', 'Maximum length achieved.');
    			}
    			}if(this.id == 'rejectRemarks'){
    			if(this.value.length >= 500){
    			    commonMessageBox('Information', 'Maximum length achieved.');
    			}
    		}
    		
    	});


    	
    	$('#gobT').on('click', function(){
    		
    		var msisdn = $.trim($('#msisdn').val());
    		var regEx = /^[0-9]*$/;
    		if (msisdn == "") {
    			commonMessageBox('Information', "MSISDN Number Required.");
    			$('#msisdn').focus();
    			return false;
    		}
    		if (!regEx.test(msisdn)) {
    			commonMessageBox('Information', "MSISDN Number is numeric field only.");
    			$('#msisdn').focus();
    			return false;
    		}
    		if((msisdn != "") && (msisdn.length < 10)) {
    			commonMessageBox('Information', "MSISDN number should be 10 digit.");
    			//flag = false;		
    			return false;
    		}
    		$('#rejectTbl, #pendingTbl,#tagHead').hide();
    		
    		
    		
    		$.ajax({
    			url:"getTeleVerificationInfo?msisdn="+msisdn,
    			type:"GET",
    			datatype:"json",
    			cache:false,
    			beforeSend: function(){
    				$('.cafDetailsWrapper :input').val("");
        			var loading = "<div id='progress' style='position:absolute; width:150px; height:20px; text-align:center; line-height:20px; left:50%; top:50%; margin:-10px 0 0 -75px; border:2px orange solid; background:white; color:blue; font-size: 11px;'>Loading...</div>";
        			$('#tvDetails').css('position', 'relative').append(loading);
        			$(this).closest('table').find(':input:not(#msisdn, #gobT)').val('');
        		},
    			success : function(resp){
    			    $.each(resp, function(i, data){
    			        $("#msisdn").val( data.msisdn);
    			        $("#cafNumber").val( data.cafNumber);
    			        $("#cafTrackingStatus").val(data.cafTrackingStatus);   
    			        $("#activationDate").val(data.activationDate);
    			       // $("#activationDate").val(formatJSONDate((data.activationDate)));
    			        $("#customerName").val( data.customerName);
    			        $("#fatherHusbandName").val( data.fatherHusbandName);
    			        $("#gender").val( data.gender);
    			        $("#mnp").val( data.mnp);
    			        $("#localAddress").val( data.localAddress);
    			        $("#circleId").val( data.circleId);
    			        $("#Reason").val( data.Reason);
    			        $("#pendingReason").val( (data.pendingReason == "?") ? "" : data.pendingReason);
    			        $("#rejectionReason").val( (data.rejectionReason == "?") ? "" : data.rejectionReason);
    			        $("#noOfCountPending").val( data.noOfCountPending);
    			        $("#tvFlag").val( data.tvFlag);
    			       
    			    }); 
    			     
    			    },
    			    complete: function(){
    			    	var CAFStatus=$('#cafTrackingStatus').val();
    			    	var TVflg=$('#tvFlag').val();
    			    	
    			    	//checks added by kinjal
    			    	if(CAFStatus=="In-Progress" || CAFStatus=="CAF-Received-Completed" || CAFStatus=="CAF-Scanned-Complete"){
    			    		if(TVflg==null || TVflg==""){
    			    			//commonMessageBox('Information', "tv flag value:::::::"+TVflg);
    			    			$('#approve,#reject,#pending,#rejectTR1,#rejectTR2,#pendingTR1,#pendingTR2').prop('disabled', false).removeAttr('style');
    			    		}
    			    		else if(TVflg=='Y' || TVflg=='N'){
    			    			$('#approve,#reject,#pending,#rejectTR1,#rejectTR2,#pendingTR1,#pendingTR2').prop('disabled', true);
    			    		}
    			    	}
    			    	else if(CAFStatus=="Rejected" || CAFStatus== "CAF-Received-Incomplete"){
    			    		if(TVflg=='N'){
    			    			$('#approve,#reject,#pending,#rejectTR1,#rejectTR2,#pendingTR1,#pendingTR2').prop('disabled', true);
    			    		}
    			    		else{
    			    		$('#rejectTbl').hide();
    			    		$('#approve,#pending,#rejectTR1,#rejectTR2,#pendingTR1,#pendingTR2').prop('disabled', true);
    			    		$('#reject').prop('disabled', false).removeAttr('style'); 
    			    		}
    			    		
    			    	}
    			    	else{
    			    		$('#approve,#reject,#pending,#rejectTR1,#rejectTR2,#pendingTR1,#pendingTR2').prop('disabled', true);
    			    	}
    			    	
    			    	
    			    	
    			    	
    				
    					
    					$('#tvDetails input[type="button"].btnGo:disabled').css({'color':'#666', 'border':'solid 1px #777', 'background':'#ccc'});
    					$('#progress').remove();
    			    },
    			    error : function(xhr, ajaxOptions, thrownError) {
    			    	 commonMessageBox('Information', "Please try after sometime.") ; 
    			                   }
    		});
    	});
    	
    	
    	function formatJSONDate(value) {
    		  if (typeof value === 'string') {
    		    var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:([\+-])(\d{2})\:(\d{2}))?Z?$/.exec(value);
    		    
    		      if (a) {
    		    	  
    		        var utcMilliseconds = Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]);
    		        return new Date(utcMilliseconds);
    		      }
    		  }
    		  return value;
    		}
    	
    	
    	
    	$('#reject').on('click', function(){
    	
    		//commented by  kinjal according to present functionality
    		var msisdn = $.trim($('#msisdn').val());
    		var CAFStatus=$('#cafTrackingStatus').val();
        	var TVflg=$('#tvFlag').val();
        	var action='OG_TO_TSP_BAR';
        	if(CAFStatus=="In-Progress" || CAFStatus=="CAF-Received-Completed" || CAFStatus=="CAF-Scanned-Complete"){
        		if(TVflg==null || TVflg==""){
        			$('#tagHead').closest('table').show();
        			$('#rejectTbl').show();
        			$('#tagHead').show();
    				$('.tvHead').removeAttr('style');
        			 $.ajax({
        					url:"accountTVReason.do?Type=Reject&msisdn="+msisdn,
        					type:"get",
        					datatype:"json",
        					cache:false,
        					success : function(resp){
        						$('#pendingRemarks').val('');
        						$('#rejectRemarks').val('');
        					    $("#rejectReason").html('').append('<option value="0">Select rejection reason...</option>');
        					    $.each(resp, function(i, data){

        							$("#rejectReason").append('<option>'+data.lovVal+'</option>');
        					
        					    });
        					    
        					         
        					     
        					    },
        					    error : function(xhr, ajaxOptions, thrownError) {
        					    	 commonMessageBox('Information', "Please try after sometime.") ; 
        					                   }
        				}); 
        		}
        		
        	}
        	else{
    			$('#rejectTbl').hide();
    			
    				 
    			$.ajax({
    				url:"submitTeleVerification.do?msisdn="+msisdn+"&circleId="+circleId+"&action="+action,
    				type:"get",
    				datatype:"json",
    				cache:false,
    				success : function(resp){
    					 $.each(resp, function(i, data){


    						 	if(data.status == 'Success'){
    						 		commonMessageBox('Information', "The request has been succesfully submitted.");
    						 	}
    						 		
    					
    					    });
    					 $('#gobT').click();
    				    },
    				    error : function(xhr, ajaxOptions, thrownError) {
//    				                      
    				    	 commonMessageBox('Information', "Please try after sometime.") ; 
    	                  }
    			});
    			
    		}
    		
    	});
    	
    	
    	$('#pending').on('click', function(){
    		var msisdn = $.trim($('#msisdn').val());
    		$('#tagHead').closest('table').show();
    		$('#tagHead').show();
    		$('.tvHead').removeAttr('style');
    		$.ajax({
    			url:"accountTVReason.do?Type=Pending&msisdn="+msisdn,
    			type:"get",
    			datatype:"json",
    			cache:false,
    			success : function(resp){
    			    $("#pendingReasonDropDown").html('').append('<option value="0">Select pending reason...</option>');
    			    $('#pendingRemarks').val('');
    				$('#rejectRemarks').val('');
    			    $.each(resp, function(i, data){

    					$("#pendingReasonDropDown").append('<option>'+data.lovVal+'</option>');
    					
    			
    			    });
    			    
    			         
    			     
    			    },
    			    error : function(xhr, ajaxOptions, thrownError) {
    			    	 commonMessageBox('Information', "Please try after sometime.") ; 
    			                   }
    		});
    	});
    	
    	
    	
    	$('#approve').on('click', function(){
    		
    			var msisdn = $('#msisdn').val();
    			var circleId=$('#circleId').val();
    			var action='OG_IC';
    			
    			$.ajax({
    			url:"submitTeleVerification.do?msisdn="+msisdn+"&circleId="+circleId+"&action="+action,
    			type:"get",
    			datatype:"json",
    			cache:false,
    			success : function(resp){
    				 $.each(resp, function(i, data){


    					 	if(data.status == 'Success'){
    					 		commonMessageBox('Information', "The request has been succesfully submitted.");
    					 	}
    					 		
    				
    				    });
    				 
    				 $('#gobT').click();
    			    },
    			    error : function(xhr, ajaxOptions, thrownError) {

    			    	 commonMessageBox('Information', "Please try after sometime.") ; 
                      }
    		});
    	});
    	
    	
    	

    	$('#subTvVeriPend , #subTvVeriRej').on('click', function(){
    		 var row = ($('#rejectTbl:visible').length > 0) ? $('#rejectReason').val() : $('#pendingReasonDropDown').val();
    		
    		var msisdn = $('#msisdn').val();
    		var circleId=$('#circleId').val();
    		var action = ($('#rejectTbl:visible').length > 0) ? 'OG_TO_TSP_BAR' : 'Pending';
    		var reason=($('#rejectTbl:visible').length > 0) ? $('#rejectReason').val() : $('#pendingReasonDropDown').val();
    		var remarks=($('#rejectTbl:visible').length > 0) ? $('#rejectRemarks').val() : $('#pendingRemarks').val();
    		
    		 	if(row == 0){
    			 commonMessageBox('Information', 'Please Select the Reason');
    			 return false;
    		 	}
          		if(remarks==""){
        	 	 commonMessageBox('Information', 'Please Enter Remarks');
    			 return false;
          }
    		
    		$.ajax({
    			url:"submitTeleVerification.do?msisdn="+msisdn+"&circleId="+circleId+"&action="+action+"&remarks="+remarks+"&reason="+reason,
    			type:"get",
    			datatype:"json",
    			cache:false,
    			beforeSend: function(){
        			var loading = "<div id='progress' style='position:absolute; width:150px; height:20px; text-align:center; line-height:20px; left:50%; top:50%; margin:-10px 0 0 -75px; border:2px orange solid; background:white; color:blue; font-size: 11px;'>Loading...</div>";
        			$('#tvDetails').css('position', 'relative').append(loading);
        		},
    			success : function(resp){
    				 $.each(resp, function(i, data){

    					 	if(data.status == 'Success'){
    					 		commonMessageBox('Information', "The request has been succesfully submitted.");
    					 	}
    					 		
    				
    				    });
    				 $('#tagHead').closest('table').hide();
    				 $('#gobT').click();
    			    },
    			    complete: function(){
    					$('#progress').remove();
    			    },
    			    error : function(xhr, ajaxOptions, thrownError) {
    			                     
    			                       commonMessageBox('Information', "Please try after sometime.") ; 
    			                   }
    		});
    	
    	       
    	});
    	
        // =================================================== Account Telescreen Ends =================================================================
        
    });
    
      $(document).on('click', '#additionalProductLinkId', function() { 
    	  $('#openOptionalProductPopup').show();
    	 $("#addOptionalProductGrid").jqGrid('GridUnload');
    		$("#addOptionalProductGrid").jqGrid({
    			url : 'addOptionalOffer',
    			datatype : 'json',
    			colNames:['Select', 'Product Id', 'Subscription Fee', 
        	   	          'Discounted Price', 'Emp Initiated'],
    			colModel : [{
    				name : 'optionalOfferId',
    				index : 'optionalOfferId',
    				key : true,
    				align : 'center',
    				editable: true,
    				width: 50,
       	   		 	edittype: 'checkbox', editoptions: { value: "True:False" }, 
       	   		 	formatter: "checkbox", formatoptions: { disabled: false}
    			}, {
    				name : 'productId',
    				index : 'productId',
    				key : true,
    				align : 'center',
    				width : 150,
    				editable : false
    			}, {
    				name : 'subscriptionFee',
    				index : 'subscriptionFee',
    				key : true,
    				align : 'center',
    				width : 150,
    				editable : false,
    			}, {
    				name : 'discountedPrice',
    				index : 'discountedPrice',
    				key : true,
    				align : 'center',
    				width : 150,
    				editable : true
    			}, {
    				name : 'empInitiate',
    				index : 'empInitiate',
    				key : true,
    				align : 'center',
    				editable: true,
    				width: 145,
       	   		 	edittype: 'checkbox', editoptions: { value: "True:False" }, 
       	   		 	formatter: "checkbox", formatoptions: { disabled: false}
    			}],
    			
    			gridview : true,
    			toolbar : [ false, "bottom" ],
    			rowNum : 10,
    			pager : '#addOptionalProductpager',
    			loadonce : true,
    			rowList : [ 5, 10, 20 ],
    			viewrecords : true,
    			sortable : true,
    			editable : true,
    			height : 250,
    			shrinkToFit : true,
    			paging : true,
    		    loadComplete : function(data) {
    		    	populateSubFamlies();
    		    }, loadError : function(error) {}
    			});
    		$('#openOptionalProductPopup').dialog({
    			 title: "Add Optional Offer",
    			 height: 'auto',
    			 my: 'center', 
    			 at: 'center',
    			 width: 687,
    			 beforeClose: function (event, ui) {
    				 $('#openOptionalProductPopup').hide();
    			 },
    		});
    		
    	 
    });
      
      $(document).on('change', "#subFamilyComboId", function () {
    	  $('#classificationComboId').find('option').remove().end();
		    var option = "<option value=''>---Select---</option>";
		   $('#classificationComboId').append(option);
		   var selectedSubFamily = $('#subFamilyComboId').val();
		     var classificationArray = selectedSubFamily.split(",");
			   if(classificationArray && classificationArray !== undefined) {
				    $.each(classificationArray, function(index, classification){
						option = "<option value='"+ index +"'>"+ classification +"</option>";
						$('#classificationComboId').append(option);
				});
		   }
		});
      
    
})(jQuery);

function getTwitterUser() {
	$.getJSON("twitterFeed.htm", function(data) {
		$('#tweets').text('');
		$.each(data, function(key, value) {
			$('#tweets').append('<p class="areatext">' + value + '</p>');
		});
	});
}

// Account Tabs Loading...
function getAccountTabs() {
		$.ajax({
	        url: 'getAccountTabs',
	        type: 'GET',
	        cache: false,
	        success: function (data) {
	        	var currentActionId = $('#tabAction').val();
	        	var custType = $('#customerType').val();
	        	$('#includeAccountTabs').append(data);
	        	accountTabsLoadStatus = 1;
	        	$('#accountTabStatus').val("1");
		        if(currentActionId=='realCDR' || currentActionId=='profile' || currentActionId=='waivers' || currentActionId=='orders' || currentActionId=='vas' || currentActionId=='barUnbarBin' || currentActionId=='caf' || currentActionId=='pushsmswrapper' || currentActionId=='accountAttachment' || currentActionId=='postPaidBill' || currentActionId=='hlrView' || currentActionId=='mfs' || currentActionId=='accountDnd' || currentActionId=='sqms' || currentActionId=='irDepositView') {
		        	$('#'+currentActionId).click();
	        	}
	        },
	        error: function (data) {
	        	var currentActionId = $('#tabAction').val();
	        	var custType = $('#customerType').val();
	        	$('#includeAccountTabs').append(data);
	        	accountTabsLoadStatus = 1;
	        	$('#accountTabStatus').val("1");
		        if(currentActionId=='realCDR' || currentActionId=='profile' || currentActionId=='waivers' || currentActionId=='orders' || currentActionId=='vas' || currentActionId=='barUnbarBin' || currentActionId=='caf' || currentActionId=='pushsmswrapper' || currentActionId=='accountAttachment' || currentActionId=='postPaidBill' || currentActionId=='hlrView' || currentActionId=='mfs' || currentActionId=='accountDnd' || currentActionId=='sqms' || currentActionId=='irDepositView') {
		        	$('#'+currentActionId).click();
	        	}
	        },
		});
}

function populateSubFamlies() {
	$.ajax({
        url: 'populateSubFamlies',
        type: 'GET',
        async : true,
        cache: false,
        success: function (data) {
        	$('#subFamilyComboId').find('option').remove().end();
		    var option = "<option value=''>---Select---</option>";
		    $('#subFamilyComboId').append(option);
		   $('#classificationComboId').append(option);
		    $.each(data, function(index, subFamily){
				option = "<option value='"+ subFamily +"'>"+ index +"</option>";
				$('#subFamilyComboId').append(option);
			});
      }, error: function (data) {
    	  console.log('error in fecthing data.');
      },
	});
}

function rollingTickler()
{
         $.ajax({
                url : "rollingTickler",
                datatype :"json",
                type : "get",
                success : function(data)
                {
                     
                      var txt = '';
                   

                     $.each(data, function(i, item) {
                           if (data.length > 1) {
                                  /*var space = i != data.length-1 ? ",  &nbsp;&nbsp;" : "";
                                  txt += item.circleId + " : " + item.messageContent + space;*/
                                  var space = i != data.length-1 ? ", " : "";
                                  txt += item.messageContent + space;
                           } else {
                                  txt += item.messageContent;
                           }
                    });
                    txt = txt.trim();
                    //$('#bottomMarquee').text(txt);
                    $('#bottomMarquee marquee').html(txt);
              }
         });
        
}
/*function loginMessage()
{
 $.ajax({
 url : "loginMessage",
 datatype :"json",
 type : "get",
 success : function(data)
 {
 
 var txt = '', loginData = data;
 
 $.each(data, function(i, item) {
	 txt += "<tr><th>"+item.circleId + " :</th><td>" + item.messageContent+"</td></tr>";
	 $('#popup1').show().find('table').html(txt);
});
 

 }
 });
 
}

function hidePopUp(id)
{
  $('#popup1').hide();
}
*/