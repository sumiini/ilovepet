
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');


const cors =require('cors');

var bodyParser = require('body-parser');


const User = require('./models/user');
const Board =require('./models/board');
const Comment = require('./models/comment');
const FindBoard = require('./models/findboard');
const FindComment = require('./models/findcomment');
const ProtectBoard = require('./models/protectboard');


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

//var db = mongoose.connection.db;
//var mongoDriver = mongoose.mongo;
//var gfs = new Gridfs(db,mongoDriver);

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

//찾아주세요 게시글 작성

app.post('/Createfindboard',function(req,res,next){
  console.log("!!!!!!!!!!!createfindboard server");
  console.log(req.body);
  

  User.find(function(err,us){
    var cnt2=-1;
    us.forEach(cnt=>{
      cnt2+=1;
      if(us[cnt2].userid===req.body.userid && us[cnt2].userpassword===req.body.userpsw){
        console.log(us[cnt2].userid);
        const boarddb=new FindBoard({
          findboarduserid:req.body.userid,
          findboarduserpsw:req.body.userpsw,
          findboardtitle:req.body.title,
          findboardcontent:req.body.content,
          findboardplace:req.body.place,
          findboardimg:req.body.imgfile,
          
        });
        boarddb.save((err)=>{
          res.redirect('http://localhost:3000/find');
        })
      }
      
    });
  
  })

})


