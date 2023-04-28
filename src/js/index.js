'use strict'

const soloLetras = event => {
    var charCode = event.keyCode;
    if (charCode > 32 && (charCode < 65 || charCode > 90)
                      && (charCode < 97 || charCode > 122)
                      && (charCode < 129 || charCode > 163)
                      && (charCode < 209 || charCode > 249)) {
      event.preventDefault();
      return false;
    }
    return true;
};

const validarNombreApellido = (nombre) => {
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\s]+$/;
    nombre = nombre.trim();
    return regex.test(nombre);
};

const validarRUT = (rut) => {

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
        return false;
      }
      var tmp = rut.split('-');
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == 'K') digv = 'k';
      var m = 0, s = 1;
      for (; rut; rut = Math.floor(rut / 10)) {
        s = (s + rut % 10 * (9 - m++ % 6)) % 11;
      }
      return digv == (s ? s - 1 : 'k');
};

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarAlias = (alias) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    alias = alias.trim();
    return regex.test(alias);
};

const validarColeccionFuentes = (fuentes) => {
    return fuentes >= 2 !== false;
};

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

    const validarCampoNombre = () => {
        let nombre = $("#nombre");
        nombre.removeClass("is-valid is-invalid");

        $("#alerta-nombre")
            .removeClass('valid-feedback invalid-feedback')
            .text("");

        if(validarNombreApellido(nombre.val())) {
            $("#alerta-nombre")
                .addClass('valid-feedback')
                .text("");
            nombre.addClass('is-valid');
        } else {
            let msg = nombre.val() === "" ? "Ingrese su nombre y apellido" : "Nombre incorrecto";
            $("#alerta-nombre")
                .addClass('invalid-feedback')
                .text(msg);
            nombre.addClass('is-invalid');
        }
    };

    const validarCampoRut = () => {
        let rut = $("#rut");
        rut.removeClass("is-valid is-invalid");

        $("#alerta-rut")
            .removeClass('valid-feedback invalid-feedback')
            .text("");

            if(validarRUT(rut.val())) {
                $("#alerta-rut")
                    .addClass('valid-feedback')
                    .text("");
                rut.addClass('is-valid');
            } else {
                let msg = rut.val() === "" ? "Ingrese su rut" : "Rut no existe. Favor de ingresar correctamente.";
                $("#alerta-rut")
                    .addClass('invalid-feedback')
                    .text(msg);
                rut.addClass('is-invalid');
            }
    };

    const validarCampoAlias = () => {
        let alias = $("#alias");
        alias.removeClass("is-valid is-invalid");

        $("#alerta-alias")
            .removeClass('valid-feedback invalid-feedback')
            .text("");

            if(validarAlias(alias.val())) {
                $("#alerta-alias")
                    .addClass('valid-feedback')
                    .text("");
                alias.addClass('is-valid');
            } else {
                let msg = alias.val() === "" ? "Ingrese un alias" : "El alias debe contener mas de 5 caracteres";
                $("#alerta-alias")
                    .addClass('invalid-feedback')
                    .text(msg);
                alias.addClass('is-invalid');
            }
    };
    
    const validarCampoEmail = () => {
        let email = $("#email");
        email.removeClass("is-valid is-invalid");

        $("#alerta-email")
            .removeClass('valid-feedback invalid-feedback')
            .text("");

            if(validarEmail(email.val())) {
                $("#alerta-email")
                    .addClass('valid-feedback')
                    .text("");
                email.addClass('is-valid');
            } else {
                let msg = email.val() === "" ? "Ingrese un email" : "El email no es valido. Ingrese nuevamente.";
                $("#alerta-email")
                    .addClass('invalid-feedback')
                    .text(msg);
                email.addClass('is-invalid');
            }
    };

    const validarOpcionesFuentes = () => {
        let checked = $('input[name="fuentes[]"]:checked').length;
        let fuentes = $('input[name="fuentes[]"]');
        fuentes.removeClass("is-invalid is-valid");

        $("#alerta-fuentes")
            .removeClass('valid-feedback invalid-feedback')
            .text("");

        if (!validarColeccionFuentes(checked)) {
            $("#alerta-fuentes")
                .addClass('invalid-feedback')
                .text("Debe seleccionar al menos 2 opciones");
            fuentes.addClass('is-invalid');
        } else {
            $("#alerta-fuentes")
                .addClass('valid-feedback')
                .text("");
            fuentes.addClass('is-valid');
        }
    };
    
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

    
    $("#votarBtn").on('click', function (e) {
        let formData = $("form").serialize();
        e.preventDefault();
        
        validarCampoNombre();
        validarCampoRut();
        validarCampoAlias();
        validarCampoEmail();
        validarOpcionesFuentes();
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

});