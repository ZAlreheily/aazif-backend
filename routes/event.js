const router = require("express").Router();
const db = require("../db/queries.js");

router.get("/all", async (req, res) => {
    const events = await db.getAllEvents();
    res.status(200).json(events);
});

router.get("/:eventId", async (req, res) => {
    const id = req.params.eventId;
    const event = await db.getEvent(Number.parseInt(id));
    res.status(200).render("event.html", event);
});

router.get("/add", (req, res) => {
    res.status(200).render("addevent.html");
});


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