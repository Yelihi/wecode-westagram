import React, { useState } from 'react';
import './Nav.scss';

// 검색창 focus 시 화면 변경
export default function Nav() {
  const [focus, setFocus] = useState('');
  const [hidden, setHidden] = useState(true);

  const onFocus = () => {
    setHidden(false);
    setFocus('focus');
  };

  const onBlur = () => {
    setHidden(true);
    setFocus('');
  };

  return (
    <div className="navClass">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-container__logo">
            <div className="nav-logo">Westagram</div>
          </div>
          <div className="nav-container__search">
            <div className="search-input">
              <input
                type="text"
                id="input"
                autoComplete="off"
                className={`search-input__input ${focus}`}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="검색"
              />
              <i
                className="bx bx-search"
                style={{ display: hidden ? 'block' : 'none' }}
                id="search"
              ></i>
              <i
                className="bx bxs-x-circle"
                style={{ display: hidden ? 'none' : 'block' }}
                id="exit"
              ></i>
            </div>
          </div>
          <div className="nav-container__icon">
            <div className="nav-icon">
              <a href="#">
                <i className="bx bxs-home"></i>
              </a>
            </div>
            <div className="nav-icon">
              <a>
                <i className="bx bx-paper-plane"></i>
              </a>
            </div>
            <div className="nav-icon">
              <a>
                <i className="bx bx-plus-circle"></i>
              </a>
            </div>
            <div className="nav-icon">
              <a>
                <i className="bx bx-compass"></i>
              </a>
            </div>
            <div className="nav-icon">
              <a>
                <i className="bx bx-heart"></i>
              </a>
            </div>
            <div className="nav-profile__image">
              <a>
                <img src="./images/wonikChoi/profile/myprofile.jpeg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
