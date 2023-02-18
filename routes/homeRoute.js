const router = require("express").Router();
const db = require("../db/queries");
router.get("/", async (req, res) => {
    const events = await db.getAllEvents();
    res.status(200).render("home.html", { events });
});


module.exports = router;