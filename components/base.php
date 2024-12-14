<?php

$env = parse_ini_file('.env');


define('ASSET_URL', $env['ASSET_URL']);
define('SZAVAZAS_HOME_LINK', $env['SZAVAZAS_HOME_LINK']);

define('APPLICATION_SPREADSHEET_URL', $env['APPLICATION_SPREADSHEET_URL']);
define('SUBSCRIBE_SPREADSHEET_URL', $env['SUBSCRIBE_SPREADSHEET_URL']);
define('RECAPTCHA_V3_PUBLIC', $env['RECAPTCHA_V3_PUBLIC']);
define('RECAPTCHA_V3_SECRET', $env['RECAPTCHA_V3_SECRET']);
define('RECATCHA_THRESHOLD', $env['RECATCHA_THRESHOLD'] ?? 0.8);

require_once('./competitors/data.php');

foreach ($competitors as $i => $competitor) {
    $competitors[$i]['slug'] = slugify($competitor['name']);
}

// shuffle($competitors);

function slugify($text, string $divider = '-')
{
    $text = preg_replace('~[^\pL\d]+~u', $divider, $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, $divider);
    $text = preg_replace('~-+~', $divider, $text);
    $text = strtolower($text);

    if (empty($text)) {
        return 'n-a';
    }

    return $text;
}

function get_user_ip()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        // Check IP from internet.
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Check IP is passed from proxy.
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        // Get IP address from remote address.
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    return $ip;
}

// Get current full URL with query string
function get_current_url()
{
    $protocol = 'http';
    if ($_SERVER['SERVER_PORT'] == 443 || (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on')) {
        $protocol .= 's';
    }
    $host = $_SERVER['HTTP_HOST'];
    $request = $_SERVER['PHP_SELF'];
    $query = !empty($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';
    return $protocol . '://' . $host . $request . '?' . $query;
}
