/*--- Función onload para cargar todo los eventos y las llamadas a las funciones -----*/
var NOTICIAS;


window.onload = function () {
    // alert("La página se ha cargado correctamente");
    console.log("prueba carga jquery: "+$("header h1").text());

    $.ajax({
        url: 'https://juanan313.github.io/Proyecto-Final-LLMM/src/json/noticias.json',
        success: function(respuesta) {
            console.log(respuesta);
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
};

