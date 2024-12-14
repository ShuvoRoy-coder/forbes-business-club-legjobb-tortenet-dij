<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createMutable($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);
$dotenv->load();

define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);
define('DB_HOST', $_ENV['RDS_HOST']);

// setup the connection to the database
$db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// if there was an error connecting to the database show the error message
if ($db->connect_errno) {
    header('Content-Type: application/json; charset=utf-8');
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode([
        'msg' => "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error
    ]);
    exit();
}

// make sre we are using utf8
$db->set_charset("utf8");
