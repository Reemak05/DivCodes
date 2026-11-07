
/* =========================================
   DIVCODES ACADEMY
   MY COURSES - STUDENT DASHBOARD
   ========================================= */


/* =========================================
   1. CONFIGURATION
   ========================================= */

const REGISTRATION_STORAGE_KEY = "divcodesRegistrations";


/* =========================================
   2. COURSE INFORMATION
   ========================================= */

const dashboardCourses = {

    "web-development": {
        title: "Web Development",
        category: "Development",
        level: "Beginner",
        duration: "8 Weeks",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80"
    },

    "python": {
        title: "Python Programming",
        category: "Programming",
        level: "Beginner",
        duration: "6 Weeks",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=700&q=80"
    },

    "data-analytics": {
        title: "Data Analytics",
        category: "Data & Analytics",
        level: "Intermediate",
        duration: "10 Weeks",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80"
    },

    "ui-ux": {
        title: "UI/UX Design",
        category: "Design",
        level: "Beginner",
        duration: "5 Weeks",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=700&q=80"
    },

    "cybersecurity": {
        title: "Cybersecurity Fundamentals",
        category: "Cybersecurity",
        level: "Intermediate",
        duration: "8 Weeks",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=80"
    },

    "react": {
        title: "React Development",
        category: "Development",
        level: "Advanced",
        duration: "9 Weeks",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80"
    }

};


/* =========================================
   3. DASHBOARD INITIALIZATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});


function initializeDashboard() {

    renderRegisteredCourses();

    initializeRemoveModal();

}


/* =========================================
   4. GET REGISTRATIONS
   ========================================= */

function getSavedRegistrations() {

    try {

        const savedData = localStorage.getItem(
            REGISTRATION_STORAGE_KEY
        );

        const registrations = savedData
            ? JSON.parse(savedData)
            : [];

        return Array.isArray(registrations)
            ? registrations
            : [];

    } catch (error) {

        console.error(
            "Error reading registrations:",
            error
        );

        return [];

    }

}


/* =========================================
   5. RENDER REGISTERED COURSES
   ========================================= */

function renderRegisteredCourses() {

    const container = document.getElementById(
        "myCoursesContainer"
    );

    const emptyState = document.getElementById(
        "emptyState"
    );

    if (!container || !emptyState) return;


    const registrations = getSavedRegistrations();

    container.replaceChildren();


    // Update dashboard statistics
    updateDashboardStatistics(registrations);


    // Display empty state
    if (registrations.length === 0) {

        emptyState.classList.remove("d-none");

        return;

    }


    emptyState.classList.add("d-none");


    // Display each registered course
    registrations.forEach(registration => {

        const courseCard = createCourseCard(registration);

        if (courseCard) {

            container.appendChild(courseCard);

        }

    });

}


/* =========================================
   6. CREATE COURSE CARD
   ========================================= */

function createCourseCard(registration) {

    const course = dashboardCourses[registration.courseId];

    if (!course || !registration.id) {

        return null;

    }


    // Main Bootstrap column
    const column = document.createElement("div");

    column.className = "col-md-6 col-lg-4";


    // Card
    const card = document.createElement("article");

    card.className = "registered-course-card";


    // Course image
    const image = document.createElement("img");

    image.className = "registered-course-image";

    image.src = course.image;

    image.alt = course.title;

    image.loading = "lazy";


    // Card content
    const content = document.createElement("div");

    content.className = "registered-course-content";


    // Category
    const category = document.createElement("span");

    category.className = "registered-course-category";

    category.textContent = course.category;


    // Course title
    const title = document.createElement("h3");

    title.textContent = course.title;


    // Course metadata
    const metadata = document.createElement("div");

    metadata.className = "registered-course-meta";


    const duration = createMetaItem(
        "bi-clock",
        course.duration
    );

    const level = createMetaItem(
        "bi-bar-chart",
        course.level
    );


    metadata.append(duration, level);


    // Registration date
    const registrationDate = document.createElement("span");

    registrationDate.className = "registration-date";

    registrationDate.innerHTML = "";

    const dateIcon = document.createElement("i");

    dateIcon.className = "bi bi-calendar3 me-1";

    registrationDate.appendChild(dateIcon);

    registrationDate.appendChild(
        document.createTextNode(
            "Registered: " + formatRegistrationDate(
                registration.registeredAt
            )
        )
    );


    // Action buttons
    const actions = document.createElement("div");

    actions.className = "registered-course-actions";


    // View details
    const viewButton = document.createElement("a");

    viewButton.href =
        `course-details.html?id=${encodeURIComponent(registration.courseId)}`;

    viewButton.className = "btn btn-primary-custom flex-grow-1";

    viewButton.textContent = "View Course";


    // Remove course
    const removeButton = document.createElement("button");

    removeButton.type = "button";

    removeButton.className = "remove-course-button";

    removeButton.setAttribute("aria-label", "Remove " + course.title);

    removeButton.innerHTML = '<i class="bi bi-trash3"></i>';


    removeButton.addEventListener("click", () => {

        openRemoveModal(registration.id, course.title);

    });


    actions.append(viewButton, removeButton);


    // Build card
    content.append(
        category,
        title,
        metadata,
        registrationDate,
        actions
    );

    card.append(image, content);

    column.appendChild(card);


    return column;

}


