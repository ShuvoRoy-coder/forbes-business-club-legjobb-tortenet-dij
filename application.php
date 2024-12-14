<?php

http_response_code(404);
exit();

/*
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
        if (!in_array($body['application_type'] ?? null, ['myself', 'other'])) {
            $errors['application_type'] = 'Jelentkezés módjának kiválasztása kötelező!';
        }

        if (count($errors) == 0) {
            $fields = ['name', 'email', 'phone', 'job', 'company', 'reason'];

            if ($body['application_type'] == 'other') {
                array_push($fields, 'extra_name', 'extra_email', 'extra_phone');
                $requiredFields = ['name', 'job', 'reason', 'extra_name', 'extra_email', 'extra_phone'];
            } else {
                $requiredFields = ['name', 'email', 'phone', 'job', 'reason'];
            }

            foreach ($fields as $field) {
                $len = strlen($body[$field]);
                if (isset($body[$field]) && !empty($body[$field])) {
                    if (in_array($field, ['email', 'extra_email']) && !filter_var($body[$field], FILTER_VALIDATE_EMAIL)) {
                        $errors[$field] = 'Helytelen email cím!';
                    } else if ($field == 'reason' && strlen($body[$field]) > 2000) {
                        $errors[$field] = 'A mező értéke nem lehet hosszabb 1000 karakternél!';
                    } else if ($field != 'reason' && strlen($body[$field]) > 255) {
                        $errors[$field] = 'A mező értéke nem lehet hosszabb 255 karakternél!';
                    }
                } else if (in_array($field, $requiredFields)) {
                    $errors[$field] = 'A mező kitöltése kötelező!';
                }
            }
        }

        if (count($errors) == 0) {
            $result = singleCurl(APPLICATION_SPREADSHEET_URL, true, json_encode([
                $body['application_type'] == 'myself' ? 'Igen' : 'Nem',
                $body['name'],
                $body['email'] ?? '',
                $body['phone'] ?? '',
                $body['job'],
                $body['company'] ?? '',
                $body['application_type'] == 'other' ? $body['extra_name'] ?? '' : '',
                $body['application_type'] == 'other' ? $body['extra_email'] ?? '' : '',
                $body['application_type'] == 'other' ? $body['extra_phone'] ?? '' : '',
                $body['reason'],
                isset($body['newsletter']) ? 'Igen' : 'Nem'
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
*/