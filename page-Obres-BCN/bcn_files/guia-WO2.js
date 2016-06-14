/*ALTRAN WO2 MAR*/
var exec=false;
var fina=false;
var noini=false;
var enviar= true;
var cridaws = true;
var paramsprimera = false;
var saltacomprobacio = true;
var CapesSistema = new Array();
var Macrosarr = new Array();
var aux=false;
var background1="",background2="",alfa_transparencia="",macros="";
//CMM 10/05/2011
var idioma = "";
/* Variables a inicializar desde fichero de configuración */
var queryMapa = "",
    queryMapaParams = "",
    prevQueryMapaParams = "",
    prevHash = "",
    queryWS = "",
    queryCarrers = "",
    xOrigen = 27385925,
    yOrigen = 60818235,
    centroUTMX = 27601010,
    centroUTMY = 83987710,
    centroGuiaX = 11200000,
    centroGuiaY = 11200000,
    minzoom = 0,
    maxzoom = 6,
    escala = [32000, 16000, 8000, 4000, 2000, 1000, 500],
    iconOffset = 12,
    WindowWidth = 0,
    WindowHeight = 0,
    MinWidth = 800,
    MinHeight = 500,
    ContadorTimeout = 0,
    ZoomParaBusquedas = 5,
    IsHistoryAction = false;
    
/* Array de imágenes para la escala gráfica */
var escala_grafica = new Array(7);
    escala_grafica[0] = '/Web_Obres_Map/img/escala_grafica_1.gif';
    escala_grafica[1] = '/Web_Obres_Map/img/escala_grafica_2.gif';
    escala_grafica[2] = '/Web_Obres_Map/img/escala_grafica_3.gif';
    escala_grafica[3] = '/Web_Obres_Map/img/escala_grafica_4.gif';
    escala_grafica[4] = '/Web_Obres_Map/img/escala_grafica_5.gif';
    escala_grafica[5] = '/Web_Obres_Map/img/escala_grafica_6.gif';
    escala_grafica[6] = '/Web_Obres_Map/img/escala_grafica_7.gif';


/* Variables a inicializar desde linea de comandos o cookie */
var x = "",
    y = "",
    z = "",
    capas = "",
    plot = "";

/* Variables a inicializar solamente desde linea de comandos */
var ImgW = 512,
    ImgH = 512;

/* Variables de uso interno */
var IE = document.all ? true: false,
    CONST_ROT = -0.7761112664476,
    UTMX = 27601010.0,
    UTMY = 83987710.0,
    zoomlevel = 0,
    guiaX = 0.0,
    guiaY = 0.0,
    imgX = 0,
    imgY = 0,
    mouseX = 0,
    mouseY = 0,
    xmlhttp = null,
    dragging = false,
    IniDragX = 0,
    IniDragY = 0,
    IniImgPosX = 0,
    IniImgPosY = 0,
    LastQueryStr = "",
    queryEQ = "",
    queryOB = "";

function InitGlobals() 
{
    var stritem = "",
        p = 0,
        i = 0,
        strEscala = document.getElementById('escala').value,
        tmpEscala = [],
        strx = "",
        stry = "",
        strz = "";

    queryMapa = document.getElementById('queryMapa').value;
    queryWS = document.getElementById('queryWS').value;
    queryEQ = document.getElementById('queryEQ').value;
    queryOB = document.getElementById('queryOB').value;
    queryCarrers = document.getElementById('queryCarrers').value;

    xOrigen = parseInt(document.getElementById('xOrigen').value, 10);
    yOrigen = parseInt(document.getElementById('yOrigen').value, 10);
    centroUTMX = parseInt(document.getElementById('centroUTMX').value, 10);
    centroUTMY = parseInt(document.getElementById('centroUTMY').value, 10);
    centroGuiaX = parseInt(document.getElementById('centroGuiaX').value, 10);
    centroGuiaY = parseInt(document.getElementById('centroGuiaY').value, 10);

    while (strEscala.length > 0) 
    {
        p = strEscala.indexOf(";");
        if (p != -1) 
        {
            stritem = strEscala.substr(0, p);
            strEscala = strEscala.substr(p + 1);
        }
        else 
        {
            stritem = strEscala;
            strEscala = "";
        }

        tmpEscala[i] = parseFloat(stritem);
        tmpEscala[i] *= 1000;
        i++;
    }

    tmpEscala.sort(function(a, b) {
        return b - a;
    });

    escala = tmpEscala;

    /* Valores de QueryString */
    strx = document.getElementById('input_x').value;
    if (strx !== "") 
    {
        x = parseInt(strx, 10);
    }

    stry = document.getElementById('input_y').value;
    if (stry !== "") 
    {
        y = parseInt(stry, 10);
    }

    strz = document.getElementById('input_z').value;
    if (strz !== "") 
    {
        zoomlevel = parseInt(strz, 10);
    }

    capas = document.getElementById('input_c').value;
    plot = document.getElementById('input_p').value;
}

function MapaLoad() 
{
    var TmpImg = document.getElementById('TmpImg');

    TmpImg.style.display = "none";
    
   //WO2 document.getElementById("SeleccioCapes").style.cursor = "default";

    TmpImg.style.cursor = "url(/Web_Obres_Map/cursors/arrastrar.cur), default"; 
    document.getElementById('Mapa').style.cursor = "url(/Web_Obres_Map/cursors/arrastrar.cur), default"; 
}

function TmpImgLoad() 
{
    var Mapa = document.getElementById('Mapa'),
        TmpImg = document.getElementById('TmpImg');

    TmpImg.style.display = "block";
    Mapa.onload = MapaLoad;
    Mapa.src = TmpImg.src;
    Mapa.style.left = "0px";
    Mapa.style.top = "0px";
}

function CambiaMapa()
{
//    var URL = document.location.hash;
//    if (URL == '#') return;
    var querystr = "",
//        divMapa = document.getElementById("ContenedorMapa"),
        Mapa = document.getElementById('Mapa'),
        left = parseInt(Mapa.style.left, 10),
        top = parseInt(Mapa.style.top, 10);
    //  var srcEscala = "";
    //  OcultaCapasInfo();

    querystr = queryMapa + queryMapaParams;
    
    if ((left === 0) && (top === 0)) 
    {
        Mapa.src = querystr;
    }
    else 
    {
        var tmpImg = document.getElementById('TmpImg');
        tmpImg.onload = TmpImgLoad;
        tmpImg.style.width = Mapa.style.width;
        tmpImg.style.height = Mapa.style.height;
        tmpImg.src = querystr;
    }

    document.getElementById("ImgEscala").src = escala_grafica[zoomlevel];
}


function GetLabelTextForCodiCapa(codi)
{
//ALTRAN WO2 MAR
    
     if ($("#"+codi).parent().find('label').html() != "" ) return $("#"+codi).parent().find('label').html();
     else return codi;

/*
    var labeltext;
    var capaChkbox = document.forms.SeleccioCapes.elements[codi];
    var capaDiv = capaChkbox.parentNode;
    var capaDivLabels = capaDiv.getElementsByTagName('label');
    
    if (capaDivLabels[0].textContent) return capaDivLabels[0].textContent;
    else if (capaDivLabels[0].innerText != "") return capaDivLabels[0].innerText;
    else return codi;
    */
    
}
function pr(){
var arra= new Array();
arra["aaa"]="bbbb,asdfasd";
arra["bbbbas"]="bbbb,asdfsdfasdfasd";
alert(arra.length);
for(var i in arra) {
    alert(i+" --> "+arra[i]+"<br/>");
}

}

