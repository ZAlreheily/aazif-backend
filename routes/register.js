// template

const router = require("express").Router();

router.get("", async (req, res) => {
    const events = db.getAllEvents;
    res.render("home.html", events);
});

router.post("", async (req, res, next) => {
    const { fname, lname } = req.body;
    db.addStudent(fname, lname);
    res.redirect("/");

    const err = new Error("message")
    err.status = 404;
    return next(err);
});

module.exports = router;