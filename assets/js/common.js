var minVal;
var maxVal;
var sessionProfile;
jQuery(document).ready(function() {
	
		  document.getElementById(document.getElementsByClassName("tablink")[1].id.toLowerCase()).style.display = "block"; //by default open and clicked
		  document.getElementById("id_form_submit").style.display = "none";
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
//				document.getElementById(pageName).style.display = "block";
			    document.getElementById($(this)[0].id.toLowerCase()).style.display = "block";
			    if($(this)[0].id.toLowerCase()=="contact_book"){
			    	getAllAddress();
			    }
			    if($(this)[0].id.toLowerCase()=="posts"){
			    	getProfileData();
			    	 document.getElementById("id_profile_tab").style.display = "none";
			    	 $(".my-main-post ul").empty();
			    	 $(".my-post1").empty();
			    	 minVal = 0;
			    	 maxVal = 10;
			    	createPostPanel();
			    }
			    
		 });
		 
		 $(document).on('click', '#id_upload_profile', function() {
			 document.getElementById("id_form_submit").style.display = "block";
		});
		 
		 $(document).on('click', '#bt_profile_back', function() {
				 document.getElementById("id_posts").style.display = "block";
				 document.getElementById("id_profile_tab").style.display = "none";
			});
		 
		 $(document).on('click', '#id_profile_bt', function() {
			 if($('#id_search').val() != ""){
				 $.each(sessionProfile, function(key, value){
					 if($('#id_search').val() == value.userName){
						 if(value.profilePhoto != undefined){
							 var imgString = "data:image/jpeg;base64,"+_arrayBufferToBase64(value.profilePhoto);	
						 	}else{
						 		 var imgString  = '../images/dummy_profile.png';
						 	}	
						 document.getElementById("id_img_user_card").setAttribute('src', imgString);
						 document.getElementById("id_card_name").innerHTML= value.userName;
						 document.getElementById("id_card_occupation").innerHTML= value.userProfession;
						 document.getElementById("id_card_location").innerHTML= value.userLocation;
				 	}
				 });
				 document.getElementById("id_posts").style.display = "none";
				 document.getElementById("id_profile_tab").style.display = "block";
			 }
			});
		 
		 $("#blog_serachInput" ).keyup(function() {
			  var input, filter, table, tr, td, i;
			  input = document.getElementById("blog_serachInput");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("top_blog_Grid");
			  tr = table.getElementsByTagName("tr");
			  for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[1];
			    if (td) {
			      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }       
			  }
		 });
		 
		 
		 $("#blog_grid_serachInput" ).keyup(function() {
			  var input, filter, table, tr, td, i;
			  input = document.getElementById("blog_grid_serachInput");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("blogGrid");
			  tr = table.getElementsByTagName("tr");
			  for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[2];
			    if (td) {
			      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }       
			  }
		 });
		 
		 $('#result').on('click', 'li', function() {
			  var click_text = $(this).text().split('|');
			  $('#id_search').val($.trim(click_text[0]));
			  $("#result").html('');
			 });
		 
		 $("#id_search" ).keyup(function() {
			 $('#result').empty();
			  var input, filter, table, tr, td, i;
			  input = document.getElementById("id_search");
			  filter = input.value.toUpperCase();
			  if(filter != ""){
			  $.ajax({
					 url: 'searchFriends?filter='+filter,
					 type : 'GET',
					 datatype : 'json',	
					 success:function(data){
						 sessionProfile = data;
						 $.each(data, function(key, value){
							    if (value.userName.toUpperCase().search(filter) != -1)
							    {
							    	 var imgString = "data:image/jpeg;base64,"+_arrayBufferToBase64(value.profilePhoto);							    	
							    	$('#result').append('<li class="list-group-item link-class"><img src="'+imgString+'" height="40" width="40" style = "border-radius: 30%;" class="img-thumbnail" />   '+value.userName+' | <span>'+value.userLocation+' | from </span><span> '+value.userProfession+'</span></li>');
							    }
							   });
					 }
					 
				 });
		      }
		 });
		
		 
