import mongoose from 'mongoose'

// Below is a Mongoose "schema" for sleeps. The schema:
// - Defines a standardized "shape" for documents in our collection
// - Defines a set of valid fields and data types
// The schema is used by Mongoose:
// - To prevent inconsistencies in naming and spelling
// - To remove data that doesn't fit the schema pattern
// - To enforce basic data consistency and integrity  

 const sleepSchema = new mongoose.Schema({
  duration: { type: 'String' },
  ratings: { type: 'String' },
});


// To implement our schema, let's create a document model. 
// The model comes with CRUD methods, used elsewhere in our app.
export default  mongoose.model('Sleep', sleepSchema);
 