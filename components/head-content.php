<?php
$fonts = ['JohnnieWalkerSans-Book.54bb0e40', 'JohnnieWalkerSans-Bold.3bcd7b57'];
?>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>
    <?= $title ?>
</title>
<meta name="description" content="<?= $description ?>" />
<meta property="og:url" content="<?= get_current_url(); ?>" />
<meta property="og:type" content="article" />
<meta property="og:title" content="<?= $title ?>" />
<meta property="og:description" content="<?= $description ?>" />
<meta property="og:image" content="<?= $shareImage ?>" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="628" />
<meta property="og:locale" content="hu_HU" />

<meta name="twitter:site" content="<?= get_current_url(); ?>">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= $title ?>">
<meta name="twitter:description" content="<?= $description ?>">
<meta name="twitter:image" content="<?= $shareImage ?>">

<!-- font-family: "Syncopate", sans-serif;
font-family: "Montserrat", sans-serif;
font-family: "Playfair Display", serif; -->

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Syncopate:wght@400;700&display=swap" rel="stylesheet">

<?php foreach ($fonts as $font): ?>
<link rel="preload" href="<?= ASSET_URL ?>/assets/fonts/<?= $font; ?>.ttf" as="font" type="font/ttf" crossOrigin="" />
<?php endforeach; ?>

<link rel="stylesheet" href="<?= ASSET_URL ?>/assets/build/styles/app.4c35f529464b6fab1e3c65a5.css">
<link rel="stylesheet" href="<?= ASSET_URL ?>/assets/src/styles/style.css">

<script src="https://www.google.com/recaptcha/api.js?render=<?= RECAPTCHA_V3_PUBLIC ?>"></script>


<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-44722268-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-44722268-1');
</script>
<!-- Facebook Pixel Code -->
<script>
    ! function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window,
        document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '276558822514857');
    fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=276558822514857&ev=PageView&noscript=1" /></noscript>
<!-- DO NOT MODIFY -->
<!-- End Facebook Pixel Code -->
<!-- (C)2000-2019 Gemius SA - gemiusPrism  / https://forbes.hu/Magazin + rovatoldal -->
<script type="text/javascript">
    var pp_gemius_identifier = '.Xo64etTp8t6lPAFeINGA.U2rjvRGAMIPafaVcPMWEn.s7';

    function gemius_pending(i) {
        window[i] = window[i] || function () {
            var x = window[i + '_pdata'] = window[i + '_pdata'] || [];
            x[x.length] = arguments;
        };
    };
    gemius_pending('gemius_hit');
    gemius_pending('gemius_event');
    gemius_pending('pp_gemius_hit');
    gemius_pending('pp_gemius_event');
    (function (d, t) {
        try {
            var gt = d.createElement(t),
                s = d.getElementsByTagName(t)[0],
                l = 'http' + ((location.protocol == 'https:') ? 's' : '');
            gt.setAttribute('async', 'async');
            gt.setAttribute('defer', 'defer');
            gt.src = l + '://gthu.hit.gemius.pl/xgemius.js';
            s.parentNode.insertBefore(gt, s);
        } catch (e) { }
    })(document, 'script');
</script>

<link rel="apple-touch-icon" sizes="180x180"
    href="https://forbes.hu/wp-content/themes/Forbes/img/apple-touch-icon.png" />
<link rel="icon" type="image/png" href="https://forbes.hu/wp-content/themes/frontend/assets/icons/favicon-32x32.png"
    sizes="32x32">
<link rel="icon" type="image/png" href="https://forbes.hu/wp-content/themes/frontend/assets/icons/favicon-16x16.png"
    sizes="16x16">
