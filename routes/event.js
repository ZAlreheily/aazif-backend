const router = require("express").Router();
const db = require("../db/queries.js");

router.post("/", async (req, res, next) => {
    const { eventClub, title, startDate,
        endDate, visibility, location,
        poster, wlink } = req.body;
    try {
        await db.addEvent(eventClub, title, startDate, endDate, visibility, location, poster, wlink);
        res.redirect("/event");
    }
    catch (err) {
        res.status(500).send("Error Occured, Please try again.");
    }
});

module.exports = router;