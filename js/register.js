
/* =========================================
   DIVCODES ACADEMY
   Registration System
   ========================================= */


/* =========================================
   1. CONFIGURATION
   ========================================= */

const STORAGE_KEY = "divcodesRegistrations";

const MAX_MESSAGE_LENGTH = 500;

const COURSE_NAMES = {
    "web-development": "Web Development",
    "python": "Python Programming",
    "data-analytics": "Data Analytics",
    "ui-ux": "UI/UX Design",
    "cybersecurity": "Cybersecurity Fundamentals",
    "react": "React Development"
};


/* =========================================
   2. INITIALIZE APPLICATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeRegistration();

    initializeMessageCounter();

    preselectCourse();

    initializeLiveValidation();

});


/* =========================================
   3. GET SAVED REGISTRATIONS
   ========================================= */

function getRegistrations() {

    try {

        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) return [];

        const registrations = JSON.parse(savedData);

        return Array.isArray(registrations)
            ? registrations
            : [];

    } catch (error) {

        console.error("Unable to read registrations:", error);

        return null;

    }

}


/* =========================================
   4. INITIALIZE REGISTRATION FORM
   ========================================= */

function initializeRegistration() {

    const form = document.getElementById("registrationForm");

    if (!form) return;

    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!validateRegistrationForm(form)) {

            const firstInvalidField = form.querySelector(
                ".is-invalid"
            );

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;

        }


        // Get form values

        const fullName = document
            .getElementById("fullName")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const phone = document
            .getElementById("phone")
            .value
            .trim();

        const courseId = document
            .getElementById("selectedCourse")
            .value;

        const message = document
            .getElementById("message")
            .value
            .trim();


        // Check duplicate registration

        if (isDuplicateRegistration(email, courseId)) {

            showFormError(
                "You are already registered for this course using this email address."
            );

            return;

        }


        // Create registration object

        const registration = {

            id: generateRegistrationId(),

            fullName,

            email,

            phone,

            courseId,

            courseName: COURSE_NAMES[courseId],

            message,

            registeredAt: new Date().toISOString()

        };


        // Save registration

        const saved = saveRegistration(registration);

        if (!saved) {

            showFormError(
                "We couldn't save your registration. Please try again."
            );

            return;

        }


        // Display success message

        displaySuccessMessage(registration);


        // Reset form

        form.reset();

        form.classList.remove("was-validated");

        clearValidationStyles(form);

        updateMessageCounter();

        hideFormError();


        // Scroll to success message

        const successMessage = document.getElementById(
            "successMessage"
        );

        if (successMessage) {

            window.scrollTo({
                top: successMessage.getBoundingClientRect().top
                    + window.scrollY - 120,
                behavior: "smooth"
            });

        }

    });

}


/* =========================================
   5. FORM VALIDATION
   ========================================= */

function validateRegistrationForm(form) {

    const fullName = document.getElementById("fullName");

    const email = document.getElementById("email");

    const phone = document.getElementById("phone");

    const course = document.getElementById("selectedCourse");

    const message = document.getElementById("message");

    const terms = document.getElementById("terms");


    let isValid = true;


    // Full name validation

    const namePattern =
        /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;

    const nameValue = fullName.value.trim();

    if (
        nameValue.length < 3 ||
        nameValue.length > 80 ||
        !namePattern.test(nameValue)
    ) {

        setFieldError(fullName, true);

        isValid = false;

    } else {

        setFieldError(fullName, false);

    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email.value.trim())) {

        setFieldError(email, true);

        isValid = false;

    } else {

        setFieldError(email, false);

    }


    // Phone validation

    const phoneValue = phone.value.trim();

    const phoneDigits = phoneValue.replace(/\D/g, "");

    const phonePattern = /^[+\d\s().-]+$/;

    if (
        !phonePattern.test(phoneValue) ||
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
    ) {

        setFieldError(phone, true);

        isValid = false;

    } else {

        setFieldError(phone, false);

    }


    // Course validation

    if (
        !Object.prototype.hasOwnProperty.call(
            COURSE_NAMES,
            course.value
        )
    ) {

        setFieldError(course, true);

        isValid = false;

    } else {

        setFieldError(course, false);

    }


    // Message validation

    if (message && message.value.length > MAX_MESSAGE_LENGTH) {

        setFieldError(message, true);

        isValid = false;

    } else if (message) {

        setFieldError(message, false);

    }


    // Terms and conditions validation

    if (!terms.checked) {

        terms.classList.add("is-invalid");

        isValid = false;

    } else {

        terms.classList.remove("is-invalid");

    }


    // Bootstrap validation styling

    form.classList.add("was-validated");


    return isValid;

}


/* =========================================
   6. LIVE FIELD VALIDATION
   ========================================= */

