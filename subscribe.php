<?php

// This page is disabled now. 404
http_response_code(404);
exit();

require_once('vendor/autoload.php');
require_once('./components/base.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

    if (stripos($contentType, 'application/json') === false) {
        throw new Exception('Content-Type must be application/json');
    }

    $body = json_decode(file_get_contents("php://input"), true);
    $errors = [];

    if (!isset($body['token'])) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'msg' => 'Sikertelen captcha ellenőrzés!'
        ]);

        http_response_code(400);
        exit();
    }

    $reCaptchaLib = new \ReCaptcha\ReCaptcha(RECAPTCHA_V3_SECRET);
    $captchaRes = $reCaptchaLib->verify($body['token']);

    if ($captchaRes->isSuccess()) {
        if (count($errors) == 0) {

            if (!isset($body['email']) || empty($body['email'])) {
                $errors['email'] = 'A mező kitöltése kötelező';
            } else if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
                $errors['email'] = 'Helytelen email cím!';
            }
        }

        if (count($errors) == 0) {
            $result = singleCurl(SUBSCRIBE_SPREADSHEET_URL, true, json_encode([
                $body['email'],
                isset($body['espresso']) ? 'Igen' : 'Nem',
            ]), true);

            if ($result == '') {
                http_response_code(200);
                echo "Sikeres feliratkozás";
            } else {
                http_response_code(400);
            }
        } else {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($errors);
            http_response_code(400);
        }
    } else {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'msg' => 'Sikertelen captcha ellenőrzés!'
        ]);

        http_response_code(400);
    }

    exit();
}

function singleCurl($url, $post = false, $postData = null, $wait = true)
{
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_FAILONERROR, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    if ($post) {
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
    }
    if (!$wait) {
        curl_setopt($curl, CURLOPT_VERBOSE, 0);
        curl_setopt($curl, CURLOPT_TIMEOUT, 1);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_FORBID_REUSE, true);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 1);
        curl_setopt($curl, CURLOPT_DNS_CACHE_TIMEOUT, 10);
        curl_setopt($curl, CURLOPT_FRESH_CONNECT, true);
    }
    $result = curl_exec($curl);
    $error = curl_error($curl);
    if ($error != null)
        return $error;
    return $result;
}

http_response_code(405);
