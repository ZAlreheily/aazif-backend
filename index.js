const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const path = require("path");
const notFoundError = require("./middlewares/NotFoundError")
const errorHandler = require("./middlewares/errorHandler")

nunjucks.configure("views", { autoescape: true, express: app });
app.use(express.static(path.join(__dirname, "public")));


require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.render("index.html")
});

app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})