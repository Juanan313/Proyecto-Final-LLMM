// Variable constante donde se almacenarán los datos del json
var NOTICIAS;

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
        prepararEntradillas();
    });
};

/* ---- TRATAR DATOS JSON ----*/

function prepararEntradillas() {
    
    $(NOTICIAS).each(function(i, noticia) {
        

        var titulo = noticia.Titulo;
        var textoEntradilla = noticia.Entradilla;

        console.log(
            "Titulo: "+titulo+
            ", Entradilla: "+textoEntradilla
        )
        prepararEntradilla(noticia);

    });
}

function prepararEntradilla(noticia) {
    
    
    

    var entradilla = $("<section></section>");
    
    var titulo = $("</h2>").addClass("tituloNoticia").append(noticia.Titulo);
    titulo.appendTo(entradilla);

    var postTitulo = $("</h3>").append(noticia.PostTiutlo);
    postTitulo.appendTo(entradilla);

    var fecha = $("</div>").addClass("fechaNoticia").append(noticia.Fecha);
    fecha.appendTo(entradilla);
    
    var imagen = "<img src='"+noticia.Imagen+"' alt='"+noticia.Titulo+"' class='articleImg'>";
    entradilla.append(imagen);
    
    var textoEntradilla = $("</p>").append(noticia.Entradilla);
    textoEntradilla.appendTo(entradilla);

    $("main").append(entradilla);

}

