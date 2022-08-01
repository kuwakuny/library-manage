const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'library_system'
})

app.post('/register', (req, res) => {
    const memberID = req.body.memberID
    const password = req.body.password
    const nameKanji = req.body.nameKanji
    const nameKana = req.body.nameKana
    const birthday = req.body.birthday
    const gender = req.body.gender
    const email = req.body.email
    const phone = req.body.phone
    const postCode = req.body.postCode
    const address = req.body.address
    const regID = req.body.regID

    db.query('INSERT INTO members (memberID, password, nameKanji, nameKana, birthday, gender, email, phone, postCode, address, regID, regDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,now())', [memberID, password, nameKanji, nameKana, birthday, gender, email, phone, postCode, address, regID], (err, result) => {
        if (err) {
            console.log(err)
            console.log("Values Not Inserted")
            if (err.sqlMessage.includes('PRIMARY')) {
                res.send({ message: 'dup id' })
            } else if (err.sqlMessage.includes('email_UNIQUE')) {
                res.send({ message: 'dup email' })
            } else if (err.sqlMessage.includes('phone_UNIQUE')) {
                res.send({ message: 'dup phone' })
            } else {
                res.send(err)
            }
        } else {
            console.log("Values Inserted")
            res.send({ message: 'inserted' })
        }
    })
})

app.get('/get', (req, res) => {
    const { getMemberID } = req.query
    db.query(`SELECT * FROM members WHERE memberID = ${getMemberID}`, (err, result) => {
        res.send(result)
    })
})

app.put('/update', (req, res) => {
    const updID = req.body.updID
    const getMemberID = req.body.getMemberID
    const nameKanji = req.body.nameKanji
    const nameKana = req.body.nameKana
    const birthday = req.body.birthday
    const gender = req.body.gender
    const email = req.body.email
    const phone = req.body.phone
    const postCode = req.body.postCode
    const address = req.body.address

    db.query('UPDATE members SET nameKanji = ?, nameKana = ?, birthday = ?, gender = ?, email = ?, phone = ?, postCode = ?, address = ?, updID = ?, updDate = now() WHERE memberID = ?', [nameKanji, nameKana, birthday, gender, email, phone, postCode, address, updID, getMemberID], (err, result) => {
        if (err) {
            console.log(err)
            console.log("Values Not Updated")
            if (err.sqlMessage.includes('email_UNIQUE')) {
                res.send({ message: 'dup email' })
            } else if (err.sqlMessage.includes('phone_UNIQUE')) {
                res.send({ message: 'dup phone' })
            } else {
                res.send(err)
            }
        } else {
            console.log("Values Updated")
            res.send({ message: 'updated' })
        }
    })
})

app.use((req, res, next) => {
    res.status(404).send('ページが見つかりません。')
})

app.listen(3001, () => {
    console.log("your server is running on port 3001")
})