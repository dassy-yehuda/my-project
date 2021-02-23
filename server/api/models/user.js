const mongoose = require('mongoose')
const User = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    userPass: {
        type: String,
        require: true
    },
    userToken: { type: String, require: true },


    countries: [{  type: String, ref: "Country" }]
})
module.exports = mongoose.model('User', User)