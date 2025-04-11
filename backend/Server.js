// const express = require('express');
// const DBconnect = require('./DB');
// const Bundel = require('./Schema');
// const axios = require('Axios');

// const app = express();

// DBconnect();

// // app.use(express.json());
// app.get('/schemas', async(req, res)=>{
//     try{
//         const schemas = await Schema.find({})
//         res.json(schemas);
//     }
//     catch(err){
//         res.status(500).json({error : err.message });
//     }
// });

// app.listen(3000, ()=>{console.log("Start on 3000")})


const cors = require('cors')
const express = require('express');
const DBconnect = require('./DB');
const Bundel = require('./Schema'); // FIXED: Using correct model name
const axios = require('axios');

const app = express();
app.use(cors()); 
 
DBconnect();

app.use(express.json()); 

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

 
app.get('/schemas', async (req, res) => {
    try {
        const bundles = await Bundel.find();
        res.json(bundles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.post('/schemas', async (req, res) => {
//     try {
//         const newBundle = new Bundel(req.body); // Create new document
//         await newBundle.save(); // Save to MongoDB
//         res.status(201).json({ message: "✅ Bundle created successfully", data: newBundle });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });
app.put('/update-bundles', async (req, res) => {
    try {
      const { selectedIds, updatedFields } = req.body;
  
      if (!selectedIds || selectedIds.length === 0) {
        return res.status(400).json({ error: "No bundles selected for update." });
      }
  
      await Bundel.updateMany(
        { _id: { $in: selectedIds } }, // Find selected items
        { $set: updatedFields } // Apply updates
      );
  
      res.json({ message: "Bundles updated successfully!" });
    } catch (error) {
      console.error("Error updating bundles:", error);
      res.status(500).json({ error: "Failed to update bundles." });
    }
  });

// Start server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
