const sqlite3 = require('sqlite3').verbose();
const sqlite = require("sqlite");
const bcrypt = require('bcrypt');

const getDbConnection = async () => {
    return await sqlite.open({
        filename: './db/KFUPM-Events.sqlite',
        driver: sqlite3.Database
    })
};
async function isCorrectCredStudent(id, password) {
    const db = await getDbConnection();
    const rows = await db.all(`SELECT stupassword FROM STUDENT WHERE SID = ?`, [id]);
    await db.close();
    hashed = await rows[0]["stuPassword"];
    const match = await bcrypt.compare(password, hashed);
    return match;
};

async function isCorrectCredMGT(username, password) {
    const db = await getDbConnection();
    const rows = await db.all(`SELECT MGRpassword FROM club_manager WHERE clubMGR = ?`, [username]);
    await db.close();
    if (rows[0] == undefined)
        return false;
    hashed = await rows[0]["MGRpassword"];
    const match = await bcrypt.compare(password, hashed);
    return match;
};

async function addEvent(eventClub, title, startDate, endDate, visibility, location, poster, wlink) {
    const db = await getDbConnection();
    const result = await db.run(`INSERT INTO event(eventClub, title, startDate, endDate, visibility, location, poster, wlink)
     VALUES(?,?,?,?,?,?,?,?)`
        , [eventClub, title, startDate, endDate, visibility, location, poster, wlink]);
    await db.close();
    return result;
};

async function editEvent(title, startDate, endDate, visibility, location, poster, wlink) {
    const db = await getDbConnection();
    const result = await db.run(`UPDATE event SET
       title = ?,
       startdate = ?,
       enddate = ?,
       visibility = ?,
       location = ?,
       poster = ?,
       wlink = ?
       )`, [eventClub, title, startDate, endDate, visibility, location, poster, wlink]);
    await db.close();
    return result;
};

async function deleteEvent(eventID) {
    const db = await getDbConnection();
    const result = await db.run(`DELETE FROM event WHERE eventID = ?`, [eventID]);
    await db.close();
    return result;
};

async function addClub(name, img, description) {
    const db = await getDbConnection();
    const result = await db.run(`INSERT INTO club(name,img,description) VALUES(?,?,?)`
        , [name, img, description]);
    await db.close();
    return result;
};

async function getAllClubs() {
    const db = await getDbConnection();
    const rows = await db.all(`SELECT * FROM club`);
    await db.close();
    return rows
}

async function getClub(clubID) {
    const db = await getDbConnection();
    const row = await db.all(`SELECT * FROM club WHERE clubID = ?`, [clubID]);
    await db.close();
    return row[0];
}

async function isStudentEnrolled(studentID, eventID) {
    const db = await getDbConnection();
    const row = await db.all(`SELECT COUNT(*) FROM student_enrollment WHERE enrolledEvent = ? AND enrolledStu = ?`, [eventID, studentID]);
    await db.close();
    return (row > 0);
}

async function getAllAnswers(questionID) {
    const db = await getDbConnection();
    const row = await db.all(`SELECT * FROM answer WHERE forQuestion = ?`, [questionID]);
    await db.close();
    return row;
}

async function getStudentAnswer(stuID, questionID) {
    const db = await getDbConnection();
    const row = await db.all(`SELECT * FROM answer WHERE forQuestion = ? AND answeringStudent = ?`, [questionID, stuID]);
    await db.close();
    return row[0];
}
const addStudent = async (sid, name, email, stuPassword) => {
    const hashPass = await bcrypt.hash(stuPassword, 10);
    const db = await getDbConnection();
    try {
        const rows = db.run(
            `INSERT into STUDENT(SID,NAME,EMAIL,STUPASSWORD) VALUES (?,?,?,?)`
            , [sid, name, email, hashPass]);
            return rows;
    } catch (err) {
        console.log(err);
    }
    await db.close();
};

const addMGR = async (mgdClub, name, username, email) => {
    const hashPass = await bcrypt.hash(mgrPass);
    const db = await getDbConnection();

    const rows = db.run(
        `insert into club_manager values (?,?,?,?,?)`,
        [mgdClub, name, username, email, hashPass]
    );

    await db.close();
    return rows;
};

const addQuestions = async (eventId, questionText, mandatory) => {
    const db = await getDbConnection();

    const rows = db.run(
        `INSERT INTO QUESTION
      VALUES(?,?,?
        )`, [eventId, questionText, mandatory]
    );

    await db.close();
    return rows;
};

const addAnswer = async (forQuestion, answeringStudent, answerText) => {
    const db = await getDbConnection();

    const rows = db.run(
        `
      INSERT INTO answer VALUES(
      ?,?,?
      ) 
      `, [forQuestion, answeringStudent, answerText]
    );

    await db.close();
    return rows;
};

const addEnrollment = async (enrolledEvent, enrolledStu) => {
    const db = await getDbConnection();

    const rows = db.run(
        `
      INSERT INTO student_enrollment(enrolledEvent,enrolledStu) VALUES(
      ?,?
      ) `, [enrolledEvent, enrolledStu]
    );

    await db.close();
    return rows;
};


const getAllEvents = async (endDate) => {
    const db = await getDbConnection();
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    const rows = await db.all(`
    SELECT * 
    from event e
    where e.endDate <=? 
     `, [currentDate]);
    await db.close();
    return rows;
}

const getEvent = async (eventId) => {
    const db = await getDbConnection();

    const rows = await db.all(`
    SELECT * 
    FROM event e 
    where e.eventId = ?
    `, [eventId]);
    await db.close();
    return rows[0];
}


module.exports = {
    isCorrectCredStudent, isCorrectCredMGT, addEvent, editEvent, deleteEvent, addClub, getAllClubs,
    getClub, isStudentEnrolled, getAllAnswers, getStudentAnswer, addStudent, addQuestions, addMGR,
    addAnswer, addEnrollment, getAllEvents, getEvent
};

