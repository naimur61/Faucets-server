require('dotenv').config();
const { default: mongoose } = require("mongoose");
const dbConnect = () => {
   try {
      mongoose.set('strictQuery', false); // Add this line to resolve the warning
      const conn = mongoose.connect(process.env.MONGO_DB);
      console.log("Database Connected Successfully!");
   } catch (error) {
      console.log("Database Error!");
   }
}
module.exports = dbConnect;