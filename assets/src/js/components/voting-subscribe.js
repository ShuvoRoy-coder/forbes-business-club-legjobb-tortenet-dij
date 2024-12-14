(function () {
    document
        .querySelectorAll('.voting-subscribe__component')
        .forEach((votingSubscribe) => {
            votingSubscribe
                .querySelector('form')
                .addEventListener('submit', async function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const successMessage =
                        votingSubscribe.querySelector('.success-message');

                    successMessage.classList.add('d-none');
                    successMessage.innerText = '';

                    const form = e.currentTarget;
                    const keys = Array.from(new FormData(form).keys());
                    const values = Array.from(new FormData(form).values());

                    let obj = {};

                    keys.forEach((key, i) => {
                        obj[key] = values[i];
                    });

                    obj['token'] = await window.grecaptcha.execute(
                        window.recaptchaPublic,
                        { action: 'FormSubmit' }
                    );

                    const fields = votingSubscribe.querySelectorAll('input');

                    fields.forEach((field) =>
                        field.setAttribute('disabled', '')
                    );

                    const submitBtn = votingSubscribe.querySelector(
                        'button[type="submit"]'
                    );

                    submitBtn.setAttribute('disabled', '');

                    submitBtn
                        .querySelector('.spinner-border')
                        .classList.remove('d-none');

                    fetch(form.getAttribute('action'), {
                        method: form.getAttribute('method'),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj),
                    }).then(async (response) => {
                        form.querySelectorAll('.error-message').forEach(
                            (elem) => {
                                elem.classList.add('d-none');
                                elem.innerText = '';
                            }
                        );

                        submitBtn
                            .querySelector('.spinner-border')
                            .classList.add('d-none');

                        if (response.status != 200) {
                            const data = await response.json();

                            form.querySelectorAll('.error-message').forEach(
                                (elem) => {
                                    const field =
                                        elem.getAttribute('data-related');

                                    if (data[field]) {
                                        elem.innerText = data[field];
                                        elem.classList.remove('d-none');
                                    }
                                }
                            );

                            fields.forEach((field) =>
                                field.removeAttribute('disabled')
                            );

                            submitBtn.removeAttribute('disabled');
                        } else {
                            successMessage.innerText =
                                'A feliratkozás sikeres volt!';

                            successMessage.classList.remove('d-none');

                            form.reset();

                            fields.forEach((field) => {
                                field.removeAttribute('disabled');
                            });
                        }
                    });
                });

            votingSubscribe
                .querySelector('#privacyCheckbox')
                .addEventListener('change', (e) => {
                    const submitBtn =
                        votingSubscribe.querySelector('[type="submit"]');

                    if (e.currentTarget.checked) {
                        submitBtn.removeAttribute('disabled');
                    } else {
                        submitBtn.setAttribute('disabled', '');
                    }
                });
        });
})();
