import React from 'react';
import './recommendBox.scss';

export default function RecommendBox() {
  return (
    <div className="friendBox">
      <div className="friends-container">
        <div className="friends">
          <div className="friends-left">
            <div className="friends-image">
              <img src="./images/wonikChoi/profile/friend1.jpg" alt="" />
            </div>
            <div className="friends-name">
              <span className="friends-user">realdiegovaldez</span>
              <span className="friends-sub">인기</span>
            </div>
          </div>
          <div className="friends-right">
            <span className="follow">팔로우</span>
          </div>
        </div>
        <div className="friends">
          <div className="friends-left">
            <div className="friends-image">
              <img src="./images/wonikChoi/profile/friend2.jpg" alt="" />
            </div>
            <div className="friends-name">
              <span className="friends-user">khloekardashian</span>
              <span className="friends-sub">인기</span>
            </div>
          </div>
          <div className="friends-right">
            <span className="follow">팔로우</span>
          </div>
        </div>
        <div className="friends">
          <div className="friends-left">
            <div className="friends-image">
              <img src="./images/wonikChoi/profile/friend3.jpg" alt="" />
            </div>
            <div className="friends-name">
              <span className="friends-user">simonettalein</span>
              <span className="friends-sub">인기</span>
            </div>
          </div>
          <div className="friends-right">
            <span className="follow">팔로우</span>
          </div>
        </div>
        <div className="friends">
          <div className="friends-left">
            <div className="friends-image">
              <img src="./images/wonikChoi/profile/friend4.jpg" alt="" />
            </div>
            <div className="friends-name">
              <span className="friends-user">therock</span>
              <span className="friends-sub">인기</span>
            </div>
          </div>
          <div className="friends-right">
            <span className="follow">팔로우</span>
          </div>
        </div>
        <div className="friends">
          <div className="friends-left">
            <div className="friends-image">
              <img src="./images/wonikChoi/profile/friend6.jpg" alt="" />
            </div>
            <div className="friends-name">
              <span className="friends-user">kyliejenner</span>
              <span className="friends-sub">인기</span>
            </div>
          </div>
          <div className="friends-right">
            <span className="follow">팔로우</span>
          </div>
        </div>
      </div>
    </div>
  );
}
