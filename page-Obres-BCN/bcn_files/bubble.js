	
	function initBubblePoligon(element,left){
	   // $(element).append("<span class=\"sombraH\"></span><span class=\"sombraV\"></span><span class=\"sombraV2\"></span><span class=\"punta\"></span>");

		var mapaW = $("#ContenedorMapa").width();
		var mapaH = $("#ContenedorMapa").height();
        var posleftmapa = $("#ContenedorMapa").position().left;

		var thisX = element.offsetLeft;
		var thisY = element.offsetTop;
		var thisW = 140; 
		var marge = 30;
		var isIE = /*@cc_on!@*/false;
		
		if(left-posleftmapa <= mapaW/2) {
		
		            var marge = 30;
		            var margeLocalTop = -20;
				            var margeLocalLeft = -19;
		            var margintoppunta= margeLocalTop-20;
		            //Calcul de la distància
		            var tamany = $(element).children("span.info").height();
		           
		           if(isIE){
		           
		            $(element).css('height',tamany);
		             //$(element).children("span.punta").css({"background": "url(http://www.bcn.cat/planol_bcn/img/bubble/punta4.png) 0 0 no-repeat", "margin":(margeLocalTop+100)+"px 0 0 "+(margeLocalLeft+110)+"px"});
		           $(element).children("span.info").css({"margin":(margeLocalTop)+"px 10px 0 "+(margeLocalLeft+17)+"px" });
	                  $(element).append("<span class=\"punta\" style=\"background : url(./img/bubble/punta3.gif) 0 0 no-repeat ; top :"+(tamany+5)+"; left: 20; \"></span>");
	               
	               
		            }
		            else{
		         $(element).append("<span class=\"punta\"></span>");
		            $(element).css('height',tamany);
		             $(element).children("span.info").css({"margin":(margeLocalTop-100)+"px 10px 0 "+(margeLocalLeft+17)+"px" });
	                //$(element).children("span.punta").css({"background": "url(http://www.bcn.cat/planol_bcn/img/bubble/punta3.png) 0 0 no-repeat", "margin":(margeLocalTop+35)+"px 0 0 "+margeLocalLeft+"px"});
	                $(element).children("span.punta").css({"background": "url(./img/bubble/punta3.png) 0 0 no-repeat", "top":tamany+5});
	               
	               }
	               
	                //$(element).children("span.sombraH").css({"margin-top": (margeLocalTop+tamany)+"px", "margin-left":  margeLocalLeft+"px" });
	   	           // $(element).children("span.sombraV").css({"margin-top": (margeLocalTop-14)+"px", "margin-left": margeLocalLeft+"px", "height": (tamany)});
		           // $(element).children("span.sombraV2").css({"margin-top": (margeLocalTop-16)+"px", "margin-left": margeLocalLeft+"px"});
            			
			}
		else{
		
		        var marge = 30;
		            var margeLocalTop = -20;
				            var margeLocalLeft = -19;
		            var margintoppunta= margeLocalTop-20;
		            //Calcul de la distància
		            var tamany = $(element).children("span.info").height();
		            if(isIE){
		            
		            $(element).css('height',tamany);
		            $(element).children("span.info").css({"margin":(margeLocalTop-100)+"px 10px 0 "+(margeLocalLeft+17)+"px" });
	            
		               $(element).append("<span class=\"punta\" style=\"background : url(./img/bubble/punta4.gif) 0 0 no-repeat ; top : "+(tamany+5)+"; left: 70;\"></span>");
	               
		             }
		            else{
		               $(element).append("<span class=\"punta\"></span>");
		            $(element).css('height',tamany);
		            $(element).children("span.info").css({"margin":(margeLocalTop-100)+"px 10px 0 "+(margeLocalLeft+17)+"px" });
	             $(element).children("span.punta").css({"background": "url(./img/bubble/punta4.png) 0 0 no-repeat", "top":(tamany+5),"left": "70px"});
	            
	             
	               
		            }
	                // $(element).children("span.sombraH").css({"margin-top": (margeLocalTop+tamany)+"px", "margin-left":  margeLocalLeft+"px" });
	   	           // $(element).children("span.sombraV").css({"margin-top": (margeLocalTop-14)+"px", "margin-left": margeLocalLeft+"px", "height": (tamany)});
		           // $(element).children("span.sombraV2").css({"margin-top": (margeLocalTop-16)+"px", "margin-left": margeLocalLeft+"px"});
		
		}	
				
	}
	
	
	
	
	function initBubble(element){

		//$(element).append("<span class=\"sombraH\"></span><span class=\"sombraV\"></span><span class=\"sombraV2\"></span><span class=\"punta\"></span>");
		$(element).css('cursor','pointer');
  $(element).append("<span class=\"punta\"></span>");
		var mapaW = $("#ContenedorMapa").width();
		var mapaH = $("#ContenedorMapa").height();

		var thisX = element.offsetLeft;
		var thisY = element.offsetTop;
		
		var marge = 30;
		
		//Calcul de la distància
		var tamany = $(element).children("span.info").height();

		var thisW = 140; // 140 = $(element).width()
		
		var thisH = tamany + $(element).height(); // $(element).height() = mida de l'icona 

		if((thisX + thisW + marge) <= mapaW) {
			if ((thisH + marge) > thisY) {		// PRIMER QUADRANT:	
				
				var margeLocalTop = 17;
				var margeLocalLeft = 17;
				$(element).children("span.punta").css({"background": "url(http://www.bcn.cat/planol_bcn/img/bubble/punta1.png) 0 0 no-repeat", "margin":margeLocalTop+"px 0 0 "+margeLocalLeft+"px"});
				$(element).children("span.info").css({"margin":(margeLocalTop+22)+"px 0 0 "+(margeLocalLeft+8)+"px" });
				
				//$(element).children("span.sombraH").css({"margin-top": (margeLocalTop+tamany+44)+"px", "margin-left":  margeLocalLeft+"px" });
				//$(element).children("span.sombraV").css({"margin-top": (margeLocalTop+34)+"px", "margin-left": margeLocalLeft+"px", "height": (tamany+10)});
				//$(element).children("span.sombraV2").css({"margin-top": (margeLocalTop+24)+"px", "margin-left": margeLocalLeft+"px"});
						  
			}
			else{								// TERCER QUADRANT:
				
				var margeLocalTop = -18;
				var margeLocalLeft = 18;
				$(element).children("span.punta").css({"background": "url(http://www.bcn.cat/planol_bcn/img/bubble/punta3.png) 0 0 no-repeat", "margin":margeLocalTop+"px 0 0 "+margeLocalLeft+"px"});
				$(element).children("span.info").css({"margin": (margeLocalTop-tamany-21)+"px 0 0 "+(margeLocalLeft+8)+"px"  });
				
				//$(element).children("span.sombraH").css({"margin-top": (margeLocalTop+1)+"px", "margin-left": margeLocalLeft+"px" });
				//$(element).children("span.sombraV").css({"margin": (margeLocalTop-tamany-9)+"px 0 0 "+margeLocalLeft+"px", "height": (tamany+10)});
				//$(element).children("span.sombraV2").css({"margin-top": (margeLocalTop-tamany-19)+"px", "margin-left": margeLocalLeft+"px"});
			}
		}
		else{
			if ((thisH + marge) > thisY) {		// SEGON QUADRANT:
				
				var margeLocalTop = 18;
				var margeLocalLeft = -157;
				$(element).children("span.punta").css({"background": "url(http://www.bcn.cat/planol_bcn/img/bubble/punta2.png) 0 0 no-repeat", "margin":margeLocalTop+"px 0 0 "+(margeLocalLeft+122)+"px"});
				$(element).children("span.info").css({"margin":(margeLocalTop+22)+"px 0 0 "+(margeLocalLeft+8)+"px"  });
	
				//$(element).children("span.sombraH").css({"margin":(margeLocalTop+tamany+44)+"px 0 0 "+margeLocalLeft+"px" });
				//$(element).children("span.sombraV").css({"margin-top": (margeLocalTop+34)+"px", "margin-left": margeLocalLeft+"px", "height": (tamany+10)});
				//$(element).children("span.sombraV2").css({"margin-top": (margeLocalTop+24)+"px", "margin-left": margeLocalLeft+"px"});	
			}
			else{								// QUART QUADRANT:
				
				var margeLocalTop = -17;
				var margeLocalLeft = -155;
				$(element).children("span.punta").css({"background": "url(http://www.bcn.cat/planol_bcn/img/bubble/punta4.png) 0 0 no-repeat", "margin":margeLocalTop+"px 0 0 "+(margeLocalLeft+113)+"px"});
				$(element).children("span.info").css({"margin":  (margeLocalTop-tamany-21)+"px 0 0 "+(margeLocalLeft+8)+"px"  });

				//$(element).children("span.sombraH").css({"margin":  (margeLocalTop+1)+"px 0 0 "+margeLocalLeft+"px" });
				//$(element).children("span.sombraV").css({"margin": (margeLocalTop-tamany-9)+"px 0 0 "+ margeLocalLeft+"px", "height": (tamany+10)});
				//$(element).children("span.sombraV2").css({"margin-top": (margeLocalTop-tamany-19)+"px", "margin-left": margeLocalLeft+"px"});
			}
		}
	}

	function iconOver(element) {
		if(!$(element).hasClass("iniciat")){
			initBubble(element);
			$(element).pngFix();
			$(element).addClass("iniciat");
		}
		$(element).children("span").css("display", "block");
	};
	
	function iconOut(element){
	
		$(element).children("span").css("display", "none");
	};

