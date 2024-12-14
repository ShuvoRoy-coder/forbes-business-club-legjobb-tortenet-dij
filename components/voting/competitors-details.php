<?php

$selectedIndex = 0;

if (isset($_GET['order'])) {
    $collator = new Collator('hu_HU'); // Magyar lokalizáció

    uasort($competitors, function ($a, $b) use ($collator) {
        $comparison = $collator->compare($a['name'], $b['name']);
        return $_GET['order'] == 'name-asc' ? $comparison : -$comparison;
    });
} 
// else {
//     shuffle($competitors);
// }

if (isset($_GET['jelolt'])) {
    $selectedIndex = array_search($_GET['jelolt'], array_column($competitors, 'slug'));
}

?>
<section>
    <div class="competitors-details__component overflow-hidden">

        <div class="d-lg-none position-absolute left-0 list-view-button <?= !isset($_GET['jelolt']) ? ' d-none' : '' ?>" style="top: 170px;">
            <?php require('./components/view-selector.php'); ?>
        </div>

        <div id="details-view" class="container<?= !isset($_GET['jelolt']) ? ' d-none' : '' ?>">
            <div class="row justify-content-center pb-11 pb-md-15">
                <div class="col">

                    <div class="row justify-content-center gx-lg-19 gy-12 position-relative">

                        <!-- arrow button -->
                         <div class="col-1 p-0 position-relative">
                             <button class="btn prev-item-mobile-arrow bg-transparent border-0 w-100 p-0 position-absolute" type="button" style="z-index: 30;">
                                 <?php require('./components/arrow-left.php'); ?>
                             </button>
                         </div>

                        <div class="col-10">
                            <div class="row gy-md-12 position-relative">
                                <div class="col-12 col-md-6 col-lg-4 d-flex align-self-start justify-content-center">
                                    <div class="picture-box-items p-2 p-md-4">
                                        <div class="img-container overflow-hidden">
                                            <img src="<?= ASSET_URL . $competitors[$selectedIndex]['image']; ?>"
                                                alt="Jelölt arcképe">
                                        </div>
                                        <button type="button" class="btn vote-button w-100" style="margin-top: 9px;" data-bs-toggle="modal"
                                            data-bs-target="#voting-modal">
                                            <span>
                                                Szavazok
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
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-8">
                                    <h2 class="fs-10 fs-lg-12 ff-playfair-display fw-bold text-center text-md-start mb-2 mt-5 mt-lg-0"
                                        style="color: #B67F4D;">
                                        <?= $competitors[$selectedIndex]['name'] ?>
                                    </h2>
                                    <p class="subtitle ff-syncopate fs-4 mt-4 pe-2 text-uppercase text-center text-md-start mx-auto mx-md-0" style="color: #B67F4D; max-width: 300px;">
                                        <?= $competitors[$selectedIndex]['subtitle'] ?>
                                    </p>
                                    <p class="description fs-4 mt-4 pe-2" style="color: #B67F4D;">
                                        <?= $competitors[$selectedIndex]['description'] ?>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- arrow button -->
                         <div class="col-1 p-0 position-relative">
                             <button class="btn next-item-mobile-arrow bg-transparent border-0 w-100 p-0 position-absolute" type="button" style="z-index: 30;">
                                 <?php require('./components/arrow-right.php'); ?>
                             </button>
                         </div>

                    </div>

                </div>
            </div>

            <?php if (count($competitors) > 1): ?>
                <div class="slider row d-none d-lg-flex justify-content-center">
                    <div class="col">
                        <div class="row justify-content-center gx-7">

                            <!-- don't remove them -->
                            <div class="arrow-box d-none"></div>
                            <div class="arrow-box d-none"></div>

                            <div class="col-auto">
                                <div class="row flex-nowrap items">
                                    <?php foreach ($competitors as $i => $competitor): ?>
                                        <div class="col-auto" <?php if (isset($competitor['order'])): ?> style="order:
                                    <?= $competitor['order'] ?>;"
                                            <?php endif; ?>>
                                            <button id="<?= $competitor['slug'] ?>" data-index="<?= $i ?>"
                                                data-name="<?= htmlspecialchars($competitor['name']) ?>"
                                                data-subtitle="<?= htmlspecialchars($competitor['subtitle']) ?>"
                                                data-description="<?= htmlspecialchars($competitor['description']) ?>"
                                                type="button"
                                                class="pic-container position-relative bg-transparent p-0<?= $selectedIndex == $i ? ' active' : '' ?>">
                                                <img src="<?= ASSET_URL . $competitor['image']; ?>" class="w-100 h-100"
                                                    alt="<?= $competitor['name'] ?>">
                                                <p class="position-absolute fs-3 pt-2 w-100 text-center competitor-name">
                                                    <?= $competitor['name'] ?>
                                                </p>
                                            </button>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            <?php endif ?>

        </div>

        <div id="list-view" class="container py-11 py-md-15 py-lg-17<?= isset($_GET['jelolt']) ? ' d-none' : '' ?>">
            <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 justify-content-center text-center gx-4 gx-md-9 gy-7 gy-md-11">
                <?php
                foreach ($competitors as $competitor):
                ?>
                    <div class="competitor-item col">
                        <a class="d-flex flex-column list-item p-md-4 text-decoration-none"
                            selected-id="<?= htmlspecialchars($competitor['slug']) ?>" onClick="window.scrollTo(0, 0)"
                            href="?jelolt=<?= htmlspecialchars($competitor['slug']) ?>"
                            data-name="<?= htmlspecialchars($competitor['name']) ?>">
                            <div class="list-item-image position-relative">
                                <img src="<?= ASSET_URL . $competitor['image']; ?>"
                                    alt="<?= htmlspecialchars($competitor['name']) ?>">
                            </div>
                            <p class="text-center mt-8 mb-8 ff-playfair-display fw-bold fs-7" style="color: white;">
                                <?= htmlspecialchars($competitor['name']) ?>
                            </p>
                        </a>
                    </div>
                <?php
                endforeach;
                ?>
            </div>
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
                    
                    <h2 class="text-center text-white ff-playfair-display fs-8 fs-lg-13 mb-9">Regisztráció a szavazáshoz</h2>

                    <div class="modal-body ff-playfair-display">
                        <div class="row justify-content-center px-5">
                            <div class="col-lg-9">
                                <div class="text-center mb-4 mb-lg-8 ff-playfair-display px-8" style="color: #B67F4D; max-width: 499px; margin: 0 auto;">
                                    Ahhoz, hogy érvényesen szavazhass, kérjük add meg a neved és az email-címed!
                                </div>
                                <form action="<?= ASSET_URL ?>/registration-to-voting.php" method="post">
                                    <div>
                                        <label class="form-label d-inline-block position-relative px-2 mb-0 ms-9"
                                            style="color: #B67F4D; background-color: #242424;">
                                            Név
                                        </label>
                                        <input name="name" type="text" class="form-control p-7 bg-transparent" style="border-color: #B67F4D;"
                                            autocomplete="off" required>
                                        <p class="error-message fs-4 text-danger mt-3 d-none" data-related="name"></p>
                                    </div>
                                    
                                    <div>
                                        <label class="form-label d-inline-block position-relative px-2 mb-0 ms-9"
                                            style="color: #B67F4D; background-color: #242424;">
                                            E-mail
                                        </label>
                                        <input name="email" type="email" class="form-control p-7 bg-transparent" style="border-color: #B67F4D;"
                                            autocomplete="off" required>
                                        <p class="error-message fs-4 text-danger mt-3 d-none" data-related="email"></p>
                                    </div>
    
                                    <div style="margin-bottom: 28px;">
                                        <label class="form-label d-inline-block position-relative px-2 mb-0 ms-9"
                                            style="color: #B67F4D; background-color: #242424;">
                                            Cégnév
                                        </label>
                                        <input name="cegnev" type="text" class="form-control p-7 bg-transparent" style="border-color: #B67F4D;"
                                            autocomplete="off" required>
                                        <p class="error-message fs-4 text-danger mt-3 d-none" data-related="cegnev"></p>
                                    </div>
                                    
    
                                    <div class="form-check mb-3">
                                        <input name="espresso" class="form-check-input mt-0" type="checkbox"
                                            id="espressoCheckbox" autocomplete="off">
                                        <label class="form-check-label fs-3 text-white" for="espressoCheckbox">
                                            Hozzájárulok, hogy regisztrációmmal Feliratkozom a Forbes Espresso heti hírlevelére
                                        </label>
                                    </div>

                                    <div class="form-check mb-3">
                                        <input name="forbes_clubb" class="form-check-input mt-0" type="checkbox"
                                            id="forbesClubb" autocomplete="off">
                                        <label class="form-check-label fs-3 text-white" for="forbesClubb">
                                            Szeretnék többet tudni a Forbes Business Clubhoz
                                        </label>
                                    </div>

                                    <div class="form-check mb-8 mb-lg-11">
                                        <input name="privacy_policy" class="form-check-input mt-0" type="checkbox" required
                                            id="privacyCheckbox" autocomplete="off">
                                        <label class="form-check-label fs-3 text-white" for="privacyCheckbox">
                                            Elfogadom az adatvédelmi és az adatkezelési nyilatkozatot.
                                        </label>
                                    </div>

                                    <p class="success-message d-none text-center mt-n3 mb-5"></p>
                                    <p class="error-msg d-none text-center text-danger mt-n3 mb-5"></p>

                                    <button type="submit"
                                        class="btn vote-button d-flex justify-content-center align-items-center text-white fw-semibold py-8 w-100 ff-playfair-display" disabled>
                                        <div class="spinner-border me-4 d-none" role="status"></div>
                                        <span>
                                            Szavazok
                                        </span>
                                        <span class="next-icon" style="left: 40%;">
                                            <svg width="30px" height="15px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                                <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                                <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                                                </g>
                                            </svg>
                                        </span> 
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style>

        .prev-item-mobile-arrow,
        .next-item-mobile-arrow {
            top: 169px;
        }

        .description {
            max-height: 180px;
            overflow-y: auto;
            scrollbar-color: #B67F4D transparent;
            scrollbar-width: thin;
            font-family: "Playfair Display", serif !important;
        }

        .picture-box-items {
            background-color: #242424;
            border-radius: 16px;
        }

        .picture-box-items .img-container img {
            object-fit: cover;
            width: 230px;
            height: 230px;
            border-radius: 7px;
        }

        .pic-container.active {
            border: 2px solid #B67F4D !important;
            border-radius: 21px !important;
            padding: 2px !important;
        }

        .competitors-details__component .competitor-name {
            color: white;
            font-family: "Playfair Display", serif;
            font-weight: bold;
            text-align: center;
        }

        .pic-container.active img {
            border: 2px solid transparent !important;
            border-radius: 18px !important;
        }

        .competitors-details__component #voting-modal form input, .competitors-details__component #voting-modal form textarea {
            border-width: 2px;
            border-color: #B67F4D;
        }

        .competitors-details__component #voting-modal form .form-check input:checked {
            background-color: #B67F4D;
            border-color: #B67F4D;
        }


        @media (min-width: 768px) and (max-width: 991.80px){
            
            .description {
                max-height: 240px;
                overflow-y: auto;
            }
        }

        @media (min-width: 365.80px) and (max-width: 767.80px) {

            .prev-item-mobile-arrow,
            .next-item-mobile-arrow {
                top: 416px;
            }

            .prev-item-mobile-arrow {
                left: 10px;
            }

            .next-item-mobile-arrow {
                right: 10px;
            }

            .picture-box-items .img-container img {
                width: 316px;
                height: 316px;
            }

            .description {
                max-height: unset !important;
            }

            #details-view .advert {
                aspect-ratio: 320 / 120 !important;
            }
        }

        @media (max-width: 365px) {

            .prev-item-mobile-arrow,
            .next-item-mobile-arrow {
                top: 330px;
            }

            .prev-item-mobile-arrow {
                left: 30px;
            }

            .next-item-mobile-arrow {
                right: 30px;
            }

            .picture-box-items .img-container img {
                max-width: 316px;
                max-height: 316px;
            }

            .description {
                max-height: unset !important;
            }

            #details-view .advert {
                aspect-ratio: 320 / 120 !important;
            }
        }
    </style>

    <script>
        document.querySelector(".next-item-mobile-arrow")
        .addEventListener("click", function () {
            document.querySelector(".list-view-button").style.setProperty("display", "block", "important");
        });
    </script>

</section>