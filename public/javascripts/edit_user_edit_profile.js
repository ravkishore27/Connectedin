$(document).ready(function(){

	/*----------------------------------- STATUS -----------------------------*/
	// $("#status_text").hide();
 	//$("#status_submit").hide();
    //------------------------------------------
    $("#status_edit").click(function(){
		$('#status').fadeOut('slow', function(){
			$('#status_text').removeClass("hide");
			//$('#status_text').fadeIn();
		});
		$('#status_edit').fadeOut('slow', function(){
			$("#status_cancel").removeClass("hide");
			$('#status_submit').removeClass("hide");
			//$('#status_submit').fadeIn();
		});  			
	});

	$("#status_cancel").click(function(){
		$('#status_text').addClass("hide");
		$('#status_submit').addClass("hide");
		$('#status_cancel').addClass('hide');

		$('#status').fadeIn('slow');
		$('#status_edit').fadeIn('slow');		
	});
	/*----------------------------------- STATUS END-----------------------------*/


	/*----------------------------------- OVERVIEW -----------------------------*/
	//$("#summary_text").hide();
    //$("#summary_submit").hide();
    //------------------------------------------
	$("#overview_edit").click(function(){
		$('#overview').fadeOut('slow', function(){
			$('#overview_text').removeClass("hide");
		});
		$('#overview_edit').fadeOut('slow', function(){
			$("#overview_cancel").removeClass("hide");
			$('#overview_submit').removeClass("hide");
		});  			
	});

	$("#overview_cancel").click(function(){
		$('#overview_text').addClass("hide");
		$('#overview_submit').addClass("hide");
		$('#overview_cancel').addClass('hide');

		$('#overview').fadeIn('slow');
		$('#overview_edit').fadeIn('slow');		
	});


	/*----------------------------------- OVERVIEW END-----------------------------*/




    /*----------------------------------- FIRSTNAME -----------------------------*/
    //$("#firstname_text").hide();
    //$("#firstname_submit").hide();
    //------------------------------------------
	$("#firstname_edit").click(function(){
		$('#firstname').fadeOut('slow', function(){
			$('#firstname_text').removeClass("hide");
		});
		$('#firstname_edit').fadeOut('slow', function(){
			$("#firstname_cancel").removeClass("hide");
			$('#firstname_submit').removeClass("hide");
		});  			
	});

	$("#firstname_cancel").click(function(){
		$('#firstname_text').addClass("hide");
		$('#firstname_submit').addClass("hide");
		$('#firstname_cancel').addClass('hide');

		$('#firstname').fadeIn('slow');
		$('#firstname_edit').fadeIn('slow');		
	});
    /*----------------------------------- FIRSTNAME END-----------------------------*/



    /*----------------------------------- LASTNAME -----------------------------*/
    //$("#lastname_text").hide();
    //$("#lastname_submit").hide();
    //------------------------------------------

    $("#lastname_edit").click(function(){
		$('#lastname').fadeOut('slow', function(){
			$('#lastname_text').removeClass("hide");
		});
		$('#lastname_edit').fadeOut('slow', function(){
			$("#lastname_cancel").removeClass("hide");
			$('#lastname_submit').removeClass("hide");
		});  			
	});

	$("#lastname_cancel").click(function(){
		$('#lastname_text').addClass("hide");
		$('#lastname_submit').addClass("hide");
		$('#lastname_cancel').addClass('hide');

		$('#lastname').fadeIn('slow');
		$('#lastname_edit').fadeIn('slow');		
	});

    /*----------------------------------- LASTNAME END-----------------------------*/




    /*----------------------------------- BLOG -----------------------------*/
		// $("#add_blog_url_text").hide();
  //   		$("#add_blog_submit").hide();

  //   		for(var i = 0; i < user.blog_urls.length; i++){
  //   			$("#edit_blog_url_text_" + i).hide();
  //   			$("#edit_blog_submit_" + i).hide();
  //   		}
    //------------------------------------------

    $("#blog_add").click(function(){
		$(this).fadeOut('slow', function(){
			$('#add_blog_cancel').removeClass("hide");
			$('#add_blog_submit').removeClass("hide");
		});
		$('#add_blog_url_span').removeClass("hide");
	});

    $("#add_blog_cancel").click(function(){
		$('#add_blog_url_span').addClass("hide");
		$('#add_blog_submit').addClass("hide");
		$('#add_blog_cancel').addClass('hide');

		$('#blog_add').fadeIn('slow');
	});

    $(".blog_edit").click(function(){
    	var j = $(this).val();
    	$('#edit_blog_url_' + j).fadeOut('fast');
			$(this).fadeOut('slow', function(){
				$("#edit_blog_delete_" + j).fadeOut('fast',function(){
				$('#edit_blog_name_text_' + j).removeClass("hide");	
				$('#edit_blog_submit_' + j).removeClass("hide");
				$(this).siblings('.edit_blog_cancel').removeClass("hide");
			});
		});			
	});

	$(".edit_blog_cancel").click(function(){
		var j = $(this).val();
		$(this).addClass("hide");
		$('#edit_blog_name_text_' + j).addClass("hide");	
		$('#edit_blog_submit_' + j).addClass("hide");
		$('#edit_blog_url_' + j).fadeIn('fast');
		$(".blog_edit").fadeIn('slow');
		$("#edit_blog_delete_" + j).fadeIn('fast');
	});
    /*----------------------------------- BLOG END-----------------------------*/




    /*----------------------------------- SKILL -----------------------------*/
    
    //------------------------------------------

    $("#skill_add").click(function(){
		$(this).fadeOut('slow', function(){
			$('#add_skill_cancel').removeClass("hide");
			$('#add_skill_submit').removeClass("hide");
		});
		$('#add_skill_span').removeClass("hide");
	});

    $("#add_skill_cancel").click(function(){
		$('#add_skill_span').addClass("hide");
		$('#add_skill_submit').addClass("hide");
		$('#add_skill_cancel').addClass('hide');

		$('#skill_add').fadeIn('slow');
	});

    $(".skill_edit").click(function(){
    	var j = $(this).val();
    	$('#edit_skill_' + j).fadeOut('fast');
		$(this).fadeOut('slow', function(){
			$("#edit_skill_delete_" + j).fadeOut('fast',function(){
				$('#edit_skill_text_' + j).removeClass("hide");	
				$('#edit_skill_submit_' + j).removeClass("hide");
				$(this).siblings('.edit_skill_cancel').removeClass("hide");
			});
		});			
	});

	$(".edit_skill_cancel").click(function(){
		var j = $(this).val();
		$(this).addClass("hide");
		$('#edit_skill_text_' + j).addClass("hide");	
		$('#edit_skill_submit_' + j).addClass("hide");
		$('#edit_skill_' + j).fadeIn('fast');
		$(".skill_edit").fadeIn('slow');
		$("#edit_skill_delete_" + j).fadeIn('fast');
	});
    /*----------------------------------- SKILL END-----------------------------*/




    /*----------------------------------- DEGREES -----------------------------*/

    $("#degree_add").click(function(){
		$(this).fadeOut('slow', function(){
			$('#add_degree_cancel').removeClass("hide");
			$('#add_degree_submit').removeClass("hide");
		});
		$('#add_degree_div').removeClass("hide");
	});

    $("#add_degree_cancel").click(function(){
		$('#add_degree_cancel').addClass("hide");
		$('#add_degree_submit').addClass("hide");
		$("#degree_add").fadeIn('slow');
		$('#add_degree_div').addClass("hide");
	});



	$(".degree_edit").click(function(){
    	var j = $(this).val();
    	console.log(j);
    	
    	$("#degree_delete_"+j).fadeOut('slow',function(){
    		$(".edit_degree_cancel").removeClass("hide");
    	});
    	$(this).fadeOut('slow', function(){
    		$("#edit_degree_submit_"+j).removeClass("hide");
    	});
    	
    	$("#edit_degree_degreeType_"+j).fadeOut('slow',function(){
    		$("#edit_degree_degreeType_text_"+j).removeClass("hide");
    	});
    	$("#edit_degree_subject_"+j).fadeOut('slow',function(){
    		$("#edit_degree_subject_text_"+j).removeClass("hide");
    	});
    	$("#edit_degree_institution_"+j).fadeOut('slow',function(){
    		$("#edit_degree_institution_text_"+j).removeClass("hide");
    	});
    	$("#edit_degree_graduatedYear_"+j).fadeOut('slow',function(){
    		$("#edit_degree_graduatedYear_text_"+j).removeClass("hide");
    	});
    	$("#edit_degree_graduatedMonth_"+j).fadeOut('slow',function(){
    		$("#edit_degree_graduatedMonth_text_"+j).removeClass("hide");
    	});
    	$("#edit_degree_graduatedDay_"+j).fadeOut('slow',function(){
    		$("#edit_degree_graduatedDay_text_"+j).removeClass("hide");
    	});


	});

	$(".edit_degree_cancel").click(function(){
		var j = $(this).val();

		$(this).addClass("hide");
		$("#edit_degree_submit_"+j).addClass("hide");

		$("#degree_delete_"+j).fadeIn("slow");
		$(".degree_edit").fadeIn("slow");


		$("#edit_degree_degreeType_text_"+j).addClass("hide");
		$("#edit_degree_subject_text_"+j).addClass("hide");
		$("#edit_degree_institution_text_"+j).addClass("hide");
		$("#edit_degree_graduatedYear_text_"+j).addClass("hide");
		$("#edit_degree_graduatedMonth_text_"+j).addClass("hide");
		$("#edit_degree_graduatedDay_text_"+j).addClass("hide");

		$("#edit_degree_degreeType_"+j).fadeIn('slow');
		$("#edit_degree_subject_"+j).fadeIn('slow');
    	$("#edit_degree_institution_"+j).fadeIn('slow');
    	$("#edit_degree_graduatedYear_"+j).fadeIn('slow');    	
    	$("#edit_degree_graduatedMonth_"+j).fadeIn('slow');
    	$("#edit_degree_graduatedDay_"+j).fadeIn('slow');
	});

    /*----------------------------------- DEGREES END-----------------------------*/


    
 	/*----------------------------------- RELATIONSHIPS -----------------------------*/



    /*----------------------------------- RELATIONSHIPS END-----------------------------*/




    /*----------------------------------- LOCATIONS -----------------------------*/

    $("#location_add").click(function(){
    	$(this).fadeOut('fast',function(){
    		$("#add_location_cancel").removeClass("hide");
    		$("#add_location_submit").removeClass("hide");
    	});
    	$("#add_location_div").removeClass("hide")
    });

	$("#add_location_cancel").click(function(){
		$("#add_location_cancel").addClass("hide");
    	$("#add_location_submit").addClass("hide");
    	$("#add_location_div").addClass("hide")

    	$("#location_add").fadeIn('sow');
    });

    $("#add_location_present_checkbox").click(function(){
		$("#add_location_to_text").toggleClass('hide');
    });



    $(".location_edit").click(function(){	
    	var j = $(this).val();
    	
    	
		$("#location_delete_"+j).fadeOut('fast', function(){
			$(this).siblings('.edit_location_cancel').removeClass("hide");
		});
		$(this).fadeOut('fast',function(){
			$("#edit_location_submit_"+j).removeClass("hide");
		});

		$("#edit_location_name_"+j).fadeOut('slow',function(){
    		$("#edit_location_name_text_"+j).removeClass("hide");
    	});
    	$("#edit_location_from_"+j).fadeOut('slow',function(){
    		$("#edit_location_from_text_"+j).removeClass("hide");
    	});
    	$("#edit_location_to_"+j).fadeOut('slow',function(){
    		$("#edit_location_to_text_"+j).removeClass("hide");
    	});



    });

	$(".edit_location_cancel").click(function(){
		var j = $(this).val();

		$(this).addClass("hide");
		$("#edit_location_submit_"+j).addClass("hide");

		$("#location_delete_"+j).fadeIn("slow");
		$(".location_edit").fadeIn("slow");


		$("#edit_location_name_text_"+j).addClass("hide");
		$("#edit_location_from_text_"+j).addClass("hide");
		$("#edit_location_to_text_"+j).addClass("hide");

		$("#edit_location_name_"+j).fadeIn('slow');
		$("#edit_location_from_"+j).fadeIn('slow');
    	$("#edit_location_to_"+j).fadeIn('slow');
    });
    		

    //------------------------------------------

    /*----------------------------------- LOCATIONS END-----------------------------*/

/*----------------------------------- Certificates -----------------------------*/


        $("#certificate_add").click(function(){
		$(this).fadeOut('slow', function(){
			$('#add_certificate_cancel').removeClass("hide");
			$('#add_certificate_submit').removeClass("hide");
		});
		$('#add_certificate_span').removeClass("hide");
	});

    $("#add_certificate_cancel").click(function(){
		$('#add_certificate_span').addClass("hide");
		$('#add_certificate_submit').addClass("hide");
		$('#add_certificate_cancel').addClass('hide');

		$('#certificate_add').fadeIn('slow');
	});

    $(".certificate_edit").click(function(){
    	var j = $(this).val();
    	$('#edit_certificate_' + j).fadeOut('fast');
		$(this).fadeOut('slow', function(){
			$("#edit_certificate_delete_" + j).fadeOut('fast',function(){
				$('#edit_certificate_text_' + j).removeClass("hide");	
				$('#edit_certificate_submit_' + j).removeClass("hide");
				$(this).siblings('.edit_certificate_cancel').removeClass("hide");
			});
		});			
	});

	$(".edit_certificate_cancel").click(function(){
		var j = $(this).val();
		$(this).addClass("hide");
		$('#edit_certificate_text_' + j).addClass("hide");	
		$('#edit_certificate_submit_' + j).addClass("hide");
		$('#edit_certificate_' + j).fadeIn('fast');
		$(".certificate_edit").fadeIn('slow');
		$("#edit_certificate_delete_" + j).fadeIn('fast');
	});

/*----------------------------------- Certificates END-----------------------------*/


});





