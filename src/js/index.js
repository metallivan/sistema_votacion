'use strict'

/**
 * @author Iván Hernández Contreras (iva.hernandez.con at gmail.com)
 * @version 1.0.0
 * @name index.js
 * 
 */

// jQuery y Ajax

$(document).ready(function () {

    $("#nombre").keypress( e => soloLetras(e) );
    
    $("#rut").on("input", function() {
        var regex = /^[0-9kK\-]*$/;
        if (!regex.test(this.value)) {
          this.value = this.value.replace(/[^0-9kK\-]/g, "");
        }
    });

    $("#alias").on("input", function() {
        var regex = /^[0-9a-zA-Z]*$/;
        if (!regex.test(this.value)) {
          this.value = this.value.replace(/[^0-9a-zA-Z]/g, "");
        }
    });

//Callbacks Selectors
    $.ajax({
        url: 'src/php/regiones.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const regiones = data;

            regiones.map(
                r => $("#region").append(`<option value="${r.id}">${r.region}</option>`)
            );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    
    $('#region').change(function() {
        let region = $(this).val();
        $("#comuna")
            .empty()
            .removeAttr('disabled')
            .append(`<option value="">Seleccione una comuna...</option>`);

        $.post('src/php/comunas.php', {region: region})
        .done(function(data) {
            const comunas = JSON.parse(data);
            
            comunas.map(
                c => $("#comuna").append(`<option value="${c.id}">${c.comuna}</option>`)
            );
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        );
       
    });

    $.ajax({
        url: 'src/php/candidatos.php',
        type: 'GET',
        success: function(data) {
            const candidatos = JSON.parse(data);

            candidatos.map(
                c => $("#candidato").append(`<option value="${c.id}">${c.candidato}</option>`)
            );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });


    let alerta = $("#alerta-response");

    alerta.hide();
    
    $("#votarBtn").on('click', function (e) {
        let formData = $("form").serialize();
        e.preventDefault();
        let alertaMsg = $("#alerta-response-msg");
        
        validarCampoNombre();
        validarCampoRut();
        validarCampoAlias();
        validarCampoEmail();
        validarSelectRegion();
        validarSelectComuna();
        validarSelectCandidato();
        validarOpcionesFuentes();

        $.ajax({
            type: "POST",
            url: "src/index.php",
            data: formData,
            success: function (response) {
                alerta.removeClass("alert-danger alert-warning alert-success").show();
                console.log(response);
          
                switch (response) {
                    case 'duplicado':
                        alerta.addClass("alert-warning");    
                        alertaMsg.text("El voto ya ha sido emitido por usted. Por favor, vuelva a ingresar el voto con un RUT diferente.");
                        $("#rut").addClass('is-invalid');
                    break;
                    case 'incompleto':
                        alerta.addClass("alert-warning");
                        alertaMsg.text("Por favor rellene todos los datos.");
                    break;
                    case 'error':
                        alerta.addClass("alert-danger");
                        alertaMsg.text("Existen datos mal ingresados en el formulario. Por favor, ingrese los datos correctamente.");
                    break;
                    case 'valido':
                        alerta.addClass("alert-success");
                        alertaMsg.text("Su voto ha sido enviado correctamente. Muchas gracias por participar.");
                        $("input").removeClass("is-valid");
                        $("select").removeClass("is-valid");
                        $("form")[0].reset();
                        $("#comuna").attr("disabled", "disabled");
                    break;   
                }

                setTimeout(function() {
                    alerta.fadeOut();
                }, 3500);
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

});