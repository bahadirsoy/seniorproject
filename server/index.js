//import all components for api requst
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

//import password hash
const passwordHash = require('password-hash');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "seniorprojectdbschema"
})



app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))




//get id of user when he signed up
app.get('/api/getId', (req, res) => {

    //username
    const username = req.query.username

    sql = "SELECT userId FROM seniorprojectdbschema.user WHERE username = ?"
    db.query(
        sql, 
        [username], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )

})


//get all posts from db and send it to homepage
app.get('/api/getPosts', (req, res) => {

    //username
    const userId = req.query.userId

    sql = "SELECT * FROM seniorprojectdbschema.post WHERE userId = ?"
    db.query(
        sql, 
        [userId], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )
})


//get user informations in profile page
app.get('/api/getUserInformations', (req, res) => {

    //username
    const username = req.query.username
    
    sql = "SELECT * FROM seniorprojectdbschema.user WHERE username = ?"
    db.query(
        sql, 
        [username], 
        (error, result) => {
            if(error){
                console.log(error)
            } else{
                res.send(result)
            }
    })

})

//insert new post
app.post('/api/insertPost', (req, res) => {
    const userId = req.body.userId
    const postContent = req.body.postContent
    const postImg = req.body.postImg

    sql = "INSERT INTO seniorprojectdbschema.post (userId, postContent, postImg) VALUES (?, ?, ?)"
    db.query(sql, 
        [userId, postContent, postImg], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(result)
            } else{
                res.send(result)
            }
        }
    )
})


//SIGN UP REQUEST
app.post('/api/insertUser', (req, res) => {

    const username = req.body.username

    const password = req.body.password
    const hashedPassword = passwordHash.generate(password)

    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email

    sql = "INSERT INTO user (username, password, name, surname, email) VALUES (?, ?, ?, ?, ?)"
    db.query(
        sql, 
        [username, hashedPassword, name, surname, email], 
        (error, result) => {
            if(error){ //if there is an error while adding new user into db
                res.send({error: error})
            } else{ //there is no error send empty response
                console.log(result)
                res.send()
            }
    })
})

//SIGN IN REQUEST
app.post('/api/login', (req,res) => {

    const username = req.body.username
    const password = req.body.password

    const sql = "SELECT * FROM seniorprojectdbschema.user WHERE username = ?"
    db.query(
        sql,
        [username],
        (error, result) => {
            //if sql error
            if(error){
                res.send({error: error})
            } else if(result.length > 0 && passwordHash.verify(password, result[0].password)){ //succesful login
                res.send({
                    result: result,
                    isLoginSuccessful: true
                })
            } else{ //unsuccesful login
                res.send({
                    isLoginSuccessful: false
                })
            }
    })


})

//UPDATE USER REQUEST
app.put("/api/updateUser", (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const phone = req.body.phone

    const username = req.body.username

    const sql = "UPDATE user SET name = ?, surname = ?, email = ?, phone = ? WHERE username = ?"

    db.query(
        sql, 
        [name, surname, email, phone, username], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(result)
            } else{
                console.log(result)
                res.send(result)
            }
        })
})

//UPDATE USER'S NAME
app.put("/api/updateName", (req, res) => {
    const name = req.body.name
    const username = req.body.username

    const sql = "UPDATE user SET name = ? WHERE username = ?"

    db.query(
        sql, 
        [name, username], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(result)
            } else{
                console.log(result)
                res.send(result)
            }
        })
})


//UPDATE USER'S SURNAME
app.put("/api/updateSurname", (req, res) => {
    const surname = req.body.surname
    const username = req.body.username

    const sql = "UPDATE user SET surname = ? WHERE username = ?"

    db.query(
        sql, 
        [surname, username], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(result)
            } else{
                console.log(result)
                res.send(result)
            }
        })
})


//UPDATE USER'S EMAİL
app.put("/api/updateEmail", (req, res) => {
    const email = req.body.email
    const username = req.body.username

    const sql = "UPDATE user SET email = ? WHERE username = ?"

    db.query(
        sql, 
        [email, username], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send({
                    error: error
                })
            } else{
                console.log(result)
                res.send(result)
            }
        })
})


//UPDATE USER'S PHONE
app.put("/api/updatePhone", (req, res) => {
    const phone = req.body.phone
    const username = req.body.username

    const sql = "UPDATE user SET phone = ? WHERE username = ?"

    db.query(
        sql, 
        [phone, username], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(result)
            } else{
                console.log(result)
                res.send(result)
            }
        })
})


app.listen(3001, () => {
    console.log("running 3001")
})