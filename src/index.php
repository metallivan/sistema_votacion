<?php
/**
 * index.php
 * Autor: Iván Hernández Contreras
 * Email: iva.hernandez@gmail.com
 */

//Conexión DB
require('../database/database.php');

// Datos de entrada

$nombre = htmlspecialchars($_POST['nombre']);
$rut = $_POST['rut'];
$alias = htmlspecialchars(trim($_POST['alias']));
$email = htmlspecialchars($_POST['email']);
$region = (!empty($_POST['region'])? $_POST['region'] : '');
$comuna = (!empty($_POST['comuna'])? $_POST['comuna'] : '');
$candidato = (!empty($_POST['candidato'])? $_POST['candidato'] : '');
$fuentes = $_POST['fuentes'] ?? null;

$votacion = [
  'nombre' => $nombre,
  'rut' => $rut,
  'alias' => $alias,
  'email' => $email,
  'region' => $region,
  'comuna' => $comuna,
  'candidato' => $candidato,
  'fuentes' => $fuentes,
];

// Validaciones

function check_datos_votacion($votacion) {
  // Verificamos que los campos requeridos estén presentes
  return isset(
    $_POST['nombre'], 
    $_POST['rut'], 
    $_POST['alias'], 
    $_POST['email'], 
    $_POST['region'], 
    $_POST['comuna'], 
    $_POST['candidato']) !== false; 
}

function validar_nombre_apellido($nombre) {
    $patron = "/^[a-zA-Z]{2,30}(\s[a-zA-Z]{2,30})*$/";
  if (preg_match($patron, $nombre) && strpos($nombre, ' ') !== false) {
    return true;
  } else {
    return false;
  }
}

function validar_rut($rut) {

    if (!preg_match('/^[1-9]\d{0,7}[-|‐]{1}[0-9kK]{1}$/', $rut)) {
      return false;
    }
    $tmp = explode('-', $rut);
    $digv = strtolower($tmp[1]);
    $rut = (int) $tmp[0];
    $m = 0;
    $s = 1;
    for (; $rut; $rut = (int) ($rut / 10)) {
      $s = ($s + ($rut % 10) * (9 - ($m++ % 6))) % 11;
    }
    $digv_calc = $s ? ($s - 1) : 'k';
    return $digv == $digv_calc;
  }

function validar_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validar_alias($alias) {
    $alias = filter_var($alias, FILTER_SANITIZE_STRING);
    return preg_match('/^[a-zA-Z0-9]{6,}$/', $alias) !== false;
}

function validar_coleccion_fuentes($fuentes) {
    return count($fuentes) >= 2 !== false;
}

function validar_voto_duplicado($rut, $conn) {
  $query = "SELECT COUNT(*) AS contador FROM votaciones WHERE rut = :rut";
  $stmt = $conn->prepare($query);
  $stmt->execute(['rut' => $rut]);
  $resultado = $stmt->fetch(PDO::FETCH_ASSOC)["contador"];

    if ($resultado > 0) {
        return true;
    } else {
        return false;
    }
}

function validar_opciones($votacion) {
  return $votacion['region'] > 0 
        && $votacion['comuna'] > 0 
        && $votacion['candidato'] > 0 !== false;
}

function check_coleccion_validaciones($votacion) {
  return validar_nombre_apellido($votacion['nombre']) &&
    validar_rut($votacion['rut']) &&
    validar_email($votacion['email']) &&
    validar_alias($votacion['alias']) &&
    validar_coleccion_fuentes($votacion['fuentes']) &&
    validar_opciones($votacion);
}

try {
  if(validar_voto_duplicado($votacion['rut'], $conn)):
    echo "duplicado";
  elseif (!check_datos_votacion($votacion)):
  echo 'incompleto';
  elseif (!check_coleccion_validaciones($votacion)):
    echo "error";
    else:
        $query = "INSERT INTO votaciones (nombre, alias, rut, email, region_id, comuna_id, candidato_id, fuentes) 
                  VALUES (:nombre, :alias, :rut, :email, :region_id, :comuna_id, :candidato_id, :fuentes);";

        $stmt = $conn->prepare($query);
        $stmt->execute([
            'nombre' => $votacion['nombre'], 
            'alias' => $votacion['alias'],
            'rut' => $votacion['rut'],
            'email' => $votacion['email'],
            'region_id' => $votacion['region'],
            'comuna_id' => $votacion['comuna'],
            'candidato_id' => $votacion['candidato'],
            'fuentes' => json_encode($votacion['fuentes']),
        ]);

        echo "valido";
    endif;
  
} catch (Exception $e) {
  // Mostramos un mensaje de error al usuario
  echo '<p>Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
}
