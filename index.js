const express = require("express");
const app = express();
const registerRoute = "./routes/register"; // template

require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use("register",registerRoute) // template
app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})