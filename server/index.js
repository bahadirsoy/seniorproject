//import all components for api requst
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const path = require("path")
const multer = require('multer')
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: "kYO6RrRP0+3Kk/a9+NaJmSmbTNiRVAQrkSKyQd5J",
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: "AKIAWCRSVGHSZTME4DWP",
    region: 'eu-central-1' // region of your bucket
});

const s3 = new aws.S3();

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

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'soyisibucket/images',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname)
      }
    })
  })


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


//get chat messages
app.get('/api/getChatMessages', (req, res) => {
    const senderId = req.query.senderId
    const receiverId = req.query.receiverId

    sql = "SELECT * FROM seniorprojectdbschema.chat WHERE senderId = ? AND receiverId = ?"
    db.query(
        sql, 
        [senderId,receiverId], 
        (error, result) => {
            if(error){
                console.log(error)
            } else{
                res.send(result)
            }
        }
    )
})


//get username from id of the user
app.get('/api/getUsernameFromId', (req, res) => {

    //username
    const userId = req.query.userId
    
    sql = "SELECT username FROM seniorprojectdbschema.user WHERE userId = ?"
    db.query(
        sql, 
        [userId], 
        (error, result) => {
            if(error){
                console.log(error)
            } else{
                res.send(result)
            }
        }
    )

})

//get all users for admin page
app.get('/api/getAllUsersForAdmin', (req, res) => {
    
    sql = "SELECT * FROM seniorprojectdbschema.user;"
    db.query(
        sql, 
        (error, result) => {
            if(error){
                console.log(error)
            } else{
                res.send(result)
            }
    })

})

//get all users for admin page
app.get('/api/getAllUsers', (req, res) => {
    
    sql = "SELECT userId, username, name, surname FROM seniorprojectdbschema.user;"
    db.query(
        sql, 
        (error, result) => {
            if(error){
                console.log(error)
            } else{
                res.send(result)
            }
    })

})

//get all posts from db and send it to homepage
app.get('/api/getPosts', (req, res) => {


    sql = "SELECT * FROM seniorprojectdbschema.post"
    db.query(
        sql, 
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

//get post comments
app.get('/api/getPostComments', (req, res) => {

    //get postId to get comment
    const postId = req.query.postId

    sql = "SELECT * FROM seniorprojectdbschema.postcomment WHERE postId = ?"
    db.query(sql, 
        [postId], 
        (error, result) => {
            if(error){
                console.log(error)
            } else{
                res.send(result)
            }
        }
    )

})

//get all user reviews
app.get('/api/getUserReviews', (req, res) => {

    //reviewed user Id
    const reviewedId = req.query.reviewedId
    
    sql = "SELECT * FROM seniorprojectdbschema.userreview WHERE reviewedId = ?"
    db.query(sql, [reviewedId], (error, result) => {
        if(error){
            console.log(error)
        } else{
            res.send(result)
        }
    })

})

//insert new post
app.post('/api/insertPost' ,(req, res) => {
    var fileNames = ""

    const singleUpload = upload.array('images', 10)
    singleUpload(req, res, function(err, some) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }

        req.files.map(file => {
            fileNames += file.key + " "
        })
        fileNames = fileNames.trim()

        const userId = req.body.userId
        const postContent = req.body.postContent

        sql = "INSERT INTO seniorprojectdbschema.post (userId, postContent, images) VALUES (?, ?, ?)"
        db.query(sql, 
            [userId, postContent, fileNames],
            (error, result) => {
                if(error){
                    console.log(error)
                    res.send(result)
                } else{
                    res.send(result)
                }
            }
        )
    });
    
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
                    result: {
                        userId: result[0].userId,
                        username: result[0].username,
                        name: result[0].name,
                        surname: result[0].surname,
                        email: result[0].email,
                        phone: result[0].phone,
                        signupdate: result[0].signupdate,
                    },
                    isLoginSuccessful: true
                })
            } else{ //unsuccesful login
                res.send({
                    isLoginSuccessful: false
                })
            }
    })
})

//SIGN IN AS ADMIN
app.post('/api/loginAsAdmin', (req,res) => {

    const username = req.body.username
    const password = req.body.password

    const sql = "SELECT * FROM seniorprojectdbschema.admin WHERE username = ?"
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


//INSERT NEW POST COMMENT
app.post('/api/insertPostcomment', (req, res) => {

    const postId = req.body.postId
    const userId = req.body.userId
    const newComment = req.body.newComment
    
    sql = "INSERT INTO seniorprojectdbschema.postcomment (postId, userId, commentContent) VALUES (?, ?, ?)"
    db.query(
        sql, 
        [postId, userId, newComment], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                console.log(result)
                res.send(result)
            }
        }
    )

})

app.post('/api/insertReview', (req, res) => {
    const reviewedId = req.body.reviewedId
    const reviewerId = req.body.reviewerId
    const reviewContent = req.body.reviewContent

    sql = "INSERT INTO seniorprojectdbschema.userreview (reviewedId, reviewerId, reviewContent) VALUES (?, ?, ?)"
    db.query(sql, 
        [reviewedId, reviewerId, reviewContent], 
        (error, result) => {
            if(error){
                console.log(error)
                res.send(error)
            } else{
                console.log(result)
                res.send(result)
            }
        }
    )
})

//send message
app.post('/api/sendMessage', (req, res) => {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    const message = req.body.message

    sql = "INSERT INTO seniorprojectdbschema.chat (senderId, receiverId, message) VALUES (?, ?, ?)"
    db.query(
        sql,
        [senderId, receiverId, message], 
        (error, result) => {
            if(error){
                res.send(error)
            } else{
                res.send(result)
            }
        }
    )
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})