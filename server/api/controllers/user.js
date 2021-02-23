const User = require("../models/user")
const Coutry = require('../models/country')
const jwt = require('jsonwebtoken')
// const { remove, deleteOne } = require("../models/user")
// const { delete } = require("../routes/router")
// const { delete } = require("../routes/router")


const checkJwt = (currentToken) => {
    // return User.find().then((users) => {
    //     users.forEach(element => {
    //         jwt.verify(element.token, process.env.ACCESS_TOKEN)

    //     })
    // }).then((decodded) => {

    // })
    User.findOne({ userToken: currentToken }).then((user) => {
        if (user)
            return true
        return false
    })
}
// const checkJwt=(currentToken,user)=>{
//     let token=jwt.verify(currentToken,process.env.ACCESS_TOKEN)
//     if(token.userName!==user.userName||token.userPass!==user.userPass){

//     }

// }

const login = (req, res) => {
    console.log(req.params.name, req.params.pass);
    let token = jwt.sign({ name: req.params.name, pass: req.params.pass }, process.env.ACSESS_TOKEN)
    console.log(token)


    if (req.params.check == "true") {//נכנס דרך התחברות
        console.log(req.params.check)
        return User.findOne({ userName: req.params.name, userPass: req.params.pass }).then((user) => {
            console.log(user)
            if (!user) {
                return res.json({ status: false, data: 'not found' })
            }
            else {
                return res.json({ userToken: token })
            }
        }).catch(err => {
            res.json({ message: err })
        })
    }
    else {//נכנס דרך הרשמה
        return User.findOne({ userName: req.params.name, userPass: req.params.pass }).then((user) => {
            if (user) {
                return res.json({ status: true, data: 'user exist' })
            }
            const newUser = new User({
                userName: req.params.name,
                userPass: req.params.pass,
                userToken: token
            })
            return newUser.save().then((newUser) => {
                res.json({ status: added, data: token })
            })
        }).catch((err) => {
            res.json({ message: err })
        })
    }

}





// let userDecodedParam = jwt.verify(req.query.jwt, process.env.ACCESS_TOKEN)
// let decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
// if(userDecodedParam===decoded){

// }
// console.log(decoded)
// // ישנם 3 אופציות:
// // -שאדם נכנס להרשמה -או נכנס דרך התחברות אבל הוא לא באמת קיים ואז צריך להוסיף אותו למאגר
// // -אדם נכנס פעם ראשונה לאתר -הוא קיים במאגר ועכשו מג'נרטים לו קוד
// // -אדם כבר נמצא בתוך האתר ומבקש בקשות שליפה ואז מה שמשתמשים איתו זה הקוד שמגיע מהקלינט
// User.findOne({ userName: req.params.name, userPass: req.params.pass }).then((exist) => {
//     if (!exist) {  //השם משתמש הזה לא קיים
//         first_login(req.params.name, req.params.pass)
//         res.json({ message: 'yuo are not exist, please register befor login' })
//     }
//     else {
//         if (exist.jwt === null) {//jwt עדיין אין 
//             // send to jwt
//         }
//         if (exist.jwt !== req.query.jwt) {//  אבל הוא נפרץ כי הוא לא אותו דבר-שןלח להחלפת הסיסמאjwt אם יש 
//             res.json({ Severe_security_issue: 'your password was oppened ,you must change it!!!' })
//         }
//     }
// })


//res.send(token)






const addHistory = (req, res) => {
    // if (checkJwt(req.params.token)) {

    return User.findOne({ userName: req.params.stateName, userPass: req.params.statePass }).then((user) => {
        console.log(user)
        user.countries.push(req.params.name)
        return user.save().then((resu) => {
            console.log(resu)
            return res.json({ status: 'added', data: resu })
        })
    }).catch(err => {
        res.status(404).json({ addNewUser: err })
    })
    // }
}
// else {
//     return res.json({ status: "invalid token" }) 
// }
 

