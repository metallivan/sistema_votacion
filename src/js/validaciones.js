'use strict'

/**
 * @author Iván Hernández Contreras (iva.hernandez.con at gmail.com)
 * @version 1.0.0
 * @name validaciones.js
 * 
 */

// Validaciones de datos recibidos

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
    var patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ]{2,30}(\s[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ]{2,30})*$/;
    return patron.test(nombre) && nombre.indexOf(' ') !== -1;
};

const validarRUT = (rut) => {
    if (!/^[1-9]\d{0,7}[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
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
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
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


// Validaciones de campos

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
        let msg = nombre.val() === "" ? "Ingrese su nombre y apellido" : "Ingrese correctamente su nombre y apellido";
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

const validarSelectRegion = () => {
    let region = $("#region");
    region.removeClass("is-valid is-invalid");

    $("#alerta-region")
        .removeClass('valid-feedback invalid-feedback');

    if(region.val()!== "") {
        $("#alerta-region")
        .addClass('valid-feedback')
        .text("");
        region.addClass('is-valid');
    } else {
        $("#alerta-region")
           .addClass('invalid-feedback')
           .text("Seleccione una región");
        region.addClass('is-invalid');
    }                    
};

const validarSelectComuna = () => {
    let comuna = $("#comuna");
    comuna.removeClass("is-valid is-invalid");
    
    $("#alerta-comuna")
        .removeClass('valid-feedback invalid-feedback');
    
    if(comuna.val()!== "") {
        $("#alerta-comuna")
          .addClass('valid-feedback')
          .text("");
        comuna.addClass('is-valid');
    } else {
        if( comuna.prop('disabled') ) {
            $("#alerta-comuna")
                .addClass('invalid-feedback')
                .text("Seleccione una region primero");
        } else {
            $("#alerta-comuna")
                .addClass('invalid-feedback')
                .text("Seleccione una comuna");
            }
        comuna.addClass('is-invalid');
    }
};

const validarSelectCandidato = () => {
    let candidato = $("#candidato");
    candidato.removeClass("is-valid is-invalid");
    
    $("#alerta-candidato")
        .removeClass('valid-feedback invalid-feedback');
    
    if(candidato.val()!== "") {
        $("#alerta-candidato")
         .addClass('valid-feedback')
         .text("");
        candidato.addClass('is-valid');
    } else {
        $("#alerta-candidato")
           .addClass('invalid-feedback')
           .text("Seleccione un candidato");
        candidato.addClass('is-invalid');
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