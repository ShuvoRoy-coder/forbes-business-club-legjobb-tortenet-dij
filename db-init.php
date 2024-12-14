<?php

require_once('./db.php');

// drop the table if it exists
$dropSql = "DROP TABLE IF EXISTS `forbes_2024_selfmade_lista`;";
$db->query($dropSql);

// create forbes_2024_selfmade_lista table
$sql = "CREATE TABLE `forbes_2024_selfmade_lista` (
    `id` VARCHAR(36) NOT NULL,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE KEY,
    `email_verified_at` timestamp NULL DEFAULT NULL,
    `canditate` varchar(255) NOT NULL,
    `ip` varchar(255) NOT NULL,
    `verification_ip` varchar(255) DEFAULT NULL,
    `user_agent` varchar(255) NOT NULL,
    `verification_user_agent` varchar(255) DEFAULT NULL,
    `espresso_consent` BOOLEAN NOT NULL DEFAULT FALSE,
    `privacy_policy_consent` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
$db->query($sql);

// check if the table was created successfully
if ($db->errno) {
    header('Content-Type: application/json; charset=utf-8');
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode([
        'msg' => "Failed to create table: (" . $db->errno . ") " . $db->error
    ]);
    exit();
}

// If everything is successful, we send a success message
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'msg' => "Table `forbes_2024_selfmade_lista` has been dropped and recreated successfully."
]);
exit();
