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
    const authorityCODE = req.body.authorityCODE
    const regID = req.body.regID

    db.query('INSERT INTO members (memberID, password, nameKanji, nameKana, birthday, gender, email, phone, postCode, address, authorityCODE, regID, regDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,now())', [memberID, password, nameKanji, nameKana, birthday, gender, email, phone, postCode, address, authorityCODE, regID], (err, result) => {
        if (err) {
            res.send(err)
            console.log(err)
            console.log("Values Not Inserted")
        } else {
            checkMemberID = memberID
            res.send({ message: 'inserted' })
            console.log("Values Inserted")
        }
    })
})

app.get('/get/:getMemberID', (req, res) => {
    console.log('getMemberID => ' + req.params.getMemberID)
    const getMemberID = req.body.getMemberID
    db.query(`SELECT nameKanji, nameKana, birthday, gender, email, phone, postCode, address, authorityCODE FROM members WHERE memberID = ${getMemberID}`, (err, result) => {
        if (err) {
            res.send(err)
            console.log(err)
            console.log("Values Not Selected")
        } else {
            res.send({ message: 'Selected' })
            console.log("Values Selected")
        }
    })
})

app.listen(3001, () => {
    console.log("your server is running on port 3001")
})