function Callback_Equips(data) 
{
            enviar=true;
            
            var Mapa = document.getElementById("Mapa"),prevId,
                 mapw = Mapa.offsetWidth,
                maph = Mapa.offsetHeight,
                DatosWS,
                //ALTRAN WO2 MAR
                C, N, X, Y,B,R,U, PrevX = -100, PrevY = -100,PrevP = "", PrevSpan = null, PrevCapa = '', PrevID = "", MultipleId = "",
                halfIconSize,
                mouseover = function() 
                {
                    iconOver(this);
                },
                mouseout = function() 
                {
                    iconOut(this);
                };
            var arra= new Array();
            var llegenda="";
            var areas=document.getElementById("areamap");
           $('#areamap').html("");
           $('#infoareas').html("");
           $('#CapasInfoGuia').html("");
            window.status = "Procesant dades...";

            prevId='';

            DatosWS = data.getElementsByTagName("DatosWS");

            if (zoomlevel > 4)
            {
              halfIconSize = iconOffset;
            }
            else
            {
              halfIconSize = Math.round(iconOffset * 0.666);
            }
            var idaux ="";
            var primera= true;
            for (var i = 0; i <= DatosWS.length-1; i++) 
            {
                var li, anchor, span, enlace;
                
                if(DatosWS[i].getElementsByTagName("P").length!=0){
                
                 Id = DatosWS[i].getElementsByTagName("Id")[0].childNodes[0].nodeValue;
                 C = DatosWS[i].getElementsByTagName("C")[0].childNodes[0].nodeValue;
                 N = DatosWS[i].getElementsByTagName("N")[0].childNodes[0].nodeValue;
                 R = DatosWS[i].getElementsByTagName("R")[0].childNodes[0].nodeValue;
                  B = DatosWS[i].getElementsByTagName("B")[0].childNodes[0].nodeValue;
                  U = DatosWS[i].getElementsByTagName("U")[0].childNodes[0].nodeValue;
              
                  
                   var area = document.createElement('area');
                    var labelcapa = GetLabelTextForCodiCapa(C);
                   $(area).addClass("fancy");
                   $(area).attr("id","area"+Id+"a"+i);
                   $(area).attr("shape","poly");
                   $(area).attr("coords",DatosWS[i].getElementsByTagName("P")[0].childNodes[0].nodeValue);
                   $(area).attr("href",U);
                   $(area).css("cursor","pointer");
                   $(area).css("z-index","100");
                   
                   //$(area).attr("class","{strokeColor:'0000ff',strokeWidth:5,fillColor:'ff0000',fillOpacity:0.6}");
                   $(areas).append($(area));
                   
                     var span = document.createElement('span');  
                     N = '<i>' + labelcapa + '</i><br><strong>' + N+'</strong>';
                     $(span).html(N);
                     $(span).addClass("info");
                  
                     
                     var div= document.createElement('div');
                     $(div).addClass("item");
                     $(div).attr("id","infoarea"+Id+"a"+i); 
                     $(div).append($(span));
                     $('#infoareas').append($(div)); 
                     
                                       
                    
                    
                    
                       $('#area'+Id+"a"+i).easyTooltip({
      	                 useElement: "infoarea"+Id+"a"+i
      	                });
      	              
      	               if ($("#llegendacapa"+C).length == 0 && llegenda.match("llegendacapa"+C) == null) {
                               llegenda = llegenda+"<div id='llegendacapa"+C+"' style='width: 16px; height: 16px; background-color: #"+R+ "; border: 2px solid #"+B+";'><div class='novalleg' >"+labelcapa+"</div></div><br>";
      	                        
                            }

      	                        
      	                
      	             
                }
                // si se quiere que los iconos sean clicabes conjuntamente con los poligonos comentar quitar el else (dejando el codigo de dentro que se ejecute siempre)
               // else 
              //  {
                       if(DatosWS[i].getElementsByTagName("C")[0] != undefined ){
                       
                        C = DatosWS[i].getElementsByTagName("C")[0].childNodes[0].nodeValue;
                        N = DatosWS[i].getElementsByTagName("N")[0].childNodes[0].nodeValue;
                        X = parseInt(DatosWS[i].getElementsByTagName("X")[0].childNodes[0].nodeValue, 10);
                        Y = parseInt(DatosWS[i].getElementsByTagName("Y")[0].childNodes[0].nodeValue, 10);
                        Id = DatosWS[i].getElementsByTagName("Id")[0].childNodes[0].nodeValue;

                        U = DatosWS[i].getElementsByTagName("U")[0].childNodes[0].nodeValue;
                        var labelcapa = GetLabelTextForCodiCapa(C);

                                if ((X != PrevX) || (Y != PrevY))
                                {
                                    
                                     enlace = U;
                                    prevId='p'+X+"a"+Y;
                                    $("#CapasInfoGuia").append('<li><a onmouseover="iconOver(this);"  onmouseout="iconOut(this);" href="'+U+'" id="p'+X+"a"+Y+'" ><span id="spana'+prevId+'" class="info" style="display: none;"><i>'+labelcapa+'</i><br><strong>'+N+'</strong></span></a></li> ');
                                 
                                    
                                    PrevSpan ='<i>'+labelcapa+'</i><br><strong>'+N+'</strong>';
                                    PrevCapa = C;
                                    
                                    arra[C]=Id;
                                    MultipleId = Id;
                                    idaux=Id;
                                }
                                
                                else
                                {
                                  if(idaux != Id)
                                  {
                                    idaux=Id;
                                        var PrevN = PrevSpan + '<hr>';

                                        N = '<strong>' + N + '</strong>';
                                               
                                                                                                                      
                                        
                                            if (C != PrevCapa)
                                            {
                                                N = '<i>' + labelcapa + '</i><br>' + N;
                                                PrevCapa = C;
                                            }
                                        
                                        $("#spana"+prevId).html(PrevN + N);
                                        if(arra[C]==undefined)arra[C]="";
                                        arra[C]=arra[C]+","+Id;
                                        MultipleId = MultipleId + ';' + Id+","+C;
                                    }
                                }

                        if (MultipleId.indexOf(';') > 0)
                        {
                            var urlmulcapa="";
                            
                                for(var xx in arra)   urlmulcapa= urlmulcapa+xx+":"+arra[xx]+";";
                        
                            enlace = "InfoEquip.aspx?idioma=" + $("html").attr("lang") + "&ID=" + urlmulcapa;
                            $("#"+prevId).attr('href','');
                        }
                        $("#"+prevId).attr('href',enlace);
                                             
                        $("#"+prevId).css({'left' : (X - halfIconSize) + 'px', 'top' : (Y - halfIconSize) + 'px', 'width' : (halfIconSize * 2) + 'px','height' :  (halfIconSize * 2) + 'px' });
                        

                        PrevX = X;
                        PrevY = Y;
                 }
               
            }
            if(llegenda != "") $('.novallegdiv').html(llegenda);
            
            $("#CapasInfoGuia a").fancybox({
                'frameWidth': 730,
                'frameHeight': 500
            });
            $("area.fancy").fancybox({
                'frameWidth': 730,
                'frameHeight': 500
            });
           
            
      	  

            window.status = "Procés acabat.";

}

function ActualizaMapa() 
{
    var URL = document.location.href;
    var divMapa = document.getElementById("ContenedorMapa");
    
    document.getElementById('Mapa').style.cursor = "wait";
    document.getElementById('TmpImg').style.cursor = "wait";

    document.getElementById("CapasInfoGuia").innerHTML = "";

    centroUTMX = x * 1000;
    centroUTMY = y * 1000;

    queryMapaParams =   "x=" + x;
    queryMapaParams += "&y=" + y;
    queryMapaParams += "&z=" + zoomlevel;
    queryMapaParams += "&c=" + capas;
    queryMapaParams += "&w=" + (divMapa.offsetWidth - 4);
    queryMapaParams += "&h=" + (divMapa.offsetHeight - 4);
    queryMapaParams += "&i=" + $("html").attr("lang");
    if (plot !== "") 
    {
        queryMapaParams += "&p=" + plot;
    }
    if (background1 !== "")
    {
         queryMapaParams += "&f=" + background1;
    }
     if (background2 !== "")
    {
         queryMapaParams += "&g=" + background2;
    }
     if (alfa_transparencia !== "")
    {
         queryMapaParams += "&a=" + alfa_transparencia;
    }
    if( macros !== "")
    {
         queryMapaParams += "&m=" + macros;
    }

    if (queryMapaParams === prevQueryMapaParams && saltacomprobacio) return;
    
     var areas=document.getElementById("areamap");
      $('#areamap').html("");
      $('#infoareas').html("");
      $('.novallegdiv').html("");
    if (capas !== "") 
    {
    //ALTRAN WO2 MAR
        Params = "CodiCapa=" + capas + "&ImgWidth=" + divMapa.offsetWidth + "&ImgHeight=" + divMapa.offsetHeight + "&Zoom=" + zoomlevel + "&CentroX=" + Math.round(centroUTMX) + "&CentroY=" + Math.round(centroUTMY) + "&Idioma="+$("html").attr("lang")+"&macros=" + macros ;
        if(paramsprimera){
            if(cridaws){
//                 if(enviar){
		            $('#CapasInfoGuia').html("");    
//	                enviar=false;
	                $.post(queryWS + "EquipamientosPorCapaPixel", Params, Callback_Equips);
//                }
            }
            
        }
        paramsprimera=true;
       
        $("#seleccio").animate({opacity:1});
    }
    else
    {
     	$("#seleccio").animate({opacity:0.5});
   	}

    if (!IsHistoryAction) $.historyLoad(queryMapaParams);
//    if (!IsHistoryAction) $.bbq.pushState(queryMapaParams);
//    $.historyLoad(queryMapaParams);

    prevQueryMapaParams = queryMapaParams;
    
    CambiaMapa();
}


function CoordUTMaGuia() 
{
    var cosang = Math.cos(CONST_ROT),
        sinang = Math.sin(CONST_ROT),
        xtmp = 0.0,
        ytmp = 0.0;

    /* Traslación de coordenadas; resto las coordenadas del origen
       de la hoja maestra para que todas las coordenadas se refieran a 0,0 */
    xtmp = UTMX - centroUTMX;
    ytmp = UTMY - centroUTMY;

    /* Rotación de coordenadas; quito los 44 y pico grados que está girada
       la base guía */
    guiaX = (xtmp * cosang) - (ytmp * sinang);
    guiaY = (ytmp * cosang) + (xtmp * sinang);
}

function CoordGuiaaUTM() 
{
    var cosang = Math.cos( - (CONST_ROT)),
        sinang = Math.sin( - (CONST_ROT)),
        xtmp = 0.0,
        ytmp = 0.0,
        xu = 0.0,
        yu = 0.0;

    xtmp = guiaX - centroGuiaX;
    ytmp = guiaY - centroGuiaY;

    /* Rotación de coordenadas; añado los 44 y pico grados que está girada
       la base guía */
    xu = (xtmp * cosang) - (ytmp * sinang);
    yu = (ytmp * cosang) + (xtmp * sinang);

    /* Traslación de coordenadas; sumo las coordenadas del origen de la
       hoja maestra para que todas las coordenadas se refieran a 0,0 */
    UTMX = xu + centroUTMX;
    UTMY = yu + centroUTMY;
}

