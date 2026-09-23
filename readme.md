# Stayora

Stayora is a full-stack web application for exploring and managing property listings. It allows users to browse stays, create their own listings, upload images, view locations on a map, leave reviews, and use an AI-assisted search feature to find suitable listings using natural language.

## Live Demo

**Deployed Website:** [Stayora](https://stayora-0xpm.onrender.com)

**GitHub Repository:** [Stayora GitHub](https://github.com/simran-kaur5/stayora)

## Features

* User signup and login
* Create, edit and delete listings
* Upload listing images
* Cloudinary image storage
* Listing categories
* Search listings
* AI-assisted natural language listing search
* AI-based extraction of search preferences such as location, category, and price
* View listing details
* Interactive Mapbox maps
* Add and delete reviews
* Star ratings
* Tax price toggle
* User authorization
* Responsive design for desktop and mobile
* Flash messages for success and error handling

## Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap
* EJS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Authentication

* Passport.js
* Express Session
* Connect-Mongo

### AI

* Groq API
* GPT-OSS-20B
* Natural language search
* Intent detection
* Structured JSON responses

### Other

* Cloudinary
* Mapbox
* Joi
* Multer

### Deployment

* Render

## AI Assistant

Stayora includes an AI-assisted search feature that helps users find suitable listings using natural language queries.

Users can describe their requirements in a simple sentence, and the assistant extracts relevant search parameters such as:

* Location
* Category
* Minimum price
* Maximum price

These parameters are then converted into MongoDB filters and used to search the available listings.

The assistant also supports basic conversational interactions such as greetings.

### Example

A user can enter:

```text
I want a stay in Manali under 3000
```

The AI extracts the relevant search information, which is then used by the application to filter matching listings.

### AI Search Flow

```text
User Query
    ↓
Groq AI
    ↓
Extract Search Parameters
    ↓
MongoDB Filtering
    ↓
Matching Listings
    ↓
Listings Displayed in Chat
```

## Project Structure

```text
Stayora/

│
├── models/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── chat.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   └── ExpressError.js
│
├── app.js
├── schema.js
├── middleware.js
├── package.json
└── .gitignore
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/simran-kaur5/stayora.git
```

### Install dependencies

```bash
cd stayora
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token

GROQ_API_KEY=your_groq_api_key
```

### Run the project

```bash
nodemon app.js
```

The application will run locally on:

```text
http://localhost:8080
```

## Main Routes

| Route                   | Description                |
| ----------------------- | -------------------------- |
| `/listings`             | View all listings          |
| `/listings/new`         | Create a listing           |
| `/listings/:id`         | View listing details       |
| `/listings/:id/edit`    | Edit a listing             |
| `/listings/:id/reviews` | Add a review               |
| `/signup`               | Create an account          |
| `/login`                | Login                      |
| `/logout`               | Logout                     |
| `/chat`                 | AI-assisted listing search |

## What I Worked With

While building Stayora, I worked with:

* Express routing and middleware
* MongoDB and Mongoose
* Authentication and authorization
* Session management
* Joi validation
* Multer file uploads
* Cloudinary
* Mapbox
* EJS templating
* Bootstrap responsive layouts
* Error handling
* Groq API integration
* Natural language processing for listing search
* AI-based intent detection
* Structured JSON responses from AI
* Dynamic MongoDB filtering using extracted search parameters
* Deployment with Render

## Future Improvements

* Conversation memory for multi-turn searches
* Booking system
* Wishlist
* Payment integration
* User profiles
* Booking history
* Notifications
* Improved search and filtering
* More advanced AI-assisted recommendations

## Author

**Simranjit Kaur**

B.Tech Computer Science & Engineering

Guru Nanak Dev Engineering College, Ludhiana

GitHub: `simran-kaur5`
