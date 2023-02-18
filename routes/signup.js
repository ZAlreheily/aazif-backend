const router = require("express").Router();
const db = require("../db/queries.js");

router.get("/", (req, res) => {
    res.render("logreg.html", { signup: true });
});

router.post("/register", async (req, res) => {
    const { name, id, password, email } = req.body;
    try {
        await db.addStudent(id, name, email, password);
        req.session.regenerate(() => {
            req.session.id = id
            res.redirect('/')
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("Error Occured in Registering.\n Please try again.")
    }
});

module.exports = router;