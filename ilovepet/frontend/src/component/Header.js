import React from "react";
import '../css/header.css';

const Header = () => (
    <div className="header">
        
        <div className="sign">
            <a className="link-signup" href="./signup">회원가입</a>
            <a className="link-signin" href="./signin">로그인</a>

        </div>
        
        <div className="headername">
            반려동물 커뮤니티
        </div>
        <div className="dogimg">
            <img src='./dogimg.jpg'/>
            
        </div>

        <div className="brandname">
            <a className="brandtitle" href="./">I LOVE PET</a>
            
        </div>

        <div className="link">
            <a className="link-freeboard" href="./freeboard">자유게시판</a>
            <a className="link-find" href="./find">찾아주세요</a>
            <a className="link-protect" href="./protect">보호중이에요</a>

        </div>
        
        
        
    </div>
    
   
    
)

export default Header;