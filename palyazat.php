<?php
require_once('./components/base.php');

$title = 'Forbes10 - Ki legyen a 10 éves Forbes címlapján?';
$description = 'Szavazz és támogasd a jelöltet, aki szerinted a leginkább méltó rá!';
$shareImage = ASSET_URL . '/assets/images/meta/szavazz.png';
?>

<!DOCTYPE html>
<html lang="hu">

<head>
    <?php require("./components/head-content.php"); ?>
</head>

<body>
    <main id="palyazat-page" class="position-relative vh-100">
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

        <?php require("./components/covers.php"); ?>
        <?php require("./components/intro.php"); ?>
        <?php require("./components/divider.php"); ?>
        <?php require("./components/boxes.php"); ?>
        <?php require("./components/divider.php"); ?>
        <?php require("./components/roadmap.php"); ?>
        <?php require("./components/divider.php"); ?>
        <?php require("./components/footer.php"); ?>
    </main>
    <script>
        window.recaptchaPublic = "<?= RECAPTCHA_V3_PUBLIC ?>";
    </script>
    <script src="<?= ASSET_URL ?>/assets/build/js/app.4c35f529464b6fab1e3c65a5.js"></script>
</body>

</html>