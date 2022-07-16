import React from 'react';
import './friend.scss';

export default function Friend({ userName, userImg }) {
  return (
    <div className="friend">
      <div className="top-article__info">
        <div className="info-image">
          <img src={userImg} alt="" />
        </div>
        <div className="info-content">{userName}</div>
      </div>
    </div>
  );
}
