import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import '../../../styles/reset.scss';

// 로그인 부분 사진 변동시키기

const LoginWon = () => {
  const [valueId, setValueId] = useState('');
  const [valuePw, setValuePw] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [focus, setFocus] = useState('');

  const interval = useRef();
  const navigate = useNavigate();

  // 사진 바꾸기 (객체로 useState 사용하기)
  const [img, setImg] = useState({ img1: 'active', img2: '', img3: '' });

  useEffect(() => {
    const cycleImage = () => {
      if (img.img1 === 'active') {
        setImg({ ...img, img1: '', img2: 'active' });
      } else if (img.img2 === 'active') {
        setImg({ ...img, img2: '', img3: 'active' });
      } else if (img.img3 === 'active') {
        setImg({ ...img, img3: '', img1: 'active' });
      }
    };

    interval.current = setInterval(cycleImage, 4000);
    return () => {
      clearInterval(interval.current);
    };
  }, [img]);

  const onChangeId = e => {
    setValueId(e.target.value);
  };

  const onChangePw = e => {
    setValuePw(e.target.value);
  };

  const onkey = () => {
    const valueArr = valueId.split('');
    let valied =
      valueArr.some(elm => elm === '@') && valuePw.length > 5
        ? (setDisabled(false), setFocus('focus'))
        : (setDisabled(true), setFocus(''));
  };

  const onSubmit = e => {
    e.preventDefault();
    navigate('/main-won');
  };

  return (
    <div className="login">
      <main className="container">
        <article className="container-center">
          <div className="background_image">
            <div className="image-container">
              <img
                alt=""
                className={`image ${img.img1}`}
                src="./images/wonikChoi/cover-instagram1.png"
              />
              <img
                alt=""
                className={`image ${img.img2}`}
                src="./images/wonikChoi/cover-instagram2.png"
              />
              <img
                alt=""
                className={`image ${img.img3}`}
                src="./images/wonikChoi/cover-instagram3.png"
              />
            </div>
          </div>
          <div className="login-container">
            <div className="login-container__input">
              <div className="login-logo">
                <span>Westagram</span>
              </div>
              <form
                onKeyUp={onkey}
                onSubmit={onSubmit}
                action=""
                className="login-input"
              >
                <input
                  type="text"
                  className="login-input__ID"
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  value={valueId}
                  onChange={onChangeId}
                />
                <input
                  type="password"
                  className="login-input__PW"
                  placeholder="비밀번호"
                  value={valuePw}
                  onChange={onChangePw}
                />
                <button
                  type="submit"
                  className={`login-button ${focus}`}
                  disabled={disabled}
                >
                  로그인
                </button>
              </form>
              <div className="login-separate">
                <div className="login-separate__line" />
                <div className="login-separate__span">또는</div>
                <div className="login-separate__line" />
              </div>
              <div className="login-facebook">
                <div className="login-facebook__img" />
                <span>Facebook으로 로그인</span>
              </div>
              <div className="login-lostPassword">
                <span>비밀번호를 잊으셨나요?</span>
              </div>
            </div>
            <div className="login-container__inroll">
              <div className="login-inroll__span">
                <p>계정이 없으신가요?</p>
                <span>가입하기</span>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default LoginWon;
