## Employee Management CRUD App

A full-stack CRUD (Create, Read, Update, Delete) application to manage employees. Built with React (frontend) and Node.js + Express + SQLite (backend). Features modern Tailwind CSS UI with 3D animations, search, and form validation.

Table of Contents

Project Goal

Tech Stack

Features

Setup & Installation

Backend

Frontend

API Endpoints

Frontend Components

3D Animations

Bonus Features

Evaluation Criteria

Project Goal

A simple and effective CRUD application to manage employees. Users can:

Create, view, update, and delete employees.

Search employees by name.

Interact with a responsive, animated frontend.

Tech Stack

Frontend: React.js, Tailwind CSS, React Modal, React Toastify

Backend: Node.js, Express.js, SQLite

HTTP Client: Axios

Features
Backend

Full CRUD REST API for /employees.

Employee model:

{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Frontend Developer"
}


Uses SQLite for persistent storage.

## Frontend

Employee list displayed in a responsive table.

Form to add a new employee with validation.

Edit employee details via modal.

Delete employee with confirmation popup.

Search bar to filter employees by name.

3D hover animations for table rows and buttons.

Setup & Installation
Backend

Clone the repo and navigate to the backend folder:

git clone <https://github.com/ShivaBoya/EmployeeManagement>


Install dependencies:

npm install


## Start the server:

npm run dev


The server runs on http://localhost:3000.

SQLite database file employees.db will be created automatically.

## Frontend

Navigate to frontend folder:

cd employee-crud-frontend


Install dependencies:

npm install


Start the React app:

npm start


Access the frontend at http://localhost:5173 (Vite default).

Note: Ensure the backend is running to fetch and manipulate employee data.

API Endpoints
Method	Endpoint	Description
GET	/employees	Get all employees
GET	/employees?q=query	Search employees by name
POST	/employees	Create a new employee
PUT	/employees/:id	Update an employee
DELETE	/employees/:id	Delete an employee
Frontend Components

EmployeeForm.jsx:
Form for adding employees with validation and toast notifications.

EmployeeTable.jsx:
Responsive table with hover 3D effects, edit/delete buttons, and animated employee count.

EditModal.jsx:
Modal to edit employee details with Tailwind styling and smooth transitions.

App.jsx:
Combines all components, handles state, API calls via Axios, and integrates ToastContainer for notifications.

## 3D Animations

Hover over table rows: subtle scale and shadow effect.

Buttons have hover animations with shadow and scale.

Decorative background gradients and blurred circles enhance UI depth.

## Bonus Features ✨

Search/Filter employees in real-time.

Form Validation: prevents empty fields.

Toast Notifications: success/error messages for CRUD operations.

Ready for unit testing of backend endpoints.

Evaluation Criteria

Dev Skills & Code Quality:

Clean REST API for employee management.

React state management and form handling.

Completion:

All CRUD operations functional via UI.

UX/UI:

3D animations and interactive components for modern look and feel.