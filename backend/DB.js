const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;


const DatabaseC = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.error(" Database Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = DatabaseC;



// const mongoose = require('mongoose')

// const DatabaseC = async ()=>{
//     try{
//         await mongoose.connect('mongodb://localhost:27017/mydb',)
//         console.log("very Good");
//     }catch (error){
//         console.error("very bad",error);
//         process.exit(1);
//     }
    
// };

// module.exports = DatabaseC;