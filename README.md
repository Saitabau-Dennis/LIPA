# LIPA - Payment Links Management

A React application for managing payment links with Supabase authentication.

## Setup Instructions

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Features

- User authentication (Sign up, Login, Logout)
- Dashboard with payment links management
- Responsive design with Tailwind CSS
- Real-time backend communication with Supabase

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: Supabase
- **Authentication**: Supabase Auth
