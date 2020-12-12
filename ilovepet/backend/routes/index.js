var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
const User = require('../models/user');
const Board =require('../models/board');
const Comment = require('../models/comment');
const FindBoard = require('../models/findboard');
const FindComment = require('../models/findcomment');
const ProtectBoard = require('../models/protectboard');
const ProtectComment = require('../models/protectcomment');

//회원가입
router.post('/Signup',function(req,res,next){
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


//로그인
router.post('/Signin',function(req,res,next){
  console.log("in  로그인 server !!");
  console.log("**************"+req.body);
  
  User.find(function(err,us){
    var cnt2=-1;
    us.forEach(cnt=>{
      cnt2+=1;
      if(us[cnt2].userid===req.body.signinID && us[cnt2].userpassword===req.body.signinPWD){
        res.redirect('http://localhost:3000/')
      }
      
      
    });
  
  })

})



router.use(bodyParser.urlencoded({extended: true}));
//게시판 글쓰기 (회원 여부 확인하여 존재하는 회원만 글쓰기 가능)
router.post('/Createboard',function(req,res,next){
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

router.post('/Createfindboard',function(req,res,next){
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
router.post('/Createprotectboard',function(req,res,next){
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
router.get('/Readboard',function(req,res,next){
  console.log("!!!!@@@@@@ read board server!!!");
  
     Board.find(function(err, board){
        //console.log(board);
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(board);
      });

})

//찾아주세요 페이지의 게시글 리스트
router.get('/Readfindboard',function(req,res,next){
  console.log("!!!!@@@@@@ read find board server!!!");
  
     FindBoard.find(function(err, findboard){
        //console.log(board);
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(findboard);
      });

})

//보호해주세요 페이지의 게시글 리스트
router.get('/Readprotectboard',function(req,res,next){
  console.log("!!!!@@@@@@ read protect board server!!!");
  
     ProtectBoard.find(function(err, protectboard){
        //console.log(board);
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(protectboard);
      });

})



//댓글 리스트 출력
router.get('/Readcomment',function(req,res,next){
  console.log("~~~~~~~~read comment server !");
  Comment.find(function(err,comment){
    if(err) return res.status(500).send({error: 'database failure'});
    res.send(comment);

  })
})

//find 댓글 리스트 출력
router.get('/Readfindcomment',function(req,res,next){
  console.log("~~~~~~~~read find comment server !");
  FindComment.find(function(err,fcomment){
    if(err) return res.status(500).send({error: 'database failure'});
    res.send(fcomment);

  })
})

//protect 댓글 리스트 출력
router.get('/Readprotectcomment',function(req,res,next){
  console.log("~~~~~~~~read protect comment server !");
  ProtectComment.find(function(err,pcomment){
    if(err) return res.status(500).send({error: 'database failure'});
    res.send(pcomment);

  })
})

//게시글 삭제
router.post('/Deleteboard',function(req,res,next){
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
  else{
    res.status(200).send("<script>alert(\"삭제 권한이 없습니다\")</script>");
  }
  
  
});

//댓글 삭제
router.post('/Deletecomment',function(req,res,next){
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
  else{
    
    res.status(200).send("<script>alert(\"삭제 권한이 없습니다\")</script>");
  }
  
  
});

//찾아주세요 댓글 삭제
router.post('/Deletefindcomment',function(req,res,next){
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
  else{
    
    res.status(200).send("<script>alert(\"삭제 권한이 없습니다\")</script>");
  }
  
  
});

//보호중이에요 댓글 삭제
router.post('/Deleteprotectcomment',function(req,res,next){
  console.log(req.body);
  
  if(req.body.delcmid===req.body.cmdbuserid&&req.body.delcmpwd===req.body.cmdbpwd ){
    ProtectComment.deleteOne({_id:req.body.delfindcm}).then((result)=>{

      res.redirect('http://localhost:3000/protectcontent'+req.body.interid);
    }).catch((err)=>{
      var response={
        success:false
      }
      res.status(401).json(response);
    });


  }
  else{
    
    res.status(200).send("<script>alert(\"삭제 권한이 없습니다\")</script>");
  }
  
});

//찾아주세요 게시글 삭제
router.post('/Deletefindboard',function(req,res,next){
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
  else{
    
    res.status(200).send("<script>alert(\"삭제 권한이 없습니다\")</script>");
  }
  
});

//보호중이에요 게시글 삭제
router.post('/Deleteprotectboard',function(req,res,next){
  console.log(req.body);
  
  if(req.body.adminid===req.body.bduserid&&req.body.adminpwd===req.body.bdpwd ){
    ProtectBoard.deleteOne({_id:req.body.delid}).then((result)=>{

      res.redirect('http://localhost:3000/protect');
    }).catch((err)=>{
      var response={
        success:false
      }
      res.status(401).json(response);
    });


  }
  else{
    
    res.status(200).send("<script>alert(\"삭제 권한이 없습니다\")</script>");
  }
  
});

//게시글 수정
router.post('/Editboard',function(req,res,next){
  console.log(req.body);
  
  
  if(req.body.editid===req.body.bduserid&&req.body.editpwd===req.body.bdpwd ){
    
    Board.findByIdAndUpdate(req.body.edid, {$set:{boardtitle:req.body.edittitle,boardcontent:req.body.editcontent}}, (err, movies)=>{
      res.redirect('http://localhost:3000/freeboard');
    });

  }
  else{
    
    res.status(200).send("<script>alert(\"수정 권한이 없습니다\")</script>");
  }
  
});

//찾아주세요 게시글 수정
router.post('/Editfindboard',function(req,res,next){
  console.log(req.body);
  
  
  if(req.body.editid===req.body.bduserid&&req.body.editpwd===req.body.bdpwd ){
    
    FindBoard.findByIdAndUpdate(req.body.edid, {$set:{findboardtitle:req.body.edittitle,findboardcontent:req.body.editcontent,findboardplace:req.body.editplace}}, (err, movies)=>{
      res.redirect('http://localhost:3000/find');
    });

  }
  else{
    
    res.status(200).send("<script>alert(\"수정 권한이 없습니다\")</script>");
  }
});

//보호중이에요 게시글 수정
router.post('/Editprotectboard',function(req,res,next){
  console.log(req.body);
  
  
  if(req.body.editid===req.body.bduserid&&req.body.editpwd===req.body.bdpwd ){
    
    ProtectBoard.findByIdAndUpdate(req.body.edid, {$set:{protectboardtitle:req.body.edittitle,protectboardcontent:req.body.editcontent,protectboardplace:req.body.editplace}}, (err, movies)=>{
      res.redirect('http://localhost:3000/protect');
    });

  }
  else{
    
    res.status(200).send("<script>alert(\"수정 권한이 없습니다\")</script>");
  }
  
});

//자유 게시판 댓글 추가
router.post('/Addcomment',function(req,res,next){
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
router.post('/Addfindcomment',function(req,res,next){
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

//보호중이에요 댓글 추가
router.post('/Addprotectcomment',function(req,res,next){
  //console.log(req.body);
  User.find(function(err,us){
    var cnt4=-1;
    us.forEach(cnt9=>{
      cnt4+=1;
      if(us[cnt4].userid===req.body.commentid && us[cnt4].userpassword===req.body.commentpwd){
        console.log(req.body);
        //console.log(us[cnt4].commentpwd);
        const protectcommentdb=new ProtectComment({
          commentUserid:req.body.commentid,
          commentUserpwd:req.body.commentpwd,
          commentContent:req.body.commentcontent,
          commentId:req.body.commentkey
          
        });
        protectcommentdb.save((err)=>{
          console.log("commentkey"+req.body.commentkey);
          res.redirect('http://localhost:3000/protectcontent'+req.body.commentkey);
        })
      }
      
    });
  
  })

})

module.exports = router;