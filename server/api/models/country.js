const mongoose=require('mongoose')
const Country=mongoose.Schema({
    CountryName: {
        type: String,
        require: true
    }
})
module.exports=mongoose.model('Country',Country)