# 🧭 Team Pulse Dashboard

A comprehensive **productivity monitoring tool** built with **React, TypeScript, and Redux Toolkit** that provides **role-based views**, **real-time monitoring**, and **task management** for internal teams.

---

## 🚀 Project Overview

**Team Pulse Dashboard** enables seamless collaboration and productivity tracking within a team.

### 👨‍💼 Team Leads Can:
- Monitor team member statuses
- Assign & manage tasks
- Track team performance
- View analytics and reports

### 👨‍💻 Team Members Can:
- Update their work status
- Manage task progress
- View personal productivity insights

### 🔄 Real-Time Features
- Status monitoring (Working, Break, Meeting, Offline)
- Automatic inactivity detection & offline reset
- Interactive charts for insights

---

## ✨ Key Features

- **Role-Based Access Control** (Team Lead / Team Member)
- **Real-Time Status Monitoring**
- **Task Management System**
- **Auto-Reset** to *Offline* after **1 minute** of inactivity
- **Interactive Charts** (Chart.js + react-chartjs-2)
- **Dark/Light Mode**
- **Fully Responsive UI**
- **Modern, clean dashboard design**

---

## 🛠 Tech Stack

### **Frontend**
- React 18 (with Hooks)
- TypeScript
- Tailwind CSS
- Chart.js (via react-chartjs-2)

### **State Management**
- Redux Toolkit
- createSlice for predictable updates
- Typed hooks
- Custom logic hooks

### **Developer Tools**
- TypeScript
- ESLint
- PostCSS

---

## 📋 Prerequisites

Make sure you have installed:

- **Node.js** ≥ 14
- **npm** or **yarn**

---

## 🏃‍♂️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd team-pulse-dashboard
```
### 2. Install Dependencies
```
npm install
OR 
yarn install
```

### 3. Start the Development Server
Create a .env file in the root directory (if needed):
```
REACT_APP_API_URL=your_api_url_here
```

### 4. Start Development Server
```
npm start
OR 
yarn start
```

### The application will open in your browser at http://localhost:3000

## ✨ Features

### 👥 User Roles & Functionality

| Feature | Team Lead View | Team Member View |
| :--- | :--- | :--- |
| **Status** | View all members with current **status badges** | **Change current status** (Working, Break, Meeting, Offline) |
| **Tasks** | **Assign new tasks** with due dates and priorities | View assigned tasks with **progress tracking** |
| **Controls** | Filtering & Sorting (by status, active tasks) | **Progress Controls** (Increment/decrement task progress in 10% steps) |
| **Analytics** | View **team performance** charts and reports | View **individual productivity** charts |
| **Actions** | Quick Actions (Generate reports, schedule meetings, bulk assign tasks) | N/A |

---

### 🔄 Auto-Reset Feature

The application includes an intelligent inactivity detection system to ensure status accuracy:

* **1-Minute Timeout:** Users are automatically set to **"Offline"** after 1 minute of continuous inactivity.
* **Activity Tracking:** Monitors **mouse movements**, **clicks**, **keyboard input**, and **scrolls**.
* **Real-time Updates:** Checks for inactivity every **30 seconds**.
* **Status Change Integration:** Activity is reset and monitored upon task progress changes and manual status updates.


---

### 🎨 Design & Accessibility

* **Modern UI:** Clean, **card-based design** inspired by professional dashboards.
* **Theming:** **Dark/Light Mode** toggle with persistent user settings.
* **Responsive Layout:** Adapts seamlessly to **desktop, tablet, and mobile** screens.
* **Accessibility:** Adheres to standards with proper **contrast ratios** and **keyboard navigation** support.
* **Smooth Animations:** Utilizes **CSS transitions** for an enhanced user experience.

---

### 📊 Data Visualization

The dashboard provides comprehensive insights through interactive charts:

| Chart Type | Data Displayed |
| :--- | :--- |
| **Doughnut Chart** | Employee Status Distribution (showing team availability) |
| **Bar Chart** | Weekly Productivity (tracking team performance) |
| **Line Chart** | Employee Growth (showing team expansion over time) |
| **Interactivity** | Hover tooltips and responsive chart design |

---

## 🔧 Configuration & Technology

### Redux Store

The application uses **Redux Toolkit** for efficient and predictable state management, organized into three main slices:

* `membersSlice`: Manages the state of all team members and their assigned tasks.
* `roleSlice`: Handles the current user's role (Lead/Member) and identity.
* `themeSlice`: Controls the application's dark/light mode theme setting.

### Custom Hooks

* `useAppSelector` & `useAppDispatch`: Typed Redux hooks for seamless state interaction.
* `useAutoResetStatus`: Manages the inactivity tracking and controls the auto-reset functionality.

---

## 💻 Available Scripts

In the project directory, you can run:

* `npm start`: Runs the app in **development mode**. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
* `npm run build`: **Builds the app for production** to the `build` folder.
* `npm test`: **Launches the test runner** in interactive watch mode.
* `npm run eject`: **Ejects from Create React App** configuration. **(Warning: This is a one-way operation. You can’t go back!)**

---

## 🤝 Contributing

We welcome contributions! To get started:

1.  **Fork** the repository.
2.  Create a feature branch: `git checkout -b feature/amazing-feature`
3.  Commit your changes: `git commit -m 'Add some amazing feature'`
4.  Push to the branch: `git push origin feature/amazing-feature`
5.  **Open a Pull Request** to the main branch.