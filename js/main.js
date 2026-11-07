

/* =========================================
   DIVCODES ACADEMY
   Main JavaScript File
   ========================================= */


/* =========================================
   1. DOM CONTENT LOADED
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavbar();
    initializeCurrentYear();
    initializeSmoothScroll();
    initializeImageFallback();

});


/* =========================================
   2. NAVBAR FUNCTIONALITY
   ========================================= */

function initializeNavbar() {

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (!navbar) return;

    // Close mobile navbar after clicking a link
    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const navbarCollapse = document.querySelector("#mainNavbar");

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {

                const collapseInstance =
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

                collapseInstance.hide();

            }

        });

    });

    // Update active navigation link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


/* =========================================
   3. DYNAMIC COPYRIGHT YEAR
   ========================================= */

function initializeCurrentYear() {

    const yearElements = document.querySelectorAll(".current-year");

    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {

        element.textContent = currentYear;

    });

}


/* =========================================
   4. SMOOTH SCROLLING
   ========================================= */

function initializeSmoothScroll() {

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


/* =========================================
   5. IMAGE FALLBACK
   ========================================= */

function initializeImageFallback() {

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.alt = "Image currently unavailable";

        });

    });

}


/* =========================================
   6. REUSABLE NOTIFICATION FUNCTION
   ========================================= */

function showNotification(message, type = "success") {

    const notification = document.createElement("div");

    notification.className = `alert alert-${type} notification-message`;

    notification.setAttribute("role", "status");

    notification.textContent = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {

        notification.classList.add("show");

    });

    window.setTimeout(() => {

        notification.classList.remove("show");

        window.setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3000);

}
