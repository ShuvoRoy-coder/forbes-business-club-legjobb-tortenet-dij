(function () {
    const comp = document.querySelector(".competitors-details__component");

    if (comp) {
        const items = comp.querySelector(".items");

        const scrollToSelectedItem = () => {
            const params = new URLSearchParams(location.search);
            let selected = params.get("jelolt");

            if (selected) {
                const selectedItem = items.querySelector(`#${selected}`).parentElement;

                const offset = items.offsetLeft + items.scrollLeft;
                const diff = selectedItem.offsetLeft - offset;

                if (diff < 0 || diff >= items.offsetWidth) {
                    items.scrollTo(items.scrollLeft + diff, 0);
                }
            }
        };

        let noScroll = false;

        window.addEventListener("pushstate", function () {
            const params = new URLSearchParams(location.search);
            let selected = params.get("jelolt");
            let box;

            // Távolítsuk el az aktív osztályt minden gombról
            document
                .querySelectorAll("#view-selector-container button.active")
                .forEach((btn) => btn?.classList.remove("active"));

            if (selected) {
                // Aktiváljuk a részletek nézet gombját
                document
                    .querySelectorAll("button.details-view")
                    .forEach((btn) => btn?.classList.add("active"));

                // Rejtjük a "Szavazz te is!" elemet
                if (document.querySelector(".szavazz-te-is"))
                    document.querySelector(".szavazz-te-is").classList.add("d-none");

                // Kiválasztjuk a megfelelő versenyzőt
                box = comp.querySelector(`button#${selected}`);

                // Rejtjük a listanézetet és megjelenítjük a részletek nézetet
                document.querySelector("#list-view")?.classList.add("d-none");
                document.querySelector("#details-view")?.classList.remove("d-none");

                document.querySelector(".competitors-details__component #view-selector-container").parentElement.classList.add("d-none");
            } else {
                // Aktiváljuk a listanézet gombját
                document
                    .querySelectorAll("button.list-view")
                    .forEach((btn) => btn?.classList.add("active"));

                // Megjelenítjük a "Szavazz te is!" elemet
                if (document.querySelector(".szavazz-te-is"))
                    document.querySelector(".szavazz-te-is")?.classList.remove("d-none");

                // Alapértelmezett kiválasztás
                box = comp.querySelector(".pic-container");
                document.querySelector("#details-view")?.classList.add("d-none");
                document.querySelector("#list-view")?.classList.remove("d-none");

                document.querySelector(".competitors-details__component #view-selector-container").parentElement.classList.remove("d-none");
            }

            // Eltávolítjuk az aktív osztályt a jelenlegi kép konténerből
            comp.querySelector(".pic-container.active")?.classList.remove("active");

            // Aktiváljuk a kiválasztott kép konténert
            box?.classList.add("active");
            box.querySelector("p").removeAttribute("style");

            // Frissítjük a kép forrását
            comp
                .querySelector(".img-container img")
                .setAttribute("src", box.querySelector("img").getAttribute("src"));

            // Frissítjük a név és leírás mezőket
            comp.querySelector("h2").innerHTML = box.getAttribute("data-name");
            comp.querySelector(".description").innerText =box.getAttribute("data-description");

            const order = params.get("order");

            if (order) {
                function sortByName(a, b) {
                    const aName = a.querySelector("*").getAttribute("data-name");
                    const bName = b.querySelector("*").getAttribute("data-name");

                    const comparison = aName.localeCompare(bName);

                    return comparison * (order === "name-asc" ? 1 : -1);
                }

                const competitorAd = document.querySelector("#competitor-ad");

                Array.from(
                    comp.querySelectorAll(".competitor-item:not(#competitor-ad)")
                )
                    .sort(sortByName)
                    .forEach(function (col, i) {
                        if (i >= 3) {
                            i += 1;
                        }

                        col.style.order = i + 1;
                    });

                // Set #competitor-ad to the 4th position
                competitorAd.setAttribute("style", `order:4;`);

                /*
                // Eredeti kód, amely most már nem szükséges
                Array.from(comp.querySelectorAll("#list-view > .row > div"))
                  .sort(sortByName)
                  .forEach((col, i) => col.setAttribute("style", `order:${i + 1};`));
                */
            } else {
                // Kizárjuk az "ad" elemet a stílus eltávolításából
                comp
                    .querySelectorAll(".items .col-auto, #list-view > .row > div")
                    // #competitor-ad should be the 4th element
                    .forEach(function (col, i) {
                        col.removeAttribute("style");
                    });
            }

            if (noScroll) {
                noScroll = false;
            } else {
                scrollToSelectedItem();
            }
        });

        // Bal nyíl eseménykezelő
        comp
            .querySelector(".prev-item-mobile-arrow")
            .addEventListener("click", function () {
                const params = new URLSearchParams(location.search);
                let selected = params.get("jelolt");

                const item = items.querySelector(`#${selected}`);
                const nextItem =
                    item.parentElement.style.order !== ""
                        ? items.querySelector(
                            `[style="order:${Number(item.parentElement.style.order) - 1};"]`
                        )
                        : item.parentElement.previousElementSibling;

                if (nextItem) {
                    params.set(
                        "jelolt",
                        nextItem.querySelector("button").getAttribute("id")
                    );

                    history.pushState({}, "", `?${params.toString()}`);
                }
            });

        // Jobb nyíl eseménykezelő
        comp
            .querySelector(".next-item-mobile-arrow")
            .addEventListener("click", function () {
                const params = new URLSearchParams(location.search);
                let selected = params.get("jelolt");

                const item = items.querySelector(`#${selected}`);
                const nextItem =
                    item.parentElement.style.order !== ""
                        ? items.querySelector(
                            `[style="order:${Number(item.parentElement.style.order) + 1};"]`
                        )
                        : item.parentElement.nextElementSibling;

                if (nextItem) {
                    params.set(
                        "jelolt",
                        nextItem.querySelector("button").getAttribute("id")
                    );

                    history.pushState({}, "", `?${params.toString()}`);
                }
            });

        // Részletek nézet gombok eseménykezelői
        document.querySelectorAll("button.details-view").forEach((btn) =>
            btn.addEventListener("click", function () {
                const params = new URLSearchParams(location.search);

                if (!params.get("jelolt")) {
                    document
                        .querySelector("#view-selector-container button.active")
                        ?.classList.remove("active");

                    const selected = comp
                        .querySelector(".pic-container")
                        .getAttribute("id");

                    params.set("jelolt", selected);
                    this?.classList.add("active");
                    history.pushState({}, "", `?${params.toString()}`);
                }
            })
        );

        // Listanézet gombok eseménykezelői
        document.querySelectorAll("button.list-view").forEach((btn) =>
            btn.addEventListener("click", function () {
                const params = new URLSearchParams(location.search);

                if (params.get("jelolt")) {
                    document
                        .querySelector("#view-selector-container button.active")
                        ?.classList.remove("active");

                    params.delete("jelolt");
                    this?.classList.add("active");
                    history.pushState({}, "", `?${params.toString()}`);
                }
            })
        );

        const [leftArrow, rightArrow] = comp.querySelectorAll(".arrow-box");

        function checkItemsIsScrollable() {
            const scrollLeftMax = items.scrollWidth - items.clientWidth;

            if (scrollLeftMax > 0) {
                leftArrow.removeAttribute("disabled");
                rightArrow.removeAttribute("disabled");
            } else {
                leftArrow.setAttribute("disabled", "");
                rightArrow.setAttribute("disabled", "");
            }
        }

        leftArrow.addEventListener("click", function () {
            const activeCol = items.querySelector("button.active").parentNode;

            const prevElem =
                activeCol.style.order !== ""
                    ? items.querySelector(
                        `[style="order:${Number(activeCol.style.order) - 1};"]`
                    )
                    : activeCol.previousElementSibling;

            if (prevElem) {
                const offset = items.offsetLeft + items.scrollLeft;

                if (prevElem.offsetLeft < offset) {
                    const width = prevElem.offsetWidth;
                    let newValue = items.scrollLeft - width;
                    items.scrollTo(newValue, 0);
                }

                prevElem.querySelector("button").click();
            }
        });

        rightArrow.addEventListener("click", function () {
            const activeCol = items.querySelector("button.active").parentNode;

            const nextElem =
                activeCol.style.order !== ""
                    ? items.querySelector(
                        `[style="order:${Number(activeCol.style.order) + 1};"]`
                    )
                    : activeCol.nextElementSibling;

            if (nextElem) {
                const offset = items.offsetLeft + items.offsetWidth + items.scrollLeft;

                if (nextElem.offsetLeft + nextElem.offsetWidth > offset) {
                    const width = nextElem.offsetWidth;
                    let newValue = items.scrollLeft + width;
                    items.scrollTo(newValue, 0);
                }

                nextElem.querySelector("button").click();
            }
        });

        const resizeObserver = new ResizeObserver(checkItemsIsScrollable);
        resizeObserver.observe(items);

        // Kis képernyőkön a list-item kattintás eseménykezelői
        comp.querySelectorAll(".list-item").forEach((item) => {
            item.addEventListener("click", function () {
                if (document.documentElement.clientWidth < 768) {
                    this.querySelector(".list-item-image button").click();
                }
            });
        });

        // List-item image gombok eseménykezelői
        comp.querySelectorAll(".list-item-image button").forEach((btn) => {
            btn.addEventListener("click", function () {
                const params = new URLSearchParams(location.search);
                params.set("jelolt", this.getAttribute("selected-id"));
                history.pushState({}, "", `?${params.toString()}`);
            });
        });

        // Kép konténerek eseménykezelői
        comp.querySelectorAll(".pic-container").forEach((pic) => {
            pic.addEventListener("mouseenter", function () {
                this?.classList.add("hover");
            });

            pic.addEventListener("mouseleave", function () {
                this?.classList.remove("hover");
            });

            pic.addEventListener("transitionend", function () {
                if (!this?.classList.contains("active")) {
                    const paragraph = this.querySelector("p");

                    if (this?.classList.contains("hover")) {
                        paragraph.style = "opacity: 1";
                    } else {
                        paragraph.removeAttribute("style");
                    }
                }
            });

            pic.addEventListener("click", function () {
                const params = new URLSearchParams(location.search);
                params.set("jelolt", this.getAttribute("id"));
                history.pushState({}, "", `?${params.toString()}`);
                noScroll = true;
            });
        });

        // Rendezési dropdown eseménykezelői
        document
            .querySelectorAll("#ordering-dropdown .dropdown-item")
            .forEach((item) => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();

                    const params = new URLSearchParams(location.search);
                    const key = item.getAttribute("data-key");

                    if (key) {
                        params.set("order", key);
                    } else {
                        params.delete("order");
                    }

                    history.pushState({}, "", `?${params.toString()}`);

                    document
                        .querySelectorAll("#ordering-dropdown button")
                        .forEach((btn) => {
                            btn.innerHTML = item.innerHTML;
                            const index = item.parentNode.getAttribute("data-index");

                            document
                                .querySelectorAll("#ordering-dropdown .dropdown-item")
                                .forEach((dropdownItem) => {
                                    if (
                                        dropdownItem.parentNode.getAttribute("data-index") == index
                                    ) {
                                        dropdownItem.parentNode?.classList.add("d-none");
                                    } else {
                                        dropdownItem.parentNode?.classList.remove("d-none");
                                    }
                                });
                        });
                });
            });

        // Modal eseménykezelői
        const modal = comp.querySelector("#voting-modal");

        modal.querySelectorAll('input:not([type="checkbox"])').forEach((input) => {
            input.addEventListener("focus", function () {
                this.previousElementSibling?.classList.add("text-gold");
            });

            input.addEventListener("blur", function () {
                this.previousElementSibling?.classList.remove("text-gold");
            });
        });

        modal.querySelector("form").addEventListener("submit", async function (e) {
            e.preventDefault();
            e.stopPropagation();

            const successMessage = modal.querySelector(".success-message");
            const errorMessage = modal.querySelector(".error-msg");
            const errorMessages = modal.querySelectorAll(".error-message");
            successMessage?.classList.add("d-none");
            successMessage.innerText = "";

            errorMessages.forEach((error) => {
                error.innerText = "";
                error?.classList.add("d-none");
            });

            const form = e.currentTarget;
            const keys = Array.from(new FormData(form).keys());
            const values = Array.from(new FormData(form).values());

            let obj = {};

            keys.forEach((key, i) => {
                obj[key] = values[i];
            });

            obj["token"] = await window.grecaptcha.execute(window.recaptchaPublic, {
                action: "FormSubmit",
            });

            const fields = modal.querySelectorAll("input");
            fields.forEach((field) => field.setAttribute("disabled", ""));
            const submitBtn = modal.querySelector('button[type="submit"]');
            modal.querySelector(".btn-close").setAttribute("disabled", "");
            submitBtn.setAttribute("disabled", "");

            submitBtn.querySelector(".spinner-border")?.classList.remove("d-none");

            fetch(form.getAttribute("action"), {
                method: form.getAttribute("method"),
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }).then(async (response) => {
                form.querySelectorAll(".error-message").forEach((elem) => {
                    elem?.classList.add("d-none");
                    elem.innerText = "";
                });

                submitBtn.querySelector(".spinner-border")?.classList.add("d-none");

                modal.querySelector(".btn-close").removeAttribute("disabled");

                if (response.status !== 200) {
                    const data = await response.json();

                    form.querySelectorAll(".error-message").forEach((elem) => {
                        const field = elem.getAttribute("data-related");

                        if (data[field]) {
                            elem.innerText = data[field];
                            elem?.classList.remove("d-none");
                        }
                    });

                    if (data["msg"]) {
                        errorMessage.innerText = data["msg"];
                        errorMessage?.classList.remove("d-none");
                    }

                    fields.forEach((field) => field.removeAttribute("disabled"));

                    submitBtn.removeAttribute("disabled");
                } else {
                    const data = await response.json();

                    successMessage.innerText = data.msg;

                    errorMessage?.classList.add("d-none");
                    successMessage?.classList.remove("d-none");
                    form.reset();

                    fields.forEach((field) => {
                        field.removeAttribute("disabled");
                    });
                }
            });
        });

        modal.querySelector("#privacyCheckbox").addEventListener("change", (e) => {
            const submitBtn = modal.querySelector('[type="submit"]');

            if (e.currentTarget.checked) {
                submitBtn.removeAttribute("disabled");
            } else {
                submitBtn.setAttribute("disabled", "");
            }
        });

        modal.addEventListener("show.bs.modal", function (e) {
            const params = new URLSearchParams(location.search);
            const selected = params.get("jelolt");

            modal.querySelector('input[name="competitor"]')?.remove();

            const competitor =
                e.relatedTarget.getAttribute("data-competitor") !== null
                    ? e.relatedTarget.getAttribute("data-competitor")
                    : selected;

            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", "competitor");
            input.setAttribute("value", competitor);
            modal.querySelector("form").appendChild(input);
        });

        scrollToSelectedItem();
    }
})();
