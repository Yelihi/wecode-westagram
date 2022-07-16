import React, { useState, useRef } from 'react';
import './comment.scss';

const Comment = ({ comment, id, dispatch, nickName }) => {
  const [iconClass, setIconClass] = useState('bx bx-heart');
  const isFalse = useRef(true);

  const likeHaart = () => {
    return isFalse.current === true
      ? (setIconClass(`bx bxs-heart`), (isFalse.current = false))
      : (setIconClass(`bx bx-heart`), (isFalse.current = true));
  };

  return (
    <div className="description-comment">
      <div className="comment-left">
        <div className="user-name">{nickName}</div>
        <span className="user-comment">{comment}</span>
      </div>
      <div className="comment-right">
        <i
          className={iconClass}
          id="example"
          style={{ color: isFalse.current ? 'rgba(0,0,0,0.5)' : 'red' }}
          onClick={likeHaart}
        />
        <i
          className="bx bx-trash"
          onClick={() => {
            dispatch({ type: 'delete-message', payload: { id } });
          }}
        />
      </div>
    </div>
  );
};

export default Comment;
