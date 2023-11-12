// Below we use the Express Router to define a series of API endpoints.
// Express will listen for API requests and respond accordingly
// Notice the use of HTTP Verbs (POST, GET, PUT, DELETE)
// Each verb maps nicely onto a CRUD operation (Create Read Update Delete)

// NOTE: This file uses type of module 
// As such, you'll see similar import statements at the top of both files.
import express from 'express'

// import the Sleep model 
import Sleep from "../models/sleep_model.js"

// setup the express Router
const router = express.Router()

// Below we define five endpoints.
// Express listens for HTTP Verbs (POST, GET, PUT, DELETE)
// Upon recieving a request, we use the Mongoose Model "Sleep"
// to perform the corresponding CRUD operation in the database


//Endpoint to create a set of default data
router.post('/sleeps', (req, res)=> {

    const sleeps= [
        {
            duration: '8hrs',
            ratings: '4 stars'
        },
        {
            duration: '5hrs',
            ratings: '3 stars'
        },
        {
            duration: '9hrs',
            ratings: '5 stars'
        }
    ]

    Sleep.deleteMany()
    .then(response=> {
        Sleep.insertMany(sleeps)
        .then(sleeps=> res.send(sleeps))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err));
});

// CREATE
// This endpoint looks for JSON data in the body of the request
// We use this data to create a new Sleep in the database. 
router.post('/sleep', (req, res) => {  
  Sleep.create(req.body)
    .then(sleep => res.send(sleep) )
    .catch(err => res.status(500).send(err))
})

// READ (many sleeps)
// This endpoint finds all the sleeps in the database
// Note: an empty filter {} means "find everything"
router.get('/sleeps', (req, res) => {  
   const filter= {};
  Sleep.find(filter)   
    .then(sleeps => res.send(sleeps))
    .catch(err => res.status(500).send(err))
})


// UPDATE
// This endpoint updates a given sleep based on its ID
// It replaces existing data with new JSON 
// (to be provided in the request body)
router.put('/sleep/:id', (req, res) => {   
  const filter = {_id: req.params.id};
  const update = req.body;
  const options = {returnDocument :'after'}   // default is 'before'
  Sleep.findOneAndReplace(filter, update, options) 
    .then(sleep => res.send(sleep) )
    .catch(err => res.status(500).send(err)) 
})

 //DELETE
// This endpoint removes a given sleep from the database
router.delete('/sleep/:id', (req, res) => {
  const filter = {_id:req.params.id}
  Sleep.findOneAndDelete(filter)
    .then(result => res.send(result) )
    .catch(err => res.status(500).send(err)) 
})

 // export the api routes for use elsewhere in our app 
 // (e.g. in index.js )
 export default router;