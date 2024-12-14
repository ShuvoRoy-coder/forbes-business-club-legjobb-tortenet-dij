<section>
    <div class="contact-form__component">
        <div class="container position-relative gx-11">
            <div class="row justify-content-center py-10">
                <div class="col-md-10 col-lg-8">
                    <div class="form-container position-relative bg-gold px-15 py-11">
                        <form action="<?= ASSET_URL ?>/application.php" method="post">
                            <input name="application_type" type="hidden" value="myself">
                            <div class="row justify-content-center">
                                <div class="col-md-8">
                                    <h2 class="text-white text-center">Nevezés</h2>
                                    <p class="text-white text-center mt-9">
                                        Jelentkezz vagy jelölj valakit a 10 éves magyar Forbes címlapjára!
                                    </p>
                                    <div class="buttons-container row gx-0 align-items-center mt-10 bg-gold-dark">
                                        <div class="col-6">
                                            <button id="applicateMySelf" type="button"
                                                class="border-0 bg-gold text-white w-100 py-7">
                                                Jelölt vagyok
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button id="applicateOther" type="button"
                                                class="border-0 bg-transparent text-white w-100 py-7">
                                                Mást jelölök
                                            </button>
                                        </div>
                                    </div>
                                    <p class="error-message text-danger mt-3 d-none" data-related="application_type">
                                    </p>
                                    <div class="mt-10">
                                        <div class="mb-3">
                                            <label
                                                class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                Neved
                                            </label>
                                            <input name="name" type="text"
                                                class="form-control text-white p-7 bg-transparent" autocomplete="off">
                                            <p class="error-message fs-4 text-danger mt-3 d-none" data-related="name">
                                            </p>
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                Email címed
                                            </label>
                                            <input name="email" type="email"
                                                class="form-control text-white p-7 bg-transparent" autocomplete="off">
                                            <p class="error-message fs-4 text-danger mt-3 d-none" data-related="email">
                                            </p>
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                Telefonszámod
                                            </label>
                                            <input name="phone" type="text"
                                                class="form-control text-white p-7 bg-transparent" autocomplete="off">
                                            <p class="error-message fs-4 text-danger mt-3 d-none" data-related="phone">
                                            </p>
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                Mivel foglalkozol?
                                            </label>
                                            <input name="job" type="text"
                                                class="form-control text-white p-7 bg-transparent" autocomplete="off">
                                            <p class="error-message fs-4 text-danger mt-3 d-none" data-related="job">
                                            </p>
                                        </div>
                                        <div class="mb-3">
                                            <label
                                                class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                Cég neve (opcionális)
                                            </label>
                                            <input name="company" type="text"
                                                class="form-control text-white p-7 bg-transparent" autocomplete="off">
                                            <p class="error-message fs-4 text-danger mt-3 d-none"
                                                data-related="company"></p>
                                        </div>
                                        <div>
                                            <label
                                                class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                Miért téged válasszunk? (Max. 1000 karakter)
                                            </label>
                                            <textarea name="reason" type="text"
                                                class="form-control text-white p-7 bg-transparent"
                                                autocomplete="off"></textarea>
                                            <p class="error-message fs-4 text-danger mt-3 d-none" data-related="reason">
                                            </p>
                                        </div>
                                        <div class="extra-fields d-none">
                                            <div class="mb-3">
                                                <label
                                                    class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                    Neved
                                                </label>
                                                <input name="extra_name" type="text"
                                                    class="form-control text-white p-7 bg-transparent"
                                                    autocomplete="off">
                                                <p class="error-message fs-4 text-danger mt-3 d-none"
                                                    data-related="extra_name"></p>
                                            </div>
                                            <div class="mb-3">
                                                <label
                                                    class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                    Email címed
                                                </label>
                                                <input name="extra_email" type="email"
                                                    class="form-control text-white p-7 bg-transparent"
                                                    autocomplete="off">
                                                <p class="error-message fs-4 text-danger mt-3 d-none"
                                                    data-related="extra_email"></p>
                                            </div>
                                            <div class="mb-3">
                                                <label
                                                    class="form-label d-inline-block position-relative text-white bg-gold px-2 mb-0 ms-9">
                                                    Telefonszámod
                                                </label>
                                                <input name="extra_phone" type="text"
                                                    class="form-control text-white p-7 bg-transparent"
                                                    autocomplete="off">
                                                <p class="error-message fs-4 text-danger mt-3 d-none"
                                                    data-related="extra_phone"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center flex-column mt-8">
                                        <div class="col-md-9">
                                            <div class="form-check mb-3">
                                                <input name="newsletter" class="form-check-input" type="checkbox"
                                                    id="newsletterCheckbox" autocomplete="off">
                                                <label class="form-check-label text-white" for="newsletterCheckbox">
                                                    Hozzájárulok, hogy regisztrációmmal Feliratkozom a Forbes Espresso
                                                    heti hírlevelére
                                                </label>
                                            </div>
                                            <div class="form-check mb-0">
                                                <input name="privacy_policy" class="form-check-input" type="checkbox"
                                                    id="privacyCheckbox" autocomplete="off">
                                                <label class="form-check-label text-white" for="privacyCheckbox">
                                                    Elfogadom az <a
                                                        href="https://hu.forbesmedia.cz/uploads/2022/05/altalanos_adatkezelesi_tajekoztato_Forbeshu_2022-1.pdf"
                                                        target="_blank" class="text-white">
                                                        adatvédelmi és az adatkezelési nyilatkozatot.
                                                    </a>
                                                </label>
                                            </div>
                                        </div>
                                        <p class="success-message d-none text-center mt-7"></p>
                                        <div class="col-md-9 mt-9">
                                            <button type="submit"
                                                class="d-flex justify-content-center align-items-center text-black bg-white border-0 fw-semibold p-7 w-100"
                                                autocomplete="off" disabled>
                                                <div class="spinner-border d-none me-6" role="status"></div>
                                                Beküldés
                                            </button>
                                            <div class="text-center text-white captcha-terms mt-4 w-100">
                                                Ez az oldal reCAPTCHA védelem alatt áll és a Google
                                                <a target="_blank" href="https://policies.google.com/privacy"
                                                    class="text-white">Adatkezelési nyilatkozata</a> és
                                                <a target="_blank" href="https://policies.google.com/terms"
                                                    class="text-white">Általános szerződési feltételei</a> érvényesek.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <img src="<?= ASSET_URL ?>/assets/images/contact-form/background.svg"
                class="position-absolute top-0 start-0 w-100 h-100" alt="Contact Form Background illustration">
        </div>
    </div>
</section>