<?php
require_once('./components/base.php');

$title = 'Forbes Selfmade lista 2024';
$description = 'Tehetségesek, szorgalmasak, büszkék lehetünk rájuk: 25 kitartó ember Magyarországon, a Forbes összeállításában.';
$shareImage = ASSET_URL . '/assets/images/meta/szavazz.png';
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
            <img src="./assets/images/background.png" alt="bg-image" class="w-100 h-100 img-fluid d-none d-md-block">
            <img src="./assets/images/mobile-background.png" alt="bg-image" class="w-100 h-100 img-fluid d-block d-md-none">
        </div>
        <!-- background image end-->

        <div class="gradient-line position-fixed top-0 left-0" 
            style="background: rgb(140,87,40); width: 100%; height: 14px; z-index: 10;
                background: linear-gradient(90deg, rgba(140,87,40,1) 0%, rgba(212,154,102,1) 60%, rgba(149,90,38,1) 93%);">
        </div>
        
        <!-- container start -->

        <main id="szavazas-home-page" class="container h-100 d-flex flex-column justify-content-between">

            <div class="d-flex flex-column align-items-center home-items">

                <div class="logos d-flex flex-column justify-content-center align-items-center">
                    <div class="forbes-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 110 29" fill="none">
                            <path d="M39.2738 27.7234C39.1721 27.7234 39.1721 27.5093 39.1721 27.0925V26.5631L39.4887 26.4617C39.5904 26.4617 39.907 26.3603 40.2236 26.3603C40.9585 26.2589 41.3881 25.8308 41.7047 24.986C41.9195 24.3551 42.0213 22.2485 42.0213 18.0241C42.0213 12.8647 41.9195 11.7044 41.3881 10.9609C41.0715 10.5441 40.8567 10.4315 40.2236 10.3301C39.907 10.2287 39.4887 10.2287 39.4887 10.2287C39.3869 10.2287 39.2738 10.1273 39.2738 9.81189C39.2738 9.53402 39.3454 9.35753 39.4887 9.28243C39.7035 9.18105 47.4257 7.59267 47.7422 7.59267H47.9571V8.75297C47.9571 9.38382 47.8553 10.3301 47.8553 10.7582V11.603L48.1719 11.0736C49.0199 9.49647 50.0713 8.43755 51.4507 7.8067C52.1856 7.49128 52.717 7.3899 53.565 7.3899C54.6278 7.3899 55.6793 7.70532 55.6793 8.12213C55.6793 8.33616 53.7798 13.3942 53.6667 13.3942C53.6667 13.3942 53.2484 13.2928 52.8188 13.0788C51.9708 12.662 51.2359 12.4479 50.3879 12.4479C49.4382 12.4479 48.3754 12.7633 47.9571 13.2928C47.8138 13.4355 47.7422 14.4531 47.7422 16.3456C47.7422 19.1957 47.7422 22.6654 47.9571 24.0397C48.0588 25.2 48.3754 25.8308 49.0199 26.0449C49.2347 26.1463 50.6027 26.3603 51.0324 26.3603V27.622H45.2096C41.9308 27.836 39.2851 27.7234 39.2851 27.7234M0.775909 27.7234C0.674152 27.7234 0.674148 27.5093 0.674148 27.1939C0.674148 26.7734 1.06233 26.4917 1.83869 26.349C2.78842 26.135 3.105 26.0336 3.53464 25.4028C4.38261 24.3438 4.48437 22.2373 4.48437 13.811C4.48437 5.38471 4.38261 4.11176 3.53464 2.95145C3.11631 2.42199 2.47185 2.10657 1.42037 2.00519L0.572395 1.9038V0.630847H22.5744V0.946269C22.5744 1.16031 22.6762 2.8388 22.6762 4.84399V8.42628L22.1448 8.64032C21.5795 8.78301 21.1913 8.53894 20.9802 7.90809C20.0305 5.4861 18.9677 4.11176 17.5997 3.37953C16.6499 2.85007 16.1185 2.85007 13.3711 2.85007H11.042V3.26688C10.9403 3.99911 10.8272 8.95574 10.8272 11.2764V13.597H11.5621C11.9804 13.597 12.7267 13.597 13.2581 13.4956C14.106 13.4956 14.3208 13.3942 14.7392 13.2815C15.5871 12.8647 16.2203 12.0198 16.5369 10.5441L16.7517 9.81189H18.018V19.1957H16.7517L16.5369 18.4635C16.2203 17.0891 15.5871 16.0415 14.7392 15.7261C14.3208 15.512 13.4729 15.512 11.6752 15.4106H10.8272V17.2018C10.8272 19.0943 10.929 21.7304 11.042 23.1047C11.2568 25.1099 11.7769 26.1575 12.6249 26.5856C12.8397 26.687 13.3598 26.7996 13.7894 26.901C14.2191 27.0024 14.7392 27.1151 14.8522 27.1151C15.0671 27.2164 15.0671 28.2754 14.8522 28.2754C14.7505 27.8586 0.990722 27.8586 0.787209 27.7459M99.1633 28.2754C97.7839 28.174 95.5679 27.6445 94.8216 27.3291L94.5051 27.2277V25.4366C94.5051 24.4903 94.4033 23.116 94.4033 22.4851V21.3248L94.6181 21.2234C94.7199 21.122 94.9347 21.122 95.1495 21.122H95.4661L95.7827 21.7529C96.8455 24.2875 98.1118 25.7633 99.6947 26.1801C100.328 26.3941 101.492 26.3941 101.911 26.1801C103.177 25.7633 103.923 24.8057 103.923 23.4426C103.923 21.8655 103.075 21.122 99.7964 19.8603C97.7839 19.1281 97.049 18.7 96.3028 17.8552C95.353 16.9089 94.9234 15.85 94.9234 14.4869C94.8216 12.6958 95.3417 11.22 96.6193 9.95834C97.8856 8.69665 99.4798 7.95315 101.594 7.85177C103.494 7.63773 106.456 8.0658 108.05 8.69665L108.367 8.79803V10.3751C108.367 11.22 108.468 12.3803 108.468 13.0112V14.0701L108.05 14.1715C107.628 14.3142 107.311 14.1039 107.1 13.5406C106.151 11.1186 105.088 9.95834 103.403 9.53026C102.34 9.31623 101.504 9.53026 100.859 10.1611C100.328 10.6906 100.226 11.1074 100.124 11.9523C100.124 12.7971 100.226 13.2139 100.757 13.8448C101.391 14.577 102.453 15.1065 104.455 15.9514C106.999 17.0103 108.152 17.8439 108.898 19.2182C109.316 20.0631 109.429 20.694 109.429 22.0683C109.429 23.0146 109.328 23.2286 109.113 23.8595C108.378 25.966 106.784 27.4417 104.251 28.0726C103.403 28.2866 103.301 28.2866 101.605 28.2866C100.339 28.2866 99.3894 28.2866 99.1746 28.2866L99.1633 28.2754ZM86.048 15.5233H87.4273V14.577C87.2125 11.2088 86.4776 9.30496 85.0982 9.30496C83.6171 9.30496 82.4526 11.1975 81.9212 14.363C81.8194 14.7798 81.8194 15.2079 81.8194 15.4219V15.7373H83.3005C84.0354 15.5233 85.313 15.5233 86.048 15.5233ZM83.6171 28.174C79.7051 27.4417 76.9577 24.6931 76.1097 20.694C76.008 20.1645 75.8949 19.635 75.8949 18.486C75.8949 16.6949 75.9967 15.6359 76.4263 14.2729C77.2743 11.6368 78.8572 9.7443 81.1863 8.68538C83.6171 7.52508 86.8959 7.42369 89.0102 8.47134C91.4411 9.63165 92.8204 12.0536 93.2388 15.5346C93.2388 15.9514 93.3405 16.5935 93.3405 16.7962V17.2131H81.7063V17.8439C81.7063 19.421 82.1247 20.7953 82.7691 22.057C83.0857 22.5865 83.3005 22.9019 83.8319 23.4314C85.0982 24.6931 86.3758 25.2225 88.2753 25.2225C89.6547 25.2225 90.7062 24.9071 91.769 24.2763C92.0855 24.0622 92.4021 23.9608 92.4021 23.9608C92.6169 23.9608 92.9335 24.4903 92.9335 24.6931C92.9335 25.0085 91.7689 26.1688 90.7175 26.901C89.8695 27.5319 88.3884 28.0613 87.2238 28.2754C86.3758 28.2754 84.4764 28.2754 83.6284 28.174M64.272 26.6983C64.8034 26.5969 65.3348 26.3828 65.7532 25.966C66.9177 24.9071 67.8674 22.6991 68.184 19.9617C68.2858 18.9028 68.2858 16.3794 68.184 15.4332C67.7657 12.8985 66.8046 11.3214 65.5383 10.5892C65.0069 10.2738 64.9052 10.2738 64.272 10.2738C63.8537 10.2738 63.4241 10.2738 63.0057 10.3751L62.4743 10.4765V13.3266C62.4743 17.0103 62.5761 26.0787 62.6892 26.2927C62.757 26.4354 62.8964 26.5067 63.1075 26.5067C63.7406 26.7208 63.9555 26.7208 64.272 26.7208M61.208 28.1965C60.4731 28.0951 58.031 27.7797 57.2961 27.5657L56.7647 27.4643V24.4114C56.8664 17.1342 56.8664 13.1351 56.7647 9.23737C56.6629 5.44104 56.6629 5.02423 56.5498 4.49477C56.335 3.76254 56.1315 3.33447 55.8149 3.01904C55.7132 2.91766 55.3966 2.80501 55.08 2.70362C54.4469 2.56093 54.1303 2.35065 54.1303 2.07278C54.1303 1.85874 54.1303 1.65597 54.232 1.65597C54.3338 1.55458 62.2708 0.0788574 62.5874 0.0788574C62.6892 0.0788574 62.6892 1.13778 62.5874 4.60742V9.13599C62.5874 9.13599 62.904 9.0346 63.2206 8.82056C64.2834 8.40376 65.12 8.18972 66.4994 8.08833C67.3474 8.08833 67.7657 8.08833 68.2971 8.18972C71.2593 8.82056 73.4754 11.2426 74.3233 14.8249C74.5382 15.7711 74.6399 18.0917 74.4251 19.252C74.3233 20.1983 74.0068 21.5726 73.6902 22.4175C72.4239 25.6844 69.6651 27.791 65.968 28.3204C65.0183 28.3204 62.3726 28.3204 61.208 28.219V28.1965ZM30.5341 26.7208C31.0655 26.5067 31.8004 25.8759 32.117 25.2451C32.8519 23.7693 33.1797 21.6628 33.1797 18.3959C33.1797 14.1827 32.5466 11.5467 31.1672 10.071C30.5341 9.44014 30.2175 9.33876 29.3695 9.33876C27.6736 9.33876 26.6221 11.0285 26.1924 14.4982C25.9776 16.0753 25.9776 19.7702 26.1924 21.1333C26.8256 25.3464 28.4085 27.3516 30.5341 26.7208ZM27.6736 28.1965C25.7741 27.8811 24.0782 27.1376 22.9136 25.8759C21.8508 24.817 21.2177 23.6679 20.6976 22.0796C19.9627 19.6576 19.9627 16.4921 20.6976 14.0701C21.4325 11.7495 23.1284 9.7443 25.2427 8.69665C28.1032 7.22092 32.23 7.32231 34.9774 8.91068C37.4083 10.285 38.8894 12.8084 39.3191 16.2893C39.4208 17.3482 39.3191 19.5562 39.2173 20.5025C38.3693 24.2988 36.0402 26.9348 32.6596 27.8811C32.3431 27.9825 31.7099 28.0951 31.3933 28.1965C30.5454 28.2979 28.4311 28.2979 27.6962 28.1965" fill="white"/>
                        </svg>
                    </div>

                    <div class="business-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 297 83" fill="none">
                            <path d="M35.9957 24.2777C35.9957 29.8652 31.2018 32.9293 23.604 32.9293H0.053009V1.38702H21.8063C29.4041 1.38702 34.198 4.36101 34.198 9.45282C34.198 13.0577 31.8463 16.1218 27.1429 16.4372C32.1177 16.7075 36.007 19.276 36.007 24.2777H35.9957ZM7.19859 14.1842H20.6305C24.5651 14.1842 27.0072 13.5533 27.0072 10.6244C27.0072 7.69547 24.5651 7.06463 20.6305 7.06463H7.19859V14.1842ZM28.5901 23.4666C28.5901 20.2673 26.1932 19.6815 22.1229 19.6815H7.19859V27.2517H22.1229C26.1932 27.2517 28.5901 26.6208 28.5901 23.4666Z" fill="white"/>
                            <path d="M77.2863 1.38702V18.0593C77.2863 27.522 71 33.9206 59.5128 33.9206C48.0256 33.9206 41.7393 27.522 41.7393 18.0593V1.38702H48.9753V17.5186C48.9753 23.8271 52.6838 27.6121 59.5128 27.6121C66.3418 27.6121 70.0503 23.8271 70.0503 17.5186V1.38702H77.2863Z" fill="white"/>
                            <path d="M118.803 23.3765C118.803 29.5948 112.878 33.9206 101.663 33.9206C93.6578 33.9206 87.1454 31.6676 82.3063 27.5671L86.467 22.6555C90.3564 26.2153 95.3764 27.8825 101.844 27.8825C108.311 27.8825 111.522 26.6659 111.522 24.0524C111.522 21.4389 108.266 20.7179 100.984 20.0871C91.9392 19.321 83.5274 17.3384 83.5274 10.5793C83.5274 3.82028 90.5825 0.395691 100.351 0.395691C107.271 0.395691 113.24 2.10798 117.265 5.21714L113.286 10.2188C109.803 7.56028 105.507 6.47884 100.351 6.43378C96.0547 6.38872 90.8086 7.15474 90.8086 10.0386C90.8086 12.7422 95.3311 13.0126 101.617 13.5082C111.703 14.3193 118.803 16.4372 118.803 23.3765Z" fill="white"/>
                            <path d="M124.694 32.9293V1.38702H131.93V32.9293H124.694Z" fill="white"/>
                            <path d="M176.465 1.38702V32.9293H170.134L147.431 10.1287V32.9293H140.421V1.38702H148.109L169.455 23.016V1.38702H176.465Z" fill="white"/>
                            <path d="M217.575 26.8912V32.9293H184.967V1.38702H217.123V7.42511H192.158V13.9138H213.007V19.9519H192.158V26.8912H217.575Z" fill="white"/>
                            <path d="M257.418 23.3765C257.418 29.5948 251.494 33.9206 240.278 33.9206C232.273 33.9206 225.761 31.6676 220.921 27.5671L225.082 22.6555C228.972 26.2153 233.992 27.8825 240.459 27.8825C246.926 27.8825 250.137 26.6659 250.137 24.0524C250.137 21.4389 246.881 20.7179 239.599 20.0871C230.554 19.321 222.143 17.3384 222.143 10.5793C222.143 3.82028 229.198 0.395691 238.966 0.395691C245.886 0.395691 251.855 2.10798 255.88 5.21714L251.901 10.2188C248.418 7.56028 244.122 6.47884 238.966 6.43378C234.67 6.38872 229.424 7.15474 229.424 10.0386C229.424 12.7422 233.946 13.0126 240.233 13.5082C250.318 14.3193 257.418 16.4372 257.418 23.3765Z" fill="white"/>
                            <path d="M296.9 23.3765C296.9 29.5948 290.975 33.9206 279.759 33.9206C271.755 33.9206 265.242 31.6676 260.403 27.5671L264.564 22.6555C268.453 26.2153 273.473 27.8825 279.94 27.8825C286.407 27.8825 289.618 26.6659 289.618 24.0524C289.618 21.4389 286.362 20.7179 279.081 20.0871C270.036 19.321 261.624 17.3384 261.624 10.5793C261.624 3.82028 268.679 0.395691 278.448 0.395691C285.367 0.395691 291.337 2.10798 295.362 5.21714L291.382 10.2188C287.9 7.56028 283.604 6.47884 278.448 6.43378C274.151 6.38872 268.905 7.15474 268.905 10.0386C268.905 12.7422 273.428 13.0126 279.714 13.5082C289.799 14.3193 296.9 16.4372 296.9 23.3765Z" fill="white"/>
                            <path d="M100.396 71.0052L106.999 74.2947C104.014 78.7556 97.909 82.3605 89.6328 82.3605C77.7385 82.3605 70.005 76.0971 70.005 65.598C70.005 55.099 77.7385 48.8356 89.9493 48.8356C97.909 48.8356 104.014 52.4855 106.909 56.8563L100.261 60.1457C97.9994 56.631 94.5623 55.0539 89.8589 55.0539C82.3515 55.0539 77.3767 58.6587 77.3767 65.598C77.3767 72.5373 82.3515 76.1421 89.8589 76.1421C94.5623 76.1421 98.0446 74.6101 100.396 71.0052Z" fill="white"/>
                            <path d="M142.049 75.1508V81.3691H112.426V49.8269H119.662V75.1508H142.049Z" fill="white"/>
                            <path d="M180.626 49.8269V66.4992C180.626 75.9619 174.34 82.3605 162.852 82.3605C151.365 82.3605 145.079 75.9619 145.079 66.4992V49.8269H152.315V65.9585C152.315 72.2669 156.023 76.052 162.852 76.052C169.681 76.052 173.39 72.2669 173.39 65.9585V49.8269H180.626Z" fill="white"/>
                            <path d="M224.494 72.7176C224.494 78.305 219.7 81.3691 212.103 81.3691H188.54V49.8269H210.294C217.891 49.8269 222.685 52.8009 222.685 57.8927C222.685 61.4975 220.334 64.5616 215.63 64.8771C220.605 65.1474 224.494 67.7159 224.494 72.7176ZM195.686 62.624H209.118C213.052 62.624 215.494 61.9932 215.494 59.0643C215.494 56.1353 213.052 55.5045 209.118 55.5045H195.686V62.624ZM217.077 71.9065C217.077 68.7072 214.68 68.1214 210.61 68.1214H195.686V75.6915H210.61C214.68 75.6915 217.077 75.0607 217.077 71.9065Z" fill="white"/>
                        </svg>
                    </div>
                </div>

                <h1 class="heading text-white ff-playfair-display text-center">
                    A legjobb történet díj
                </h1>

                <div class="d-flex flex-column justify-content-between align-items-center">
                    
                    <div class="next-button-area text-center">
                        <!-- mobile next-button -->
                        <a href="<?= SZAVAZAS_HOME_LINK ?>/szavazas.php" class="next-button d-inline-block d-lg-none">
                            <span>
                                Belépés a szavazáshoz
                            </span>
                            <span class="next-icon">
                                <svg width="30px" height="15px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                    <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                    <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                                    </g>
                                </svg>
                            </span> 
                        </a>
                        <!-- desktop next-button -->
                        <a href="<?= SZAVAZAS_HOME_LINK ?>/szavazas.php?jelolt=" class="next-button d-none d-lg-inline-block">
                            <span>
                                Belépés a szavazáshoz
                            </span>
                            <span class="next-icon">
                                <svg width="30px" height="15px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                    <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                    <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                                    </g>
                                </svg>
                            </span> 
                        </a>
                    </div>

                    <a class="text-center modzertan"
                        onclick="e.preventDefault()" data-bs-toggle="modal"
                        data-bs-target="#voting-modal"
                    >
                        Módszertan
                    </a>
                    
                    <p class="text-center paragraph text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>

            <?php require("./components/footer.php"); ?>
                
        </main>
        <!-- container end -->
        <script src="<?= ASSET_URL ?>/assets/build/js/app.4c35f529464b6fab1e3c65a5.js?v=2.0"></script>
    </div>

    <div class="modal fade" id="voting-modal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content pb-9 pb-lg-13" style="background-color: #242424; border-radius: 30px;">
                <div class="text-end px-5 py-5">
                    <button type="button" class="btn" data-bs-dismiss="modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                            <path d="M10.6493 9.06596L17.6583 2.04395C18.1144 1.5872 18.1144 0.848695 17.6583 0.391942C17.2024 -0.0648107 16.4652 -0.0648107 16.0093 0.391942L9.00008 7.41395L1.9911 0.391942C1.53496 -0.0648107 0.798019 -0.0648107 0.3421 0.391942C-0.114033 0.848695 -0.114033 1.5872 0.3421 2.04395L7.35108 9.06596L0.3421 16.088C-0.114033 16.5447 -0.114033 17.2832 0.3421 17.74C0.569312 17.9678 0.868062 18.0823 1.1666 18.0823C1.46513 18.0823 1.76367 17.9678 1.9911 17.74L9.00008 10.718L16.0093 17.74C16.2367 17.9678 16.5352 18.0823 16.8338 18.0823C17.1323 18.0823 17.4308 17.9678 17.6583 17.74C18.1144 17.2832 18.1144 16.5447 17.6583 16.088L10.6493 9.06596Z" fill="#7A7A7A"/>
                        </svg>
                    </button>
                </div>
                <h2 class="text-center fs-8 fs-lg-13 mb-9 text-white fw-bold ff-playfair-display">
                    A módszertan
                </h2>
                <div class="modal-body ff-playfair-display">
                    <div class="row justify-content-center px-5">
                        <p class="fs-4" style="color: #f5b277; margin-top: 24px; max-width: 720px;">
                            <b class="fw-bold">Hogyan készült?</b><br><br>
                            Sokszínűen, vállaltan szubjektíven, úgy, hogy tudjuk: sokan mások is befértek
                            volna ebbe az összeállításba. Büszkék vagyunk rá, hogy sokukról mi írtunk a
                            magyar sajtóban először, mi fedeztük fel és mutathattuk be őket, de többen vannak
                            olyanok is, akikről még soha nem írtunk.<br><br><br>
                            <b class="fw-bold">Ki selfmade és kitartó?</b><br><br>
                            Definíciónk szerint selfmade az, aki önerőből jutott nulláról oda, ahol ma tart,
                            teljesítményének alapja az erőfeszítés. Volt egy jó ötlete, egyedi üzleti terve,
                            átlagon felüli elszántsága, kitartása, karizmája, és végigvitte, amit elképzelt,
                            sokszor a fősodorral szemben. A maga területén műfajt teremtett, új minőséget
                            hozott létre, és nem politikai kapcsolatokból lett valaki. Életútja tiszta, nincs benne
                            megalkuvás, törés. A maga erejéből teremtett üzletet vagy - ha nem üzleti területen
                            mozog - márkát a nevéből, és vívott ki akár nemzetközi érvényesülést is.
                            Munkájáért jogosan kap pénzt, népszerűséget vagy a társadalmi hasznosságot
                            elismerő megbecsülést.<br><br>
                            A lista szereplőit többek között összeköti az, hogy mindannyian kitartó és
                            tehetséges emberek.<br><br>
                            Miért pont ők? Ők miért nem?<br><br>
                            Művészek, tudósok, vállalkozók, sportolók. Nem mind üzleti sztár vagy épp
                            celebritás, néhányukat a nagy nyilvánosság kevéssé ismeri. De mind mögött ott
                            van a wow! faktor.
                        </p>
                        <h2 class="text-center fs-8 fs-lg-13 mt-15 mb-9"
                            style="color: #f5b277;">
                            Fotók
                        </h2>
                        <p class="fs-4" style="color: #f5b277; margin-top: 24px; max-width: 720px;">
                            A Forbes archív képei, az érintett cégeik hivatalos oldalán található életrajzi vagy
                            egyéb fotók, MTI Fotóbank, LinkedIn-profilfotók, közszereplői Facebook-oldalak.
                            <br><br>
                            Összeállította: Bagi László
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</body>

</html>