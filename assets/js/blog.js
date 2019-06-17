var global_userid;
var global_blogid;


jQuery(document).ready(function() {
	
	document.getElementById(document.getElementsByClassName("tablink")[1].id.toLowerCase()).style.display = "block"; //by default open and clicked
	 $(document).on('click', '.tablink', function() {
		 var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablink");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].style.backgroundColor = "";
			}
//			document.getElementById(pageName).style.display = "block";
		    document.getElementById($(this)[0].id.toLowerCase()).style.display = "block";
		    if($(this)[0].id.toLowerCase()=="contact_book"){
		    	getAllAddress();
		    }
		    if($(this)[0].id.toLowerCase()=="blogs"){
		    	getUserBlog();
		    	getLatestBlogs();
		    }
		    if($(this)[0].id.toLowerCase()=="logout_user"){
		    	logOut();
		    	location.href='../login';
		    }
	 });
	
	 var acc = document.getElementsByClassName("accordion");
	 var i;

	 for (i = 0; i < acc.length; i++) {
	     acc[i].addEventListener("click", function() {
	         this.classList.toggle("active");
	         var panel = this.nextElementSibling;
	         if (panel.style.display === "block") {
	             panel.style.display = "none";
	         } else {
	        	 if(panel.id == "id_online"){
	        		 getOnlineFriends();
	        	 }
	             panel.style.display = "block";
	         }
	     });
	 }
	 
	 
	$(document).on('click', '#id_save_blog', function() {
		addBlog();
		goBackBlogPanel();
		clearBlogFields();
	});
	
	$(document).on('click', '#id_like', function() {
		addLike("like_clicked");
	});
	
	$(document).on('click', '#id_comments', function() {
		showCommentData(global_blogid, global_userid);
	});
	
	$(document).on('click', '#id_submit_comment', function() {
		addLike("comment_clicked");
		$("#id_comment_tosave").val("");
	});
	
	$(document).on('click', '#id_create_blog_button', function() {
		showCreateBlogPanel();
		enableBlogFields();
		clearBlogFields();
	});
	
	$(document).on('click', '#id_back_blog', function() {
		goBackBlogPanel();
	});
	
	$(document).on('click', '#id_reset_blog', function() {
		clearBlogFields();
	});
	
	$(document).on('click', '#id_like_dislike', function() {
		likeDisLike(this);
	});
	
		
});

function getOnlineFriends(){
	var userid = $("#user_id").val(); 
	$.ajax({
		url : 'getOnlineFriends?user_id='+userid,
			type : 'get',
			datatype : 'json',			
	success:function(data){		
		$(".online-panel ul li").empty();
		for (i = 0; i < data.length; i++) { 
			if(data[i] != undefined){
				$('<li class="online-friends" ><img src="../images/online_icon.jpg" alt="" /><p>' + data[i] + '</p></li>').appendTo($('.online-panel ul'));
			}
		}
		
			},
	loadError: function(xhr) {
		alert("Error in logout ....");
	}
	
	});	
}

function logOut(){
	var username = $("#user_name").val(); 
	$.ajax({
		url : 'logoutUser?username='+username,
			type : 'get',
			datatype : 'json',			
	success:function(data){		
			},
	loadError: function(xhr) {
		alert("Error in logout ....");
	}
	
	});	
}

function likeDisLike(x){
	 x.classList.toggle("fa-thumbs-down");
}
function addBlog()
{
		var tittle = $('#id_blog_tittle').val();
		var name = $("#id_blog_name").val();
		var content = $("#id_blog_content").val();
		var user_id = $("#user_id").val(); 
		$.ajax({
			url : 'addBlog?tittle=' + tittle+'&name='+name+'&content='+content+'&user_id='+user_id,
				type : 'POST',
				datatype : 'json',			
		success:function(data){		
			if(data.status == "success"){
				//alert("Blog created successfully....!");
				getUserBlog();
		    	getLatestBlogs();
			}
				},
		loadError: function(xhr) {
			alert("Error in adding blog....");
		}
		
		});	
}

function addLike(clicktype)
{
		var userid = $("#user_id").val(); 
		var comment = $("#id_comment_tosave").val();
		$.ajax({
			url : 'addLike?blogid='+global_blogid+'&userid='+userid+'&comment='+comment+'&clicktype='+clicktype,
				type : 'POST',
				datatype : 'json',			
		success:function(data){		
				document.getElementById('id_like').innerHTML  = " "+data[0][0];
				if(clicktype == "comment_clicked"){
					showCommentData();
				}
				},
		loadError: function(xhr) {
			alert("Error in like blog....");
		}
		
		});	
}

