# HACKTHON - Full Stack AI-Powered Application

A modern full-stack web application leveraging AI capabilities with LLM integration, vector embeddings, and a responsive React frontend.

## 🚀 Project Overview

HACKTHON is a comprehensive full-stack application that combines:
- **Frontend**: Modern React application with real-time UI interactions
- **Backend**: Express.js server with integrated LLM capabilities
- **Database**: MongoDB for data persistence
- **AI/ML**: LangChain integration with Ollama for local LLM, ChromaDB for vector search

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool & dev server
- **React Router** 7.12.0 - Client-side routing
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **Framer Motion** 12.26.2 - Animation library
- **Axios** 1.13.2 - HTTP client
- **Lucide React** 0.562.0 - Icon library
- **React Hot Toast** 2.6.0 - Toast notifications

### Backend
- **Express** 5.2.1 - Web framework
- **Node.js** - Runtime environment
- **MongoDB & Mongoose** 9.1.3 - Database & ODM
- **LangChain** (@langchain/core, @langchain/community, @langchain/ollama) - AI framework
- **ChromaDB** 3.2.2 - Vector database for embeddings
- **JWT** 9.0.3 - Authentication
- **Bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.6 - Cross-origin requests
- **Dotenv** 16.4.5 - Environment configuration

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Ollama** (for local LLM capabilities) - Download from [ollama.ai](https://ollama.ai)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Maverick-841/HACKTHON.git
cd HACKTHON
```

### 2. Install Dependencies
```bash
npm install
```

This installs dependencies for both client and server directories.

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 🚀 Running the Application

### Development Mode (Client + Server)
```bash
npm run dev
```

This runs both the frontend (Vite dev server) and backend concurrently.

### Backend Only
```bash
npm run server
```

Runs the Express server on the configured port.

### Frontend Only
```bash
npm run client
```

Runs the React development server with Vite.

### Production Build
```bash
npm run build
```

Builds both the client and prepares the server for production.

### Production Start
```bash
npm start
```

Starts the server in production mode.

## 📁 Project Structure

```
HACKTHON/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                # Express backend application
│   ├── routes/            # API routes
│   ├── models/            # Mongoose models
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   └── package.json
├── package.json           # Root package.json
└── render.yaml            # Deployment configuration
```

## 🔌 API Endpoints

The application provides RESTful API endpoints for:
- User authentication (login, signup)
- User profile management
- AI-powered data processing using LLMs
- Vector search capabilities via ChromaDB

Refer to the server documentation or API route files for detailed endpoint specifications.

## 🤖 AI & LLM Integration

This project integrates with **LangChain** and **Ollama** for local LLM capabilities:

1. Ensure **Ollama** is installed and running
2. Pull a model: `ollama pull llama2` (or your preferred model)
3. The application will connect to Ollama for AI features

## 🔐 Authentication

- JWT-based authentication
- Password hashing with bcryptjs
- Secure token management

## 🗄️ Database

Uses **MongoDB** with **Mongoose** ODM for:
- User management
- Session persistence
- Data caching

## 🚢 Deployment

The project includes a `render.yaml` configuration file for easy deployment on [Render](https://render.com).

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run client and server concurrently |
| `npm run build` | Build both client and prepare server |
| `npm run start` | Start production server |
| `npm run server` | Start server only |
| `npm run client` | Start client dev server only |
| `npm install` | Install all dependencies |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Port Already in Use
Change the port in the `.env` file or stop the process using the port:
```bash
# Windows
netstat -ano | findstr :5000
```

### MongoDB Connection Failed
- Ensure MongoDB service is running
- Check connection string in `.env` file
- Verify MongoDB credentials if using authentication

### Ollama Not Connecting
- Ensure Ollama is installed and running
- Check Ollama is accessible at `http://localhost:11434`
- Verify model is pulled: `ollama pull llama2`

## 📧 Contact

For questions or support, please open an issue on the GitHub repository.

---

**Happy Coding!** 🎉
