# AccrueMerit – Karma Management System

**Project Status:** Production Deployed  
**Version:** 4.0.0  

---

## 1. Executive Summary
**AccrueMerit** is an innovative, web-based platform designed to simulate the accumulation of merit and the recording of karma. By applying gamification techniques and 3D web visualization, the system helps users track, reflect upon, and improve their daily behavior through highly interactive experiences. This document serves as the project's technical overview, installation guide, and deployment report.

## 2. Core Features
* **Karma Logbooks:** Record positive actions (merit) and track negative behaviors (karma) using predefined or custom tags.
* **3D Karma Tree (Core Component):** A real-time, dynamic visual representation of the user's current spiritual state. High merit results in a flourishing tree, while negative karma causes it to wither.
* **Spiritual Simulations:** Interactive audio-visual tools, including a Virtual Wooden Fish (for mindfulness) and Incense Burning simulations.

## 3. System Architecture & Technology Stack
The application is built upon a decoupled, modern MERN-stack architecture utilizing TypeScript across both environments.

### Frontend (Client-Side)
* **Framework:** React with Vite
* **Language:** TypeScript
* **3D Rendering:** React Three Fiber / Three.js
* **Styling:** Tailwind CSS
* **Production Environment:** [Vercel](https://accrue-merit.vercel.app)

### Backend (Server-Side)
* **Runtime & Framework:** Node.js, Express.js
* **Language:** TypeScript
* **Architecture Pattern:** Clean/Layered Architecture (Controllers, Services, Models, Routes)
* **Production Environment:** [Render](https://accrue-merit.onrender.com)

### Database
* **Database:** MongoDB Atlas (Cloud DBaaS)
* **ODM:** Mongoose (Targeting `tichduc_db`)

---

## 4. Deployment Report & Technical Resolutions
During the transition from local development to cloud production, several architectural bottlenecks were identified and resolved to ensure system stability:

* **Module Resolution & Pathing:** The backend was strictly refactored to utilize ES6 Modules (`import`/`export`), resolving initialization errors and `MODULE_NOT_FOUND` exceptions within the layered directory structure.
* **Production Database Context:** Configured dynamic environment variables (`MONGODB_URI`) to ensure the production build targets the correct cloud cluster (`tichduc_db`) rather than defaulting to local memory databases, resolving empty data array `[]` returns.
* **Reverse Proxy & Routing Setup:** Replaced local Vite proxy configurations with a strict `vercel.json` rewrite strategy. This ensures all `/api/*` requests from the static Vercel frontend are properly forwarded to the Render backend destination, eliminating 404 Not Found errors.
* **Cross-Origin Resource Sharing (CORS):** Implemented specific CORS middleware on the Express server to explicitly whitelist the Vercel production domain, securing cross-platform data fetching.

---

## 5. Local Setup & Installation Guide

### Prerequisites
* Node.js (v18 or higher)
* MongoDB Atlas Account (or local MongoDB instance)
* Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/accrue-merit.git](https://github.com/your-username/accrue-merit.git)
   cd accrue-merit

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/accrue-merit.git](https://github.com/your-username/accrue-merit.git)
   cd accrue-merit

### 2. Backend Configuration

- cd backend
- npm install
Create a .env file in the backend directory based on .env.example (or configure the following variables):
PORT=5000

- cp .env.example .env

- npm run dev



### 3. Frontend Configuration

- cd frontend
- npm install
- npm run dev

