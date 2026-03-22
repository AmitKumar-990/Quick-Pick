<img width="1920" height="1080" alt="Screenshot 2026-03-22 152953" src="https://github.com/user-attachments/assets/8f9d22d7-eebe-4088-ad98-95bf069ca1f9" />
<img width="1920" height="1080" alt="Screenshot 2026-03-22 152946" src="https://github.com/user-attachments/assets/b5e29505-5bbd-4334-9544-da412698f579" />
<img width="1920" height="1080" alt="Screenshot 2026-03-22 152925" src="https://github.com/user-attachments/assets/98344131-3c65-454c-9b99-a43d9e2271c2" />
<img width="1920" height="1080" alt="Screenshot 2026-03-22 152936" src="https://github.com/user-attachments/assets/f4bfcda0-ab3a-418a-b343-ee7a6997200d" />


# Quick Pick

A modern poll-based web application where users can create polls, vote, and make decisions faster.

---

## Features

*  Create and manage polls
*  Vote on polls
*  Authentication (Login / Register)
*  Prevent duplicate voting
*  Real-time vote count display
*  Clean and responsive UI
*  Protected routes (Dashboard access control)
*  Secure logout system

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* SweetAlert2

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## Folder Structure

```
Quick-Decision/
│
├── client/        # Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── App.jsx
│
├── server/        # Backend (Node + Express)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/AmitKumar-990/Quick-Pick.git
cd quick-pick
```

---

### 2. Setup Backend

```
cd server
npm install
npm run dev
```

---

### 3. Setup Frontend

```
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the server folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Authentication Flow

* User logs in → token stored in `localStorage`
* Protected routes check token
* Logout removes token and redirects to login
* Back navigation is blocked using `replace: true`

---

## Key Learnings

* Handling authentication in React
* Managing protected routes
* UI/UX improvements for real-world apps
* State management for voting systems
* Backend validation for user actions

---

## Future Improvements

*  Add Admin Panel
*  Improve UI Design
*  Add Comment option on Polls
  

---

## Author

**Amit**
BCA Graduate | Full Stack Developer

---
