// Mongoose is a library that lets NodeJS communicate with MongoDB
import mongoose from "mongoose";

// Express is a framework for building APIs and web apps
import express from "express";

// CORS middleware add CORS headers to our endpoints
// This will allow us to use the API on any domain.
import cors from "cors";

// Initialize Express
const app = express();

// Tell our Express app to add CORS headers
app.use(cors());
// serve up the frontend (documentation)
app.use(express.static("public"));
// Enable express to parse JSON data
app.use(express.json());

// Our API is defined in a separate module to keep things tidy.
// Let's import our API endpoints and activate them.
// Note that the '/api' prefix is important here:
import endpoints from "./routes/sleep_routes.js";
app.use("/api", endpoints);

/* Connect to MongoDB:
To connect, you must add a MongoDB connection string
as an environment variable.
The name/key of the environment variable must be "MONGODB"
The value of the variable must be a valid MongoDB connection string. 
You can locate the string in your MongoDB Atlas dashboard.
*/
mongoose
  .connect(
    "mongodb+srv://azuna1999:azuna1999@cluster0.wckf6er.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((mongoose) => {
    // Express starts listening on PORT 3000 only after MongoDB connects
    app.listen(3000, () => console.log("Express is Live."));
  })
  .catch((error) => handleError(error));

// Error Handler for MongoDB:
// If there are any issues with MongoDB,
// we will log them to the console.
const handleError = (error) => {
  console.log("MongoDB connection failed.");
  console.log(error.message);
};
