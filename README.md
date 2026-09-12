# Portfolio Website & C# ASP.NET Core API

A modular portfolio website showcasing software development projects, technical skills, and community management expertise. Built with a decoupled frontend architecture hosted on Vercel and backed by a C# ASP.NET Core REST API with SQLite database integration.

---

## Technical Architecture

* **Frontend:** Modular JavaScript / Next.js, HTML5, CSS3 (Tailwind CSS), deployed on Vercel.
* **Backend:** C# ASP.NET Core Web API (.NET 10 / .NET 8).
* **Database & ORM:** SQLite via Entity Framework Core (EF Core).
* **Data Management:** Static JSON storage for portfolio/skill data and SQLite persistence for contact form submissions.

---

## Features

* **Dynamic Content Loading:** Fetches skill matrix and project cards asynchronously from REST API endpoints.
* **Interactive Contact Form:** Validates user input and POSTs message payloads directly to the database.
* **Responsive Cyberpunk / Dark Aesthetic:** Custom-styled UI tailored for software development and Discord community architecture.
* **Decoupled Architecture:** Clean separation of concerns allowing independent updates to frontend assets or backend logic.

---

## Project Structure

```text
├── frontend/                 # Client-side codebase (Vercel deployment)
│   ├── js/                   # API interaction clients & dynamic UI scripts
│   ├── styles/               # Global styling and layouts
│   └── index.html            # Main markup
│
└── backend-api/              # C# Web API solution
    └── PortfolioApi/
        ├── Controllers/      # API Route Handlers (Contact, Projects, Skills)
        ├── Data/             # AppDbContext & portfolio-data.json
        ├── Models/           # Data models (ContactMessage, Project, Skill)
        ├── Services/         # Portfolio data service interfaces & logic
        └── Program.cs        # Middleware, CORS policy, & DI service registration
