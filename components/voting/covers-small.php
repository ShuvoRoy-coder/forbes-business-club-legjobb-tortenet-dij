<?php
$images = ['img_4.png', 'img_3.png', 'img_1.png', 'img_2.png', 'img_5.png'];
?>

<section>
    <div class="covers__component overflow-hidden">
        <div class="row justify-content-center flex-nowrap gx-6 gx-md-9 gx-lg-13">
            <?php foreach ($images as $i => $image) : ?>
                <div class="col-auto">
                    <img src="<?= ASSET_URL ?>/assets/images/covers/<?= $image; ?>" height="340px" alt="Forbes Magazine Cover <?= $i + 1; ?>">
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>