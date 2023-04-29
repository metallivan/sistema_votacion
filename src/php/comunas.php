<?php
/**
 * comunas.php
 * Autor: Iván Hernández Contreras
 * Email: iva.hernandez@gmail.com
 */

//Conexión DB
require('..\..\database\database.php');

$region = $_POST["region"];

$query = "SELECT * FROM comunas WHERE region_id = $region";
$stmt = $conn->prepare($query);
$stmt->execute();
    
$allComunas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($allComunas);