function UTMaGeo(X, Y) 
{
    var a, b, ep, ep2, c, alfa, lat_decimal, lon_decimal, inc_lon, xi, ene, ni, dseta, A1, A2, J2, J4, J6, beta, gamma, BsubZeta, XX, YY, ee, sen_h_xi, tau, latitud, lon_sexa, lat_sexa;
    var grados, minutos, segundos;
//    var tmpUTMX = (X / 1000) + 400000;
//    var tmpUTMY = (Y / 1000) + 4500000;
    var lon = "", lat = "";

    // De UTM a Ge0
    a = 6378388.00000000; //radio ecuatorial  o semieje mayor
    b = 6356911.94612795; // radio polar o semieje menor
    ep = (Math.pow((Math.pow(a, 2) - Math.pow(b, 2)), 0.5)) / (b); // segunda excentricidad
    ep2 = Math.pow(ep, 2); // cuadrado de la segunda excentricidad
    c = Math.pow(a, 2) / b; // radio polar de curvatura
    XX = X - 500000; // eliminar retranqueo de x
    YY = Y;

    lon_decimal = (31 * 6) - 183; // meridiano central del huso
    lat_decimal = YY / (6366197.724 * 0.9996);
    ni = c * 0.9996 / Math.pow((1 + ep2 * Math.pow(Math.cos(lat_decimal), 2)), 0.5);
    a = XX / ni;
    A1 = Math.sin(2 * lat_decimal);
    A2 = A1 * Math.pow(Math.cos(lat_decimal), 2);
    J2 = lat_decimal + (A1 / 2);
    J4 = ((3 * J2) + A2) / 4;
    J6 = ((5 * J4) + A2 * Math.pow(Math.cos(lat_decimal), 2)) / 3;
    alfa = 3 * ep2 / 4;
    beta = 5 * Math.pow(alfa, 2) / 3;
    gamma = 35 * Math.pow(alfa, 3) / 27;
    BsubZeta = 0.9996 * c * (lat_decimal - alfa * J2 + beta * J4 - gamma * J6);
    b = (YY - BsubZeta) / ni;
    dseta = (ep2 * Math.pow(a, 2) * Math.pow(Math.cos(lat_decimal), 2)) / 2;
    xi = a * (1 - (dseta / 3));
    ene = b * (1 - dseta) + lat_decimal;
    ee = Math.exp(1.0);
    sen_h_xi = (Math.pow(ee, xi) - Math.pow(ee, -xi)) / 2;
    inc_lon = Math.atan(sen_h_xi / Math.cos(ene));
    tau = Math.atan(Math.cos(inc_lon) * Math.tan(ene));

    // longitud
    lon_sexa = ((inc_lon / Math.PI) * 180) + lon_decimal;

    // latitud
    latitud = lat_decimal + (((1 + (ep2 * Math.pow(Math.cos(lat_decimal), 2)) - (3 / 2 * ep2 * Math.sin(lat_decimal) * Math.cos(lat_decimal) * (tau - lat_decimal)))) * (tau - lat_decimal));
    lat_sexa = (latitud / Math.PI) * 180;

    grados = Math.floor(lon_sexa);
    minutos = Math.floor((lon_sexa - grados) * 60);
    segundos = (((lon_sexa - grados) * 60) - minutos) * 60;

    lon = grados + "º " + minutos + "' " + segundos.toFixed(2) + '" E';

    grados = Math.floor(lat_sexa);
    minutos = Math.floor((lat_sexa - grados) * 60);
    segundos = (((lat_sexa - grados) * 60) - minutos) * 60;

    lat = grados + "º " + minutos + "' " + segundos.toFixed(2) + '" N';

    return lat + ", " + lon;
}

function ShowCoords() 
{
    var tmpUTMX = (UTMX / 1000) + 400000;
    var tmpUTMY = (UTMY / 1000) + 4500000;

    var coordsGeo = UTMaGeo(tmpUTMX, tmpUTMY);

    var coordstr = '(' + imgX + ',' + imgY + ') ' + 'Coords. UTM ED50: (H31) ' + tmpUTMX.toFixed(2) + ',' + tmpUTMY.toFixed(2);
    
    coordstr += ' - Geo: ' + coordsGeo;
    window.status = coordstr;
}

function getMouseXY(e) 
{
    var img,
        maxw,
        maxh,
        parent;

    if (e) // Opera, FireFox, Safari
    {
        img = e.target;

        imgX = e.pageX;
        imgY = e.pageY;

        imgX = imgX - img.offsetLeft;
        imgY = imgY - img.offsetTop;

        parent = img.offsetParent;

        while (parent !== null) {
            imgX -= parent.offsetLeft;
            imgY -= parent.offsetTop;

            parent = parent.offsetParent;
        }
    }
    else 
    { // IE
        img = event.srcElement;

        imgX = event.x;
        imgY = event.y;
    }

    maxw = img.width;
    maxh = img.height;

    imgX = imgX - img.border;
    imgY = imgY - img.border;

    mouseX = imgX - (maxw / 2);
    mouseY = -(imgY - (maxh / 2));

    guiaX = centroGuiaX + (mouseX * escala[zoomlevel]);
    guiaY = centroGuiaY + (mouseY * escala[zoomlevel]);

    guiaX = Math.round(guiaX);
    guiaY = Math.round(guiaY);

    CoordGuiaaUTM();

    UTMX = Math.round(UTMX);
    UTMY = Math.round(UTMY);

    ShowCoords();

    return true;
}

function SetSlider(value) 
{
    $('#slider-bar').slider("moveTo", 6 - value);
}

function manejaRueda(delta) 
{
    if (delta > 0)
    /* Rueda hacia arriba... */
    {
        if (zoomlevel < maxzoom) {
            zoomlevel++;
            SetSlider(zoomlevel);
        }
    }
    else
    /* Rueda hacia abajo... */
    {
        if (zoomlevel > minzoom) {
            zoomlevel--;
            SetSlider(zoomlevel);
        }
    }
}

