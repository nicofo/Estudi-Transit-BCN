 
 $(document).ready(function() {
// $(window).load(function() {
 
 $("#selParaulalink a").fancybox({
        'frameWidth': 800,
        'frameHeight': 250,
        'centerOnScroll': true
        
    });
    

    
    });
  
 var fanbox= false; 
 var enl;   
 function busquedaParaula()
  {
  
    var parcerca= $('#parcerca').val();
    if($.trim(parcerca) != "")
    {
             var divMapa = document.getElementById("ContenedorMapa");
               Params = "paraula="+encodeURI(parcerca)+"&m="+macros+"&Idioma="+$("html").attr("lang") ;
            $("#cargagif").css("visibility","visible");
            $.get("CercaParaulaWO2.aspx", Params,
               function(data){
                 $("#cargagif").css("visibility","hidden");
                 $('#selParaula').html(data);
                        
                 $("#selParaulalink").click();
                 setTimeout("$('#selParaula').html('')", 100);
               }, "html");
    }
}

/*
function sleep(ms)
	{
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
	}
*/

function AnarParaula(CentreParaulaX,CentreParaulaY,zoom){


$.fn.fancybox.close();
cridaws=false;
setCenter(CentreParaulaX,CentreParaulaY);
cridaws=true;
saltacomprobacio=false;
setZoom(zoom+""); // Modificado Nacho
saltacomprobacio=true;
}

function fan(event,enlace)
{
    if(!fanbox){
       event.preventDefault ? event.preventDefault() : event.returnValue = false;
       $.fn.fancybox.close();
       enl=enlace;
        fan2();
     }
           
     
}

function fan2()
{
      if ( $("#fancy_div").length )
       {
            setTimeout(fan2, 500);
       }
        else
        {
            abrirfancy();
         }
}


function abrirfancy()
{
   
    if(!fanbox)
    {
          fanbox=true;
        $(enl).fancybox();
        $(enl).click();
      
        $($.fn.fancybox.close).bind('click', handfan);
    }
   
}

function redocercaparaula()
{

  busquedaParaula();
  
  fanbox=false;
   $($.fn.fancybox.close).unbind('click',handfan);

  
}



function handfan()
{

     if ( $("#fancy_overlay") != undefined &&  $("#fancy_overlay").length > 0 )
       {
            setTimeout(handfan, 500);
            
       }
        else
        {
          if(fanbox)
             {
              
              setTimeout(redocercaparaula,500);
              }
         }
 
}
