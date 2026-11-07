
/* =========================================
   DIVCODES ACADEMY
   Courses Page Functionality
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeCourseFilters();

});


/* =========================================
   1. COURSE SEARCH AND FILTERS
   ========================================= */

function initializeCourseFilters() {

    // Select HTML elements
    const searchInput = document.getElementById("courseSearch");

    const categoryFilter = document.getElementById("categoryFilter");

    const levelFilter = document.getElementById("levelFilter");

    const resetButton = document.getElementById("resetFilters");

    const emptyResetButton = document.getElementById("emptyResetButton");

    const coursesContainer = document.getElementById("coursesContainer");

    const courseCount = document.getElementById("courseCount");

    const noCoursesMessage = document.getElementById("noCoursesMessage");


    // Stop if this page does not contain the catalog
    if (
        !searchInput ||
        !categoryFilter ||
        !levelFilter ||
        !coursesContainer
    ) {
        return;
    }


    // Get all course cards
    const courseCards = Array.from(
        coursesContainer.querySelectorAll(".course-item")
    );


    /* =====================================
       2. FILTER COURSES
       ===================================== */

    function filterCourses() {

        // Get current filter values
        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        const selectedCategory = categoryFilter.value;

        const selectedLevel = levelFilter.value;


        // Find matching courses
        const filteredCourses = courseCards.filter(card => {

            const courseName = card.dataset.name.toLowerCase();

            const courseCategory = card.dataset.category;

            const courseLevel = card.dataset.level;


            // Check course name
            const matchesSearch = courseName.includes(searchValue);


            // Check category
            const matchesCategory =
                selectedCategory === "all" ||
                courseCategory === selectedCategory;


            // Check level
            const matchesLevel =
                selectedLevel === "all" ||
                courseLevel === selectedLevel;


            // All conditions must be true
            return (
                matchesSearch &&
                matchesCategory &&
                matchesLevel
            );

        });


        // Update course visibility
        courseCards.forEach(card => {

            card.hidden = !filteredCourses.includes(card);

        });


        // Update result count
        courseCount.textContent = filteredCourses.length;


        // Display empty state when no results exist
        if (filteredCourses.length === 0) {

            noCoursesMessage.classList.remove("d-none");

        } else {

            noCoursesMessage.classList.add("d-none");

        }

    }


    /* =====================================
       3. RESET FILTERS
       ===================================== */

    function resetFilters() {

        searchInput.value = "";

        categoryFilter.value = "all";

        levelFilter.value = "all";

        filterCourses();

    }


    /* =====================================
       4. EVENT LISTENERS
       ===================================== */

    // Search while typing
    searchInput.addEventListener("input", filterCourses);


    // Filter by category
    categoryFilter.addEventListener("change", filterCourses);


    // Filter by level
    levelFilter.addEventListener("change", filterCourses);


    // Reset button
    resetButton.addEventListener("click", resetFilters);


    // Empty results reset button
    emptyResetButton.addEventListener("click", resetFilters);


    // Initial display
    filterCourses();

}