/*			var myIndex = 0;
			carousel();
	function carousel() {
		var i;
		var x = document.getElementsByClassName("mySlides");
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		myIndex++;
		if (myIndex > x.length) {
			myIndex = 1
		}
		x[myIndex - 1].style.display = "block";
		setTimeout(carousel, 2000); // Change image every 2 seconds
	}*/
	//Start for upload image
	uploadImage();
	function uploadImage(){
	 var readURL = function(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $('.profile-pic').attr('src', e.target.result);
	            }
	    
	            reader.readAsDataURL(input.files[0]);
	        }
	    }
	    

	    $(".file-upload").on('change', function(){
	        readURL(this);
	    });
	    
	    $(".upload-button").on('click', function() {
	       $(".file-upload").click();
	    });
}
	    //end for upload image
	
	 $("#id_submit_post").on('click', function() {
		 processFile();
	    });
	 
	 $("#id_post_submit_comment").on('click', function() {
		 $(".my-main-post ul").empty();
		 $(".my-post1 ul").empty();
		 addSimplePost();
		 
	    });
	 
	 $("#id_submit_profile_pic").on('click', function() {
		 processProfilePic();
	    });
	
});

function processProfilePic(){
	//$('.id_upload_msg').text('Uploading......');
	 var user_id = $("#user_id").val(); 
	 var data = new FormData();
	 var files = $('#id_profile_file')[0].files;
	 for (var i = 0, f; f = files[i]; i++) {
		 data.append("file-"+i, files[i]);
	 }
	 
	 $.ajax({
		 url: 'doUploadProfile?user_id='+user_id,
		 data: data,
		 contentType: false,
		 processData: false,
		 type: 'POST',
		 success:function(data){
			  //$('.id_upload_msg').text("Profile pic uploaded successfuly...");
			  var imgString = "data:image/jpeg;base64,"+_arrayBufferToBase64(data[0].profilePhoto);
			  document.getElementById('id_profile_photo').setAttribute('src', imgString);
			  document.getElementById("id_form_submit").style.display = "none";
		 }
	 });
}

function getProfileData(){
	 var user_id = $("#user_id").val(); 
	 
	 $.ajax({
		 url: 'getprofileData?user_id='+user_id,
		 type : 'get',
		 datatype : 'json',	
		 success:function(data){
			  //$('.id_upload_msg').text("Profile pic uploaded successfuly...");
			  var imgString = "data:image/jpeg;base64,"+_arrayBufferToBase64(data[0].profilePhoto);
			  document.getElementById('id_profile_photo').setAttribute('src', imgString);
			  document.getElementById("id_form_submit").style.display = "none";
		 }
	 });
}
function getPost(event){
	 $(".my-main-post ul").empty();
	 $(".my-post1").empty();
	 
	 $('#'+event.currentTarget.id).css('background-color', 'blue')
	 if(event.currentTarget.innerHTML == "Next"){
		 minVal = parseInt(minVal)+10;
		 maxVal = parseInt(maxVal);
	 }else if(event.currentTarget.innerHTML == "Previous"){
		 if(minVal != 0){
			 minVal = parseInt(minVal)-10;
	 		}
		 	 maxVal = parseInt(maxVal);
	 }else{
		 minVal = parseInt(event.currentTarget.innerHTML+"0");
		 maxVal = parseInt(maxVal);
	 }
	createPostPanel();
}

function processFile(){
	$('.msg').text('Uploading in progress...');
	 var user_id = $("#user_id").val(); 
	 var data = new FormData();
	 var files = $('#id_file')[0].files;
	 for (var i = 0, f; f = files[i]; i++) {
		 data.append("file-"+i, files[i]);
	 }
	 
	 $.ajax({
		 url: 'doUpload?user_id='+user_id,
		 data: data,
		 contentType: false,
		 processData: false,
		 type: 'POST',
		 // this part is progress bar
         xhr: function () {
             var xhr = new window.XMLHttpRequest();
             xhr.upload.addEventListener("progress", function (evt) {
                 if (evt.lengthComputable) {
                     var percentComplete = evt.loaded / evt.total;
                     percentComplete = parseInt(percentComplete * 100);
                     $('.myprogress').text(percentComplete + '%');
                     $('.myprogress').css('width', percentComplete + '%');
                 }
             }, false);
             return xhr;
         },
		 success:function(response){
			 if(response == 'success'){
			  $('.msg').text("Files uploaded successfuly..");
			  createPostPanel();
			 }else{
				 data = response;
			 }
		 }
		 
		 
	 });
}

function addSimplePost()
{
		var userid = $("#user_id").val(); 
		var post = $("#id_post_comment").val();
		$.ajax({
			url : 'addSimplePost?userid='+userid+'&post='+post,
				type : 'POST',
				datatype : 'json',			
				success:function(data){		
					if(data.status == "success"){
						createPostPanel();
					}
					$("#id_post_comment").val("");
				},
		loadError: function(xhr) {
			alert("Error in post....");
		}
		
		});
}

