<?php
    define('DB_NAME', 'db');
    define('DB_USER', 'mktlogic_game_ad');
    define('DB_PASSWORD', 'eM93bn#6');
    define('DB_HOST', 'localhost');

    $username = $_GET["username"];
    $points = $_GET["points"];

    $get_user_query = "SELECT * FROM users WHERE username = " . '"' . $username . '"';
    $insert_user_query = "INSERT INTO users (username, password, points) values ('$username', 'defaultpassword', $points)";
    $update_user_query = "UPDATE users set points = $points WHERE username = " . '"' . $username . '"';

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($mysqli->connect_errno) exit("Error de conexión");

    if (!$resultado = $mysqli->query($get_user_query)) die("Error de consulta");

    if ($resultado->num_rows === 0) {
        if ($inserted_user = $mysqli->query($insert_user_query)) {
            die("Nuevo usuario guardado");
        }
    } else {
        $storedUser = $resultado->fetch_assoc();
	if ($storedUser["points"] < $points) {
		if ($updated_user = $mysqli->query($update_user_query)) die ("Usuario Updated");
	}else die ("Record no superado");

    }

?>
