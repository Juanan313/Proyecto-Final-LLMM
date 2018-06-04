// Variable constante donde se almacenarán los datos del json
var NOTICIAS;
var NOTICIAS2;
var NOTICIAS_POR_CARGA = 3;
var PAGINA;

var proximaNoticia = 0;
var primeraCarga = true;
var cargar2Json = false;
/*--- Función onload para cargar todo los eventos y las llamadas a las funciones -----*/
window.onload = function () {
    // prueba de que jquery carga correctamente
    console.log("prueba carga jquery: "+$("header h1").text());

    // Función ajax que carga los datos del json en la variable constante al iniciar la página
    $.ajax({
        url: 'https://raw.githubusercontent.com/Juanan313/Proyecto-Final-LLMM/master/src/json/noticias.json',
        success: function(respuesta) {
            NOTICIAS = JSON.parse(respuesta)["Noticias"];
            console.log("Se han obtenido los datos");
            
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });


        $.ajax({
            url: 'https://raw.githubusercontent.com/Juanan313/Proyecto-Final-LLMM/master/src/json/noticias2.json',
            success: function (respuesta) {
                NOTICIAS2 = JSON.parse(respuesta)["Noticias"];
                console.log("Se han obtenido los datos");

            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });

     jQuery(function () {
        var page = location.pathname.split('/').pop();
        PAGINA = page;
        
     })
     $("#dialog").dialog({autoOpen: false});

    // on scroll down 
    // $(document).scroll(function() {
    //     var y = $(this).scrollTop();
    //     if (y > 1000) {
    //         cargarNoticias();
    //     } 
    //   });

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            cargarNoticias();

        }
     });

    $("#cargarMas").on("click", function() {
        cargarNoticias();
    })


};

/* ---- TRATAR DATOS JSON ----*/

function cargarNoticias() {


    // Si la página no es la página principal la función parará aqui por lo que no cargará las entradillas.
    if ( PAGINA != 'news.html') { return 0}; 

    var contadorNoticias = NOTICIAS.length;

    // if (primeraCarga) {
    //     var proximaNoticia = contadorNoticias -1;

    //     primeraCarga = false;
    // }
    
    var cargandoNoticias = false;
    var i = 0;
   

    while (proximaNoticia < contadorNoticias && i < NOTICIAS_POR_CARGA ) {
        if (!cargar2Json) {
            prepararEntradilla(NOTICIAS[proximaNoticia]);
        } else {
            prepararEntradilla(NOTICIAS2[proximaNoticia]);
        }
        
        i ++;
        proximaNoticia ++;
    } 

    if (proximaNoticia >= contadorNoticias) {
        $("#loading").fadeIn();
        $("#loading").fadeOut();
        cargar2Json = true;
        
        if (primeraCarga) {
            proximaNoticia = 0;
            primeraCarga = false;
        }
    }

}

function prepararEntradilla(noticia) {
    
    
    

    var entradilla = $("<section></section>");
    
    var titulo = $("<h2/>").addClass("tituloNoticia").append("<strong>"+noticia.Titulo+"</strong>");
    titulo.appendTo(entradilla);

    var fecha = $("<div/>").addClass("fechaNoticia lb-md").append($("</p>").append(noticia.Autor+"/ "+noticia.Fecha).addClass("label label-default"));
    fecha.appendTo(entradilla);
    
    var imagen = "<img src='"+noticia.Imagen+"' alt='"+noticia.Titulo+"' class='articleImg rounded mx-auto d-block pull-left'>";
    entradilla.append(imagen);

    var article = $("<article/>");

    var postTitulo = $("<h3/>").append(noticia.PostTiutlo);
    postTitulo.appendTo(article);
    
    var textoEntradilla = $("</p>").append(noticia.Entradilla).addClass("text-justify");
    textoEntradilla.appendTo(article);
    article.addClass("col-md-7 col-xs-12")
    var referencia = "<a href='"+noticia.Referencia.url+"'>"+noticia.Referencia.pagina+"</a>"
    $("<p>Referencia: "+referencia+"</p>").appendTo(article);
    

    var botonDialog = $("<button/>").addClass("btn btn-sm btn-success pull-right ").attr("id", noticia.idNoticia).append("<i class='fa fa-plus'>Ver más</i>").on("click",function(){
        mostrarMas(NOTICIAS[noticia.idNoticia-1]);
    });
    botonDialog.appendTo(article);
    article.appendTo(entradilla);


    
    $("main").append(entradilla.addClass("d-inline-block"));

}

function mostrarMas(noticia) {
    var noticiaTxt = $("<p/>").append(noticia.Noticia);
    $("#dialog").dialog({
        title: noticia.Titulo,
        width: 500,
        height: 300,
        // show: {
        // effect: "slide",
        // duration: 1500
        // }, hide: {
        //     effect: "fade",
        //     duration: 1000
        // }

   }).text(noticia.Noticia).dialog("open");
}

