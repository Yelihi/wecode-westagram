import React from 'react';
import './friendBox.scss';
import Friend from '../friend/Friend';

export default function FriendBox({ userData }) {
  return (
    <div className="friendBox">
      <div className="top-article">
        <div className="top-article__container">
          {userData.map(data => {
            return (
              <Friend key={data.id} userName={data.name} userImg={data.img} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
