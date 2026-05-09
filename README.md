SkyNav: Real-Time Global Flight Intelligence

✈️ Project Overview
SkyNav is a high-performance, multi-page aviation dashboard designed for travelers and aviation enthusiasts. It provides a consolidated, real-time interface for monitoring global flight movements, leveraging live data to offer deep insights into schedules, statuses, and flight telemetry.

[🚀 Live Demo](https://skynav-rho.vercel.app)

🛠️ Tech Stack
Frontend: React.js (Vite).

Styling: Tailwind CSS (Modern SaaS-inspired UI focusing on clean cards and soft shadows).

Routing: React Router DOM (createBrowserRouter, RouterProvider).

API: AviationStack Real-Time Flight API.

State Management: Functional React Hooks (useState, useEffect, useLocation).

🚀 Key Features
Multi-Criteria Intelligence: Specialized search modules to find flights by multiple parameters:

Airline & IATA: Traditional search by carrier name or flight code.

Destination: Filter global traffic by arrival airports.

Departure: Real-time monitoring of outgoing flights from specific hubs.

Date & Time: Historical and scheduled flight lookups.

Deep-Dive Details: Individual flight pages providing expanded technical data, including terminal information, gate assignments, and scheduled timings.

Optimized Performance: Implements state-passing between routes to minimize redundant API calls and improve user experience.

Responsive SaaS UI: A mobile-first, grid-based dashboard designed to mimic premium monitoring tools.

🏗️ Technical Architecture
This project demonstrates advanced foundational React patterns:

Modern Routing: Utilizes the createBrowserRouter pattern for clean, declarative navigation.

Asynchronous Data Handling: Native fetch implementation using async/await and robust try/catch error boundaries.

Dynamic Derived State: Real-time filtering of large API datasets without unnecessary re-renders.

Telemetry Passing: Efficient use of useLocation state to transfer complex flight objects between components.

👥 Team Members
Prajwal Kumar Yadav

Ayush Jyala

Snehaashish Sahoo
