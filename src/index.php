<?php
/**
 * index.php
 * Autor: Iván Hernández Contreras
 * Email: iva.hernandez@gmail.com
 */

//Conexión DB
require('../database/database.php');

// Atributos

$nombre = $_POST['nombre'];
$rut = $_POST['rut'];
$alias = $_POST['alias'];
$email = $_POST['email'];
$region = $_POST['region'];
$comuna = $_POST['comuna'];
$candidato = $_POST['candidato'];
$fuentes = $_POST['fuentes'];

// Validaciones

function validar_nombre_apellido($nombre) {
    $nombre = filter_var($nombre, FILTER_SANITIZE_STRING);
    return preg_match('/^[a-zA-ZñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\s]+$/', $nombre) === 1;
}

function validar_rut($rut) {
    $rut = preg_replace('/[^0-9kK]/', '', $rut);

    if (strlen($rut) < 8 || strlen($rut) > 9) {
        return false;
    }

    $rut_num = substr($rut, 0, -1);
    $verif_num = substr($rut, -1);

    $suma = 0;
    $factor = 2;
    for ($i = strlen($rut_num) - 1; $i >= 0; $i--) {
        $suma += $factor * $rut_num[$i];
        $factor = $factor % 7 == 0 ? 2 : $factor + 1;
    }

    $digito_verif = 11 - ($suma % 11);
    $digito_verif = $digito_verif == 11 ? 0 : ($digito_verif == 10 ? 'K' : $digito_verif);

    return strtoupper($digito_verif) == strtoupper($verif_num);
}

function validar_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validar_alias($alias) {
    $alias = filter_var($alias, FILTER_SANITIZE_STRING);
    return preg_match('/^[a-zA-Z0-9]{6,}$/', $alias) === 1;
}

function validar_coleccion_fuentes($fuentes) {
    return count($fuentes) >= 2 !== false;
}

// if (validar_email($email) && validar_rut($rut)):
    // $query = "INSERT INTO votaciones (nombre, alias, rut, email, region_id, comuna_id, candidato_id, fuentes) VALUES (:nombre, :alias, :rut, :email, :region_id, :comuna_id, :candidato_id, :fuentes)";
    
    // $stmt = $conn->prepare($query);
    // $exec = $stmt->execute([
    //     'nombre' => $nombre, 
    //     'alias' => $alias,
    //     'rut' => $rut,
    //     'email' => $email,
    //     'region_id' => $region,
    //     'comuna_id' => $comuna,
    //     'candidato_id' => $candidato,
    //     'fuentes' => json_encode($fuentes),
    // ]);
    
    // if ($exec) {
    //     echo "Ingresado";
    // } else {
    //     echo "NO ingresado";
    // }
// endif;



/**
 * REALIZAR FUNCIONES PARA VALIDACIONES DE DATOS E INSERTAR EN LA BASE DE DATOS
 * 
 */

