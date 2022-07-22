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
            res.send(err)
            console.log(err)
            console.log("Values Not Inserted")
        } else {
            res.send({ message: 'inserted' })
            console.log("Values Inserted")
        }
    })
})

app.get('/get', (req, res) => {
    const { getMemberID } = req.query
    db.query(`SELECT * FROM members WHERE memberID = ${getMemberID}`, (err, result) => {
        if (err) {
            res.send(err)
            console.log(err)
            console.log("Values Not Selected")
        } else {
            res.send(result)
            console.log("Values Selected")
        }
    })
})

app.put('/update', (req, res) => {
    console.log('hi')
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
        } else {
            res.send(result)
        }
    })
})

// app.delete()

app.listen(3001, () => {
    console.log("your server is running on port 3001")
})