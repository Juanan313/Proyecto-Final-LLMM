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


};

/* ---- TRATAR DATOS JSON ----*/

function prepararEntradillas() {
    
}

