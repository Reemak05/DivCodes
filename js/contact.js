
/* =========================================
   DIVCODES ACADEMY - CONTACT FORM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const contactName = document.getElementById("contactName");
    const contactEmail = document.getElementById("contactEmail");
    const contactSubject = document.getElementById("contactSubject");
    const contactMessage = document.getElementById("contactMessage");

    const messageCounter = document.getElementById("messageCounter");
    const contactSuccess = document.getElementById("contactSuccess");
    const contactSuccessText = document.getElementById("contactSuccessText");

    if (!contactForm) return;


    // MESSAGE CHARACTER COUNTER

    contactMessage.addEventListener("input", function () {

        messageCounter.textContent = contactMessage.value.length;

    });


    // VALIDATE A SINGLE FIELD

    function validateField(field, condition) {

        if (condition) {

            field.classList.remove("is-invalid");
            field.classList.add("is-valid");

            return true;

        }

        field.classList.remove("is-valid");
        field.classList.add("is-invalid");

        return false;

    }


    // VALIDATE THE COMPLETE FORM

    function validateContactForm() {

        const nameValid = validateField(
            contactName,
            contactName.value.trim().length >= 3
        );

        const emailValid = validateField(
            contactEmail,
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value.trim())
        );

        const subjectValid = validateField(
            contactSubject,
            contactSubject.value !== ""
        );

        const messageValid = validateField(
            contactMessage,
            contactMessage.value.trim().length >= 10
        );

        return nameValid && emailValid && subjectValid && messageValid;

    }


    // FORM SUBMISSION

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        contactSuccess.classList.add("d-none");

        if (!validateContactForm()) {

            const firstInvalidField = contactForm.querySelector(".is-invalid");

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;

        }


        // FRONTEND DEMONSTRATION ONLY
        // No message is sent to a server or email inbox.

        const visitorName = contactName.value.trim();

        contactSuccessText.textContent =
            `Thank you, ${visitorName}! Your message has been recorded in this demo.`;

        contactSuccess.classList.remove("d-none");

        contactForm.reset();

        messageCounter.textContent = "0";

        contactForm.querySelectorAll(".is-valid").forEach(function (field) {

            field.classList.remove("is-valid");

        });

        contactSuccess.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });


    // REMOVE VALIDATION STATE WHILE TYPING

    [contactName, contactEmail, contactSubject, contactMessage]
        .forEach(function (field) {

            field.addEventListener("input", function () {

                field.classList.remove("is-invalid");
                field.classList.remove("is-valid");

            });

            field.addEventListener("change", function () {

                field.classList.remove("is-invalid");
                field.classList.remove("is-valid");

            });

        });

});
