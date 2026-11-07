
/* =========================================
   DIVCODES ACADEMY
   Dynamic Course Details
   ========================================= */


/* =========================================
   1. COURSE DATABASE
   ========================================= */

const coursesData = {

    "web-development": {

        title: "Web Development",

        category: "Development",

        level: "Beginner",

        duration: "8 Weeks",

        image: "img/web-development.jpg",
        description:
            "Learn how to create modern, responsive websites from scratch using the core technologies of web development.",

        longDescription:
            "This course introduces students to the world of web development through practical exercises and real-world projects. You will start with HTML and CSS, move into JavaScript fundamentals, and learn how Bootstrap helps you build responsive layouts. By the end, you will have the foundation to create and publish your own websites.",

        outcomes: [
            "Understand HTML5 and semantic page structure.",
            "Create attractive layouts using CSS.",
            "Build responsive websites with Bootstrap.",
            "Understand JavaScript fundamentals.",
            "Work with DOM elements and events.",
            "Develop a complete website project."
        ],

        requirements: [
            "No previous programming experience is required.",
            "A computer or laptop with internet access.",
            "A modern web browser such as Chrome.",
            "Willingness to practice and complete projects."
        ]

    },


    "python": {

        title: "Python Programming",

        category: "Programming",

        level: "Beginner",

        duration: "6 Weeks",

        image: "img/python.avif",

        description:
            "Start your programming journey with Python, one of the most versatile and beginner-friendly programming languages.",

        longDescription:
            "Explore Python programming from the fundamentals to practical application development. You will understand how to write clean code, solve problems using programming logic, and organize your applications with functions and object-oriented programming.",

        outcomes: [
            "Understand variables and data types.",
            "Use conditions and loops.",
            "Create and use functions.",
            "Work with lists, tuples and dictionaries.",
            "Understand object-oriented programming.",
            "Build small Python applications."
        ],

        requirements: [
            "No previous programming experience is required.",
            "A computer or laptop.",
            "Python installed on your computer.",
            "Basic computer skills."
        ]

    },


    "data-analytics": {

        title: "Data Analytics",

        category: "Data & Analytics",

        level: "Intermediate",

        duration: "10 Weeks",

        image: "img/data-analytics.jpg",

        description:
            "Discover how to collect, clean, analyze and visualize data to make better decisions.",

        longDescription:
            "Learn the essential tools used in data analytics. This course combines Python, SQL and data visualization techniques to help you transform raw information into meaningful insights. Work with real datasets and create analytical reports.",

        outcomes: [
            "Understand data analytics fundamentals.",
            "Write SQL queries to retrieve data.",
            "Clean datasets using Python and Pandas.",
            "Analyze data and identify patterns.",
            "Create charts and visualizations.",
            "Complete a practical data analysis project."
        ],

        requirements: [
            "Basic computer knowledge.",
            "Basic mathematical understanding.",
            "Some familiarity with Python is recommended.",
            "A computer with internet access."
        ]

    },


    "ui-ux": {

        title: "UI/UX Design",

        category: "Design",

        level: "Beginner",

        duration: "5 Weeks",

        image: "UI-UX.jpg",

        description:
            "Learn to design beautiful and user-friendly digital experiences through practical design exercises.",

        longDescription:
            "Discover the principles of user interface and user experience design. Learn how to understand user needs, create wireframes, organize layouts and build interactive prototypes for websites and applications.",

        outcomes: [
            "Understand UI and UX principles.",
            "Learn color theory and typography.",
            "Create wireframes and layouts.",
            "Design user-friendly interfaces.",
            "Build interactive prototypes.",
            "Present a complete design project."
        ],

        requirements: [
            "No previous design experience is required.",
            "A computer or laptop.",
            "Internet access.",
            "Interest in creativity and visual design."
        ]

    },


    "cybersecurity": {

        title: "Cybersecurity Fundamentals",

        category: "Cybersecurity",

        level: "Intermediate",

        duration: "8 Weeks",

        image: "img/cyber.webp",

        description:
            "Understand the foundations of cybersecurity and learn how to identify and protect against common digital threats.",

        longDescription:
            "Explore the fundamentals of information security, networking and digital protection. Learn about common vulnerabilities, authentication, security practices and defensive techniques through controlled educational exercises.",

        outcomes: [
            "Understand cybersecurity fundamentals.",
            "Learn basic networking concepts.",
            "Identify common security threats.",
            "Understand authentication and access control.",
            "Explore basic security tools.",
            "Learn essential defensive security practices."
        ],

        requirements: [
            "Basic computer knowledge.",
            "An interest in technology and security.",
            "Basic networking knowledge is recommended.",
            "A computer with internet access."
        ]

    },


    "react": {

        title: "React Development",

        category: "Development",

        level: "Advanced",

        duration: "9 Weeks",

        image: "img/react.png",

        description:
            "Develop interactive web applications using React and modern frontend development techniques.",

        longDescription:
            "Move beyond basic frontend development and discover React. Learn how to build reusable components, manage application state, navigate between pages and connect your applications to external APIs.",

        outcomes: [
            "Understand React and component architecture.",
            "Create reusable React components.",
            "Work with props and state.",
            "Understand React Hooks.",
            "Implement routing and navigation.",
            "Connect applications to APIs.",
            "Build a complete React application."
        ],

        requirements: [
            "Good knowledge of HTML and CSS.",
            "Understanding of JavaScript fundamentals.",
            "Basic knowledge of ES6 syntax.",
            "A computer with Node.js installed."
        ]

    }

};


