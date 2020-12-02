
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors =require('cors');

var bodyParser = require('body-parser');


const User = require('./models/user');
const Board =require('./models/board');


const port = 3002;

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost:27017/projecttest', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongooseAutoInc.initialize(mongoose.connection);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//============================================================
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//회원가입
app.post('/Signup',function(req,res,next){
  console.log("in server !!");
  console.log("**************"+req.body);
  
    const userdb= new User({
        userid:req.body.userid,
        userpassword:req.body.userpassword


    });
    
    userdb.save((err)=>{
        
        res.redirect('http://localhost:3000');
    })

})



app.use(bodyParser.urlencoded({extended: true}));
//게시판 글쓰기 (회원 여부 확인하여 존재하는 회원만 글쓰기 가능)
app.post('/Createboard',function(req,res,next){
  console.log("!!!!!!!!!!!createFreemoard server");
  User.find(function(err,us){
    var cnt2=-1;
    us.forEach(cnt=>{
      cnt2+=1;
      if(us[cnt2].userid===req.body.userid && us[cnt2].userpassword===req.body.userpsw){
        console.log(us[cnt2].userid);
        console.log(us[cnt2].userpassword);
        const boarddb=new Board({
          boarduserid:req.body.userid,
          boarduserpsw:req.body.userpsw,
          boardtitle:req.body.title,
          boardcontent:req.body.content
          
        });
        boarddb.save((err)=>{
          res.redirect('http://localhost:3000/freeboard');
        })
      }
      
    });
  
  })

})

//자유게시판에서 제목을 누르면 해당 content 열람 가능
app.get('/Readboard',function(req,res,next){
  console.log("!!!!@@@@@@ read board server!!!");
  
     Board.find(function(err, board){
        //console.log(board);
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(board);
      });

})

app.post('/Deleteboard',function(req,res,next){
  console.log(req.body);
  
  if(req.body.adminid===req.body.bduserid&&req.body.adminpwd===req.body.bdpwd ){
    Board.deleteOne({_id:req.body.delid}).then((result)=>{

      res.redirect('http://localhost:3000/freeboard');
    }).catch((err)=>{
      var response={
        success:false
      }
      res.status(401).json(response);
    });


  }
  
});




//============================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port,()=>console.log(`Listening on port ${port}`));
module.exports = app;
