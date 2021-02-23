const router=require('express').Router()
const userController=require('../controllers/user')
const countryController=require('../controllers/country')
const user=require('../controllers/user')
const country=require('../controllers/country')




// user function
// router.get('/',user.checkJwt)
router.get('/allHistory/:name/:pass',user.allHistory)
router.put('/addHistory/:stateName/:statePass/:name',user.addHistory)
router.post('/login/:name/:pass/:check',user.login)
router.get('/getListForUser/:name',user.getListForUser)
router.get('/getOneForUser/:userName/:countryName',user.getListForUser)
router.post('/addToUserList/:userName/:countryName',user.getListForUser)
// router.put('/updateUserList/:userName/:countryName',user.getListForUser)
router.patch('/deleteFromHistory/:stateName/:statePass/:name',user.deleteFromHistory)


// country function
// הצגת כל המדינות מיד בכניסת המשתמש לאפליקציה-עושים דרך middleWare?  או שגם דרך הניתוב?
router.get('/allCountry',country.allCountry)
router.get('/countryDetails/:name/:token',country.countryDetails)
module.exports=router