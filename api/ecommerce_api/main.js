const express = require("express");
const app = express();
const dbConfig = require("dotenv");
const createUser = require("./routes/Auth");
const products = require("./routes/Products");
const cors = require('cors');
const stripeRoute = require("./routes/stripe");
const fetechUsers = require("./routes/User");
const Orders = require("./routes/Order");


dbConfig.config();


app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use("/api",createUser);
app.use("/api/users",fetechUsers);
app.use("/api/products",products);
app.use("/api/product",products);
app.use("/api/checkout", stripeRoute);
app.use("/api/orders",Orders);

app.listen(5000,() => {
    console.log("Server is running");
})