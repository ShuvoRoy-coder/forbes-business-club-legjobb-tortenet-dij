<?php

require_once('./components/base.php');

$title = 'Forbes Selfmade lista 2024';
$description = 'Tehetségesek, szorgalmasak, büszkék lehetünk rájuk: 25 kitartó ember Magyarországon, a Forbes összeállításában.';
$shareImage = ASSET_URL . '/assets/images/meta/szavazz.png';

if (isset($_GET['jelolt']) && !empty($_GET['jelolt'])) {
    $competitor = $competitors[array_search($_GET['jelolt'], array_column($competitors, 'slug'))];
    $title = $competitor['meta_title'];
    $description = $competitor['meta_description'];
    $shareImage = ASSET_URL . $competitor['meta_image'];
}

else if (isset($_GET['jelolt'])) {
    $competitor = $competitors[0] ?? null;

    if($competitor){
        $slug = $competitor['slug'];
        header('Location:'.SZAVAZAS_HOME_LINK.'/szavazas.php?jelolt='.$slug);
        die();
    }
}

?>
<!DOCTYPE html>
<html lang="hu">

<head>
    <?php require("./components/head-content.php"); ?>
</head>

<body>
    
    <div class="position-relative vh-100">
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

        <main id="szavazas-page" class="w-100 h-100 d-flex flex-column justify-content-between">
            <div>
                <?php require("./components/header.php"); ?>
                <?php require("./components/voting/competitors-details.php"); ?>
            </div>
            <?php require("./components/footer.php"); ?>
        </main>
        
    </div>


    <script>
        window.recaptchaPublic = "<?= RECAPTCHA_V3_PUBLIC ?>";
    </script>
    <script src="<?= ASSET_URL ?>/assets/build/js/app.4c35f529464b6fab1e3c65a5.js"></script>
    <style>
        .congratulations {
            font-size: 0.625rem;
        }

        @media (max-width: 768px) {
            .congratulations {
                font-size: 0.5rem;
            }
        }
    </style>
</body>

</html>
