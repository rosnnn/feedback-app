# Feedback Collector

A single-page microapplication built to collect and display user feedback. This project demonstrates a clean, responsive frontend with JSON-based storage, deployed as a static site on Netlify.

## Features
- **Feedback Form**: Collects full name, email (with validation), and a feedback message, with a loading state on submission.
- **Admin View**: Toggleable section to view all submitted feedback in a styled card layout, with a "Clear All Feedback" button.
- **Notifications**: Styled success messages ("Feedback submitted successfully" and "Feedback cleared successfully") appear outside the main card.
- **Storage**: Uses browser `localStorage` for persistent JSON-based storage.
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS.
- **Toggle Modes**: Can switch b/w dark and light modes.

## Tech Stack
- **Frontend**: 
  - React (18.2.0) with Vite (5.0.8) for fast development and building.
  - Tailwind CSS (3.4.1) for styling, with PostCSS (8.4.24) and Autoprefixer (10.4.14) for processing.
- **Storage**: JSON stored in browser `localStorage`, fulfilling the task’s "JSON-based storage" option.
- **Deployment**: Hosted on Netlify as a static site.

## Project Structure
Feedback-Apk/
├── src/                  # React source files
│   ├── App.jsx           # Main component with form and admin view
│   ├── main.jsx          # React entry point
│   └── index.css         # Global CSS with Tailwind imports
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration


- **`src/App.jsx`**: Core logic for form submission, feedback display, and clearing, with `localStorage` integration.

## Installation
1. **Clone the Repository**:
git clone https://github.com/rosnnn/feedback-app.git
cd feedback-app


2. **Install Dependencies**:
npm install


3. **Run Locally**:
npm run dev


- Opens at `http://localhost:5173`.

## Deployment Steps
1. **Build the Project**:
npm run build


2. **Deploy to Netlify**:
- Push to a public GitHub repository:
git add .
git commit -m "Deploy Feedback App"
git push origin main


- In Netlify:
- New site from Git > Select repo.
- Base directory: `/`.
- Build command: `vite build`.
- Publish directory: `dist`.
- Deploy site.
3. **Live URL**:

## Usage
- **Submit Feedback**: Enter your name, email, and message, then submit. See "Feedback submitted successfully" at the top.
- **View Feedback**: Click "View Submitted Feedback" to see all entries; click "Clear All Feedback" to reset.
- **Persistence**: Feedback persists in `localStorage` across page refreshes on the same browser.

## Notes
- Originally designed with Netlify Functions for POST/GET endpoints, but switched to `localStorage` due to persistent 404 errors during development.
- Meets task requirements for frontend (React, Tailwind), storage (JSON-based), and deployment (Netlify).
- Bonus features: Timestamp on submissions, mobile responsiveness, styled notifications, toggle modes(light and dark).

## Submitted By
- **Full Name**: Roshan Kumar Jha
- **GitHub**: https://github.com/rosnnn/feedback-app
- **Netlify**: https://app-feedback-collection.netlify.app/

© 2025 Rosn — Feedback Collector Submission