function createPostPanelAfterPostComment(){
	var time ="Posted Time: 19/08/2018 12:39:44"
	var comment =  $("#id_post_comment").val();
			$('<li class="my-post"><img src="../images/photo.png" alt="" class="contact-profile-post" /><p>' + time + '</p></li>').appendTo($('.my-main-post ul'));
		    $('<li class="my-post"><p>' + comment + '</p></li>').appendTo($('.my-main-post ul'));
			//$('<li class="my-post" ><div><img src="../images/" alt="" class ="my-post"/></div></li>').appendTo($('.my-main-post ul'));
			$('<li class="my-post" ><div class = "row"><button class="fa fa-thumbs-up blog_buttons" id="id_post_like">0</button> <button class="fa blog_buttons" type="button" id="id_post_comments">Comments</button><button class="fa blog_buttons" type="button" id="id_post_share">Share</button></div></li>').appendTo($('.my-main-post ul'));
			$('<li class="my-post" ><div><textarea name="comments" rows="3" cols="40" id="id_postcomment_save" placeholder="Write your comment here.."	maxlength="100"></textarea>	</div> <input type="submit" value="Submit" id="id_submit_post_comment" class="blog_buttons"></li>').appendTo($('.my-main-post ul'));
			
}
function createPostPanel(){
	 $('.msg').text("");
	 $(".my-main-post ul").empty();
	 $(".my-post1").empty();
//	 document.getElementById('id_next_pre_panel').style.display = "none";
	 document.getElementById('class-loding').style.display = "block";
     document.getElementById("id_file").value = null;
	 var user_id = $("#user_id").val(); 
	 $.ajax({
		 url: 'getAllPost?user_id='+user_id+'&minVal='+minVal+'&maxVal='+maxVal,
		 type : 'get',
		 datatype : 'json',	
		 success:function(data){
			 for(var img of data) {
				 var imgString = "data:image/jpeg;base64,"+_arrayBufferToBase64(img.fileData);
				 var profileimgStr = $('#id_profile_photo').prop('src');
				 var time = img.uploadedTime;
				 var commentBoxId = img.postId;
				 if(img.postContent != undefined){
					 	var postContent = img.postContent;
					 }
					 
					 var li = $('<li class = "my-post1"></li>')
					 
				$('<div class="my-post"><img src="'+profileimgStr+'" alt="" class="contact-profile-post"/><p>' + time + '</p></div>').appendTo(li);
					if(img.postContent != undefined){
						$('<li class="my-post"><p>' + img.postContent + '</p></li>').appendTo(li);
					}
				$('<div class="my-post" ><div><img src="'+imgString+'" alt="" class ="my-post" style = "border-style:outset;"/></div></div>').appendTo(li);
				$('<div class="my-post" ><div class = "row"><button onclick = addLike1(event) name  = "bt_like" class="fa fa-thumbs-up blog_buttons" id="'+commentBoxId+'">'+img.likeCount+'</button> <button onclick = showPostCommentData(event) name="'+commentBoxId+'" class="fa blog_buttons" type="button" id="cmtpost_'+commentBoxId+'">Comments '+img.commentCount+'</button><button name = "bt_share" class="fa blog_buttons" type="button" id="share_'+commentBoxId+'">Share</button><input type="text" name="search" id="srch_'+commentBoxId+'" placeholder="Search friends.." class="form-control" style="width: 100%; padding: 0.5em 0.5em;  font-size: 1.2em;  border-radius: 3px;  border: 1px solid #D9D9D9;"/></div></div>').appendTo(li);
				$('<div class="my-post" ><div><textarea name="comments" rows="3" cols="40" id="ts_'+commentBoxId+'" placeholder="Write your comment here.."	maxlength="100"></textarea>	</div> <input type="submit" onClick = "addLike1(event)" value="Submit" name="'+commentBoxId+'" class="blog_buttons"></div>').appendTo(li);
				$('<div class="my-post" ><li id ="mycp_'+commentBoxId+'" class="my-post-comments"></li></div>').appendTo(li);
				
				li.appendTo($('.my-main-post>ul'));
						
			 }
			 document.getElementById('class-loding').style.display = "none";
//			 document.getElementById("id_next_pre_panel").style.display = "block";
		 }
	 });
}


