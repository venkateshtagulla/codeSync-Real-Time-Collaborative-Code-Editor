
# 🎥 CodeSync - Real-Time-Collaborative-Code-Editor

**CodeSync** is a sleek and efficient real-time code collaboration web application that allows multiple users to collaborate on code within the same virtual room. It’s built with the powerful **MERN stack** and uses **Socket.IO** for seamless real-time communication.

---

## 🌐 Live Demo

🚀 Try out the app here: [CodeSync Live Demo](https://resplendent-kleicha-b2ea60.netlify.app)

---

## ✨ Features

- 🔗 Create or join virtual **rooms** using a Room ID
- 🧑‍💻 **Set a UserName** to identify yourself while collaborating
- 🔄 **Real-time code synchronization** with all connected users
- 🎨 **CodeMirror** integration for syntax highlighting
- ⚙️ Customizable **editor settings**

---

## 🛠️ Tech Stack

| Tech           | Usage                              |
|----------------|------------------------------------|
| ⚙️ **Express.js**   | Backend server & API routing       |
| ⚛️ **React**        | Frontend UI                       |
| 🟢 **Node.js**      | Backend runtime                   |
| 💬 **Socket.IO**    | Real-time WebSocket communication |
| 🔑 **uuid**         | Unique room ID generation         |
| ✍️ **CodeMirror**   | In-browser code editing           |

---

## 🚀 Getting Started

### ✅ Usage (Live Version)
1. Open the [CodeSync Website](https://resplendent-kleicha-b2ea60.netlify.app)
2. Enter a Room ID or generate a room ID
3. Set your UserName
4. Start coding together in real time 🎉

---

### 💻 Local Development

### Follow these steps to set up CodeSync on your machine:

1. **Clone the repository**  
   ```bash
   git clone https://github.com/venkateshtagulla/codeSync-Real-Time-Collaborative-Code-Editor.git
   cd codeSync-Real-Time-Collaborative-Code-Editor

### 📁 Project Directory Structure

```bash
codeSync/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── Actions.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   │   └── Socket.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── server/
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── Actions.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── package-lock.json
└── README.md
```
---
## 🧩 Install dependencies
### For both frontend and backend:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```
---
### 🚀 Start the App

```bash
# In one terminal (backend)
cd server
npm start

# In another terminal (frontend)
cd client
npm start

```
### 🔐 Environment Variables Setup

Before running the application, make sure to configure the required environment variables for both the backend and frontend.


---

#### 📦 Backend

In the `server/` directory, create a `.env` file:

```bash
cd server
touch .env

Add the following variables to the .env file:

jDoodle_clientId=your-client-id-here
jDoodle_clientSecret=your-client-secret-here


```

## 💻 Frontend

### In the client/ directory, create a .env file:
```bash
cd client
touch .env

Add the following variables to the .env file:

REACT_APP_BACKEND_URL=http://localhost:5000
jDoodle_clientId=your-client-id-here
jDoodle_clientSecret=your-client-secret-here

```






