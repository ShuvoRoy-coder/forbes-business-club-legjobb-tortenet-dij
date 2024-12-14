<?php
$roadmap = [
    [
        'title' => 'Jelentkezés',
        'description' => 'Ebben az időszakban van lehetőséged jelentkezni vagy jelölni valakit a Forbes címlapjára egy rövid bemutatkozó szöveggel. A jelentkezők közül a Forbes szerkesztősége kiválaszt maximum 100 főt, akik részt vehetnek a következő fordulóban.',
        'date' => '2023. 06. 02. - 2023. 07. 31.'
    ],
    [
        'title' => 'Szavazás',
        'description' => 'Szeptembertől elindul a 4 hetes, nyilvános szavazás az előzőleg kiválasztott maximum 100 főre. Egy szavazó csak egy címlapos-jelöltre voksolhat, de a jelölt fotóját és szerkesztett bemutatkozó sztoriját megoszthatóvá tesszük, amit bármilyen közösségi média felületen népszerűsíthet majd.',
        'date' => '2023. 09. 01. - 2023. 09. 30.'
    ],
    [
        'title' => 'Zsűrizés',
        'description' => 'A szakmai zsűri kiválasztja a 10 legesélyesebb jelöltet, a döntősöket. Ők mindannyian egy profi címlapfotózáson vesznek részt.',
        'date' => '2023. 10. 01. - 2023. 10. 12.'
    ],
    [
        'title' => 'Eredményhirdetés',
        'description' => '2023. november 2-án a Forbes Kilövés eseményen bemutatjuk a novemberi lapszámot a nyertes címlapossal.',
        'date' => '2023. 11. 02.'
    ]
]
    ?>

<section>
    <div class="roadmap__component">
        <div class="container gx-11">
            <h2 class="text-center mb-9 mb-md-11 mb-lg-16">Roadmap</h2>
            <div class="row justify-content-center">
                <div class="col-md-10 col-lg-8 mt-n6 mt-md-n10">
                    <?php foreach ($roadmap as $item): ?>
                    <div class="box bg-grey-200 px-2 pt-2 pb-10 mt-6 mt-md-10">
                        <div class="top-container bg-gold px-11 py-7">
                            <div class="row justify-content-between align-items-center">
                                <div class="col-md-auto text-center">
                                    <p class="fs-9 fw-semibold text-white">
                                        <?= $item['title']; ?>
                                    </p>
                                </div>
                                <div class="col-md-auto text-center mt-2 mt-md-0">
                                    <p class="fs-3 fs-md-4 text-white">
                                        <?= $item['date']; ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-10">
                            <div class="col-10">
                                <p class="fs-4 text-white">
                                    <?= $item['description']; ?>
                                </p>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</section>