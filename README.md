# ClinicFlow: Healthcare Management Application

## Description

ClinicFlow is a comprehensive healthcare application designed to streamline patient management and clinic operations. Built as a modern, single-page web application, it provides a suite of tools for managing patient queues, scheduling appointments, analyzing clinic performance, and leveraging AI for intelligent predictions. The application is now fully integrated with **Firebase Firestore**, ensuring all data is persistent and synchronized in real-time.

This project was developed within Firebase Studio.

## Features

*   **Dashboard Overview:** A central hub providing an at-a-glance summary of key clinic metrics, including live patient counts, appointments for the day, and available doctors.
*   **Dynamic Patient Queue:** Manage walk-in patients with a real-time queue.
    *   Add, update, and remove patients.
    *   Set patient priority to "Urgent" to move them to the top of the list.
    *   Track payment status with a "Paid/Pending" checklist.
*   **Appointment Scheduling:** A full-featured module for managing appointments.
    *   View doctor availability and schedules.
    *   Book new appointments using an interactive calendar.
*   **AI-Powered Wait Time Predictor:** Utilizes a Genkit AI model to estimate patient wait times based on symptoms, queue length, and time of day.
*   **AI Health Feed:** Generate health and wellness articles on any topic to engage and inform patients.
*   **Clinic Analytics:** A dedicated dashboard to visualize operational data.
    *   Track doctor performance based on patients seen and ratings.
    *   Analyze patient load by the hour to identify peak times.
*   **Persistent Data Storage:** All application data (patients, doctors, appointments) is stored in a **Google Firestore** database, ensuring data is saved across sessions.

## Technologies Used

This project is built using a modern, robust tech stack:

*   **Next.js:** A React framework for building performant, server-rendered applications.
*   **React:** A JavaScript library for building dynamic user interfaces.
*   **Firebase:** The application is connected to a Firebase project, utilizing:
    *   **Firestore:** A real-time NoSQL database for all data persistence.
    *   **App Hosting:** For easy deployment and hosting.
*   **TypeScript:** A typed superset of JavaScript that enhances code quality and developer experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Shadcn/ui:** A collection of beautifully designed and accessible React components.
*   **Genkit:** An open-source framework from Google for building production-ready AI applications.
*   **Zod:** A TypeScript-first schema declaration and validation library.

## Setup

To get the project running locally, follow these steps:

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will now be running on your local machine, connected to the provisioned Firebase backend.
