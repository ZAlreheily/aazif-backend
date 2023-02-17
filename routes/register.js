// template

const router = require("express").Router(); 

router.get("", async (req, res) => {
    const events = db.getAllEvents;
    res.render("home.html", events);
});

router.post("", async (req, res) => {
    const { fname, lname } = req.body;
    db.addStudent(fname, lname);
    res.redirect("/");
});

module.exports = router;