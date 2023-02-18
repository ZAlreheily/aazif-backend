const router = require("express").Router();
const db = require("../db/queries.js");

router.get("/", (req, res) => {
    res.render("logreg.html");
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

module.exports = router;