/* =========================================
   7. CREATE METADATA ITEM
   ========================================= */

function createMetaItem(iconName, text) {

    const item = document.createElement("span");

    const icon = document.createElement("i");

    icon.className = `bi ${iconName}`;

    item.append(
        icon,
        document.createTextNode(text)
    );

    return item;

}


/* =========================================
   8. FORMAT REGISTRATION DATE
   ========================================= */

function formatRegistrationDate(dateValue) {

    if (!dateValue) {

        return "Date unavailable";

    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {

        return "Date unavailable";

    }

    return new Intl.DateTimeFormat("en", {

        day: "numeric",

        month: "short",

        year: "numeric"

    }).format(date);

}


/* =========================================
   9. UPDATE DASHBOARD STATISTICS
   ========================================= */

function updateDashboardStatistics(registrations) {

    const totalCourses = document.getElementById(
        "totalCourses"
    );

    const latestRegistration = document.getElementById(
        "latestRegistration"
    );


    // Total registered courses
    totalCourses.textContent = registrations.length;


    // Latest registration
    if (registrations.length === 0) {

        latestRegistration.textContent = "--";

        return;

    }


    const validDates = registrations

        .map(item => new Date(item.registeredAt))

        .filter(date => !Number.isNaN(date.getTime()));


    if (validDates.length === 0) {

        latestRegistration.textContent = "--";

        return;

    }


    const latestDate = new Date(
        Math.max(...validDates.map(date => date.getTime()))
    );


    latestRegistration.textContent =
        new Intl.DateTimeFormat("en", {

            day: "numeric",

            month: "short",

            year: "numeric"

        }).format(latestDate);

}


/* =========================================
   10. REMOVE COURSE MODAL
   ========================================= */

let selectedRegistrationId = null;


function initializeRemoveModal() {

    const confirmButton = document.getElementById(
        "confirmRemoveButton"
    );

    if (!confirmButton) return;


    confirmButton.addEventListener("click", () => {

        if (!selectedRegistrationId) return;


        removeRegisteredCourse(selectedRegistrationId);


        // Close Bootstrap modal
        const modalElement = document.getElementById(
            "removeCourseModal"
        );

        const modal = bootstrap.Modal.getInstance(
            modalElement
        );

        if (modal) {

            modal.hide();

        }

        selectedRegistrationId = null;

    });

}


/* =========================================
   11. OPEN REMOVE MODAL
   ========================================= */

function openRemoveModal(registrationId, courseName) {

    selectedRegistrationId = registrationId;


    const modalElement = document.getElementById(
        "removeCourseModal"
    );

    const modalTitle = document.getElementById(
        "removeCourseTitle"
    );


    modalTitle.textContent =
        `Remove ${courseName}?`;


    const modal = bootstrap.Modal.getOrCreateInstance(
        modalElement
    );

    modal.show();

}


/* =========================================
   12. REMOVE REGISTERED COURSE
   ========================================= */

function removeRegisteredCourse(registrationId) {

    const registrations = getSavedRegistrations();


    // Remove selected registration only
    const updatedRegistrations = registrations.filter(
        registration => registration.id !== registrationId
    );


    try {

        localStorage.setItem(
            REGISTRATION_STORAGE_KEY,
            JSON.stringify(updatedRegistrations)
        );


        // Refresh dashboard
        renderRegisteredCourses();


    } catch (error) {

        console.error("Unable to remove course:", error);

        alert(
            "Unable to update your learning list. Please try again."
        );

    }

}
