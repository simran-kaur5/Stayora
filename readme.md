# Stayora

Stayora is a full-stack property listing platform with AI-powered natural language search and a custom fine-tuned DistilBERT model for review sentiment analysis. It allows users to browse stays, create and manage their own listings, upload images, view property locations on interactive maps, leave reviews, and receive AI-powered insights from review content.

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
* AI-based review sentiment analysis
* Automatic classification of reviews as positive or negative
* Sentiment confidence storage for reviews
* Filter reviews by sentiment
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
* DistilBERT
* Hugging Face Transformers
* PyTorch
* Review sentiment classification

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

## AI Review Sentiment Analysis

Stayora also uses a fine-tuned DistilBERT model to automatically analyze the sentiment of user reviews.

When a user submits a review, the review text is sent from the Node.js backend to a separate FastAPI sentiment analysis service.

The model classifies the review as either:

* Positive
* Negative

The predicted sentiment and confidence score are then stored along with the review in MongoDB.

### Sentiment Analysis Flow

```text
User Submits Review
        ↓
Node.js / Express
        ↓
FastAPI Sentiment Service
        ↓
Fine-tuned DistilBERT
        ↓
Sentiment + Confidence
        ↓
MongoDB
        ↓
Review Display / Sentiment Filtering
```

### Sentiment Service

The sentiment model is deployed as a separate FastAPI service on Render.

```text
Stayora Node.js Application
        ↓
POST /predict
        ↓
FastAPI
        ↓
DistilBERT Model
        ↓
{
    "sentiment": "positive",
    "confidence": 0.9984
}
```

The sentiment service is kept separate from the main Node.js application so that the Python-based machine learning model can run independently.

## Project Structure

```text
Stayora/
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── chat.js
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
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── sentiment-service/
│   ├── app.py
│   ├── requirements.txt
│   └── stayora-sentiment-model/
│
├── notebooks/
│   └── sentiment_model_training.ipynb
│
├── app.js
├── schema.js
├── middleware.js
├── cloudConfig.js
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

### Run the Sentiment Service Locally

Navigate to the sentiment service:

```bash
cd sentiment-service
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

The sentiment API will be available at:

```text
http://127.0.0.1:8000
```

## Main Routes

| Route                    | Description                |
| ------------------------ | -------------------------- |
| `/listings`              | View all listings          |
| `/listings/new`          | Create a listing           |
| `/listings/:id`          | View listing details       |
| `/listings/:id/edit`     | Edit a listing             |
| `/listings/:id/reviews`  | Add a review               |
| `/listings/:id/positive` | View positive reviews      |
| `/listings/:id/negative` | View negative reviews      |
| `/signup`                | Create an account          |
| `/login`                 | Login                      |
| `/logout`                | Logout                     |
| `/chat`                  | AI-assisted listing search |

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
* Fine-tuning a DistilBERT sentiment classifier
* Hugging Face Transformers
* PyTorch
* FastAPI model serving
* AI-based review sentiment classification
* Sentiment confidence scoring
* Deploying separate Node.js and Python services with Render
* Git LFS for storing the trained ML model

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
* Review sentiment analytics and insights
* Personalized listing recommendations

## Author

**Simranjit Kaur**

B.Tech Computer Science & Engineering
Guru Nanak Dev Engineering College, Ludhiana

GitHub: `simran-kaur5`