function ruedaRaton(event) {
    var delta = 0;

    if (!event) /* For IE. */
    {
        event = window.event;
    }
    if (event.wheelDelta) /* IE/Opera. */
    {
        delta = event.wheelDelta / 120;
        /** In Opera 9, delta differs in sign as compared to IE.
                 */
        //                if (window.opera)
        //delta = -delta;
    } else if (event.detail) {
        /** Mozilla case. */
        /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
        delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
    if (delta) {
        manejaRueda(delta);
    }
    /** Prevent default actions caused by mouse wheel.
         * That might be ugly, but we handle scrolls somehow
         * anyway, so don't bother here..
         */
    if (event.preventDefault) {
        event.preventDefault();
    }
    event.returnValue = false;
}

function DoubleClick()
{
    if (zoomlevel < maxzoom) {
        zoomlevel++;
    }

    centroUTMX = UTMX;
    centroUTMY = UTMY;
    centroGuiaX = guiaX;
    centroGuiaY = guiaY;

    x = UTMX / 1000;
    y = UTMY / 1000;

    SetSlider(zoomlevel);

    ShowCoords();

    return true;
}

function OcultaCapasInfo() 
{
    document.getElementById('CapasInfoGuia').style.display = 'none';
    document.getElementById('CapasInfoUsuario').style.display = 'none';
}

function MuestraCapasInfo() 
{
    document.getElementById('CapasInfoGuia').style.display = 'block';
    document.getElementById('CapasInfoUsuario').style.display = 'block';
}

function DesplazaCapasInfoUsuario(dx, dy) 
{
    var i,
        ciu = document.getElementById("CapasInfoUsuario"),
        li,
        anchor,
        posx = 0,
        posy = 0;

    if (ciu) 
    {
        for (i = 0; i < ciu.childNodes.length; i++) 
        {
            if (ciu.childNodes[i].tagName != 'LI') 
            {
                continue;
            }
            li = ciu.childNodes[i];

            anchor = li.childNodes[0];

            posx = parseInt(anchor.style.left, 10);
            posy = parseInt(anchor.style.top, 10);

            posx = posx + dx;
            posy = posy + dy;
            anchor.style.left = posx + 'px';
            anchor.style.top = posy + 'px';
        }
    }
    
    $('area').each(function(){
    
    var coords=$(this).attr("coords").split(",");
    var coordsnuevas="";
   
    for(var i=0;i<coords.length;i=i+2){
        var auxX=parseInt(coords[i],10);
        var auxY=parseInt(coords[i+1],10);
        
        auxX=auxX+dx;
        auxY=auxY+dy;
        
        if((i+2)!=coords.length)coordsnuevas=coordsnuevas+auxX+","+auxY+",";
        else coordsnuevas=coordsnuevas+auxX+","+auxY;
        
    }
    
    $(this).attr("coords",coordsnuevas);
 
    });
    
}

function Drag(e) 
{
    if (!dragging) 
    {
        return true;
    }

    OcultaCapasInfo();

    var Mapa = document.getElementById('Mapa');
    var tmpx, tmpy, l, t;

    if (e) 
    {
        tmpx = e.clientX - IniDragX;
        tmpy = IniImgPosY + e.clientY - IniDragY;
    }
    else 
    {
        tmpx = event.clientX - IniDragX;
        tmpy = event.clientY - IniDragY;
    }

    l = IniImgPosX + tmpx;
    t = IniImgPosY + tmpy;

    Mapa.style.left = l + 'px';
    Mapa.style.top = t + 'px';

    return false;
}

function EndDrag(e)
{
    var dx, dy,
        Mapa = document.getElementById('Mapa');

    dragging = false;

    Mapa.onmousemove = getMouseXY;
    Mapa.onmouseup = null;
    Mapa.style.cursor = "url(/GuiaMap/cursors/arrastrar.cur), crosshair";

    document.getElementById("CentroMapa").style.display = "none";

    dx = parseInt(Mapa.style.left, 10);
    dy = parseInt(Mapa.style.top, 10);

    if ((dx !== 0) || (dy !== 0)) {
        DesplazaCapasInfoUsuario(dx, dy);

        dx *= escala[zoomlevel];
        dy *= escala[zoomlevel];

        guiaX = centroGuiaX - dx;
        guiaY = centroGuiaY + dy;

        CoordGuiaaUTM();

        centroGuiaX = guiaX;
        centroGuiaY = guiaY;

        centroUTMX = UTMX;
        centroUTMY = UTMY;

        x = Math.round(UTMX / 1000);
        y = Math.round(UTMY / 1000);

        ActualizaMapa();
    }
    MuestraCapasInfo();

    return false;
}

function InitDrag(e) 
{
    var Mapa = document.getElementById('Mapa');

    dragging = true;

    if (e) {
        IniDragX = e.clientX;
        IniDragY = e.clientY;
    }
    else {
        IniDragX = event.clientX;
        IniDragY = event.clientY;
    }

    document.getElementById("CentroMapa").style.display = "block";

    Mapa.style.position = 'relative';

    Mapa.onmousemove = Drag;
    Mapa.onmouseup = EndDrag;

    IniImgPosX = parseInt(Mapa.style.left, 10);
    IniImgPosY = parseInt(Mapa.style.top, 10);

    Mapa.style.cursor = "url(cursors/arrastrando.cur), move";

    return false;
}

function RecalculaCapasInfoUsuario() {
    var i;
    var ciu = document.getElementById("CapasInfoUsuario");
    var divMapa = document.getElementById("ContenedorMapa");
    var li;
    var anchor;
    //   var posx=0, posy=0;
    //   var strpos = "";
    var ixy = 0;

    if (ciu) {
        for (i = 0; i < ciu.childNodes.length; i++) {
            if (ciu.childNodes[i].tagName != 'LI') {
                continue;
            }
            li = ciu.childNodes[i];

            anchor = li.childNodes[0];
            var strclass = $(anchor).attr("class");

            ixy = strclass.indexOf('xy');
            if (ixy != -1) {
                var strcoords = strclass.substr(ixy + 2, 16);

                UTMX = parseInt("0" + strcoords.substr(0, 8), 10);
                UTMY = parseInt("0" + strcoords.substr(8, 8), 10);

                CoordUTMaGuia();

                var dx = Math.round(guiaX / escala[zoomlevel]);
                var dy = -Math.round(guiaY / escala[zoomlevel]);

                dx += Math.round((divMapa.offsetWidth - 4) / 2);
                dy += Math.round((divMapa.offsetHeight - 4) / 2);

                dx -= iconOffset;
                dy -= iconOffset;

                anchor.style.left = dx + 'px';
                anchor.style.top = dy + 'px';
            }
        }
    }
}

function EquipInfo(Id) {
    var InfoLink = document.getElementById("InfoLink");
    var enlace = "";

    if (Id.indexOf("ASIA") === 0) {
        enlace = queryEQ + Id.substr(4);
    }
    else if (Id.indexOf("OBRA") === 0) {
        enlace = queryEQ + Id.substr(4);
    }
    else {
        // Llamada al servicio web pasándole el parámetro ID...
    }

    InfoLink.setAttribute('href', enlace);
    $("#InfoLink").click();
    //  InfoLink.setAttribute('href', '#');
}

function btnTancarClick(element) {
    $(element).parent("span").parent("div").children("span").css("display", "none");
    $(element).parent("span").parent("div").children("span.icono").css("display", "block");
    return false;
}

function Callback_Direccion(data) {
            //var nodoraiz, nodo, subnodo;
            var codiRet, numDirecciones, cx, cy, nomoficial, numnorm, distmun, distpost, barri, xmlDoc = data;
            
            codiRet = xmlDoc.getElementsByTagName("codiRet")[0].childNodes[0].nodeValue;
            if ((codiRet == "1") || (codiRet == "2")) {
                numDirecciones = parseInt(xmlDoc.getElementsByTagName("NumDirecciones")[0].childNodes[0].nodeValue, 10);

                if (numDirecciones == 1) {
                    cx = xmlDoc.getElementsByTagName("X")[0].childNodes[0].nodeValue;
                    cy = xmlDoc.getElementsByTagName("Y")[0].childNodes[0].nodeValue;
                    nomoficial = xmlDoc.getElementsByTagName("NomOficial")[0].childNodes[0].nodeValue;
                    numnorm = xmlDoc.getElementsByTagName("Numero")[0].childNodes[0].nodeValue;
                    distmun = xmlDoc.getElementsByTagName("Districte")[0].childNodes[0].nodeValue;
                    barri = xmlDoc.getElementsByTagName("Barri")[0].childNodes[0].nodeValue;
                    distpost = xmlDoc.getElementsByTagName("Dist_Post")[0].childNodes[0].nodeValue;

                    //CMM 10/05/2011
                    if (idioma == "ES")
                    {
                        var N = "<dl><dt>Dirección:</dt><dd>" + nomoficial + ", " + numnorm + "</dd><dt>Distrito:</dt><dd>" + distmun + "</dd><dt>" + "Barrio:</dt><dd>" + barri;
                        if (distpost != '080')
                        {
                            N +="</dd><dt>Distrito Postal:</dt><dd>" + distpost; 
                        }
                        N += "</dd></dl>";
                    }
                    else if(idioma == "EN")
                    {
                        var N = "<dl><dt>Address:</dt><dd>" + nomoficial + ", " + numnorm + "</dd><dt>District:</dt><dd>" + distmun + "</dd><dt>" + "Neighborhood:</dt><dd>" + barri;
                        if (distpost != '080')
                        {
                            N +="</dd><dt>Postal District:</dt><dd>" + distpost; 
                        }
                        N += "</dd></dl>";
                    }
                    else
                    {
                        var N = "<dl><dt>Adreça:</dt><dd>" + nomoficial + ", " + numnorm + "</dd><dt>Districte:</dt><dd>" + distmun + "</dd><dt>" + "Barri:</dt><dd>" + barri;
                        if (distpost != '080')
                        {
                            N +="</dd><dt>Districte Postal:</dt><dd>" + distpost; 
                        }
                        N += "</dd></dl>";
                    }
                    centroUTMX = parseInt(cx, 10);
                    centroUTMY = parseInt(cy, 10);

                    x = centroUTMX / 1000;
                    y = centroUTMY / 1000;
                    zoomlevel = ZoomParaBusquedas;
                    plot = x + "," + y;

                    SetSlider(zoomlevel);

                    var CustomInfoList = document.getElementById("CapasInfoUsuario");

                    // Si ya se había buscado una dirección, borramos la antigua
                    var el = document.getElementById("DireccionActual");
                    if (el) {
                        el.parentNode.removeChild(el);
                    }

                    var li = document.createElement('li');
                    var anchor = document.createElement('div');
                    var span = document.createElement('span');
                    var spanIcona = document.createElement('span');
                    var img = document.createElement('img');

                    $(span).addClass("info");
                    $(spanIcona).addClass("icono");
                    $(anchor).addClass("xy" + cx + cy);

                    anchor.setAttribute('id', 'AnchorDireccionActual');

                    if (!$(anchor).hasClass("tancar")) {
                        $(anchor).addClass("tancar");
                    }

                    li.setAttribute('id', "DireccionActual");

                    var style = anchor.style;

                    var centroImagenX = document.getElementById("Mapa").offsetWidth / 2;
                    var centroImagenY = document.getElementById("Mapa").offsetHeight / 2;

                    style.left = (centroImagenX - iconOffset) + 'px';
                    style.top = (centroImagenY - iconOffset) + 'px';
                    style.width = (iconOffset * 2) + 'px';
                    style.height = (iconOffset * 2) + 'px';

                    spanIcona.style.width = style.width;
                    spanIcona.style.height = style.height;

                    spanIcona.onclick = function() {
                        iconOver(anchor);
                    };

                    img.setAttribute('id', "bototancar");
                    img.setAttribute('src', 'img/boto-tancar.gif');
                    img.setAttribute('width', '16');
                    img.setAttribute('height', '16');
                    img.onclick = function() {
                        btnTancarClick(this);
                    };

                    span.innerHTML = N;
                    span.appendChild(img);

                    anchor.appendChild(span);
                    anchor.appendChild(spanIcona);

                    li.appendChild(anchor);
                    CustomInfoList.appendChild(li);

                    iconOver(anchor);

                    window.status = "Adreça trobada.";
                    return;
                }
                else {
                    var elSelect = document.getElementById("selectdir");
                    elSelect.options.length = 0;
                    var option;
                    var via;

                    for (i = 0; i < numDirecciones; i++) {
                        cx = xmlDoc.getElementsByTagName("X")[i].childNodes[0].nodeValue;
                        cy = xmlDoc.getElementsByTagName("Y")[i].childNodes[0].nodeValue;
                        nomoficial = xmlDoc.getElementsByTagName("NomOficial")[i].childNodes[0].nodeValue;
                        numnorm = xmlDoc.getElementsByTagName("Numero")[i].childNodes[0].nodeValue;
                        distmun = xmlDoc.getElementsByTagName("Districte")[i].childNodes[0].nodeValue;
                        barri = xmlDoc.getElementsByTagName("Barri")[i].childNodes[0].nodeValue;
                        distpost = xmlDoc.getElementsByTagName("Dist_Post")[i].childNodes[0].nodeValue;

                        via = nomoficial + ", " + numnorm;
                        value = nomoficial + "|" + numnorm + "|" + cx + "|" + cy + "|" + distmun + "|" + barri + "|" + distpost;
                        option = document.createElement("option");
                        option.value = value;
                        option.text = via;
                        option.selected = false;
                        elSelect.options.add(option);
                    }
                    $("#SelectVia").click();
                    return;
                }
            }
            else {
                alert("Adreça no trobada");
                return;
            }
}

function Callback_DatosVia(data) {
            var xmlDoc = data;
            //      var nodoraiz, nodo, subnodo;
            var codiRet, nomoficial, numtrobat, cx, cy;

            codiRet = xmlDoc.getElementsByTagName("codiRet")[0].childNodes[0].nodeValue;
            if (codiRet == "1") {
                nomoficial = xmlDoc.getElementsByTagName("NomComplet")[0].childNodes[0].nodeValue;
                numtrobat = xmlDoc.getElementsByTagName("NumTrobat")[0].childNodes[0].nodeValue;
                cx = xmlDoc.getElementsByTagName("XNumero")[0].childNodes[0].nodeValue;
                cy = xmlDoc.getElementsByTagName("YNumero")[0].childNodes[0].nodeValue;
                
                if (idioma=="CA")
                   var N = "&nbsp;<br /><b>" + nomoficial + "</b><br />(mostrant n&uacute;mero " + numtrobat + ")<br />";
                else if (idioma == "ES")
                   var N = "&nbsp;<br /><b>" + nomoficial + "</b><br />(mostrando n&uacute;mero " + numtrobat + ")<br />";
                else
                   var N = "&nbsp;<br /><b>" + nomoficial + "</b><br />(showing number " + numtrobat + ")<br />";

                centroUTMX = parseInt(cx, 10);
                centroUTMY = parseInt(cy, 10);

                x = centroUTMX / 1000;
                y = centroUTMY / 1000;
                zoomlevel = ZoomParaBusquedas;
                plot = x + "," + y;

                SetSlider(zoomlevel);

                var CustomInfoList = document.getElementById("CapasInfoUsuario");

                // Si ya se había buscado una dirección, borramos la antigua
                var el = document.getElementById("DireccionActual");
                if (el) {
                    el.parentNode.removeChild(el);
                }

                var li = document.createElement('li');
                var anchor = document.createElement('div');
                var span = document.createElement('span');
                var spanIcona = document.createElement('span');
                var img = document.createElement('img');

                $(span).addClass("info");
                $(spanIcona).addClass("icono");
                $(anchor).addClass("xy" + cx + cy);

                anchor.setAttribute('id', 'AnchorDireccionActual');

                if (!$(anchor).hasClass("tancar")) {
                    $(anchor).addClass("tancar");
                }

                li.setAttribute('id', "DireccionActual");

                var style = anchor.style;

                var centroImagenX = document.getElementById("Mapa").offsetWidth / 2;
                var centroImagenY = document.getElementById("Mapa").offsetHeight / 2;

                style.left = (centroImagenX - iconOffset) + 'px';
                style.top = (centroImagenY - iconOffset) + 'px';
                style.width = (iconOffset * 2) + 'px';
                style.height = (iconOffset * 2) + 'px';

                spanIcona.style.width = style.width;
                spanIcona.style.height = style.height;

                spanIcona.onclick = function() {
                    iconOver(anchor);
                };

                img.setAttribute('src', 'img/blanco.gif');
                img.setAttribute('width', '16');
                img.setAttribute('height', '16');
                img.onclick = function() {
                    btnTancarClick(this);
                };

                span.innerHTML = N;
                span.appendChild(img);

                anchor.appendChild(span);
                anchor.appendChild(spanIcona);

                li.appendChild(anchor);
                CustomInfoList.appendChild(li);

                iconOver(anchor);

                window.status = "Via trobada.";
                return;
            }
            else {
                alert("Via no trobada");
                return;
            }
}

function Callback_Cruce(data) {
            var xmlDoc = data;
            var codiRet, numCruces, cx, cy, nomoficial1, nomoficial2;

            codiRet = xmlDoc.getElementsByTagName("codiRet")[0].childNodes[0].nodeValue;
            if ((codiRet == "1") || (codiRet == "2")) {
                numCruces = parseInt('0' + xmlDoc.getElementsByTagName("NumCruces")[0].childNodes[0].nodevalue, 10);

                if (numCruces >= 0) {
                    cx = xmlDoc.getElementsByTagName("X")[0].childNodes[0].nodeValue;
                    cy = xmlDoc.getElementsByTagName("Y")[0].childNodes[0].nodeValue;
                    nomoficial1 = xmlDoc.getElementsByTagName("NomComplet1")[0].childNodes[0].nodeValue;
                    nomoficial2 = xmlDoc.getElementsByTagName("NomComplet2")[0].childNodes[0].nodeValue;

                    if (idioma=="CA") 
                      var N = "<dl><dt>Cruïlla:</dt><dd>" + nomoficial1 + "</dd><dd>" + nomoficial2 + "</dd></dl>";
                    else if (idioma=="ES")
                      var N = "<dl><dt>Cruce:</dt><dd>" + nomoficial1 + "</dd><dd>" + nomoficial2 + "</dd></dl>";
                    else
                      var N = "<dl><dt>Crossing:</dt><dd>" + nomoficial1 + "</dd><dd>" + nomoficial2 + "</dd></dl>";

                    centroUTMX = parseInt(cx, 10);
                    centroUTMY = parseInt(cy, 10);

                    x = centroUTMX / 1000;
                    y = centroUTMY / 1000;
                    zoomlevel = ZoomParaBusquedas;
                    plot = x + "," + y;

                    SetSlider(zoomlevel);

                    var CustomInfoList = document.getElementById("CapasInfoUsuario");

                    // Si ya se había buscado una dirección, borramos la antigua
                    var el = document.getElementById("DireccionActual");
                    if (el) {
                        el.parentNode.removeChild(el);
                    }

                    var li = document.createElement('li');
                    var anchor = document.createElement('div');
                    var span = document.createElement('span');
                    var spanIcona = document.createElement('span');
                    var img = document.createElement('img');

                    $(span).addClass("info");
                    $(spanIcona).addClass("icono");
                    $(anchor).addClass("xy" + cx + cy);

                    anchor.setAttribute('id', 'AnchorDireccionActual');

                    if (!$(anchor).hasClass("tancar")) {
                        $(anchor).addClass("tancar");
                    }

                    li.setAttribute('id', "DireccionActual");

                    var style = anchor.style;

                    var centroImagenX = document.getElementById("Mapa").offsetWidth / 2;
                    var centroImagenY = document.getElementById("Mapa").offsetHeight / 2;

                    style.left = (centroImagenX - iconOffset) + 'px';
                    style.top = (centroImagenY - iconOffset) + 'px';
                    style.width = (iconOffset * 2) + 'px';
                    style.height = (iconOffset * 2) + 'px';

                    spanIcona.style.width = style.width;
                    spanIcona.style.height = style.height;

                    spanIcona.onclick = function() {
                        iconOver(anchor);
                    };

                    img.setAttribute('src', 'img/blanco.gif');
                    img.setAttribute('width', '16');
                    img.setAttribute('height', '16');
                    img.onclick = function() {
                        btnTancarClick(this);
                    };

                    span.innerHTML = N;
                    span.appendChild(img);

                    anchor.appendChild(span);
                    anchor.appendChild(spanIcona);

                    li.appendChild(anchor);
                    CustomInfoList.appendChild(li);

                    iconOver(anchor);

                    window.status = "Cruïlla trobada.";
                    return;
                }
            }
            else {
                alert("Cruïlla no trobada");
                return;
            }
}

function Cerca() {
    //  var encontrado = false;
    var via1 = "";
    var num = "";
    var via2 = "";
    var Params = "";
    
    formcerca = document.forms.FormCerca;

        //CMM 10/05/2011
        idioma = $("#idioma").val();

    if ($("#carrer").val() === "") {
        return;
    }

    if ($("#numero").val() !== "") {
        //    alert("BUSQUEDA DE DIRECCION POSTAL\n\ncarrer: " + formcerca.carrer.value + "\ncodicarr1: " + formcerca.codicarr1.value + "\nnumpost: " + formcerca.numero.value);
        if ($("#codicarr1").val() !== "") {
            via1 = $("#codicarr1").val();
        }
        else 
        {
            var poscoma = $("#carrer").val().indexOf(',');
            
            if (poscoma >= 0)
            {
                via1 = $("#carrer").val().substring(0, formcerca.carrer.value.indexOf(','));
            }
            else
            {
                via1 = $("#carrer").val();
            }
        }
        
        num = $("#numero").val();
        Params = "Calle=" + via1 + "&Numero=" + num;

        $.post(queryWS + "DireccionPostal", Params, Callback_Direccion);
    }
    else {
        if ($("#cruilla").val() === "") {
            //      alert("BUSQUEDA DE CALLE\n\ncarrer: " + formcerca.carrer.value + "\ncodicarr1: " + formcerca.codicarr1.value);
            if ($("#codicarr1").val() !== "") {
                Params = "Via=" + $("#codicarr1").val();
            }
            else {
                Params = "Via=" + $("#carrer").val();
            }

            $.post(queryWS + "LocalizaVia", Params, Callback_DatosVia);
        }
        else {
            //      alert("BUSQUEDA DE CRUCE\n\ncarrer: " + formcerca.carrer.value + "\ncodicarr1: " + formcerca.codicarr1.value + "\n\ncruilla: " + formcerca.cruilla.value + "\ncodicarr2: " + formcerca.codicarr2.value);
            if ($("#codicarr1").val() !== "") {
                via1 = $("#codicarr1").val();
            }
            else {
                via1 = $("#carrer").val();
            }
            if ($("#codicarr2").val() !== "") {
                via2 = $("#codicarr2").val();
            }
            else {
                via2 = $("#cruilla").val();
            }

            Params = "Via1=" + via1 + "&Via2=" + via2;

            $.post(queryWS + "Cruce", Params, Callback_Cruce);

        }
    }
    return;
}

function DireccionDeSelect() {
    var fancy_div = document.getElementById('fancy_div');
    var los_select = fancy_div.getElementsByTagName('select');
    var el_select = los_select.selectdir;

    if (el_select) {
        if (el_select.selectedIndex >= 0) {
            //"Av Diagonal|220-228|32513944|84202278|Sant Martí|El Parc i la Llacuna del Poblenou|08018"
            var value = el_select[el_select.selectedIndex].value.split('|');
            var adreca = value[0] + ', ' + value[1];
            var cx = parseInt(value[2], 10) + 0;
            var cy = parseInt(value[3], 10) + 0;
            var distmun = value[4];
            var barri = value[5];
            var distpost = value[6];

            var N = "<dl><dt>Adreça:</dt><dd>" + adreca + "</dd><dt>Districte:</dt><dd>" + distmun + "</dd><dt>" + "Barri:</dt><dd>" + barri + "</dd><dt>Districte Postal:</dt><dd>" + distpost + "</dd></dl>";

            centroUTMX = cx;
            centroUTMY = cy;

            x = centroUTMX / 1000;
            y = centroUTMY / 1000;
            zoomlevel = ZoomParaBusquedas;
            plot = x + "," + y;

            SetSlider(zoomlevel);

            var CustomInfoList = document.getElementById("CapasInfoUsuario");

            // Si ya se había buscado una dirección, borramos la antigua
            var el = document.getElementById("DireccionActual");
            if (el) {
                el.parentNode.removeChild(el);
            }

            var li = document.createElement('li');
            var anchor = document.createElement('div');
            var span = document.createElement('span');
            var spanIcona = document.createElement('span');
            var img = document.createElement('img');

            $(span).addClass("info");
            $(spanIcona).addClass("icono");
            $(anchor).addClass("xy" + cx + cy);

            anchor.setAttribute('id', 'AnchorDireccionActual');

            if (!$(anchor).hasClass("tancar")) {
                $(anchor).addClass("tancar");
            }

            li.setAttribute('id', "DireccionActual");

            var style = anchor.style;

            var centroImagenX = document.getElementById("Mapa").offsetWidth / 2;
            var centroImagenY = document.getElementById("Mapa").offsetHeight / 2;

            style.left = (centroImagenX - iconOffset) + 'px';
            style.top = (centroImagenY - iconOffset) + 'px';
            style.width = (iconOffset * 2) + 'px';
            style.height = (iconOffset * 2) + 'px';

            spanIcona.style.width = style.width;
            spanIcona.style.height = style.height;

            spanIcona.onclick = function() {
                iconOver(anchor);
            };

            img.setAttribute('src', 'img/blanco.gif');
            img.setAttribute('width', '16');
            img.setAttribute('height', '16');
            img.onclick = function() {
                btnTancarClick(this);
            };

            span.innerHTML = N;
            span.appendChild(img);

            anchor.appendChild(span);
            anchor.appendChild(spanIcona);

            li.appendChild(anchor);
            CustomInfoList.appendChild(li);

            iconOver(anchor);

            window.status = "Adreça trobada.";
        }
    }

    $.fn.fancybox.close();
    return;
}

function CarrerResult(event, data, formatted) {
    $("#codicarr1").val(data[1]);
}

function CruillaResult(event, data, formatted) {
   $("#codicarr2").val(data[1]);
}

function onCapaTimeout() {
    ContadorTimeout--;

    if (ContadorTimeout === 0) {
        ActualizaMapa();
    }
}

function onSliderTimeout() {
    ContadorTimeout--;

    if (ContadorTimeout === 0) {
        ActualizaMapa();
        RecalculaCapasInfoUsuario();
    }
}

function Normaliza(instr) {
    var tmpstr = instr.toLowerCase();
    var outstr = '';
    var i;
    var c;

    for (i = 0; i < tmpstr.length; i++) {
        c = tmpstr.charAt(i);

        switch (c) {
        case 'á':
        case 'à':
            outstr = outstr + 'a';
            break;

        case 'é':
        case 'è':
            outstr = outstr + 'e';
            break;

        case 'í':
        case 'ï':
            outstr = outstr + 'i';
            break;

        case 'ó':
        case 'ò':
            outstr = outstr + 'o';
            break;

        case 'ú':
        case 'ü':
            outstr = outstr + 'u';
            break;

        default:
            outstr = outstr + c;
        }
    }

    return outstr;
}

function Resalta(value, searchterm) {
    var astr = value.split(',');
    var nomstr = String(astr[0]);
    var nomnet = Normaliza(nomstr);
    var searchnet = Normaliza(searchterm);
    var tmpstr = '';

    var pos = nomnet.indexOf(searchnet);

    if (pos >= 0) {
        tmpstr = nomstr.substr(0, pos);
        tmpstr = tmpstr + '<strong>';
        tmpstr = tmpstr + nomstr.substr(pos, searchnet.length);
        tmpstr = tmpstr + '</strong>';
        tmpstr = tmpstr + nomstr.substr(pos + searchnet.length);
        nomstr = tmpstr;
    }

    if (astr.length > 1) {
        return nomstr + ',' + '<i>' + astr[1] + '</i>';
    }
    else {
        return nomstr;
    }
}

function FormatItem(resultsRow, rowPos, rowCount, searchTerm) {
    if (resultsRow[0] === "") {
        return "<hr>";
    }
    else {
        return resultsRow[0];
    }
}

function OrigenCruilla() {
    return $("#codicarr1").val();
}

function InitArbreEquipaments() {
//ALTRAN WO2 MAR
    $('.SeleccioCapes').each(function(){
    
    $(this).find('input:checkbox').each(function(){
    
    if (capas.indexOf($(this).attr('id') ) >= 0) {
                $(this).attr('checked', true);
                aux=true;
            }
            else {
                $(this).attr('checked', false);
            }
    
    });
    if(aux){
     var a=$(this).find('.boton-arbol');
     $(this).find('.boton-arbol').css("opacity","1");
     }
     else  $(this).find('.boton-arbol').css("opacity","0.5");
     
    aux=false;
    });
    
    
	  
	
    /*
    var form1 = document.getElementById('SeleccioCapes');

    for (i = 0; i < form1.elements.length; i++) {
        if (form1.elements[i].type == "checkbox") {
            if (capas.indexOf(form1.elements[i].id) >= 0) {
                form1.elements[i].checked = true;
            }
            else {
                form1.elements[i].checked = false;
            }
        }
    }*/
}

function GetWindowHeight() {
    var myHeight = 0;
    if (typeof(window.innerHeight) == 'number') {
        //Non-IE
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight; // -12;
        //    myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }
    return myHeight;
}

function GetWindowWidth() {
    var myWidth = 0;
    if (typeof(window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
    }
    return myWidth;
}
/*
function AjustaVentana() {
    //  alert('AjustaVentana()...');
    document.getElementById("CapasInfoGuia").innerHTML = "";

    var IE = !(typeof(window.innerHeight) == 'number');

    var divGeneral = document.getElementById("General");

    if (!divGeneral) {
        return;
    }

    var divMarcWeb = document.getElementById("marc-web");
    //  var divMarcWeb2 = document.getElementById("marc-web2");
    var imgTitol = document.getElementById("titol-web");
    var divGraficos = document.getElementById("Graficos");
    var divControlMapa = document.getElementById("ControlMapa");
    var divMaximiza = document.getElementById("maximiza");
    var divAnchorMaximiza = document.getElementById("a_maximiza");
    var divMapa = document.getElementById("ContenedorMapa");
    var divMapaSituacio = document.getElementById("MapaSituacio");
    var divEscalaGrafica = document.getElementById("EscalaGrafica");
    //  var divCopyright = document.getElementById("Copyright");
    var imgCopyright = document.getElementById("ImgCopyright");
    //  var imgMapa = document.getElementById("Mapa");
    var divPrincipal = document.getElementById("principal");
    var cruzCentroMapa = document.getElementById("CentroMapa");
    var paddingGeneral = 10;

    var wHeight = GetWindowHeight();
    var wWidth = GetWindowWidth();

    /* Los "números mágicos" se refieren a los márgenes de la página, ya que no es posible 
     obtener sus valores por defecto. HAY QUE ARREGLARLO */
/*
    var newGeneralHeight = wHeight - (divMarcWeb.offsetTop * 2) - divGeneral.offsetTop - (parseInt('0' + divGeneral.style.borderWidth, 10) * 2);

    var newGeneralWidth = wWidth - 14;

    if (IE) {
        newGeneralHeight -= 18;
    }

    if (newGeneralWidth < MinWidth) {
        newGeneralWidth = MinWidth;
    }
    if (newGeneralHeight < MinHeight) {
        newGeneralHeight = MinHeight;
    }

    divMarcWeb.style.width = newGeneralWidth + 'px';
    divGeneral.style.height = newGeneralHeight + 'px';

    var newGraficosHeight = newGeneralHeight - imgTitol.offsetHeight - (parseInt("0" + divGeneral.style.borderWidth, 10) * 2);
    var newMapaWidth = newGeneralWidth - (divControlMapa.offsetWidth + paddingGeneral + 12 + 12);

    divGraficos.style.height = newGraficosHeight + 'px';
    divControlMapa.style.height = (newGraficosHeight - 2) + 'px';

//    divPrincipal.style.height = (newGraficosHeight - 63) + 'px';
    divPrincipal.style.height = (newGraficosHeight - 110) + 'px';

    divMaximiza.style.height = divControlMapa.style.height;
    divAnchorMaximiza.style.height = divControlMapa.style.height;

/*
    var btnMaximiza = document.getElementById("HideToolBarBtn");
    if (btnMaximiza !== null) {
        btnMaximiza.style.top = ((parseInt(divMaximiza.style.height, 10) / 2) - (btnMaximiza.height / 2)) + 'px';
    }
    var aMaximiza = document.getElementById("a_maximiza");
    if (aMaximiza !== null) {
        aMaximiza.style.left = '0';
        aMaximiza.style.top = '0';
        aMaximiza.style.width = divMaximiza.style.width;
        aMaximiza.style.height = divMaximiza.style.height;
        aMaximiza.style.backgroundPositionY = btnMaximiza.style.top;
    }
*//*
    var dxMapa = Math.round((newMapaWidth - divMapa.offsetWidth) / 2);
    var dyMapa = Math.round((newGraficosHeight - divMapa.offsetHeight) / 2);

    /*
  divMapa.style.width = '200px';
  divMapa.style.height = '200px';
*/
/*
    divMapa.style.top = '0';
    divMapa.style.left = '0';
    divMapa.style.height = divControlMapa.style.height;
    divMapa.style.width = newMapaWidth + 'px';

    cruzCentroMapa.style.left = Math.round((newMapaWidth / 2) - 10) + "px";
    cruzCentroMapa.style.top = Math.round((divMapa.offsetHeight / 2) - 10) + "px";

    divMapaSituacio.style.zindex = 9;
    divMapaSituacio.style.left = (divMapa.offsetWidth - 30) + 'px';
    divMapaSituacio.style.top = '9px';

    divEscalaGrafica.style.zindex = 9;
    divEscalaGrafica.style.left = '4px';
    divEscalaGrafica.style.top = (divMapa.offsetHeight - 39) + 'px';

    imgCopyright.style.zindex = 9;
    imgCopyright.style.left = (divMapa.offsetWidth - imgCopyright.offsetWidth - 4) + 'px';
    imgCopyright.style.top = (divMapa.offsetHeight - 24) + 'px';

    ActualizaMapa();

    DesplazaCapasInfoUsuario(dxMapa, dyMapa);
}
*/
function AjustaVentana() {
    //  alert('AjustaVentana()...');
    document.getElementById("CapasInfoGuia").innerHTML = "";

    var IE = !(typeof(window.innerHeight) == 'number');

    var divGeneral = document.getElementById("General");

    if (!divGeneral) {
        return;
    }

    var divMarcWeb = document.getElementById("marc-web");
    //  var divMarcWeb2 = document.getElementById("marc-web2");
    var imgTitol = document.getElementById("titol-web");
    var divGraficos = document.getElementById("Graficos");
    var divControlMapa = document.getElementById("ControlMapa");
    var divMaximiza = document.getElementById("maximiza");
    var divAnchorMaximiza = document.getElementById("a_maximiza");
    var divMapa = document.getElementById("ContenedorMapa");
    var divMapaSituacio = document.getElementById("MapaSituacio");
    var divEscalaGrafica = document.getElementById("EscalaGrafica");
    //  var divCopyright = document.getElementById("Copyright");
    var imgCopyright = document.getElementById("ImgCopyright");
    //  var imgMapa = document.getElementById("Mapa");
    var divPrincipal = document.getElementById("principal");
    var cruzCentroMapa = document.getElementById("CentroMapa");
    var paddingGeneral = 10;

    var wHeight = GetWindowHeight();
    var wWidth = GetWindowWidth();

  

    var newGeneralHeight = wHeight - (divMarcWeb.offsetTop * 2) - divGeneral.offsetTop - (parseInt('0' + divGeneral.style.borderWidth, 10) * 2) - 25;

    var newGeneralWidth = wWidth - 24;

    if (IE) {
        newGeneralHeight -= 18;
    }

    if (newGeneralWidth < MinWidth) {
        newGeneralWidth = MinWidth;
    }
    if (newGeneralHeight < MinHeight) {
        newGeneralHeight = MinHeight;
    }

    divMarcWeb.style.width = newGeneralWidth + 'px';
    divGeneral.style.height = newGeneralHeight + 'px';

    var newGraficosHeight = newGeneralHeight - (parseInt("0" + divGeneral.style.borderWidth, 10) * 2);
			
    var newMapaWidth = newGeneralWidth - (divControlMapa.offsetWidth + paddingGeneral + 12 + 12);

    divGraficos.style.height = newGraficosHeight + 'px';
    divControlMapa.style.height = (newGraficosHeight - 2) + 'px';

    divPrincipal.style.height = (newGraficosHeight - 63) + 'px';

    divMaximiza.style.height = divControlMapa.style.height;
    divAnchorMaximiza.style.height = divControlMapa.style.height;

/*
    var btnMaximiza = document.getElementById("HideToolBarBtn");
    if (btnMaximiza !== null) {
        btnMaximiza.style.top = ((parseInt(divMaximiza.style.height, 10) / 2) - (btnMaximiza.height / 2)) + 'px';
    }
    var aMaximiza = document.getElementById("a_maximiza");
    if (aMaximiza !== null) {
        aMaximiza.style.left = '0';
        aMaximiza.style.top = '0';
        aMaximiza.style.width = divMaximiza.style.width;
        aMaximiza.style.height = divMaximiza.style.height;
        aMaximiza.style.backgroundPositionY = btnMaximiza.style.top;
    }
*/
    var dxMapa = Math.round((newMapaWidth - divMapa.offsetWidth) / 2);
    var dyMapa = Math.round((newGraficosHeight - divMapa.offsetHeight) / 2);

    /*
  divMapa.style.width = '200px';
  divMapa.style.height = '200px';
*/

    divMapa.style.top = '0';
    divMapa.style.left = '0';
    divMapa.style.height = divControlMapa.style.height;
    divMapa.style.width = newMapaWidth + 'px';

    cruzCentroMapa.style.left = Math.round((newMapaWidth / 2) - 10) + "px";
    cruzCentroMapa.style.top = Math.round((divMapa.offsetHeight / 2) - 10) + "px";

    divMapaSituacio.style.zindex = 9;
    divMapaSituacio.style.left = (divMapa.offsetWidth - 30) + 'px';
    divMapaSituacio.style.top = '9px';

    divEscalaGrafica.style.zindex = 9;
    divEscalaGrafica.style.left = '4px';
    divEscalaGrafica.style.top = (divMapa.offsetHeight - 39) + 'px';

    imgCopyright.style.zindex = 9;
    imgCopyright.style.left = (divMapa.offsetWidth - imgCopyright.offsetWidth - 4) + 'px';
    imgCopyright.style.top = (divMapa.offsetHeight - 24) + 'px';

    ActualizaMapa();

    DesplazaCapasInfoUsuario(dxMapa, dyMapa);
}




function PonCapa(id,n) {
    if(n==1)capas=""; 
    if (capas.indexOf(id) != -1) {
        return;
    }
    else {
        capas += id;
//        document.getElementById("ResetSeleccioCapes").disabled = false;
    }
}

function QuitaCapa(id) {
    if (capas.indexOf(id) == -1) {
        return;
    }
    else {
        capas = capas.replace(id, "");
//        if (capas.length === 0) {
//            document.getElementById("ResetSeleccioCapes").disabled = true;
//        }
    }
}

$(document).ready(function() {
//$(window).load(function() {

    ContadorTimeout = 0;

    InitGlobals();
    //ALTRAN WO2 MAR
    //$("#menu-serveis input").click(function() {
    $(".serveis input").click(function() {
        if ($(this).attr("type") != 'checkbox') {
            return;
        }
        var id = $(this).attr("id");
        var checked = $(this).attr("checked");

        if (checked) {
            var n = $(this).parents().filter('.ArbreEquipaments').find("input:checked").length;
          
            PonCapa(id,n);
        }
        else {
            QuitaCapa(id);
        }

        //document.getElementById('SeleccioCapes').style.cursor = "progress";
        document.getElementById('Mapa').style.cursor = "wait";
        document.getElementById('TmpImg').style.cursor = "wait";

        ContadorTimeout++;
        setTimeout(onCapaTimeout, 500);
    });

    $('#carrer').keydown(function(e) {
        if (window.event) {
            if (event.keyCode < 32) {
                return this.value;
            }
        }
        else {
            if (e.which < 32) {
                return this.value;
            }
        }
       $("#codicarr1").val("");
        return this.value;
    });
 
    InputCarrer = $('#carrer').autocomplete(queryCarrers, {
        autoFill: false,
        matchSubset: false,
        selectFirst: true,
        width: 230,
        formatItem: FormatItem,
        highlight: Resalta
    });

/*
    $('#cruilla').focus(function() {
        document.forms.FormCerca.numero.value = "";
        document.forms.FormCerca.numpost.value = "";
        return this.value;
    });
*/
    $('#cruilla').keydown(function(e) {
        if (window.event) {
            if (event.keyCode < 32) {
                return this.value;
            }
        }
        else {
            if (e.which < 32) {
                return this.value;
            }
        }
        $("#numero").val("");
        $("#codicarr2").val("");
        return true;
    });

    InputCruilla = $('#cruilla').autocomplete(queryCarrers, {
        autoFill: false,
        matchSubset: false,
        selectFirst: true,
        width: 230,
        formatItem: FormatItem,
        highlight: Resalta,
        extraParams: {
            origen: OrigenCruilla
        }
    });

    InputCarrer.result(CarrerResult);
    InputCruilla.result(CruillaResult);

    $("#ContenedorMapa a").fancybox({
        'frameWidth': 800,
        'frameHeight': 500,
        'centerOnScroll': true
    });
    //  $("#ImageMap").fancybox({ 'frameWidth': 680, 'frameHeight': 500, 'centerOnScroll': true });
    $("#SelectVia a").fancybox({
        'frameWidth': 680,
        'frameHeight': 500,
        'centerOnScroll': true
    });
    $("#IndexCarrers").fancybox({
        'frameWidth': 680,
        'frameHeight': 500,
        'centerOnScroll': true
    });

/*
    if ((x === '') && (y === '') && (z === '')) {
        var cookieVista = readCookie("VistaGuia");

        if (cookieVista) {
            var ac = cookieVista.split('|');

            x = ac[0];
            y = ac[1];
            zoomlevel = ac[2];

            centroUTMX = x * 1000;
            centroUTMY = y * 1000;

            document.forms.configForm.chkVista.checked = true;
        }
        else {
 */
            x = 27601.010;
            y = 83987.710;
            z = 0;
/*
            document.forms.configForm.chkVista.checked = false;
        }
    }

    if (capas === '') {
        var cookieCapas = readCookie("CapasGuia");
        if (cookieCapas) {
            capas = cookieCapas;
            document.forms.configForm.chkCapas.checked = true;
        }
        else {
            document.forms.configForm.chkCapas.checked = false;
        }
    }
*/
    var Mapa = document.getElementById('Mapa');
    Mapa.onmousemove = getMouseXY;
    Mapa.ondblclick = DoubleClick;
    Mapa.onmousedown = InitDrag;

    /* Inicialización de para capturar eventos de la rueda del ratón */
    if (Mapa.addEventListener) {
        /** DOMMouseScroll is for mozilla. */
        Mapa.addEventListener('DOMMouseScroll', ruedaRaton, false);
    }
    /** IE/Opera. */
    Mapa.onmousewheel = ruedaRaton;

    /* Creación del control Slider */

/*
        orientation: 'vertical',
        handle: '#slider-handle',
        min: 0,
        max: 6,
        step: 1,
        value: 0,
        stop: function(e, ui) {
            if (IsHistoryAction) return;
            document.getElementById('Mapa').style.cursor = "wait";
            document.getElementById('TmpImg').style.cursor = "wait";
            zoomlevel = ui.value;
            ActualizaMapa();
        }
    });
*/

    $('#slider-bar').slider({
        handle: '#slider-handle',
        orientation: 'vertical',
        min: 0,
        max: 6,
        steps: 6,
        startValue: 6,
        stop: SliderStop
    });

    window.onresize = AjustaVentana;

	// Initialize history plugin.
	// The callback is called at once by present location.hash. 
	$.historyInit(pageload);

    AjustaVentana();
    SetSlider(zoomlevel);
    InitArbreEquipaments();
   
   

});


function SliderStop(e, ui) {
            if (IsHistoryAction) return;
            document.getElementById('Mapa').style.cursor = "wait";
            document.getElementById('TmpImg').style.cursor = "wait";

            ContadorTimeout++;
            setTimeout(onSliderTimeout, 200);

            zoomlevel = 6 - ui.value;
//            ActualizaMapa();
        }


function WResize() {
    var tmpWidth = GetWindowWidth();
    var tmpHeight = GetWindowHeight();

    if ((tmpWidth != WindowWidth) || (tmpHeight != WindowHeight)) {
        AjustaVentana();
    }

    WindowWidth = tmpWidth;
    WindowHeight = tmpHeight;

    //  AjustaVentana();
}

function SaveBookmark() {
    alert('SaveBookmark()');
}

function ExpandCollapseControlBar(btn) {
    var ControlBar = document.getElementById('ControlMapa');
    var boton = document.getElementById('HideToolBarBtn');

    if ((ControlBar.style.display === '') || (ControlBar.style.display === 'block')) {
        ControlBar.style.display = 'none';
//        boton.src = 'img/click-maximiza-2.gif';
        $("#a_maximiza").attr("class","expandir");
    }
    else {
        ControlBar.style.display = 'block';
//        boton.src = 'img/click-maximiza.gif';
        $("#a_maximiza").attr("class","contraer");
    }

    AjustaVentana();
}

function sliderhandle_over() {
    document.getElementById('handle').src = "img/slider-images-handle-1.gif";
}

function sliderhandle_out() {
    document.getElementById('handle').src = "img/slider-images-handle-2.gif";
}

function sliderup_over() {
    if (zoomlevel < maxzoom) {
        document.getElementById('sliderup').src = "img/sliderup2.gif";
    }
}

function sliderup_out() {
    document.getElementById('sliderup').src = "img/sliderup1.gif";
}

function sliderup_click() {
    if (zoomlevel < maxzoom) {
        zoomlevel++;
        SetSlider(zoomlevel);

        if (zoomlevel == maxzoom) {
            document.getElementById('sliderup').src = "img/sliderup1.gif";
        }
    }
}

function sliderdown_over() {
    if (zoomlevel > minzoom) {
        document.getElementById('sliderdown').src = "img/sliderdown2.gif";
    }
}

function sliderdown_out() {
    document.getElementById('sliderdown').src = "img/sliderdown1.gif";
}

function sliderdown_click() {
    if (zoomlevel > minzoom) {
        zoomlevel--;
        SetSlider(zoomlevel);

        if (zoomlevel == minzoom) {
            document.getElementById('sliderdown').src = "img/sliderdown1.gif";
        }
    }
}

function situacio_off_over() {
    document.getElementById('ImgBotoMapaSituacio').src = "img/situacio_off_2.png";
}

function situacio_off_out() {
    document.getElementById('ImgBotoMapaSituacio').src = "img/situacio_off.png";
}

function situacio_off_click() {
    return;
}

function CheckCapa(chkbox) {
    if (chkbox.checked) {
        PonCapa(chkbox.id);
    }
    else {
        QuitaCapa(chkbox.id);
    }
}

function cookieVista(chkbox) {
    if (chkbox.checked) {
        var value = x + "|" + y + "|" + zoomlevel;
        createCookie("VistaGuia", value, 365);
    }
    else {
        eraseCookie("VistaGuia");
    }
}

function cookieCapas(chkbox) {
    if (chkbox.checked) {
        createCookie("CapasGuia", capas, 365);
    }
    else {
        eraseCookie("CapasGuia");
    }
}

function cookieContraste(value) {
    if (value === true) {
        createCookie("AltoContraste", 1, 365);
    }
    else {
        eraseCookie("AltoContraste");
    }
}

function ResetSeleccioCapesClick() {
    capas = "";
    document.forms.SeleccioCapes.reset();
   //WO2 document.getElementById("SeleccioCapes").style.cursor = "progress";
//    document.getElementById("ResetSeleccioCapes").disabled = true;
    ActualizaMapa();
}

function pageload(hash) {
    if (hash == "") 
    {
        return false;
    }
    else
    {
        if (hash == prevHash) return;
        
        prevHash = hash;
        
        parseQueryMapaParams(hash);
        IsHistoryAction = true;
        ActualizaMapa();
        SetSlider(z);
        InitArbreEquipaments();
        RecalculaCapasInfoUsuario();
        IsHistoryAction = false;
    }
}

function parseQueryMapaParams(params)
{
  if ((params == "") || (params == undefined)) return;
  var mac=false;
  var arrayParams = params.split('&');
  
  for (var i = 0; i< arrayParams.length; i++)
  {
     var clave = arrayParams[i].charAt(0);
     
     switch (clave)
     {
        case 'x':
            x = arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            break;
        case 'y':
            y = arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            break;
        case 'z':
            z = arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            zoomlevel = z;
            break;
        case 'c':
            capas = arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            break;
        case 'p':
            plot =  arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            break;
        case 'f':
            background1 =  arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
             break;
        case 'g':
            background2 =  arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            break;
        case 'a':
            alfa_transparencia =  arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            break;
        case 'm':
            mac=true;
            macros =  arrayParams[i].substr(arrayParams[i].indexOf("=")+1);
            
            var pos=macros.indexOf("EXECUCIO")
            if (pos>=0)
            {
            $("#Checkbox1").attr("checked","true");
            exec=true;
                
            }
            var pos2=macros.indexOf("FINALITZADA")
            if (pos2>=0)
            {
            $("#Checkbox2").attr("checked","true");
            fina=true;
            }
            var pos3=macros.indexOf("PROJECTE")
            if (pos3>=0)
            {
            $("#Checkbox3").attr("checked","true");
            noini=true;
            }
            break;
         
            
     }
  }
  if(!mac)
  {
  
            $("#Checkbox1").attr("checked","true");
            exec=true;
            
  }
}


function eraseCookie(name){
	createCookie(name,"",-1);
}


function ReInicializa()
{
    xOrigen = 27385925;
    yOrigen = 60818235;
    centroUTMX = 27601010;
    centroUTMY = 83987710;
    centroGuiaX = 11200000;
    centroGuiaY = 11200000;
    UTMX = 27601010.0,
    UTMY = 83987710.0,
    x = "27601.010";
    y = "83987.710";
    z = "0";
    capas = "";
    plot = "";
    zoomlevel = 0;
    document.getElementById("carrer").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("cruilla").value = "";
    document.getElementById("codicarr1").value = "";
    document.getElementById("codicarr2").value = "";
    document.getElementById("numpost").value = "";
    document.getElementById("CapasInfoGuia").innerHTML = "";
    document.getElementById("CapasInfoUsuario").innerHTML = "";
    document.forms.SeleccioCapes.reset();
    
    SetSlider(0);
}
function setZoom(zoom){

        if(zoom== undefined)
        {
            return;
        }
        else if(zoom.length != 1){

            return ;

        }
        else if(zoom == 7 || zoom == 8 || zoom == 9 )
        {
            return;
        }
        else{
            zoomlevel=zoom;
             ActualizaMapa();
           
        }

}


function setCenter(ParamX,ParamY){

        if(x== undefined || y==undefined)
        {
            return;
        }
        
        else{
            x=ParamX;
            y=ParamY;
            ActualizaMapa();
           
        }

}

function getLayers(){

var i= 0;
var capas = new Array();
$(".ArbreEquipaments input:checkbox:checked").each(function(){

capas[i]=$(this).attr('id');
i++;

});

return capas;

}

function setVisible(id){
if(id==undefined){
return false;;
}
else if(CapesSistema[id] == undefined)
{
return false;
}
else{
    //Hay que hacer 2 clicks 
    $('#'+id).click();
    $('#'+id).click();
return true;
}


}

function getVisible(id){

if(id==undefined){
    return false;
}
else if(CapesSistema[id] == undefined)
{
    return false;
}
else{
   
    return $('#'+id).attr('checked');
    
}


}

function setBackground1(idback)
{
background1=idback;
ActualizaMapa();


}
function setBackground2(idback)
{
background2=idback;
ActualizaMapa();


}
function setBackgroundAlfa(ParamAlfa)
{
if (ParamAlfa == undefined){
    return;
}
if(ParamAlfa<1 || ParamAlfa >100){
    return ;
}
else{

    alfa_transparencia=ParamAlfa;
    ActualizaMapa();
    }


}

function setMacroValue(idmacro,valormacro)
{
if (idmacro == undefined || valormacro== undefined ){
    return false;
}

 
else{
    macros="";
    Macrosarr[idmacro]=valormacro;
     for(var xx in Macrosarr) {
   
         if(Macrosarr[xx]!="")macros+=xx+":"+Macrosarr[xx]+";";
          }
    macros=macros.substring(0,macros.length-1);
    ActualizaMapa();

}



}


