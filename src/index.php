<?php
/**
 * index.php
 * Autor: Iván Hernández Contreras
 * Email: iva.hernandez@gmail.com
 */

//Conexión DB
require('..\database\database.php');

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

//Validaciones
include('utils/validaciones.php');

//Inserción votación
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
            'nombre' => capitalizar_nombre_apellido($votacion['nombre']), 
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
