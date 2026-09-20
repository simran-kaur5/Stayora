# Stayora

Stayora is a full-stack web application for exploring and managing property listings. It allows users to browse stays, create their own listings, upload images, view locations on a map, and leave reviews.

## Live Demo

**Deployed Website:** `https://stayora-0xpm.onrender.com`

**GitHub Repository:** `https://github.com/simran-kaur5/stayora`

## Features

* User signup and login
* Create, edit and delete listings
* Upload listing images
* Cloudinary image storage
* Listing categories
* Search listings
* View listing details
* Interactive Mapbox maps
* Add and delete reviews
* Star ratings
* Tax price toggle
* User authorization
* Responsive design for desktop and mobile
* Flash messages for success and error handling

## Tech Stack

**Frontend**

* HTML
* CSS
* Bootstrap
* EJS
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose
* MongoDB Atlas

**Authentication**

* Passport.js
* Express Session
* Connect-Mongo

**Other**

* Cloudinary
* Mapbox
* Joi
* Multer

**Deployment**

* Render

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
│   └── user.js
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

| Route                   | Description          |
| ----------------------- | -------------------- |
| `/listings`             | View all listings    |
| `/listings/new`         | Create a listing     |
| `/listings/:id`         | View listing details |
| `/listings/:id/edit`    | Edit a listing       |
| `/listings/:id/reviews` | Add a review         |
| `/signup`               | Create an account    |
| `/login`                | Login                |
| `/logout`               | Logout               |

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
* Deployment with Render

## Future Improvements

* Booking system
* Wishlist
* Payment integration
* User profiles
* Booking history
* Notifications
* Improved search and filtering

## Author

**Simranjit Kaur**

B.Tech Computer Science & Engineering
Guru Nanak Dev Engineering College, Ludhiana

GitHub: `simran-kaur5`
