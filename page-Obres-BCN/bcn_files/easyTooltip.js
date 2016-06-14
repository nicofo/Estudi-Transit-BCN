/*
 * 	Easy Tooltip 1.0 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4380/easy-tooltip--jquery-plugin
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
(function($) {

	$.fn.easyTooltip = function(options){
	  
		// default configuration properties
		var defaults = {	
			xOffset: 10,		
			yOffset: 40,
			tooltipId: "easyTooltip",
			clickRemove: false,
			content: "",
			useElement: ""
		}; 
			
		var options = $.extend(defaults, options);  
		var content;
		var moviendo = false;
		var posicion = 0;
		this.each(function() {  	
			
			var title = $(this).attr("title");	
			$(this).mouseover(function(e){		
/////////////////////// Problema amb el cursor al fer hover al tag <map> / <area> en IE
			$('#Mapa').addClass('cursorPointer');
///////////////////////
				if($('#easyTooltip').length == 0)	{
			    if(!moviendo){									 							   
				        content = (options.content != "") ? options.content : title;
				        content = (options.useElement != "") ? $("#" + options.useElement).html() : content;
				        $(this).attr("title","");									  				
				        if (content != "" && content != undefined){		
        					
					        $("body").append("<div id='"+ options.tooltipId +"'>"+ content +"</div>");	
					        initBubblePoligon(document.getElementById(options.tooltipId),(e.pageX + options.xOffset));	
        					
							        var mapaW = $("#ContenedorMapa").width();
		                            var posleftmapa = $("#ContenedorMapa").position().left;
		                           moviendo=true;
		                           var heaux= $("#"+options.tooltipId).children("span.info").height();
					        if((e.pageX + options.xOffset)-posleftmapa <= mapaW/2) {
                					
        					        posicion=1;
                					
					                $("#" + options.tooltipId)
						                .css("position","absolute")
						                .css("top",(e.pageY - (options.yOffset+heaux)) + "px")
						                .css("left",(e.pageX + options.xOffset) + "px")						
						                .css("display","none")
						                .fadeIn("fast");
        					
						        }
					        else 
					        {
					                posicion=2;
					                  $("#" + options.tooltipId)
						                .css("position","absolute")
						                .css("top",(e.pageY - (options.yOffset+heaux)) + "px")
						                .css("left",(e.pageX + options.xOffset-150) + "px")						
						                .css("display","none")
						                .fadeIn("fast");
        					
        					
        					
					        }	
        						
        						
				        }
			    }
			}
			});
			
			$(this).mouseout(function(){	
/////////////////////// Problema amb el cursor al fer hover al tag <map> / <area> en IE
			$('#Mapa').removeClass('cursorPointer');
///////////////////////
			    posicion=0;
			     moviendo=false;
				$("#" + options.tooltipId).remove();
				$(this).attr("title",title);
			});
		/*this.each(function() {  				
			var title = $(this).attr("title");				
			$(this).hover(function(e){											 							   
				content = (options.content != "") ? options.content : title;
				content = (options.useElement != "") ? $("#" + options.useElement).html() : content;
				$(this).attr("title","");									  				
				if (content != "" && content != undefined){			
					$("body").append("<div id='"+ options.tooltipId +"'>"+ content +"</div>");	
					initBubblePoligon(document.getElementById(options.tooltipId));	
					
					$("#" + options.tooltipId)
						.css("position","absolute")
						.css("top",(e.pageY - options.yOffset) + "px")
						.css("left",(e.pageX + options.xOffset) + "px")						
						.css("display","none")
						.fadeIn("fast")
						
				}
			},
			function(){	
				$("#" + options.tooltipId).remove();
				$(this).attr("title",title);
			});	*/
			$(this).mousemove(function(e){
			
			      var mapaW = $("#ContenedorMapa").width();
		          var posleftmapa = $("#ContenedorMapa").position().left;
		             var heaux= $("#"+options.tooltipId).children("span.info").height();
		             
		                     
					if(posicion==1) {
			
			
				        $("#" + options.tooltipId)
					        .css("top",(e.pageY - (options.yOffset+heaux)) + "px")
					        .css("left",(e.pageX + options.xOffset) + "px");		
					}
					else if(posicion==2){
					
					 $("#" + options.tooltipId)
					        .css("top",(e.pageY - (options.yOffset+heaux)) + "px")
					        .css("left",(e.pageX + options.xOffset-150) + "px");	
					
					
					}
								
			});	
			if(options.clickRemove){
				$(this).mousedown(function(e){
					$("#" + options.tooltipId).remove();
					$(this).attr("title",title);
				});		
				
						
			}
			
			
		});
	  
	};

})(jQuery);
