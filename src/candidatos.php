<?php
/**
 * candidatos.php
 * Autor: Iván Hernández Contreras
 * Email: iva.hernandez@gmail.com
 */

//Conexión DB
require('../database/database.php');

    
$query = "SELECT * FROM candidatos";
$stmt = $conn->prepare($query);
$stmt->execute();
    
$allCandidatos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($allCandidatos);