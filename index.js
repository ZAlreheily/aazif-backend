const express = require("express");
const app = express();
const session = require('express-session');
const nunjucks = require("nunjucks");
const path = require("path");
const cookieParser = require('cookie-parser');

const notFoundError = require("./middlewares/NotFoundError");
const errorHandler = require("./middlewares/errorHandler");
const logregRoute = require("./routes/logreg");
const eventRoute = require("./routes/event");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
nunjucks.configure("views", { autoescape: true, express: app });
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somevalue'
}));


app.use("/login", logregRoute);
app.use("/event",eventRoute);

app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})