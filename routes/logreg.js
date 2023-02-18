const router = require("express").Router();
const db = require("../db/queries.js");

router.get("/", (req, res) => {
    res.render("logreg.html");
});

router.get("/signup", (req, res) => {
    res.render("logreg.html", { signup: true });
});

router.post("/login", async (req, res) => {
    const { id, password } = req.body;

    const check = await db.isCorrectCredStudent(id, password);
    if (check) {
        req.session.regenerate(() => {
            req.session.id = id
            res.redirect('/')
        })
    }

    const check2 = await db.isCorrectCredMGT(id, password);
    if (check2) {
        req.session.regenerate(() => {
            req.session.username = id
            res.redirect('/')
        })
    }
    res.status(500).send("Error Occured, Please try again.");
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