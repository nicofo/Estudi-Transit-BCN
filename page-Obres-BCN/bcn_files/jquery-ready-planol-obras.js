// JavaScript Document
$(document).ready ( function() {
//$(window).load ( function() {

var isIE = /*@cc_on!@*/false;
if(isIE){
$("#DivFil1").css('top','5px');
$("#DivFil2").css('top','5px');
$("#DivFil3").css('top','5px');
}

//$(document).pngFix();
	$(".cantonades").prepend('<span class="se"></span>');
	
	//ALTRAN WO2 MAR
	$(".contenido").hide();
	
	$("map:first .contenido").show();
	
	$("map:first h2").addClass("active");
	
	$(".serveis:first .contenido").show();
	
	$(".serveis:first h2").addClass("active");
	
	
	
	$(".ArbreEquipaments input:checkbox").each(function(){
	
	CapesSistema[$(this).attr('id')]=1;
	
	
	});

	/*$(".ArbreEquipaments ul:first").append('<li><input id="seleccio" type="button" value="Borra" /></li>');*/


	
	$(".ArbreEquipaments input:checkbox").click(function(){
	
		var n = $(this).parents().filter('.ArbreEquipaments').find("input:checked").length;
		var idarbre=$(this).parents().filter('.ArbreEquipaments').attr("id");
	
		if(n == 0){
		 $(this).parents().filter('.ArbreEquipaments').find(".boton-arbol").css("opacity","0.5");  
		}else{
		 var x=$(this).parents().filter('.ArbreEquipaments').find(".boton-arbol");
		    x.css("opacity","1");    
             }
        
			
	});
	
	
	$(".ArbreEquipaments .boton-arbol").click(function(){
	    var x=$(this).parents().filter('.ArbreEquipaments');
	   
      
		var n = $(this).parents().filter('.ArbreEquipaments').find("input:checked").length;
		
		if(n > 0){
		  $(this).parents().filter('.ArbreEquipaments').find("form").each(function() {this.reset();});
		  $(this).animate({opacity:0.5});
		}
		
		capas = "";
		ActualizaMapa();
		
	});

$(".ArbreEquipaments .boton-arbol2").click(function(){

capas="";
$(this).parents().filter('.ArbreEquipaments').find("input:checkbox").each(function(){
if(!$(this).attr('checked')){
$(this).click();
}
          
           
capas += $(this).attr('id');
});
ActualizaMapa();

});
	
	
	$("map h2:not(.active)").wrapInner('<a href="#"></a>');
	
	
	
	
    $(".nopleg").each(function(){
	
	$(this).addClass("active");
	 var nombre=$(this).text();
	 $(this).html(nombre);
	$(this).parents().filter("map").find(".contenido").show();
	
	});
	

	
	
	$("h2").css("color","#f8ce02");
	
	$("map h2").click(function(){
	
	        if(!$(this).hasClass('active') )
	        {
	        
	               $("map h2").each(function(){
        	       
	                     if($(this).hasClass('active') && !$(this).hasClass('nopleg')){
            	         
				            $(this).removeClass('active');
				            $(this).wrapInner('<a href="#"></a>');
				           $(this).parents().filter("map").find(".contenido").hide("slow");
			             }
        	         
        	       
	               });
        	       
	                
	                 $(this).addClass("active");
	                var nombre=$(this).text();
	                $(this).html(nombre);
	                $(this).parent().find(".contenido").show("slow");
	       }
			
	        
	        
	        
	
	
	});
	
	
	
	//Canvi d'imatge del titol per colors
/*	
	$('.blau').click(function(){$("img#titol-web").attr({ src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png" }); $("body").css("background-color","#018194");});
	
	$('.taronja').click(function(){ $("img#titol-web").attr({ src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"});$("body").css("background-color","#ff8400");});
	
	$('.verd').click(function(){$("img#titol-web").attr({ src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"}); $("body").css("background-color","#889401");});
	
	$('.rosa').click(function(){$("img#titol-web").attr({ src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"}); $("body").css("background-color","#E40F74");});
	
	$('.gris').click(function(){ $("img#titol-web").attr({ src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png" }); $("body").css("background-color","#ACACAC");});
		
	
	var c = readCookie('style');
	if (c) setActiveStyleSheet(c);
		

	//Canvis que no pertanyen als css i hem de fer per la cookie
	
		 switch(c) {
			 case "verd": 
				$("img#titol-web").attr({ 
				  src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"
				 });
			 break;
			 case "blau": 
				$("img#titol-web").attr({ 
				  src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"
				 });
			 break;
			 case "rosa": 
				$("img#titol-web").attr({ 
				  src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"
				 });
			 break;
			 case "taronja": 
				$("img#titol-web").attr({ 
				  src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"
				 });
			 break;
			 default:
			 $("img#titol-web").attr({ 
				  src: "http://www.bcn.cat/obres/guia_bcn/img/titol-obres.png"
				 });
			  break;
		 }
		
	
	
	
	$('.styleswitch').click(function(){
								 
		setActiveStyleSheet(this.getAttribute("rel"));
		var versio=this.getAttribute("rel");
		return false;
});
	//Canvi d'imatge del titol per colors
*/		


	//Llistat de items serveis sobre el planol
	

	$("a.segon").each(function(){
		$(this).parent("li").addClass('segontancat');
	});

	var li_clicables = $(".ArbreEquipaments ul li a"); // Guarda la ruta del llistat
	
	li_clicables.parent("li").children('ul').hide(); // Recull tots els fills del llistat

	li_clicables.click(function(){

		$(this).parent("li").children("ul").slideToggle('slow');	
		if($(this).parent("li").hasClass('primertancat')){
			$(this).parent("li").removeClass('primertancat');
			$(this).parent("li").addClass('primerobert');
		}
		else if($(this).parent("li").hasClass('primerobert')){
			$(this).parent("li").removeClass('primerobert');
			$(this).parent("li").addClass('primertancat');
		}
		else if($(this).parent("li").hasClass('segontancat')){
			$(this).parent("li").removeClass('segontancat');
			$(this).parent("li").addClass('segonobert');
		}
		else if($(this).parent("li").hasClass('segonobert')){
			$(this).parent("li").removeClass('segonobert');
			$(this).parent("li").addClass('segontancat');
		}
		return false;
	});
	
	
	$("img#titol-web").attr("width","166");
	
	//Funcions de l'styleswitcher

	$("#principal").css("overflow-y","auto");
	$("#principal").css("overflow-x","hidden");
	
/*
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		$("a#valora").fancybox({
			'overlayShow'			: true,
			'frameWidth'			: 412,
			'frameHeight'			: 575,
			'zoomSpeedIn'			: 500,
			'zoomSpeedOut'			: 500,
			'easingIn'				: 'easeOutBack',
			'easingOut'				: 'easeInBack'
		});
	}else{
		
		$("a#valora").fancybox({
			'overlayShow'			: true,
			'frameWidth'			: 412,
			'frameHeight'			: 588,
			'zoomSpeedIn'			: 500,
			'zoomSpeedOut'			: 500,
			'easingIn'				: 'easeOutBack',
			'easingOut'				: 'easeInBack'
		});
	
	}
*/	

	
	$(".primer").click();
	$("a.primer").each(function(){
		$(this).parent("li").addClass('primerobert');
		
	});
	
//bcn.ready();
});




function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

/*
$(window).load( function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
});

$(window).unload( function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
});

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);

*/