function showCreateBlogPanel() {
	 document.getElementById("id_create_blog_panel").style.display = "block";
	 document.getElementById("id_create_blog").style.display = "none";
}

function goBackBlogPanel() {
	document.getElementById("id_create_blog_panel").style.display = "none";
	 document.getElementById("id_create_blog").style.display = "block";
	 $(".messages ul li").empty();
}

function clearBlogFields(){
	$("#id_blog_tittle").val("");
	$("#id_blog_name").val("");
	$("#id_blog_content").val("");
}

function disableBlogFields(){
	 $("#id_blog_tittle").prop("disabled", true); 
	 $("#id_blog_name").prop("disabled", true); 
	 $("#id_blog_content").prop("disabled", true); 
	 document.getElementById('id_save_blog').style.display = "none";
	 document.getElementById('id_delete_blog').style.display = "none";
	 document.getElementById('id_update_blog').style.display = "none";
	// document.getElementById('id_draft_blog').style.display = "none";
	 document.getElementById('id_reset_blog').style.display = "none";
	 document.getElementById('id_like').style.display = "inline-block";
	 document.getElementById('id_comments').style.display = "inline-block";
}

function enableBlogFields(){
	 $("#id_blog_tittle").prop("disabled", false); 
	 $("#id_blog_name").prop("disabled", false); 
	 $("#id_blog_content").prop("disabled", false); 
	 document.getElementById('id_save_blog').style.display = "inline-block";
	 document.getElementById('id_delete_blog').style.display = "inline-block";
	 document.getElementById('id_update_blog').style.display = "inline-block";
	 //document.getElementById('id_draft_blog').style.display = "inline-block";
	 document.getElementById('id_reset_blog').style.display = "inline-block";
	 //document.getElementById('id_like').style.display = "none";
	 //document.getElementById('id_comments').style.display = "none";
}

function top20BlogClick(elem) {
	//display blog form
	showCreateBlogPanel();
	var row = $(elem).closest('tr');
	var blogid = row.find('td').eq(0).text();
	global_blogid = row.find('td').eq(0).text()
	var tittle = row.find('td').eq(1).text();
	var name = row.find('td').eq(2).text();
	var content = row.find('td').eq(3).text();
	var date = row.find('td').eq(4).text();
	var userid = $("#user_id")[0].defaultValue; 
	global_userid = $("#user_id")[0].defaultValue;
	$("#id_blog_tittle").val(tittle);
	$("#id_blog_name").val(name);
	$("#id_blog_content").val(content);
	document.getElementById('blog_time').innerHTML  = date;	
	disableBlogFields();
	showLikeAndComment(blogid,userid);
}

function blogClick(elem) {
	//display blog form
	showCreateBlogPanel();
	var row = $(elem).closest('tr');
	var blogid = row.find('td').eq(0).text();
	global_blogid = row.find('td').eq(0).text()
	var tittle = row.find('td').eq(1).text();
	var name = row.find('td').eq(2).text();
	var content = row.find('td').eq(3).text();
	var date = row.find('td').eq(4).text();
	var userid = $("#user_id")[0].defaultValue; 
	global_userid = $("#user_id")[0].defaultValue;
	$("#id_blog_tittle").val(tittle);
	$("#id_blog_name").val(name);
	$("#id_blog_content").val(content);
	document.getElementById('blog_time').innerHTML  = "Blog Time: " +date;
	enableBlogFields();
	showLikeAndComment(blogid,userid);
}

function tittleLinkClick(cellValue, options, rowObject){
	return '<a onclick="blogClick(this)" style="cursor:pointer;text-decoration: underline;color:blue">'+cellValue+'</a>'
}
function top20TittleLinkClick(cellValue, options, rowObject){
	return '<a onclick="top20BlogClick(this)" style="cursor:pointer;text-decoration: underline;color:blue">'+cellValue+'</a>'
}

function showLikeAndComment(blogid, userid){
	$.ajax({
		url : 'getLikeAndComment?blogid='+blogid+'&user_id='+userid,
			type : 'get',
			datatype : 'json',			
	success:function(data){		
				document.getElementById('id_like').innerHTML  = " "+data[0][0];
				document.getElementById('id_comments').innerHTML  = data[0][1] + " - Show All Comments";
			},
	loadError: function(xhr) {
		alert("Error in adding blog....");
	}
	
	});	
}


