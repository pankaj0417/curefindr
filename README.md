# OncoX - Drug Data Management Platform

A comprehensive web application for managing and displaying drug/medicine data including information about active pharmaceutical ingredients, chemical structures, mode of action, toxicity profiles, and adverse drug reactions.

## Features

- **User Authentication**: Secure login and signup system
- **Drug Data Management**: Upload and manage drug information
- **Toxicity Tracking**: Track toxophores, toxicity types, and adverse drug reactions (ADRs)
- **Drug Information**: Store and display drug names, API, group/class, chemical structures
- **Mode of Action**: Document how drugs work
- **Success Rate Tracking**: Monitor drug effectiveness
- **Current Status**: Track drug approval status (Approved, Clinical Trial, Research, Experimental)
- **Protected Upload**: Only authorized users can upload drug data

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- React Hook Form
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Bcrypt
- Dotenv

## Project Structure

```
curefindr/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/    # Reusable components
│       │   ├── login/
│       │   ├── navbar/
│       │   ├── signup/
│       │   └── protectedUpload/
│       ├── pages/        # Page components
│       │   ├── about/
│       │   ├── contact/
│       │   ├── contant/
│       │   ├── home/
│       │   └── upload/
│       └── utils/        # Utility functions
├── server/                # Backend Express application
│   └── src/
│       ├── config/      # Database configuration
│       ├── controllers # Route controllers
│       ├── models/     # Mongoose schemas
│       └── routes     # API routes
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd curefindr
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/curefindr
   JWT_SECRET=your-secret-key
   ```

   Create a `.env` file in the `client` directory:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the server**

   ```bash
   cd server
   npm start
   ```

   Server will run on http://localhost:5000

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:5173

## API Endpoints

### User Routes (`/api/user`)

- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user

### Data Routes (`/api/data`)

- `POST /api/data/createdata` - Create new drug data (requires authentication)
- `GET /api/data/getalldata` - Get all drug data
- `GET /api/data/getdatabyid/:id` - Get drug data by ID
- `PUT /api/data/updatedata/:id` - Update drug data
- `DELETE /api/data/deletedata/:id` - Delete drug data

## Drug Data Schema

Each drug entry includes:

- Drug Name
- API Name
- Group/Class
- Chemical Structure
- Mode of Action
- Use of Drug
- Toxophore of Drug
- Type of Toxicity
- Reason of Toxicity
- Minimum Concentration
- Success Rate
- Current Status (Approved, Clinical Trial, Research, Experimental)
- Adverse Drug Reactions (ADRs)

## Access Control

The upload functionality is restricted to specific users. Only users with the authorized email `pankaj0172004@gmail.com` can:

- See the Upload link in the navigation
- Access the `/upload` page
- Create new drug data entries

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
