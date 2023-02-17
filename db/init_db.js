const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: './db/KFUPM-Events.sqlite',
        driver: sqlite3.Database
    })
}

async function createTables() {
    const db = await getDbConnection();
    sql = `CREATE TABLE IF NOT EXISTS club(
        clubID INTEGER PRIMARY KEY AUTOINCREMENT,
        name UNIQUE NOT NULL,
        img NOT NULL, 
        description NOT NULL
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    STUDENT(
      SID INTEGER NOT NULL UNIQUE, 
      NAME NOT NULL,
      EMAIL	NOT NULL,
      stuPassword NOT NULL
      )`;
    await db.run(sql);
    sql = `CREATE TABLE IF NOT EXISTS 
    club_manager(
        clubMGR INTEGER PRIMARY KEY AUTOINCREMENT,
        mgdClub NOT NULL,
        name NOT NULL,
        username UNIQUE NOT NULL,
        EMAIL NOT NULL,
        MGRpassword NOT NULL,
        FOREIGN KEY(mgdClub) REFERENCES club(clubID)
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    event(
        eventID INTEGER PRIMARY KEY AUTOINCREMENT,
        eventclub NOT NULL,
        title NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        visibility NOT NULL,
        LOCATION,
        poster,
        wLink,
        FOREIGN KEY(eventclub) REFERENCES club(clubID)
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    student_enrollment(
        enrollID INTEGER PRIMARY KEY AUTOINCREMENT,
        enrolledEvent NOT NULL,
        enrolledStu NOT NULL,
        FOREIGN KEY(enrolledEvent) REFERENCES event(eventID),
        FOREIGN KEY(enrolledStu) REFERENCES STUDENT(SID)
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    QUESTION(
        questionId INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId NOT NULL,
        questionText NOT NULL,
        mandatory,
        FOREIGN KEY(eventId) REFERENCES event(eventID)
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    answer(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
         forQuestion NOT NULL,
         answeringStudent NOT NULL,
         answerText NOT NULL,
         FOREIGN KEY(forQuestion) REFERENCES QUESTION(questionId),
         FOREIGN KEY(answeringStudent) REFERENCES STUDENT(SID)
        )`;
    await db.run(sql);
}

createTables()