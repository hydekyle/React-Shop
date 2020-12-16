<?php
    header("Access-Control-Allow-Origin: *");

    define('DB_NAME', 'palolto_spgame');
    define('DB_USER', 'mktlogic_game_ad');
    define('DB_PASSWORD', 'eM93bn#6');
    define('DB_HOST', 'localhost');

    $table_name = "registro";
    $column_alias = "reg_alias";
    $column_intentos = "reg_intentos";
    
    $alias = $_GET["alias"];
    $token = $_GET["token"];
    
    $get_user_query = "SELECT * FROM $table_name WHERE $column_alias = '$alias'";
    
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($mysqli->connect_errno) exit("Error de conexión");

    if (!$resultado = $mysqli->query($get_user_query)) die("Error de consulta");

    if ($resultado->num_rows === 0) die("No se encontró al usuario");
    else {
        $storedUser = $resultado->fetch_array();
        if ($storedUser[$column_intentos] >= 0) {
            $valid_token = strlen($alias) * $storedUser[$column_intentos] + 7;
            if ($token !== $valid_token) die ("Token no valido " . $valid_token);
            $intentosUpdated = $storedUser[$column_intentos] - 1;
            $update_intentos_query = "UPDATE $table_name SET $column_intentos = $intentosUpdated WHERE $column_alias = '$alias'";
            if ($updated_user = $mysqli->query($update_intentos_query)) die ("OK");
        } else {
            die("Intentos agotados.");
        }

    }
    
?>
