# DivCodes Academy

### Turn Curiosity into Code.

A modern, responsive online programming academy platform built to make discovering and exploring technology courses simple and accessible.

---

## Overview

**DivCodes Academy** is a front-end web development project designed to simulate an online learning platform. It provides visitors with an organized way to explore programming courses, view detailed course information, register for courses, and manage their learning journey through a student dashboard.

The platform focuses on responsive design, intuitive navigation, reusable UI patterns, and interactive JavaScript functionality.

## Key Features

- **Responsive Homepage** — Modern landing page introducing the academy and highlighting featured courses.
- **Course Catalog** — Browse courses with interactive search and filtering by category and difficulty level.
- **Dynamic Course Details** — Display course descriptions, duration, requirements, learning outcomes, and enrollment information.
- **Course Registration** — Interactive registration form with input validation.
- **Student Dashboard** — View registered courses and manage enrollment information.
- **Contact Page** — Contact form, academy information, and frequently asked questions.
- **Persistent Browser Storage** — Uses Local Storage to retain registration data between browser sessions.
- **Responsive Interface** — Adaptable layouts for desktop, tablet, and mobile screens.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and semantic markup |
| CSS3 | Custom styling and responsive layouts |
| Bootstrap 5 | Responsive grid system and UI components |
| JavaScript (ES6+) | Interactivity and dynamic content |
| Bootstrap Icons | Interface icons |
| Google Fonts | Typography |
| Local Storage | Client-side registration data persistence |

## Project Structure

```text
DivCodes/
│
├── index.html
├── courses.html
├── course-details.html
├── register.html
├── my-courses.html
├── contact.html
│
├── css/
│   ├── style.css
│
├── js/
│   ├── main.js
│   ├── courses.js
│   ├── course-details.js
│   ├── register.js
│   ├── my-courses.js
│   └── contact.js
│
├── images/
│
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- A modern web browser.
- Visual Studio Code (recommended).
- Git (optional).
- Live Server extension for Visual Studio Code (recommended).

### Installation

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd DivCodes
```

**3. Open the project**

```bash
code .
```

**4. Run the application**

Open `index.html` using the Live Server extension, or open the file directly in your browser.

## Application Pages

| Page | Description |
|---|---|
| Home | Academy introduction and featured courses |
| Courses | Course catalog with search and filters |
| Course Details | Detailed information about individual courses |
| Register | Student course registration |
| My Courses | Student enrollment dashboard |
| Contact | Contact information and inquiry form |

## Data Management

The project uses the browser's **Local Storage API** to store course registration information.

This allows users to:
- Register for courses.
- Retain registration information after refreshing the page.
- View registered courses in the student dashboard.
- Remove course registrations.

**Note:** This is a front-end demonstration project. It does not currently include a backend server, database, real authentication system, or actual email delivery.

## Responsive Design

The interface is designed to adapt to different screen sizes, including:

- Desktop computers
- Laptops
- Tablets
- Mobile phones

## Future Improvements

- Backend integration using Node.js or Flask.
- Database integration using MySQL.
- Secure user authentication and authorization.
- Admin dashboard for course management.
- Online payment integration.
- Real email notifications.
- Student progress tracking.

## Developer

**Reem Abou Khalil**

Computer Science Graduate | Aspiring Web Developer

[GitHub](https://github.com/Reemak05)

---

*Developed as a web development project to demonstrate front-end development, responsive UI design, and JavaScript programming skills.*

