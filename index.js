const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;



app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})