/* =========================================
   2. GET SELECTED COURSE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const courseId = params.get("id");

    const selectedCourse = coursesData[courseId];


    if (!selectedCourse) {

        showCourseNotFound();

        return;

    }


    displayCourseDetails(selectedCourse, courseId);

});


/* =========================================
   3. DISPLAY COURSE INFORMATION
   ========================================= */

function displayCourseDetails(course, courseId) {

    // Update browser title
    document.title = `${course.title} | DivCodes Academy`;


    // Basic course information
    document.getElementById("courseTitle").textContent = course.title;

    document.getElementById("courseCategory").textContent = course.category;

    document.getElementById("courseDescription").textContent = course.description;

    document.getElementById("courseDuration").textContent = course.duration;

    document.getElementById("courseLevel").textContent = course.level;


    // Breadcrumb
    document.getElementById("breadcrumbCourse").textContent = course.title;


    // Course image
    const courseImage = document.getElementById("courseImage");

    courseImage.src = course.image;

    courseImage.alt = course.title;


    // Detailed description
    document.getElementById("longDescription").textContent =
        course.longDescription;


    // Sidebar information
    document.getElementById("sidebarDuration").textContent =
        course.duration;

    document.getElementById("sidebarLevel").textContent =
        course.level;


    // Registration link
    document.getElementById("enrollButton").href =
        `register.html?course=${encodeURIComponent(courseId)}`;


    // Learning outcomes
    displayLearningOutcomes(course.outcomes);


    // Requirements
    displayRequirements(course.requirements);

}


/* =========================================
   4. DISPLAY LEARNING OUTCOMES
   ========================================= */

function displayLearningOutcomes(outcomes) {

    const container = document.getElementById("learningOutcomes");

    container.innerHTML = "";

    outcomes.forEach(outcome => {

        const item = document.createElement("div");

        item.className = "outcome-item";

        const icon = document.createElement("i");

        icon.className = "bi bi-check-circle-fill";

        const text = document.createElement("span");

        text.textContent = outcome;

        item.append(icon, text);

        container.appendChild(item);

    });

}


/* =========================================
   5. DISPLAY REQUIREMENTS
   ========================================= */

function displayRequirements(requirements) {

    const container = document.getElementById("courseRequirements");

    container.innerHTML = "";

    requirements.forEach(requirement => {

        const item = document.createElement("div");

        item.className = "requirement-item";

        const icon = document.createElement("i");

        icon.className = "bi bi-check2";

        const text = document.createElement("span");

        text.textContent = requirement;

        item.append(icon, text);

        container.appendChild(item);

    });

}


/* =========================================
   6. COURSE NOT FOUND
   ========================================= */

function showCourseNotFound() {

    const title = document.getElementById("courseTitle");

    const description = document.getElementById("courseDescription");

    const enrollButton = document.getElementById("enrollButton");

    title.textContent = "Course not found";

    description.textContent =
        "Sorry, we couldn't find this course. Please return to our course catalog and select another course.";

    enrollButton.textContent = "Explore Courses";

    enrollButton.href = "courses.html";

    enrollButton.classList.remove("btn-primary-custom");

    enrollButton.classList.add("btn-outline-dark-custom");

}
