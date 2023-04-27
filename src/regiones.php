<?php
/**
 * regiones.php
 * Autor: Iván Hernández Contreras
 * Email: iva.hernandez@gmail.com
 */

//Conexión DB
require('../database/database.php');

    
$query = "SELECT * FROM regiones";
$stmt = $conn->prepare($query);
$stmt->execute();
    
$allRegiones = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($allRegiones);