function showCommentData(){
	 $(".messages ul li").empty();
	$.ajax({
		url : 'getLikeCommentData?blogid='+global_blogid+'&userid='+global_userid,
			type : 'get',
			datatype : 'json',			
	success:function(data){		
		for (i = 0; i < data.length; i++) { 
			if(data[i].comments != undefined){
				$('<li class="sent"><img src="../images/dummy_profile1.png" alt="" /><p>' + data[i].userMaster.userName + '</p><p>' + data[i].commentDate + '</p></li>').appendTo($('.messages ul'));
				$('<li class="sent" ><p style = "background:gray;" >' + data[i].comments + '</p></li>').appendTo($('.messages ul'));
			}
		}
		showLikeAndComment(global_blogid, global_userid);
			},
	loadError: function(xhr) {
		alert("Error in adding blog....");
	}
	
	});	
}

function getUserBlog(){
	 var blogGridColumns= blogGridColumn();
	 
	 var gridWidth = 120;//($(document).width())  / addressBookNames.length;
	 var user_id = $("#user_id")[0].defaultValue; 
	 $("#blogGrid").jqGrid('GridUnload');
		$("#blogGrid").jqGrid({
							url : 'getUserBlog?user_id='+user_id,
							datatype : 'json',
							mtype : 'GET',
							colNames : blogGridColumns,
							colModel : [						
									{
										name : 'blogId',
										index : 'blogId',
										key : true,
										align : 'center',
										width : gridWidth,
										editable : false,
										hidden : true
									},
									{
										name : 'blogTittle',
										index : 'blogTittle',
										key : true,
										align : 'center',
										width : 150,
										editable : false
									},
									{
										name : 'blogName',
										index : 'blogName',
										key : true,
										align : 'center',
										width : 200,
										editable : false,
										formatter:tittleLinkClick
									},
									{
										name : 'blogContent',
										index : 'blogContent',
										key : true,
										align : 'center',
										width : 300,
										editable : false
									},
									{
										name : 'blogDate',
										index : 'blogDate',
										key : true,
										align : 'center',
										width : 160,
										editable : false
									},
									{
										name : 'userId',
										index : 'userId',
										key : true,
										align : 'center',
										width : gridWidth,
										editable : false,
										hidden : true
									}],
							gridview : true,
							toolbar : [ false, "bottom" ],
							rowNum : 10,
							loadonce : true,
							rowList : [ 5, 10, 20 ],
							viewrecords : true,
							sortable : true,
							editable : true,
							height : '100%',
							pager: '#blogGridPager',
							paging : true,
							
							loadComplete: function (Data) {
								if ($('#blogGrid tr').length <= 1) {
									var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>No Data Found.</center></h3></td></tr>';
									$('#blogGrid').html(msg);
									return false;
									}
								
							},
							success: function(data){
								alert("success--->>>>>>");
							},

						});
		 
	}

function getLatestBlogs(){
	 var blogGridColumns= blogGridColumn();
	 
	 var gridWidth = 120;//($(document).width())  / addressBookNames.length;
	 var user_id = $("#user_id")[0].defaultValue; 
	 $("#top_blog_Grid").jqGrid('GridUnload');
		$("#top_blog_Grid").jqGrid({
							url : 'getLatestBlogs',
							datatype : 'json',
							mtype : 'GET',
							colNames : blogGridColumns,
							colModel : [						
									{
										name : 'blogId',
										index : 'blogId',
										key : true,
										align : 'center',
										width : gridWidth,
										editable : false,
										hidden : true
									},
									{
										name : 'blogTittle',
										index : 'blogTittle',
										key : true,
										align : 'center',
										width : 150,
										editable : false,
										hidden : true
									},
									{
										name : 'blogName',
										index : 'blogName',
										key : true,
										align : 'center',
										width : 250,
										editable : false,
										formatter:top20TittleLinkClick
									},
									{
										name : 'blogContent',
										index : 'blogContent',
										key : true,
										align : 'center',
										width : 300,
										editable : false,
										hidden : true
									},
									{
										name : 'blogDate',
										index : 'blogDate',
										key : true,
										align : 'center',
										width : 150,
										editable : false,
										hidden : true
									},
									{
										name : 'userId',
										index : 'userId',
										key : true,
										align : 'center',
										width : gridWidth,
										editable : false,
										hidden : true
									}],
							gridview : true,
							toolbar : [ false, "bottom" ],
							rowNum : 5,
							loadonce : true,
							rowList : [ 5, 10, 20 ],
							viewrecords : true,
							sortable : true,
							editable : true,
							height : '100%',
							paging : true,
							pager : '#top20_blogGridPager',
							loadComplete: function (Data) {
								if ($('#top_blog_Grid tr').length <= 1) {
									var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>No Data Found.</center></h3></td></tr>';
									$('#top_blog_Grid').html(msg);
									return false;
									}
								
							},
							success: function(data){
								alert("success--->>>>>>");
							},

						});
		 
	}