function addLike1(evnt)
{
		var comment = "";
		var post_id = "";
		var userid = $("#user_id").val(); 
	    post_id = evnt.currentTarget.id;
		if(evnt.currentTarget.name == "bt_like"){
			clicktype = "like_clicked";
		}else{
			comment = $('#ts_'+evnt.currentTarget.name).val();
			post_id = evnt.currentTarget.name;
			clicktype = "comment_clicked";
		}
		$.ajax({
			url : 'addLikeCommentPost?postid='+post_id+'&userid='+userid+'&comment='+comment+'&clicktype='+clicktype,
				type : 'POST',
				datatype : 'json',			
		success:function(data){		
				document.getElementById(post_id).innerHTML  = " "+data[0][0];
				document.getElementById('cmtpost_'+post_id).innerHTML  = " Comments "+data[0][1];
				},
		loadError: function(xhr) {
			alert("Error in like blog....");
		}
		
		});
}

function showPostCommentData(evnt){
	 $(".messages ul li").empty();
     var postId = evnt.currentTarget.name;
	 var userid = $("#user_id").val(); 
	$.ajax({
		url : 'getPostCommentData?postid='+postId+'&userid='+userid,
			type : 'get',
			datatype : 'json',			
	success:function(data){		
		
		//empty
		document.querySelector('#mycp_' + postId).innerHTML = '';
		
		var ul = document.createElement('ul');
		document.querySelector('#mycp_' + postId).appendChild(ul);
		
		for (i = 0; i < data.length; i++) { 
			if(data[i].comments != undefined){
				var commentByImgStr = "data:image/jpeg;base64,"+_arrayBufferToBase64(data[i].userMaster.profilePhoto);
				var li = document.createElement('li');
								
				 var node = document.createElement("img");
				 node.setAttribute('src', commentByImgStr);
				 node.setAttribute('class', 'my-post-comments-img');
				
				 var node1 = document.createElement("div");
				 var textnode = document.createTextNode(data[i].userMaster.userName);
				 node1.setAttribute('class', 'my-post-comments name');
				 node1.appendChild(textnode);
				 
			     var node2 = document.createElement("div");
				 var textnode1 = document.createTextNode(data[i].commentDate);
				 node2.setAttribute('class', 'my-post-comments date');
				 node2.appendChild(textnode1);
				 
				 var node3 = document.createElement("div");
				 var textnode2 = document.createTextNode(data[i].comments);
				 node3.setAttribute('class', 'my-post-comments content');
				 node3.appendChild(textnode2);
				 
				 li.appendChild(node);
				 li.appendChild(node1);
				 li.appendChild(node2);
				 li.appendChild(node3);
				 
				 document.querySelector('#mycp_' + postId + " ul").appendChild(li);				 
			}
		}
			},
	loadError: function(xhr) {
		alert("Error in adding blog....");
	}
	
	});	
}

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

function addressBookGetNames() {
	return ($("#addressBookColumns").val()).split(",") ;
}

function blogGridColumn() {
	return ($("#blogGridColumns").val()).split(",") ;
}


function getAllAddress(){
 var addressBookNames= addressBookGetNames();
 
 var gridWidth = 280;
 var user_id = $("#user_id").val(); 
 $("#contactGrid").jqGrid('GridUnload');
	$("#contactGrid").jqGrid({
						url : 'getAllAddress?user_id='+user_id,
						datatype : 'json',
						mtype : 'GET',
						colNames : addressBookNames,
						colModel : [								
								{
									name : 'addressId',
									index : 'addressId',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false,
									hidden: true
								},
								{
									name : 'firstName',
									index : 'firstName',
									key : true,
									align : 'center',
									width : 100,
									editable : false
								},
								{
									name : 'lastName',
									index : 'lastName',
									key : true,
									align : 'center',
									width : 100,
									editable : false
								},
								{
									name : 'address',
									index : 'address',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false
								},
								{
									name : 'phoneNo',
									index : 'phoneNo',
									key : true,
									align : 'center',
									width : 10,
									editable : false
								},
								{
									name : 'emailId',
									index : 'emailId',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false
								},
								{
									name : 'userId',
									index : 'userId',
									key : true,
									align : 'center',
									width : gridWidth,
									editable : false,
									hidden: true
								}
							 ],
						gridview : true,
						toolbar : [ false, "bottom" ],
						rowNum : 10,
						loadonce : true,
						rowList : [ 5, 10, 20 ],
						viewrecords : true,
						sortable : true,
						editable : true,
						height : '100%',
						pager: '#contactGridPager',
						paging : true,
						
						loadComplete: function (Data) {
							if ($('#contactGrid tr').length <= 1) {
								var msg = '<tr><td colspan="6"><h3 class="errMsg"><center>No Data Found.</center></h3></td></tr>';
								$('#contactGrid').html(msg);
								return false;
								}
							
						},
						success: function(data){
							alert("success--->>>>>>");
						},

					});
	 
}

