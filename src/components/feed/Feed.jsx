import React, { useState, useReducer, useRef, useEffect } from 'react';
import Comment from '../comment/Comment';
import './feed.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'create-message':
      const comment = action.payload.comment;
      const newComment = {
        id: Date.now() + Math.random() * 99,
        comment: comment,
        like: false,
      };

      return {
        user: [...state.user, newComment],
      };
    case 'delete-message':
      return {
        user: state.user.filter(comment => comment.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const initialState = {
  user: [
    {
      id: Date.now() + Math.random() * 99,
      comment: 'Hello',
      like: false,
    },
  ],
};

export default function Feed({ userName, userImg, userBackImg }) {
  const [comment, setComment] = useState('');
  const [commentInfo, dispatch] = useReducer(reducer, initialState);
  const [like, setLike] = useState('');
  const likeNumber = useRef(Math.floor(Math.random() * 999) + 1000);
  const isFalse = useRef(true);
  const [heartClass, setHeartClass] = useState('bx bx-heart');

  useEffect(() => {
    setLike(likeNumber.current);
  }, []);

  const clickLike = () => {
    return heartClass === 'bx bx-heart'
      ? (setHeartClass('bx bxs-heart'),
        setLike(prevLike => prevLike + 1),
        (isFalse.current = false))
      : (setHeartClass('bx bx-heart'),
        setLike(prevLike => prevLike - 1),
        (isFalse.current = true));
  };

  return (
    <div className="feed">
      <div className="main-article">
        <div className="main-article__nav">
          <div className="nav-artivle__container">
            <div className="nav-image">
              <img src={userImg} alt="" />
            </div>
            <div className="nav-title__container">
              <div className="nav-title">{userName}</div>
              <div className="nav-subtitle">commacial</div>
            </div>
          </div>
          <div className="nav-icon">
            <i className="bx bx-dots-horizontal-rounded"></i>
          </div>
        </div>
        <div className="main-article__picture">
          <img src={userBackImg} alt="" />
        </div>
        <div className="main-article__heart">
          <div className="heart-container">
            <div className="heart-icon">
              <i
                className={heartClass}
                style={{
                  color: isFalse.current ? 'black' : 'red',
                  cursor: 'pointer',
                }}
                onClick={clickLike}
              ></i>
            </div>
            <div className="heart-icon">
              <i className="bx bx-message-rounded"></i>
            </div>
            <div className="heart-icon">
              <i className="bx bx-paper-plane"></i>
            </div>
          </div>
          <div className="bookmark-container">
            <div className="heart-icon">
              <i className="bx bx-bookmark"></i>
            </div>
          </div>
        </div>
        <div className="main-article__like">
          <div className="like-span">
            좋아요 <span>{like}</span>개
          </div>
        </div>
        <div className="main-article__description">
          <div className="description-container">
            <span>
              <span className="userId">{userName} </span>Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Voluptatum dignissimos nemo
              inventore quam nostrum ipsa, doloremque atque repellendus
            </span>
          </div>
          {commentInfo.user.map(message => {
            return (
              <Comment
                key={message.id}
                comment={message.comment}
                id={message.id}
                dispatch={dispatch}
              />
            );
          })}
        </div>
        <div className="timeline">
          <span>1일 전</span>
        </div>
        <form
          className="comment-submit"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="submit-icon">
            <div className="smile-icon"></div>
          </div>
          <input
            className="comment-input"
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="댓글 달기..."
          />
          <button
            className="comment-btn"
            onClick={e => {
              dispatch({ type: 'create-message', payload: { comment } });
              setComment('');
            }}
            disabled={comment ? false : true}
            style={{ opacity: comment ? '1' : '0.5' }}
          >
            게시
          </button>
        </form>
      </div>
    </div>
  );
}
