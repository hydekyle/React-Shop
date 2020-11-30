<?php
    header("Access-Control-Allow-Origin: *");

    define('DB_NAME', 'db');
    define('DB_USER', 'mktlogic_game_ad');
    define('DB_PASSWORD', 'eM93bn#6');
    define('DB_HOST', 'localhost');

    define('TABLE_USERNAME', 'username');
    define('TABLE_POINTS', 'points');
    define('TABLE_AVATAR', 'avatar');

    $username = $_GET["username"];

    $get_scores = "SELECT * FROM users ORDER BY points DESC LIMIT 9";

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($mysqli->connect_errno) exit ("Error de conexión");

    if (!$resultado = $mysqli->query($get_scores)) die ("Error de consulta");

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_fetch_array()) {
            echo "$fila[TABLE_USERNAME]·$fila[TABLE_POINTS]·$fila[TABLE_AVATAR]|";
        }
    }
    
?>
