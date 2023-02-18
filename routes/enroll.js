const router = require("express").Router();
const db = require("../db/queries.js");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/:id",isLoggedIn,async (req,res)=>{
    const eventId = req.params.id;
    const sID = req.session.id;
    console.log(req.session)
    await db.addEnrollment(eventId,sID);
    res.redirect("/");
})

module.exports = router;