function initializeLiveValidation() {

    const fields = [
        document.getElementById("fullName"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("selectedCourse")
    ];

    fields.forEach(field => {

        if (!field) return;

        field.addEventListener("blur", () => {

            validateSingleField(field);

        });

        field.addEventListener("input", () => {

            if (field.classList.contains("is-invalid")) {

                validateSingleField(field);

            }

        });

        field.addEventListener("change", () => {

            if (field.classList.contains("is-invalid")) {

                validateSingleField(field);

            }

        });

    });


    const terms = document.getElementById("terms");

    if (terms) {

        terms.addEventListener("change", () => {

            terms.classList.toggle(
                "is-invalid",
                !terms.checked
            );

        });

    }

}


function validateSingleField(field) {

    const value = field.value.trim();

    let valid = true;


    if (field.id === "fullName") {

        const pattern =
            /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;

        valid =
            value.length >= 3 &&
            value.length <= 80 &&
            pattern.test(value);

    }


    if (field.id === "email") {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        valid = pattern.test(value);

    }


    if (field.id === "phone") {

        const digits = value.replace(/\D/g, "");

        const pattern = /^[+\d\s().-]+$/;

        valid =
            pattern.test(value) &&
            digits.length >= 7 &&
            digits.length <= 15;

    }


    if (field.id === "selectedCourse") {

        valid = Object.prototype.hasOwnProperty.call(
            COURSE_NAMES,
            field.value
        );

    }


    setFieldError(field, !valid);

    return valid;

}


/* =========================================
   7. FIELD VALIDATION STYLING
   ========================================= */

function setFieldError(field, hasError) {

    if (!field) return;

    field.classList.remove("is-valid", "is-invalid");

    field.classList.add(
        hasError ? "is-invalid" : "is-valid"
    );

}


function clearValidationStyles(form) {

    form.querySelectorAll(
        ".is-valid, .is-invalid"
    ).forEach(field => {

        field.classList.remove("is-valid", "is-invalid");

    });

}


/* =========================================
   8. GENERATE REGISTRATION ID
   ========================================= */

function generateRegistrationId() {

    return "DC-" +
        Date.now().toString(36).toUpperCase() +
        "-" +
        Math.random().toString(36).slice(2, 7).toUpperCase();

}


/* =========================================
   9. SAVE REGISTRATION
   ========================================= */

function saveRegistration(registration) {

    try {

        const registrations = getRegistrations();

        if (!registrations) return false;

        registrations.push(registration);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(registrations)
        );

        return true;

    } catch (error) {

        console.error(
            "Registration could not be saved:",
            error
        );

        return false;

    }

}


/* =========================================
   10. CHECK DUPLICATE REGISTRATION
   ========================================= */

function isDuplicateRegistration(email, courseId) {

    const registrations = getRegistrations();

    if (!registrations) return false;

    return registrations.some(registration => {

        return (
            registration.email.toLowerCase() === email &&
            registration.courseId === courseId
        );

    });

}


/* =========================================
   11. DISPLAY SUCCESS MESSAGE
   ========================================= */

function displaySuccessMessage(registration) {

    const successMessage = document.getElementById(
        "successMessage"
    );

    const successText = document.getElementById(
        "successText"
    );

    if (!successMessage || !successText) {

        console.error("Success message elements are missing.");

        return;

    }


    successText.textContent =
        `Thank you, ${registration.fullName}! ` +
        `Your registration for ${registration.courseName} ` +
        "has been saved successfully.";

    successMessage.classList.remove("d-none");

}


/* =========================================
   12. DISPLAY FORM ERROR
   ========================================= */

function showFormError(message) {

    const errorMessage = document.getElementById(
        "registrationError"
    );

    if (errorMessage) {

        errorMessage.textContent = message;

        errorMessage.classList.remove("d-none");

        errorMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } else {

        alert(message);

    }

}


function hideFormError() {

    const errorMessage = document.getElementById(
        "registrationError"
    );

    if (errorMessage) {

        errorMessage.textContent = "";

        errorMessage.classList.add("d-none");

    }

}


/* =========================================
   13. PRESELECT COURSE FROM URL
   ========================================= */

function preselectCourse() {

    const params = new URLSearchParams(
        window.location.search
    );

    const courseId = params.get("course");

    const courseSelect = document.getElementById(
        "selectedCourse"
    );

    if (!courseSelect || !courseId) return;

    if (
        Object.prototype.hasOwnProperty.call(
            COURSE_NAMES,
            courseId
        )
    ) {

        courseSelect.value = courseId;

    }

}


/* =========================================
   14. MESSAGE CHARACTER COUNTER
   ========================================= */

function initializeMessageCounter() {

    const messageInput = document.getElementById("message");

    if (!messageInput) return;

    messageInput.setAttribute(
        "maxlength",
        MAX_MESSAGE_LENGTH
    );

    updateMessageCounter();

    messageInput.addEventListener("input", () => {

        updateMessageCounter();

    });

}


function updateMessageCounter() {

    const messageInput = document.getElementById("message");

    const messageCount = document.getElementById("messageCount");

    if (!messageInput || !messageCount) return;

    messageCount.textContent = messageInput.value.length;

}
