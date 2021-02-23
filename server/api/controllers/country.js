const User = require("../models/user")
const Coutry = require('../models/country')
const fetch = require('node-fetch');
const { response } = require("../../app");





const allCountry = (req, res) => {
    debugger
    // לשלוף את כל הרשימה שעל שמו-המערך בסכמה
  fetch('https://api.covid19api.com/countries',{ method: "GET", headers: {"Content-type": "application/json;charset=UTF-8"} })
        
        .then(res => res.json())
        .then(json => {
            // if (!json) {
            //     return res.json({ message: 'county is empty' })
            // }
            return res.json({ json })
        }).catch(err => console.log(err));
// fetch('https://api.covid19api.com/countries', { method: "GET", headers: {"Content-type": "application/json;charset=UTF-8"} })
//  .then(response =>  res.json()) .then(json => return res.json()).catch(err => console.log(err));

       
 
}
const countryDetails = (req, res) => {
    debugger
    // לשלוף את כל הרשימה שעל שמו-המערך בסכמה
     fetch(`https://api.covid19api.com/country/${req.params.name}/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
    .then(res => res.json())
    .then(json => {
        debugger
            if (!json) {
                return res.json({ message: 'county is empty' })
            }
            return res.json({ json })   
        }).catch(error => {  
            error 
        })
     
      

} 
module.exports = { allCountry,countryDetails }




// const country =  fetch('https://api.covid19api.com/countries')
//     .then(res => res.json())
//     .then(json => {
//         res.json({ json })
//     }) 
//     if(!country){
//         return res.json({message:'county is empty'})
//     }
//    return res.json({
//         country
//     }).catch(error=>{
//        error 
//     })
