<section>
    <div class="voting-subscribe__component overflow-hidden">
        <div class="container gx-11 my-11">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-center fs-7 fs-md-8 fs-lg-9 mb-0">
                        A nevezés lezárult.
                    </h3>
                    <h2 class="text-center text-gold mt-3 mt-md-0 mb-5">
                        A szavazás szeptember 1-én indul!
                    </h2>
                    <div class="row justify-content-center mb-8">
                        <div class="col-7 col-md-12">
                            <p class="text-center">
                                Iratkozz fel, hogy ne maradj le a szavazásról, és versenyben lehess az értékes
                                nyereményekért!
                            </p>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-xxl-4">
                            <form action="<?= ASSET_URL ?>/subscribe.php" method="post">
                                <div class="mb-8">
                                    <label
                                        class="form-label d-inline-block position-relative text-gold bg-light px-2 mb-0 ms-9">
                                        E-mail címed
                                    </label>
                                    <input name="email" type="email" class="form-control p-7 bg-transparent"
                                        autocomplete="off" required>
                                    <p class="error-message fs-4 text-danger mt-3 d-none" data-related="email"></p>
                                </div>
                                <div class="form-check mb-3">
                                    <input name="espresso" class="form-check-input mt-0" type="checkbox"
                                        id="espressoCheckbox" autocomplete="off">
                                    <label class="form-check-label text-gold fs-3" for="espressoCheckbox">
                                        Hozzájárulok, hogy regisztrációmmal Feliratkozom a Forbes Espresso heti
                                        hírlevelére
                                    </label>
                                </div>
                                <div class="form-check mb-11">
                                    <input name="privacy_policy" class="form-check-input mt-0" type="checkbox"
                                        id="privacyCheckbox" autocomplete="off">
                                    <label class="form-check-label text-gold fs-3" for="privacyCheckbox">
                                        Elfogadom az <a
                                            href="https://cdn.forbes.hu/uploads/2024/07/rev_Altalanos_adatkezelesi_tajekoztato_honlapra_Forbes_240715.pdf"
                                            target="_blank" class="text-gold fw-bold">
                                            adatvédelmi és az adatkezelési nyilatkozatot.
                                        </a>
                                    </label>
                                </div>
                                <p class="success-message d-none text-center mt-n3 mb-5"></p>
                                <button type="submit"
                                    class="btn btn-gold d-flex justify-content-center align-items-center text-white fw-semibold py-8 w-100"
                                    disabled>
                                    <div class="spinner-border me-4 d-none" role="status"></div>
                                    Szavazok
                                </button>
                                <div class="text-center text-grey-100 captcha-terms mt-4 w-100">
                                    Ez az oldal reCAPTCHA védelem alatt áll és a Google
                                    <a target="_blank" href="https://policies.google.com/privacy"
                                        class="text-gold">Adatkezelési nyilatkozata</a> és
                                    <a target="_blank" href="https://policies.google.com/terms"
                                        class="text-gold">Általános szerződési feltételei</a> érvényesek.
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>