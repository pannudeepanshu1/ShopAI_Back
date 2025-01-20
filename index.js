// Import the Express module
import connectDB from './connection.js';
import express from "express";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';

dotenv.config({});
// Create an instance of an Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/cart",cartRoute);


// Define the port
const port = 3000;



// Start the server
app.listen(port, () => {
    connectDB();
    console.log(`Server is running`);
});
