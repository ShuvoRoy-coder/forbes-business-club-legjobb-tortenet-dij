<?php
require_once('./components/base.php');

// This page is disabled now. 404
//http_response_code(404);
//exit();

if (!isset($_GET['email']) || !isset($_GET['key']) || empty($_GET['email']) || empty($_GET['key'])) {
    header('HTTP/1.1 400 Bad Request');
    exit();
}

require_once('./components/base.php');
require_once('./db.php');

$email = urldecode($_GET['email']);
$key = urldecode($_GET['key']);

$stmt = $db->prepare("SELECT * FROM forbes_2024_selfmade_lista WHERE email = ? AND id = ?");
$stmt->bind_param("ss", $email, $key);
$stmt->execute();

$result = $stmt->get_result();
$stmt->close();

// check if there is a record with the given email and key
if ($result->num_rows === 0) {
    header('HTTP/1.1 404 Not Found');
    exit();
}

$result = $result->fetch_assoc();

$title = 'Forbes Selfmade lista 2024';
$description = 'Tehetségesek, szorgalmasak, büszkék lehetünk rájuk: 25 kitartó ember Magyarországon, a Forbes összeállításában.';
$msg = 'Korábban már megerősítetted a szavazatodat.';
// check if the record is already verified
if ($result['email_verified_at'] === null) {
    // update the record with the verification data
    $stmt = $db->prepare("UPDATE forbes_2024_selfmade_lista SET email_verified_at = ?, verification_ip = ?, verification_user_agent = ? WHERE email = ? AND id = ?");
    $stmt->bind_param("sssss", $email_verified_at, $ip, $user_agent, $email, $key);

    $email_verified_at = date('Y-m-d H:i:s');
    $ip = get_user_ip();
    $user_agent = $_SERVER['HTTP_USER_AGENT'];

    $stmt->execute();
    $stmt->close();
    $title = "Köszönjük szépen!";
    $msg = 'Sikeresen megerősítetted a szavazatodat!';
}
?>
<!DOCTYPE html>
<html lang="hu">

<head>
    <?php require("./components/head-content.php"); ?>
</head>

<body>
    <main id="szavazas-home-page" class="position-relative vh-100">
        <!-- background image start-->
        <div class="w-100 h-100 position-fixed top-0; left-0;" style="z-index: -2;">
            <img src="./assets/images/szavazas-background.png" alt="bg-image" class="w-100 h-100 img-fluid d-none d-md-block">
            <img src="./assets/images/mobile-background.png" alt="bg-image" class="w-100 h-100 img-fluid d-block d-md-none">
        </div>
        <!-- background image end-->

        <div class="gradient-line position-fixed top-0 left-0"
            style="background: rgb(140,87,40); width: 100%; height: 14px; z-index: 10;
                background: linear-gradient(90deg, rgba(140,87,40,1) 0%, rgba(212,154,102,1) 60%, rgba(149,90,38,1) 93%);">
        </div>

        <div>
            <?php require("./components/header.php"); ?>
        </div>

        <section>
            <div class="content-with-button__component overflow-hidden">
                <div class="container gx-11 my-11">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="text-center mb-7 ff-playfair-display" style="color: #B67F4D">
                                <?= $title ?>
                            </h2>
                            <div class="row justify-content-center">
                                <div class="col-md-9 col-lg-7">
                                    <p class="text-center text-white">
                                        <?= $msg ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <?php require("./components/footer.php"); ?>
    </main>
    <script src="<?= ASSET_URL ?>/assets/build/js/app.4c35f529464b6fab1e3c65a5.js"></script>
</body>

</html>
