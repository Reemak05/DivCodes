
/* =========================================
   DIVCODES ACADEMY
   Registration System
   ========================================= */


/* =========================================
   1. CONFIGURATION
   ========================================= */

const STORAGE_KEY = "divcodesRegistrations";

const COURSE_NAMES = {

    "web-development": "Web Development",

    "python": "Python Programming",

    "data-analytics": "Data Analytics",

    "ui-ux": "UI/UX Design",

    "cybersecurity": "Cybersecurity Fundamentals",

    "react": "React Development"

};


/* =========================================
   2. INITIALIZE REGISTRATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeRegistration();

    initializeMessageCounter();

    preselectCourse();

});


/* =========================================
   3. GET SAVED REGISTRATIONS
   ========================================= */

function getRegistrations() {

    try {

        const savedData = localStorage.getItem(STORAGE_KEY);

        return savedData ? JSON.parse(savedData) : [];

    } catch (error) {

        console.error("Unable to read registrations:", error);

        return [];

    }

}


/* =========================================
   4. INITIALIZE FORM
   ========================================= */

function initializeRegistration() {

    const form = document.getElementById("registrationForm");

    if (!form) return;


    form.addEventListener("submit", event => {

        event.preventDefault();

        if (!validateRegistrationForm(form)) {

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


        // Create registration object
        const registration = {

            id: generateRegistrationId(),

            fullName: fullName,

            email: email,

            phone: phone,

            courseId: courseId,

            courseName: COURSE_NAMES[courseId],

            message: message,

            registeredAt: new Date().toISOString()

        };


        // Save registration
        const saved = saveRegistration(registration);

        if (!saved) {

            alert(
                "We couldn't save your registration. Please check your browser storage and try again."
            );

            return;

        }


        // Display confirmation
        displaySuccessMessage(registration);


        // Reset form
        form.reset();

        form.classList.remove("was-validated");

        document.getElementById("messageCount").textContent = "0";

        form.querySelectorAll(".is-valid, .is-invalid").forEach(input => {

            input.classList.remove("is-valid", "is-invalid");

        });

        window.scrollTo({
            top: document.getElementById("successMessage").offsetTop - 120,
            behavior: "smooth"
        });

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

    const terms = document.getElementById("terms");


    let isValid = true;


    // Full name validation
    const namePattern = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;

    if (
        fullName.value.trim().length < 3 ||
        fullName.value.trim().length > 80 ||
        !namePattern.test(fullName.value.trim())
    ) {

        setFieldError(fullName, true);

        isValid = false;

    } else {

        setFieldError(fullName, false);

    }


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email.value.trim())) {

        setFieldError(email, true);

        isValid = false;

    } else {

        setFieldError(email, false);

    }


    // Phone validation
    const phoneDigits = phone.value.replace(/\D/g, "");

    const phonePattern = /^[+\d\s().-]+$/;

    if (
        !phonePattern.test(phone.value.trim()) ||
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
    ) {

        setFieldError(phone, true);

        isValid = false;

    } else {

        setFieldError(phone, false);

    }


    // Course validation
    if (!Object.prototype.hasOwnProperty.call(COURSE_NAMES, course.value)) {

        setFieldError(course, true);

        isValid = false;

    } else {

        setFieldError(course, false);

    }


    // Terms validation
    if (!terms.checked) {

        terms.classList.add("is-invalid");

        isValid = false;

    } else {

        terms.classList.remove("is-invalid");

    }


    // Show Bootstrap validation styling
    form.classList.add("was-validated");


    return isValid;

}


/* =========================================
   6. UPDATE FIELD VALIDATION
   ========================================= */

function setFieldError(field, hasError) {

    field.classList.remove("is-valid", "is-invalid");

    if (hasError) {

        field.classList.add("is-invalid");

    } else {

        field.classList.add("is-valid");

    }

}


/* =========================================
   7. GENERATE REGISTRATION ID
   ========================================= */

function generateRegistrationId() {

    return "DC-" +
        Date.now().toString(36).toUpperCase() +
        "-" +
        Math.random().toString(36).slice(2, 7).toUpperCase();

}


/* =========================================
   8. SAVE REGISTRATION
   ========================================= */

function saveRegistration(registration) {

    try {

        const registrations = getRegistrations();

        registrations.push(registration);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(registrations)
        );

        return true;

    } catch (error) {

        console.error("Registration could not be saved:", error);

        return false;

    }

}


/* =========================================
   9. DISPLAY SUCCESS MESSAGE
   ========================================= */

function displaySuccessMessage(registration) {

    const successMessage = document.getElementById("successMessage");

    const successText = document.getElementById("successText");

    successText.textContent =
        `Thank you, ${registration.fullName}! Your registration for ${registration.courseName} has been saved successfully.`;

    successMessage.classList.remove("d-none");

}


/* =========================================
   10. PRESELECT COURSE
   ========================================= */

function preselectCourse() {

    const params = new URLSearchParams(window.location.search);

    const courseId = params.get("course");

    const courseSelect = document.getElementById("selectedCourse");

    if (!courseSelect || !courseId) return;


    // Only select valid courses
    if (Object.prototype.hasOwnProperty.call(COURSE_NAMES, courseId)) {

        courseSelect.value = courseId;

    }

}


/* =========================================
   11. MESSAGE CHARACTER COUNTER
   ========================================= */

function initializeMessageCounter() {

    const messageInput = document.getElementById("message");

    const messageCount = document.getElementById("messageCount");

    if (!messageInput || !messageCount) return;


    messageInput.addEventListener("input", () => {

        messageCount.textContent = messageInput.value.length;

    });

}
