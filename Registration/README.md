markdown
# Modern Registration Form

A clean, modern registration form with theme toggle functionality, built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## Features

- ✨ Modern, responsive design
- 🌓 Dark/Light theme toggle
- 🔒 Secure password handling
- ✅ Form validation
- 🎨 Attractive UI with smooth animations
- 📱 Mobile-friendly
- 🗄️ MongoDB Atlas integration
- ☁️ Ready for deployment on Render

## Project Structure

```

registration-app/
├──frontend/          # Frontend files (HTML, CSS, JS)
├──backend/           # Backend API (Node.js/Express)
├──.gitignore
└──README.md

```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Render account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd registration-app
```

1. Setup Backend
   ```bash
   cd backend
   npm install
   ```
2. Configure Environment Variables
   · Copy .env and update with your MongoDB Atlas connection string
   · Update other environment variables as needed
3. Start the Backend Server
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000
4. Access the Application
   Open http://localhost:5000 in your browser

Deployment on Render

1. Push your code to GitHub
2. Create a new Web Service on Render
   · Connect your GitHub repository
   · Set build command: cd backend && npm install
   · Set start command: cd backend && npm start
   · Add environment variables in Render dashboard
3. Create MongoDB Atlas Database
   · Create a new cluster in MongoDB Atlas
   · Get the connection string
   · Add it as MONGODB_URI in Render environment variables
4. Deploy
   · Render will automatically deploy your application

Environment Variables

Variable Description Default
NODE_ENV Environment mode development
PORT Server port 5000
MONGODB_URI MongoDB connection string -
JWT_SECRET Secret for JWT tokens -
FRONTEND_URL Frontend URL for CORS http://localhost:3000

API Endpoints

· POST /api/register - Register a new user
· GET /api/users - Get all users (for testing)
· GET /health - Health check

Technologies Used

Frontend

· HTML5
· CSS3 with CSS Variables
· Vanilla JavaScript
· Font Awesome Icons

Backend

· Node.js
· Express.js
· MongoDB with Mongoose
· bcryptjs for password hashing
· Helmet for security
· CORS for cross-origin requests

License

MIT License - feel free to use this project for your own purposes.

```

## 4. Create a simple favicon

### `frontend/assets/favicon.ico`
(You can generate a simple favicon or use a default one)

## Deployment Instructions

1. **Create a new GitHub repository**
2. **Push all these files to your repository**
3. **Set up MongoDB Atlas:**
   - Create a new cluster
   - Create a database user
   - Get your connection string
   - Add your IP to whitelist

4. **Deploy to Render:**
   - Connect your GitHub repo
   - Use the `render.yaml` configuration
   - Add your environment variables