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

function validarRut($rut) {
    $rut = preg_replace('/[^0-9Kk]/', '', $rut); // Eliminar guiones y puntos, dejar solo números y K/k
    $dv = strtoupper(substr($rut, -1)); // Obtener dígito verificador
    $num = substr($rut, 0, -1); // Obtener número sin dígito verificador
  
    $factores = array(2, 3, 4, 5, 6, 7);
    $suma = 0;
    for ($i = strlen($num) - 1, $j = 0; $i >= 0; $i--, $j++) {
      if ($j >= count($factores)) {
        $j = 0;
      }
      $suma += $num[$i] * $factores[$j];
    }
    $resto = $suma % 11;
  
    if ($dv == '0' && $resto == 0) {
      return true;
    } elseif ($dv == 'K' && $resto == 10) {
      return true;
    } elseif ($dv == (11 - $resto)) {
      return true;
    } else {
      return false;
    }
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

if (validar_email($email) && validar_rut($rut)):
    $query = "INSERT INTO votaciones (nombre, alias, rut, email, region_id, comuna_id, candidato_id, fuentes) VALUES (:nombre, :alias, :rut, :email, :region_id, :comuna_id, :candidato_id, :fuentes)";
    
    $stmt = $conn->prepare($query);
    $exec = $stmt->execute([
        'nombre' => $nombre, 
        'alias' => $alias,
        'rut' => $rut,
        'email' => $email,
        'region_id' => $region,
        'comuna_id' => $comuna,
        'candidato_id' => $candidato,
        'fuentes' => json_encode($fuentes),
    ]);
    
    if ($exec) {
        echo "Ingresado";
    } else {
        echo "NO ingresado";
    }
endif;


