// Variable constante donde se almacenarán los datos del json
var NOTICIAS;
var NOTICIAS_POR_CARGA = 3;

var proximaNoticia = 0;
var primeraCarga = true;
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

    // $.getJSON("../src/noticias.json", function (data) {
    //     NOTICIAS = data;
    // });

    // jQuery(function () {
    //     var page = location.pathname.split('/').pop();
    //     alert(page)
    //     $('#nav li a[href="' + page + '"]').addClass('linkActivo')
    //     console.log($('#nav li a[href="' + page + '"]'))
    // })

    $("#pobre").on("click", function () {
        alert('ya no quedan más noticias');
    });

    // on scroll down 
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 800) {
            cargarNoticias();
        } 
      });

    $("#cargarMas").on("click", function() {
        cargarNoticias();
    })
};

/* ---- TRATAR DATOS JSON ----*/

function cargarNoticias() {

    // $(NOTICIAS).each(function(i, noticia) {

    //     var titulo = noticia.Titulo;
    //     var textoEntradilla = noticia.Entradilla;

    //     console.log(
    //         "Titulo: "+titulo+
    //         ", Entradilla: "+textoEntradilla
    //     )
    //     prepararEntradilla(noticia);

    // });
    if (primeraCarga) {
        var contadorNoticias = NOTICIAS.length;

        primeraCarga = false;
    }
    
    var cargandoNoticias = false;
    var i = 0;
    var proximaNoticia = contadorNoticias -1;

    while (i < contadorNoticias && i < NOTICIAS_POR_CARGA ) {
        
        $("#loading").fadeIn();
        setTimeout(prepararEntradilla(NOTICIAS[proximaNoticia]), 15000)
        $("#loading").fadeOut();
        
        i ++;
        proximaNoticia --;
    } 
}

function prepararEntradilla(noticia) {
    
    
    

    var entradilla = $("<section></section>");
    
    var titulo = $("<h2/>").addClass("tituloNoticia").append(noticia.Titulo);
    titulo.appendTo(entradilla);

    var fecha = $("<div/>").addClass("fechaNoticia").append($("</p>").append(noticia.Fecha).addClass("label label-default"));
    fecha.appendTo(entradilla);
    
    var imagen = "<img src='"+noticia.Imagen+"' alt='"+noticia.Titulo+"' class='articleImg rounded mx-auto d-block pull-left'>";
    entradilla.append(imagen);

    var article = $("<article/>");

    var postTitulo = $("<h3/>").append(noticia.PostTiutlo);
    postTitulo.appendTo(article);
    
    var textoEntradilla = $("</p>").append(noticia.Entradilla).addClass("text-justify");
    textoEntradilla.appendTo(article);
    article.addClass("col-xs-7")
    article.appendTo(entradilla);

    $("main").append(entradilla.addClass("d-inline-block"));

}

