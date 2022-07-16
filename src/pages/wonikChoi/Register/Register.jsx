import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.scss';
import '../../../styles/reset.scss';

export default function RegisterWon() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: '',
    password: '',
    name: '',
    nickName: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setValue(prevValue => ({ ...prevValue, [name]: value }));
  };

  let validation = value.email.includes('@') && value.password.length > 4;

  const onSubmit = e => {
    e.preventDefault();

    let body = {
      email: value.email,
      password: value.password,
      name: value.name,
      nickName: value.nickName,
    };

    axios.post('/api/users/register', body).then(res => {
      if (res.data.success) {
        navigate('/login-won');
      } else {
        alert('로그인에 실패했습니다');
      }
    });
  };

  return (
    <div className="register">
      <main className="container">
        <article className="container-center">
          <div className="register-container">
            <div className="register-container__input">
              <div className="register-logo">
                <span>Westagram</span>
              </div>
              <div className="register-facebook">
                <span>친구들의 사진과 동영상을 보려면 가입하세요</span>
              </div>

              <form action="" className="register-input" onSubmit={onSubmit}>
                <button type="submit" className="register-button focus">
                  페이스북으로 로그인
                </button>
                <div className="register-separate">
                  <div className="register-separate__line" />
                  <div className="register-separate__span">또는</div>
                  <div className="register-separate__line" />
                </div>
                <input
                  type="text"
                  className="register-input__ID"
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  name="email"
                  onChange={onChangeInput}
                />
                <input
                  type="text"
                  className="register-input__ID"
                  placeholder="성명"
                  name="name"
                  onChange={onChangeInput}
                />
                <input
                  type="text"
                  className="register-input__ID"
                  placeholder="사용자 이름"
                  name="nickName"
                  onChange={onChangeInput}
                />
                <input
                  type="password"
                  className="register-input__PW"
                  placeholder="비밀번호"
                  name="password"
                  onChange={onChangeInput}
                />
                <div className="register-lostPassword">
                  <span>
                    서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
                    업로드했을 수도 있습니다.
                  </span>
                </div>
                <button
                  type="submit"
                  className={
                    validation ? `register-button focus` : `register-button`
                  }
                  disabled={!validation}
                >
                  가입
                </button>
              </form>
            </div>
            <div className="register-container__inroll">
              <div className="register-inroll__span">
                <p>계정이 있으신가요?</p>
                <span onClick={() => navigate('/login-won')}>로그인</span>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
