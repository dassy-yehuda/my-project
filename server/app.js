const express = require('express')
const app = express()
const env = require('dotenv')
const Jwt = require('jsonwebtoken')
const User = require('./api/models/user')
env.config()
const cors = require('cors')

app.use(cors())

const mongoose = require('mongoose')
const fetch = require('node-fetch');
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_PASSWORD, connectionParams)
    .then(() => {
        console.log("mongoDB connected!!!")
    }).catch((err) => {
        console.log('net errors')
        // console.log(`mongoDB err:${err}!!!`)
    })
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./api/routes/router')


app.use((req, res, next) => {
console.log(req.originalUrl );
//    console.log(req.params.token);
//  console.log(req.body.token);
return next()
 })
    // if(req.originalUrl.includes('/login')){
    //     return next()
    // }
    // let token = req.headers.Authoriztion
    // if (true)
    //     return next()
    // else {
    //     console.log(req.headers.Authoriztion);
    //     let verify = Jwt.verify(token, process.env.ACCESS_TOKEN)
    //     User.findOne({ userName: verify.userName }).then((user) => {
    //         if (user) {
    //             next();
    //         } else {
    //             return res.json({ message: 'error by sending your details to the server... ' })
    //         }
       


    
    //         next()
    //     else {
    //         return res.status(450).json({ message: 'its not from login' })
    //     }
    //     //     if (!req.headers.authorization) {
    //     //         return res.status(409).json({ message: "your token is not define please login again" })
    //     //     } else {
    //     //         let jwtVerify = Jwt.verify(req.headers.authorization, process.env.ACSESS_TOKEN)
    //     //         User.findOne({ userName: jwtVerify.name, userPass: jwtVerify.pass }).then((user) => {
    //     //             if (!user) {
    //     //                 return res.json({ message: "user is not exist" })
    //     //             }
    //     //             next()
    //     //         }).catch(err=>{
    //     //             return res.json({message:err+'fdefefd'})
    //     //         })
    //     //     }
    // })
    app.use('/', router)

    // צריך לבדוק אם זה מיותר כי ייבאנו והפעלנו למעלה -אבל אולי צריך לדרוס
    // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*")
    //     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authoriztion")
    //     if (req.method === "OPTIONS") {
    //         res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET")
    //         return res.status(200).json({});
    //     }
    //     next();
// });





//מידל שמיועד לניתוב שלא קיים-שולח דף של סטטוס 404
app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
})
//json מהמידל הקודם ושולח אותו כ error  מקבל את ה
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;


