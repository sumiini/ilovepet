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

app.post('/Signup',function(req,res,next){
  console.log("in server !!");
  console.log("**************"+req.body);
  
    const userdb= new User({
        usernickname:req.body.usernickname,
        userid:req.body.userid,
        userpassword:req.body.userpassword


    });
    
    userdb.save((err)=>{
        
        res.redirect('http://localhost:3000');
    })

})

app.use(bodyParser.urlencoded({extended: true}));
app.post('/Createboard',function(res,req,next){
  console.log("!!!!!!!!!!!createFreemoard server");
  console.log(res.body);

  
  const boarddb=new Board({
    boarduserid:res.body.userid,
    boarduserpsw:res.body.userpsw,
    boardtitle:res.body.title,
    boardcontent:res.body.content

  });

  boarddb.save((err)=>{
    req.redirect('http://localhost:3000/freeboard');
  })

})

app.post('/Readboard',function(res,req,next){
  console.log("!!!!@@@@@@ read board server!!!");
     Board.find(function(err, board){
       console.log(board);
      if(err) return res.status(500).send({error: 'database failure'});
      res.send(board);
  })

})

// app.get('/freeboard',function(req,res,next){
//   Board.find({}).then((board)=>{
//     res.render('freeboard',{boards:boards});
//   }).catch((err)=>{
//     console.log(err);
//   });
// });

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

app.use(cors());
app.listen(port,()=>console.log(`Listening on port ${port}`));
module.exports = app;
