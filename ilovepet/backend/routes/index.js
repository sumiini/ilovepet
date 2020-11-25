var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/Signup',function(req,res,next){
  console.log("in server !!");
  console.log("**************"+req.body);
  
    const userdb= new User({
        usernickname:req.body.usernickname,
        userid:req.body.userid,
        userpassword:req.body.userpassword


    });
    
    console.log("**********************"+req.body.usernickname);
    userdb.save((err)=>{
        
        res.redirect('http://localhost:3000');
    })

})


module.exports = router;