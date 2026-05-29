# Modern AI Chatbot Assistant

A production-ready AI chatbot application built with Node.js, Express, and OpenAI. Featuring a beautiful glassmorphism UI, dark mode, and responsive design.

## Features

- **Glassmorphism UI**: Modern semi-transparent backgrounds with backdrop blur effects.
- **OpenAI Integration**: Powered by GPT-3.5-turbo (easily upgradable to GPT-4).
- **Responsive Design**: Works flawlessly on desktop, tablet, and mobile devices.
- **Dark/Light Mode**: User-selectable themes with smooth transitions.
- **Animated Interface**: Smooth chat bubble appearance and typing indicators.
- **Sidebar**: Chat history tracking and navigation.

## Folder Structure

```
├── public/              # Frontend static files
│   ├── assets/          # Icons and images
│   ├── index.html       # Main application layout
│   ├── style.css        # Glassmorphism and animations
│   └── script.js        # Chat logic and API connection
├── server/              # Backend Express server
│   └── server.js        # API routes and OpenAI integration
├── .env                 # Environment variables (API Key)
├── .env.example         # Template for environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Setup instructions
```

## Setup Instructions

### 1. Prerequisites
- Node.js (v16 or higher)
- npm (Node Package Manager)
- OpenAI API Key

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Configuration
1. Create a `.env` file in the root directory (or rename `.env.example`).
2. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

### 4. Running the Application
Start the server in development mode (with auto-reload):
```bash
npm run dev
```
Or start in production mode:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript
- **API**: OpenAI API (SDK)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
