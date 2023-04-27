<?php
// Configuración de la conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistema_votacion";

// Crear la conexión utilizando PDO
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // configurar el modo de error a excepción
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo "Error en la conexión: " . $e->getMessage();
}
