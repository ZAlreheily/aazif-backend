const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: './db/KFUPM-Events.db',
        driver: sqlite3.Database
    })
}

async function createTables() {
    const db = await getDbConnection();
    sql = `CREATE TABLE IF NOT EXISTS club(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name UNIQUE NOT NULL,
        img NOT NULL, 
        description NOT NULL
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    STUDENT(
      SID INTEGER NOT NULL UNIQUE, 
      FNAME NOT NULL,
      LNAME NOT NULL,
      EMAIL	NOT NULL,
      PHONE NOT NULL
      )`;
    await db.run(sql);
    sql = `CREATE TABLE IF NOT EXISTS 
    club_manager(id INTEGER 
        PRIMARY KEY AUTOINCREMENT,
        clubId NOT NULL,
        FOREIGN KEY(clubId) REFRENCES club(id),
        fname NOT NULL,
        lname NOT NULL,
        username UNIQUE NOT NULL,
        EMAIL  NOT NULL
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    event(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clubId NOT NULL,
        FOREIGN KEY(clubId) REFRENCES club(id),
        title NOT NULL,
        startDate DATETIME NOT NULL,
        endDate DATETIME NOT NULL,
        visibility NOT NULL,
        LOCATION,
        wLink
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    student_enrollment(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId NOT NULL,
        FOREIGN KEY(eventId) REFRENCES event(id),
        SID NOT NULL,
        FOREIGN KEY(SID) REFRENCES STUDENT(SID)
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    QUESTION(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId NOT NULL,
        FOREIGN KEY(eventId) REFRENCES event(id),
        questionText NOT NULL,
        mandatory
        )`;
    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS 
    answer(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        questionId NOT NULL,
        FOREIGN KEY(questionId) REFRENCES QUESTION(id),
        SID NOT NULL,
        FOREIGN KEY(SID) REFRENCES STUDENT(SID),
        answerText NOT NULL
        )`;
    await db.run(sql);
}

createTables()