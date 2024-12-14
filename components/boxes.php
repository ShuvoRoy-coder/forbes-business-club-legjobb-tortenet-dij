<?php
$persons = [
    [
        'name' => 'D. Tóth Kriszta',
        'description' => 'újságíró; alapító-CEO,<br/>WMN',
        'image' => '/assets/images/boxes/d_toth_krisztina.png'
    ],
    [
        'name' => 'Fekete Emese',
        'description' => 'vezető szerkesztő,<br/>Forbes',
        'image' => '/assets/images/boxes/fekete_emese.png'
    ],
    [
        'name' => 'Pistyur Veronika',
        'description' => 'ügyvezető,<br/>Bridge Budapest',
        'image' => '/assets/images/boxes/pistyur_veronika.png'
    ],
    [
        'name' => 'Balogh Petya',
        'description' => 'Co-Founder, CEO,<br/>STRT Holding; Tech Angel Investor',
        'image' => '/assets/images/boxes/balogh_petya.png'
    ],
    [
        'name' => 'Galambos Márton',
        'description' => 'főszerkesztő,<br/>Forbes',
        'image' => '/assets/images/boxes/galambos_marton.png'
    ],
    [
        'name' => 'Zsiborás Gergő',
        'description' => 'főmunkatárs, Forbes;<br/>vezető szerkesztő, Forbes.hu',
        'image' => '/assets/images/boxes/zsiboras_gergo.png',
    ],
    [
        'name' => 'Lakatos Péter',
        'description' => 'társ-vezérigazgató, társtulajdonos,<br/>Videoton Holding Zrt.',
        'image' => '/assets/images/boxes/lakatos_peter.png'
    ],
    [
        'name' => 'Randall Lane',
        'description' => 'Chief Content Officer<br/>Forbes USA',
        'image' => '/assets/images/boxes/randall_lane.png',
    ]
]
?>

<section>
    <div class="boxes__component">
        <div class="container gx-11">
            <h2 class="text-center mb-16 text-white ff-playfair-display">Szakmai zsűri</h2>
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="row justify-content-center gx-3 gy-6 g-md-9 g-lg-11">
                        <?php foreach ($persons as $person) : ?>
                            <div class="col-6 col-md-4">
                                <div class="box px-4 pt-4 pb-12 bg-grey-200 h-100">
                                    <div class="img-container bg-grey-100 w-100 overflow-hidden">
                                        <img src="<?= ASSET_URL . $person['image']; ?>" class="w-100 h-100" alt="<?= $person['name']; ?>">
                                    </div>
                                    <p class="fs-5 fs-md-8 text-center text-white mt-7">
                                        <?= $person['name']; ?>
                                    </p>
                                    <p class="description fs-2 fs-md-3 text-center text-white mt-2">
                                        <?= $person['description']; ?>
                                    </p>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>