// const getCountryForUser = (req, res) => {
//     // const userName= צריך לשלוף מהמסד או ווידוא וכו
//     // שליפה של מדינה לפי מה שביקש עכשו
//     // ויש להוסיף את זה למערך ההסטוריה שלו

// }

const getListForUser = (req, res) => {
    // לשלוף את כל הרשימה שעל שמו-המערך בסכמה
    const userName = req.params.articleId
    User.findById(userName).then((user) => {
        if (!user) {
            return res.send('the user is not exist')
        }
        user.populate(countries).then((ctries) => {
            res.status(200).json({ ctries })
        })
    }).catch((error) => {
        res.status(500).send(error)
    })
}

const deleteUser = (req, res) => {
    const userName = req.params.userName
    User.findOne({ userName: userName }).then((user) => {
        if (!user) {
            return res.send('not found')
        }
    }).then(() => {
        User.deleteOne({ userName: userName }).then(() => {
            res.status(200).send('the user deleted')
        })
    }).catch(() => {
        res.send('the user Isnot exist:(')
    })
}
// מחיקה מההסטוריה
const deleteFromHistory = (req, res) => {

    return User.findOne({ userName: req.params.stateName, userPass: req.params.statePass })
        .then((result) => {
            if (!result) {
                return res.send('user not found')
            }
            console.log("result:" + result);
            console.log(result.countries);
            console.log(req.params.name);
            const newArray = []
            result.countries.forEach(element => {
                if (element !== req.params.name)
                    newArray.push(element)
            })
            console.log(newArray)
             result.countries=newArray
             return result.save()
            // return User.updateOne({userName: req.params.stateName, userPass: req.params.statePass },{countries:newArray}).save()
//             var update = Update.Set( "countries", newArray );

// collection.Update( query, update );
//             result.countries.re


            // User.findOneAndUpdate(
            //     { result},
            //     { $set: { countries: newArray } }
            //   );
            // return result.save()
 

            // replaceOne(countries, newArray)
                // const i = -1;
                // for (let index = 0; index < result.countries.length; index++) {
                //     console.log(result.countries[index])
                //     if (result.countries[index] == req.params.name) {
                //         console.log(index);
                //         i = index
                //         // result.countries.removeAt(index)
                //     }
                // }
                // console.log(i !== -1);
                // if (i) {
                //     return result.countries.splice(i, 1)
                // }

                // filter(p => p !== req.params.name).save()
                // return result.countries.includes(req.params.name).then((ret) => {
                //     console.log(ret);
                //     remove(ret).save()
                // })
 


                // if (user.countries.includes(req.params.name)) {
                //     user.countries.remove()
                // }
                .then((newArray) => {
                    if (!newArray) {
                        return res.status(404).send('the country Isnot exist in the list already:(')
                    }
                    console.log("contry deleted:" + newArray);
                    return res.json({ status: 'deleted', data: newArray })
                    // user.countries.deleteOne(country).then(() => {
                    //     res.status(200).send('the country deleted')
                    // })
                })
        }).catch(err => {
            return res.json({ status: 'fell', data: err })

        })
}
const allHistory = (req, res) => {
    debugger
    // לשלוף את כל הרשימה שעל שמו-המערך בסכמה
    User.findOne({ userName: req.params.name, userPass: req.params.pass }).then((user) => {
        if (!user) {
            return res.send('user not found')
        }
        return res.json({ status: 201, data: user.countries })

    }).catch(err => console.log(err));
    // fetch('https://api.covid19api.com/countries', { method: "GET", headers: {"Content-type": "application/json;charset=UTF-8"} })
    //  .then(response =>  res.json()) .then(json => return res.json()).catch(err => console.log(err));


    // getCountryForUser
}
module.exports = { addHistory, allHistory, deleteFromHistory, deleteUser, getListForUser, login, checkJwt }
    // fetch('https://api.covid19api.com/countries')
    // .then(res => res.json())
    // .then(json => {
    //     console.log("First user in the array:");
    //     console.log(json[0]);
    //     console.log("Name of the first user in the array:");
    //     console.log(json[0].Country);

    // }) 