//보호중이에요 게시글 작성
app.post('/Createprotectboard',function(req,res,next){
  console.log("!!!!!!!!!!!createprotectboard server");
  console.log(req.body);
  

  User.find(function(err,us){
    var cnt7=-1;
    us.forEach(cnt=>{
      cnt7+=1;
      if(us[cnt7].userid===req.body.userid && us[cnt7].userpassword===req.body.userpsw){
        console.log(us[cnt7].userid);
        const protectboarddb=new ProtectBoard({
          protectboarduserid:req.body.userid,
          protectboarduserpsw:req.body.userpsw,
          protectboardtitle:req.body.title,
          protectboardcontent:req.body.content,
          protectboardplace:req.body.place,
          protectboardimg:req.body.imgfile,
          
        });
        protectboarddb.save((err)=>{
          res.redirect('http://localhost:3000/protect');
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

//찾아주세요 페이지의 게시글 리스트
app.get('/Readfindboard',function(req,res,next){
  console.log("!!!!@@@@@@ read find board server!!!");
  
     FindBoard.find(function(err, findboard){
        //console.log(board);
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(findboard);
      });

})

//보호해주세요 페이지의 게시글 리스트
app.get('/Readprotectboard',function(req,res,next){
  console.log("!!!!@@@@@@ read protect board server!!!");
  
     ProtectBoard.find(function(err, protectboard){
        //console.log(board);
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(protectboard);
      });

})



//댓글 리스트 출력
app.get('/Readcomment',function(req,res,next){
  console.log("~~~~~~~~read comment server !");
  Comment.find(function(err,comment){
    if(err) return res.status(500).send({error: 'database failure'});
    res.send(comment);

  })
})

//find 댓글 리스트 출력
app.get('/Readfindcomment',function(req,res,next){
  console.log("~~~~~~~~read find comment server !");
  FindComment.find(function(err,fcomment){
    if(err) return res.status(500).send({error: 'database failure'});
    res.send(fcomment);

  })
})

//게시글 삭제
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

//댓글 삭제
app.post('/Deletecomment',function(req,res,next){
  console.log(req.body);
  
  if(req.body.delcmid===req.body.cmdbuserid&&req.body.delcmpwd===req.body.cmdbpwd ){
    Comment.deleteOne({_id:req.body.delcm}).then((result)=>{

      res.redirect('http://localhost:3000/boardcontent'+req.body.interid);
    }).catch((err)=>{
      var response={
        success:false
      }
      res.status(401).json(response);
    });


  }
  
});

//찾아주세요 댓글 삭제
app.post('/Deletefindcomment',function(req,res,next){
  console.log(req.body);
  
  if(req.body.delcmid===req.body.cmdbuserid&&req.body.delcmpwd===req.body.cmdbpwd ){
    FindComment.deleteOne({_id:req.body.delfindcm}).then((result)=>{

      res.redirect('http://localhost:3000/findcontent'+req.body.interid);
    }).catch((err)=>{
      var response={
        success:false
      }
      res.status(401).json(response);
    });


  }
  
});

//찾아주세요 게시글 삭제
app.post('/Deletefindboard',function(req,res,next){
  console.log(req.body);
  
  if(req.body.adminid===req.body.bduserid&&req.body.adminpwd===req.body.bdpwd ){
    FindBoard.deleteOne({_id:req.body.delid}).then((result)=>{

      res.redirect('http://localhost:3000/find');
    }).catch((err)=>{
      var response={
        success:false
      }
      res.status(401).json(response);
    });


  }
  
});

//게시글 수정
app.post('/Editboard',function(req,res,next){
  console.log(req.body);
  
  
  if(req.body.editid===req.body.bduserid&&req.body.editpwd===req.body.bdpwd ){
    
    Board.findByIdAndUpdate(req.body.edid, {$set:{boardtitle:req.body.edittitle,boardcontent:req.body.editcontent}}, (err, movies)=>{
      res.redirect('http://localhost:3000/freeboard');
    });

  }
  
});

//찾아주세요 게시글 수정
app.post('/Editfindboard',function(req,res,next){
  console.log(req.body);
  
  
  if(req.body.editid===req.body.bduserid&&req.body.editpwd===req.body.bdpwd ){
    
    FindBoard.findByIdAndUpdate(req.body.edid, {$set:{findboardtitle:req.body.edittitle,findboardcontent:req.body.editcontent,findboardplace:req.body.editplace}}, (err, movies)=>{
      res.redirect('http://localhost:3000/find');
    });

  }
  
});

//자유 게시판 댓글 추가
app.post('/Addcomment',function(req,res,next){
  //console.log(req.body);
  User.find(function(err,us){
    var cnt4=-1;
    us.forEach(cnt9=>{
      cnt4+=1;
      if(us[cnt4].userid===req.body.commentid && us[cnt4].userpassword===req.body.commentpwd){
        console.log(req.body);
        //console.log(us[cnt4].commentpwd);
        const commentdb=new Comment({
          commentUserid:req.body.commentid,
          commentUserpwd:req.body.commentpwd,
          commentContent:req.body.commentcontent,
          commentId:req.body.commentkey
          
        });
        commentdb.save((err)=>{
          console.log("commentkey"+req.body.commentkey);
          res.redirect('http://localhost:3000/boardcontent'+req.body.commentkey);
        })
      }
      
    });
  
  })

})

//찾아주세요 댓글 추가
app.post('/Addfindcomment',function(req,res,next){
  //console.log(req.body);
  User.find(function(err,us){
    var cnt4=-1;
    us.forEach(cnt9=>{
      cnt4+=1;
      if(us[cnt4].userid===req.body.commentid && us[cnt4].userpassword===req.body.commentpwd){
        console.log(req.body);
        //console.log(us[cnt4].commentpwd);
        const findcommentdb=new FindComment({
          commentUserid:req.body.commentid,
          commentUserpwd:req.body.commentpwd,
          commentContent:req.body.commentcontent,
          commentId:req.body.commentkey
          
        });
        findcommentdb.save((err)=>{
          console.log("commentkey"+req.body.commentkey);
          res.redirect('http://localhost:3000/findcontent'+req.body.commentkey);
        })
      }
      
    });
  
  })

})


/*
Board.find(function(err,fboard){
      var cnt3=-1;
      fboard.forEach(cnt2=>{
        cnt3+=1;
        if(fboard[cnt3].boardtitle===req.body.beforetitle && fboard[cnt3].boardcontent===req.body.beforecontent){
          console.log("foreach--title"+fboard[cnt3].boardtitle);
          console.log("foreach--content"+fboard[cnt3].boardcontent);

          fboard[cnt3].boardtitle=req.body.edititle;
          fboard[cnt3].boardcontent=req.body.editcontent;
          console.log("after"+req.body.edititle);
          res.redirect('http://localhost:3000/freeboard');
        }
        
      });
    
    })



*/




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
