(function () {
  document
    .querySelectorAll(".contact-form__component")
    .forEach((contactForm) => {
      contactForm
        .querySelector("form")
        .addEventListener("submit", async function (e) {
          e.preventDefault();
          e.stopPropagation();

          const successMessage = contactForm.querySelector(".success-message");

          successMessage.classList.add("d-none");
          successMessage.innerText = "";

          const form = e.currentTarget;
          const keys = Array.from(new FormData(form).keys());
          const values = Array.from(new FormData(form).values());

          let obj = {};

          keys.forEach((key, i) => {
            obj[key] = values[i];
          });

          obj["token"] = await window.grecaptcha.execute(
            window.recaptchaPublic,
            { action: "FormSubmit" }
          );

          const fields = contactForm.querySelectorAll("input, textarea");

          fields.forEach((field) => field.setAttribute("disabled", ""));

          const submitBtn = contactForm.querySelector('button[type="submit"]');

          submitBtn.setAttribute("disabled", "");

          const applicationTypeBtns = contactForm.querySelectorAll(
            "#applicateOther, #applicateMySelf"
          );

          applicationTypeBtns.forEach((btn) =>
            btn.setAttribute("disabled", "")
          );

          submitBtn.querySelector(".spinner-border").classList.remove("d-none");

          fetch(form.getAttribute("action"), {
            method: form.getAttribute("method"),
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }).then(async (response) => {
            form.querySelectorAll(".error-message").forEach((elem) => {
              elem.classList.add("d-none");
              elem.innerText = "";
            });

            applicationTypeBtns.forEach((btn) =>
              btn.removeAttribute("disabled")
            );

            submitBtn.querySelector(".spinner-border").classList.add("d-none");

            if (response.status != 200) {
              const data = await response.json();

              form.querySelectorAll(".error-message").forEach((elem) => {
                const field = elem.getAttribute("data-related");

                if (data[field]) {
                  elem.innerText = data[field];
                  elem.classList.remove("d-none");
                }
              });

              fields.forEach((field) => field.removeAttribute("disabled"));

              submitBtn.removeAttribute("disabled");
            } else {
              successMessage.innerText =
                "A nevezés leadása sikeresen megtörtént!";

              successMessage.classList.remove("d-none");

              form.reset();

              fields.forEach((field) => {
                field.removeAttribute("disabled");
              });
            }
          });
        });

      contactForm
        .querySelector("#privacyCheckbox")
        .addEventListener("change", (e) => {
          const submitBtn = contactForm.querySelector('[type="submit"]');

          if (e.currentTarget.checked) {
            submitBtn.removeAttribute("disabled");
          } else {
            submitBtn.setAttribute("disabled", "");
          }
        });

      contactForm
        .querySelector("#applicateMySelf")
        .addEventListener("click", function (e) {
          const btn = e.currentTarget;

          if (btn.classList.contains("bg-transparent")) {
            contactForm.querySelector('[name="application_type"]').value =
              "myself";

            btn.classList.add("bg-gold");
            btn.classList.remove("bg-transparent");

            const otherBtn = contactForm.querySelector("#applicateOther");

            otherBtn.classList.add("bg-transparent");
            otherBtn.classList.remove("bg-gold-dark");

            const data = {
              name: "Neved",
              email: "Email címed",
              phone: "Telefonszámod",
              job: "Mivel foglalkozol?",
              company: "Cég neve (opcionális)",
              reason: "Miért téged válasszunk? (Max. 1000 krakter)",
            };

            Object.keys(data).forEach((key) => {
              contactForm.querySelector(
                `[name="${key}"]`
              ).previousElementSibling.innerText = data[key];
            });

            ["name", "email", "phone"].forEach((field) => {
              const sourceInput = contactForm.querySelector(
                `[name="extra_${field}"]`
              );
              contactForm.querySelector(`[name="${field}"]`).value =
                sourceInput.value;

              sourceInput.value = null;
            });

            contactForm.querySelector(".extra-fields").classList.add("d-none");
          }
        });

      contactForm
        .querySelector("#applicateOther")
        .addEventListener("click", function (e) {
          const btn = e.currentTarget;

          if (btn.classList.contains("bg-transparent")) {
            contactForm.querySelector('[name="application_type"]').value =
              "other";

            btn.classList.add("bg-gold");
            btn.classList.remove("bg-transparent");

            const otherBtn = contactForm.querySelector("#applicateMySelf");

            otherBtn.classList.add("bg-transparent");
            otherBtn.classList.remove("bg-gold");

            const data = {
              name: "A jelöltem neve",
              email: "Jelölt email címe (ha ismered)",
              phone: "Jelölt telefonszáma (ha ismered)",
              job: "Mivel foglalkozik?",
              company: "A jelölt cégének a neve (opcionális)",
              reason: "Miért őt válasszuk? (maximum 1000 karakter)",
            };

            Object.keys(data).forEach((key) => {
              contactForm.querySelector(
                `[name="${key}"]`
              ).previousElementSibling.innerText = data[key];
            });

            ["name", "email", "phone"].forEach((field) => {
              const sourceInput = contactForm.querySelector(
                `[name="${field}"]`
              );
              contactForm.querySelector(`[name="extra_${field}"]`).value =
                sourceInput.value;

              sourceInput.value = null;
            });

            contactForm
              .querySelector(".extra-fields")
              .classList.remove("d-none");
          }
        });
    });
})();
