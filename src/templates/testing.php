<?php
    define('DB_NAME', 'db');
    define('DB_USER', 'root');
    define('DB_PASSWORD', 'toor');
    define('DB_HOST', 'localhost');

    $link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
    if (!$link)
    {
        die ('Could not connect: ' . mysqli_error($link));
    }

    $db_selected = mysqli_select_db($link, DB_NAME);
    if (!$db_selected)
    {
        die ('Cannot access' . DB_NAME . ': ' . mysqli_error($link));
    }
?>