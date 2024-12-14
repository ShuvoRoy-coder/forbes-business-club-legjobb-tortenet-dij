<?php

// This page is disabled now. 404
//http_response_code(404);
//exit();

use Mailgun\Mailgun;

require_once('vendor/autoload.php');
require_once('./components/base.php');
require_once('./db.php');

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
    if (stripos($contentType, 'application/json') === false) {
        header('Content-Type: application/json; charset=utf-8');
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['msg' => 'Invalid content type: application/json required']);
        exit();
    }

    $body = json_decode(file_get_contents("php://input"), true);
    $errors = [];

    $ip = get_user_ip();
    $rateLimitKey = 'rate_limit_' . $ip;
    $rateLimit = $_SESSION[$rateLimitKey] ?? ['count' => 0, 'time' => time()];

    if ($rateLimit['time'] > time() - 60) {
        if ($rateLimit['count'] >= 5) {
            header('Content-Type: application/json; charset=utf-8');
            header('HTTP/1.1 429 Too Many Requests');
            echo json_encode(['msg' => 'Túl sok kérés érkezett. Kérjük, próbáld újra később.']);
            exit();
        } else {
            $rateLimit['count']++;
        }
    } else {
        $rateLimit = ['count' => 1, 'time' => time()];
    }

    $_SESSION[$rateLimitKey] = $rateLimit;

    if (!isset($body['token'])) {
        header('Content-Type: application/json; charset=utf-8');
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['msg' => 'Sikertelen captcha ellenőrzés! Kérlek frissítsd az oldalt és próbáld újra!']);
        exit();
    }

    $reCaptchaLib = new \ReCaptcha\ReCaptcha(RECAPTCHA_V3_SECRET);
    $captchaRes = $reCaptchaLib->verify($body['token'], $ip);

    if ($captchaRes->isSuccess() && $captchaRes->getScore() >= RECATCHA_THRESHOLD) {
        if (!isset($body['name']) || empty($body['name'])) {
            $errors['name'] = 'A mező kitöltése kötelező.';
        } else {
            $body['name'] = trim($body['name']);
            if (strlen($body['name']) > 100 || !preg_match('/^[\p{L}\s\'-]+$/u', $body['name'])) {
                $errors['name'] = 'A név csak betűket, szóközöket, aposztrófokat és kötőjeleket tartalmazhat.';
            }
        }

        if (!isset($body['email']) || empty($body['email'])) {
            $errors['email'] = 'A mező kitöltése kötelező.';
        } elseif (!filter_var($body['email'], FILTER_VALIDATE_EMAIL) || strpos($body['email'], '+') !== false) {
            $errors['email'] = 'Helytelen email cím!';
        } else {
            $stmt = $db->prepare("SELECT * FROM forbes_2024_selfmade_lista WHERE email = ?");
            $stmt->bind_param("s", $body['email']);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();

            if ($result->num_rows > 0) {
                $errors['email'] = 'Ezzel az email címmel már szavaztak!';
            }
        }

        if (!isset($body['competitor']) || empty($body['competitor'])) {
            $errors['competitor'] = 'A szavazás során hiba történt, kérlek vedd fel velünk a kapcsolatot! (Jelölt hiba)';
        } elseif (!in_array($body['competitor'], array_column($competitors, 'slug'))) {
            $errors['competitor'] = 'A szavazás során hiba történt, kérlek vedd fel velünk a kapcsolatot! (Jelölt hiba)';
        }

        if (isset($body['privacy_policy']) && $body['privacy_policy'] === 'on') {
            $privacy_policy_consent = true;
        } else {
            $errors['privacy_policy'] = 'Az adatvédelmi nyilatkozat elfogadása kötelező.';
        }

        $espresso_consent = isset($body['espresso']) && $body['espresso'] === 'on';

        if (count($errors) == 0) {
            $id = guidv4();

            $mg = Mailgun::create(
                '3697bf5d5f5040dcd74eb0c91a56353f-451410ff-24092eb0',
                'https://api.eu.mailgun.net'
            );

            try {
                $mg->messages()->send('forbes.hu', [
                    'from'    => 'noreply@forbes.hu',
                    'to'      => $body['email'],
                    'subject' => 'Forbes Selfmade lista szavazás érvényesítése - Kérjük erősítsd meg az e-mail címed!',
                    'text'    => 'Kedves ' . $body['name'] . '!' . PHP_EOL . PHP_EOL .
                        'A szavazatod érvényesítéséhez szükség van az e-mail címed hitelesítésére, kizárólag ebben az esetben lesz végleges a szavazatod. Kérjük kattints az alábbi linkre, ahol ellenőrizheted és megerősítheted az általad megadott e-mail címet:' . PHP_EOL .
                        SZAVAZAS_HOME_LINK . '/szavazas-ellenorzes.php?email=' . urlencode($body['email']) . '&key=' . urlencode($id) . PHP_EOL . PHP_EOL .
                        'Fontos: Amennyiben nem Te kezdeményezted a szavazást, kérjük hagyd figyelmen kívül ezt az e-mailt, és ne kattints a linkre!' . PHP_EOL . PHP_EOL .
                        'Üdvözlettel,' . PHP_EOL .
                        'A Forbes csapata',
                ]);
            } catch (Exception $e) {
                error_log('Email sending failed: ' . $e->getMessage());
                header('Content-Type: application/json; charset=utf-8');
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(['msg' => 'Sikertelen szavazás! Kérlek vedd fel velünk a kapcsolatot! (E-Mail hiba)']);
                exit();
            }

            $stmt = $db->prepare("INSERT INTO forbes_2024_selfmade_lista 
                (id, name, email, canditate, ip, user_agent, espresso_consent, privacy_policy_consent) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssii", $id, $name, $email, $canditate, $ip, $user_agent, $espresso_consent, $privacy_policy_consent);

            $name = $body['name'];
            $email = $body['email'];
            $canditate = $body['competitor'];
            $ip = get_user_ip();
            $user_agent = $_SERVER['HTTP_USER_AGENT'];

            $stmt->execute();
            $stmt->close();

            if ($db->errno) {
                error_log('Database error: ' . $db->error);
                header('Content-Type: application/json; charset=utf-8');
                header('HTTP/1.1 500 Internal Server Error');
                echo json_encode(['msg' => 'Sikertelen szavazás! Kérlek vedd fel velünk a kapcsolatot! (Adatbázis hiba)']);
                exit();
            } else {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['msg' => 'Sikeres beküldés. A szavazás érvényesítéséhez kérlek kattints az emailben kapott linkre!']);
            }
        } else {
            header('Content-Type: application/json; charset=utf-8');
            header('HTTP/1.1 400 Bad Request');
            echo json_encode($errors);
        }
    } else {
        header('Content-Type: application/json; charset=utf-8');
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['msg' => 'Sikertelen captcha ellenőrzés! Kérlek frissítsd az oldalt és próbáld újra!']);
    }

    exit();
} else {
    header('Content-Type: application/json; charset=utf-8');
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['msg' => 'A HTTP metódus nem engedélyezett.']);
    exit();
}

function guidv4($data = null)
{
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
