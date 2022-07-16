import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Feed from '../../../components/feed/Feed';
import ProfileBox from '../../../components/profileBox/ProfileBox';
import RecommendBox from '../../../components/recommendBox/RecommendBox';
import Nav from '../../../components/Nav/Nav';
import FriendBox from '../../../components/friendBox/FriendBox';
import axios from 'axios';

import './Main.scss';
import '../../../styles/reset.scss';

// 검색창 포커스 됬을 경우

const MainWon = () => {
  const [commentList, setCommentList] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const myDataEmail = useRef();
  const myDataName = useRef();
  const myDataNickName = useRef();

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

  useEffect(() => {
    axios.get('/api/users/auth').then(res => {
      return (
        (myDataEmail.current = res.data.email),
        (myDataName.current = res.data.name),
        (myDataNickName.current = res.data.nickName)
      );
    });
  }, []);

  const onLogoutHandler = () => {
    axios.get('/api/users/logout').then(res => {
      if (res.data.success) {
        navigate('/login-won');
      } else {
        alert('로그아웃 하는데 실패했습니다.');
      }
    });
  };

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
                userNickName={myDataNickName.current}
              />
            );
          })}
        </div>
        <div className="main-right">
          <ProfileBox
            name={myDataName.current}
            nickName={myDataNickName.current}
            onLogoutHandler={onLogoutHandler}
          />
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
