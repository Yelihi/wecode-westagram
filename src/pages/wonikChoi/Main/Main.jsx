import React, { useEffect, useState } from 'react';
import Feed from '../../../components/feed/Feed';
import ProfileBox from '../../../components/profileBox/ProfileBox';
import RecommendBox from '../../../components/recommendBox/RecommendBox';
import Nav from '../../../components/Nav/Nav';
import FriendBox from '../../../components/friendBox/FriendBox';

import './Main.scss';
import '../../../styles/reset.scss';

// 검색창 포커스 됬을 경우

// const userData = {
//   friend: [
//     {
//       id: Date.now() + Math.random() * 99,
//       name: 'Elvis_lay',
//       img: './images/wonikChoi/profile/elvis-ray-J-JOGvnfgM8-unsplash.jpg',
//       backImg: './images/wonikChoi/picture/cat.jpeg',
//     },
//     {
//       id: Date.now() + Math.random() * 99,
//       name: 'cover-vesi',
//       img: './images/wonikChoi/profile/people1.jpg',
//       backImg: './images/wonikChoi/picture/food1.jpeg',
//     },
//     {
//       id: Date.now() + Math.random() * 99,
//       name: 'malon-alves',
//       img: './images/wonikChoi/profile/marlon-alves-UGNVMLyQKtA-unsplash.jpg',
//       backImg: './images/wonikChoi/picture/food2.jpg',
//     },
//     {
//       id: Date.now() + Math.random() * 99,
//       name: 'rick_gebhard',
//       img: './images/wonikChoi/profile/rick-gebhardt-Hi_FonIcfjk-unsplash.jpg',
//       backImg: './images/wonikChoi/picture/korea.jpg',
//     },
//     {
//       id: Date.now() + Math.random() * 99,
//       name: 'Yelihi',
//       img: './images/wonikChoi/profile/myprofile.jpeg',
//       backImg: './images/wonikChoi/picture/my.jpeg',
//     },
//     {
//       id: Date.now() + Math.random() * 99,
//       name: 'Mendenz',
//       img: './images/wonikChoi/profile/people2.jpg',
//       backImg: './images/wonikChoi/picture/football.jpg',
//     },
//   ],
// };

const MainWon = () => {
  const [commentList, setCommentList] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data/commentData.json', {
      method: 'GET', // GET method는 기본값이라서 생략이 가능합니다.
    })
      .then(res => res.json())
      .then(data => {
        setCommentList(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/data/userData.json', {
      method: 'GET', // GET method는 기본값이라서 생략이 가능합니다.
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data);
      });
  }, []);

  return (
    <div className="main">
      <Nav />
      <section className="section-container">
        <div className="main-container">
          <FriendBox userData={userData} />

          {commentList.map(friend => {
            return (
              <Feed
                key={friend.id}
                userName={friend.name}
                userImg={friend.img}
                userBackImg={friend.backImg}
              />
            );
          })}
        </div>
        <div className="main-right">
          <ProfileBox />
          <div className="profile-container__separate">
            <span>회원님을 위한 추천</span>
            <span>모두 보기</span>
          </div>
          <RecommendBox />
          <div className="description">
            <span>
              소개&#183;도움말&#183;홍보
              센터&#183;API&#183;채용정보&#183;개인정보처리방침&#183;약관&#183;위치&#183;언어
            </span>
          </div>
          <div className="copyright">
            <span>© 2022 INSTAGRAM FROM META</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainWon;
