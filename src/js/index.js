'use strict'

$(document).ready(function () {
    
    $.ajax({
        url: 'src/regiones.php',
        type: 'GET',
        success: function(data) {
            const regiones = JSON.parse(data);

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

        $.post('src/comunas.php', {region: region}, function(data) {
            const comunas = JSON.parse(data);
            
            comunas.map(
                c => $("#comuna").append(`<option value="${c.id}">${c.comuna}</option>`)
            );
        });
       
    });

    $.ajax({
        url: 'src/candidatos.php',
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

    
    $("#votarBtn").on('submit', function (e) {
        let formData = $("form").serialize();
        e.preventDefault();
        
        
        $.ajax({
            type: "POST",
            url: "src/index.php",
            data: formData,
            // dataType: "dataType",
            success: function (response) {
                console.log(response)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    /**
     * REALIZAR VALIDACIONES DE DATOS Y MOSTRAR ALERTAS SEGUN VALIDACIONES
     */

});

const validarRUT = (rut) => {
    rut = rut.replace(/[^\dkK]/g, '');
    
    if (rut.length < 8 || rut.length > 9) {
      return false;
    }
    
    const rut_num = rut.slice(0, -1);
    const verif_num = rut.slice(-1).toUpperCase();
    
    let suma = 0;
    let factor = 2;
    for (let i = rut_num.length - 1; i >= 0; i--) {
      suma += factor * parseInt(rut_num[i]);
      factor = factor % 7 === 0 ? 2 : factor + 1;
    }
    
    let digito_verif = 11 - (suma % 11);
    digito_verif = digito_verif === 11 ? 0 : (digito_verif === 10 ? 'K' : digito_verif);
    
    return digito_verif.toString().toUpperCase() === verif_num;
};

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarNombreApellido = (nombre) => {
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\s]+$/;
    nombre = nombre.trim();
    return regex.test(nombre);
};

const validarAlias = (alias) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    alias = alias.trim();
    return regex.test(alias);
};

const validarColeccionFuentes = (fuentes) => {
    return fuentes.length >= 2 !== false;
};