## wecode | instargram clone coding

---

### 인스타그램 로그인 페이지와 메인 페이지

## :: 구현 사항 설명

### 1. Login | 사용자 입력 데이터 저장

- id, password 각각의 input value를 state 화 하여 관리하였습니다.

### 2. Login | 로그인 버튼 활성화 (validation)

- 조건문을 이용한 email과 password 유효성 검사를 진행
- form 이벤트인 onkeyUp 을 활용하여, 입력값이 입력될 상황마다 이벤트를 발생시켰습니다.

```
 const onkey = () => {
   const valueArr = valueId.split('');
   return valueArr.some(elm => elm === '@') && valuePw.length > 5
     ? (setDisabled(false), setFocus('focus'))
     : (setDisabled(true), setFocus(''));
 };
```

- id value 입력값을 배열화 한 뒤, some() 메서드를 활용하여 '@'가 하나라도 존재할 시 버튼을 활성화 합니다.
- pw value 입력값을 받은 뒤, 길이가 5자리 이상일 때 버튼을 활성화 합니다.
- 버튼의 색상은 .focus 클래스를 scss 에 미리 지정해 두었고, 이를 버튼 className 안에 조건에 부합할 시 추가합니다.

### 3. Login | 스마트폰 사진 interval 구현하기

- 일정 시간에 따라 지정해둔 3가지 사진이 로테이션을 돌면서, opacity 가 적용된 상태로 화면에 랜더링 되도록 하였습니다.
- img state 를 객체값으로 선언하고, 3가지 조건에 따라 미리 지정해둔 scss class 'active'가 적용되도록 했습니다.
- 첫 랜더링 이후 setInterval 이 실행되도록 설정하기 위해, 그리고 img가 변할때마다 실행하기 위해 useEffect 를 활용하였습니다.

```
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
```

- 의존 배열에는 변화할 img 를 넣어두었고, 문제는 img state 변동 시 계속해서 interval 이 중첩되었기에, 리엑트 사이클을 활용하여 return 값에 clearInterval을 추가하여 랜더링이 시작될때마다 이전 인터벌을 삭제하고 -> 새롭게 다시 인터벌을 추가하고 -> 다시 삭제하고를 반복!
- cycleImage 함수를 useEffect 밖에 빼놨더니 warning 이 떠서, useEffect 안으로 넣어줬습니다.

### 4. Main | 댓글 컴포넌트 화 및 기능을 추가하기(props)

- 댓글이 달릴 feed 를 우선 컴포넌트 화 하고, 이후 feed 내에서 다시 comment 부분을 컴포넌트화 하여 props로 연결하였습니다.
- useState 대신 useReducer 를 배워서 활용하였습니다. (이후 댓글 삭제까지 고려하여)

```
          <button
            className="comment-btn"
            onClick={e => {
              dispatch({ type: 'create-message', payload: { comment } });
              setComment('');
            }}
            disabled={comment ? false : true}
            style={{ opacity: comment ? '1' : '0.5' }}
          >
```

- 댓글을 생성하고자 input value 를 받아 클릭 시 dispatch 로 comment 와함께 reducer 에 'create-message' action 을 보냅니다.
- 참고로 버튼 활성화 역시 comment 유무에 따라서 변경되도록 조정했습니다.

```
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
    default:
      return state;
  }
};
```

- reducer 는 action 값을 받아 초기 state 값을 type 에 따라 변경하게 됩니다. 생성때 받은 type 은 'create-message'
- id 값에 고유성을 주기 위해 날짜 + 난수로 설정했습니다. comment 는 그대로 받아왔습니다. 이후 기존 state 에 새롭게 newComment 를 추가합니다. (초기 state는 깃헙 참조)

```
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
```

- 초기 state = commentInfo 이고, 매 랜더링 마다 map으로 화면에 데이터만큼 댓글창을 생성합니다.
- <Comment /> 로 컴포넌트화 하였고, props 로 전달하였습니다. (dispatch, id 를 전달한 이유는 댓글 삭제때문에)

### 5. Main | 댓글 좋아요 및 삭제기능 추가

- feed 에서 전달받은 dispatch 와 댓글 id 를 활용해서, 댓글 삭제를 구현했습니다.

```
        <i
          className="bx bx-trash"
          onClick={() => {
            dispatch({ type: 'delete-message', payload: { id } });
          }}
        ></i>
```

- dispatch 를 통해 type : 'delete-message' 를 id 와 함께 reducer 로 전달합니다. (action)

```
const reducer = (state, action) => {
  switch (action.type) {
    case 'create-message':
 // 생략
    case 'delete-message':
      return {
        user: state.user.filter(comment => comment.id !== action.payload.id),
      };
    default:
      return state;
  }
};
```

- case 'delete-message' 를 추가하여 그에 따른 return 값을 설정합니다.
- 댓글이 저장되어있는 state 에서 reducer 에 전달한 id 값과 동일한 댓글은 삭제하고 나머지만으로 배열을 구성하겠다는 의미입니다.
- 이후 다시 map 으로 commentInfo 를 반복하여 화면에 그려냅니다.
- 댓글에 좋아요 하트 부분은 클릭 시 이벤트를 발동시켜 빈 하트에서 빨간 채워진 하트로 변경되도록 하였습니다.

```
const Comment = ({ comment, id, dispatch }) => {
  const [iconClass, setIconClass] = useState('bx bx-heart');
  const isFalse = useRef(true);

  const likeHaart = () => {
    return isFalse.current === true
      ? (setIconClass(`bx bxs-heart`), (isFalse.current = false))
      : (setIconClass(`bx bx-heart`), (isFalse.current = true));
  };
```

- isFalse 를 useRef 로 선언한 이유는, 함수 컴포넌트는 새로 랜더링 시 변수를 초기화 시키기 때문입니다. 하지만 useRef 로 저장한다면 랜더링과 관계없이 데이터가 유지 됩니다.
- className 에 대한 부분을 직접적으로 건드렸습니다.

### 6. Main | 피드 좋아요 기능 추가 및 좋아요 갯수 난수화

- 피드마다 좋아요 갯수를 다르게 하고 싶어서 난수화 시키고, 피드 좋아요 클릭시 좋아요 +1 되도록 설정해봤습니다.

```
export default function Feed({ userName, userImg, userBackImg }) {
  const [like, setLike] = useState('');
  const likeNumber = useRef(Math.floor(Math.random() * 999) + 1000);
  const isFalse = useRef(true);
  const [heartClass, setHeartClass] = useState('bx bx-heart');

  useEffect(() => {
    setLike(likeNumber.current);
    console.log('시작');
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

```

- like state 를 처음 난수로 지정하지 않은 것은, 랜더링 될때마다 새롭게 좋아요 수가 변경될 것임을 예상했습니다.
- 만일 좋아요 버튼을 눌러 재 랜더링 시 새롭게 좋아요 숫자를 랜더링 할것이라 판단하여 useRef 로 우선 피드의 좋아요 숫자를 뽑고
- 이후 useEffect 로 첫 랜더링 이후 한번 실행하도록 의존성 배열을 비웠습니다.
- 이후 좋아요 아이콘을 클릭 할 시, 이전 좋아요 갯수에 +1 을 하도록 setLike 에 콜백함수를 주었습니다. (이전 state 를 활용할 수 있습니다)
- 한번 더 클릭시 조건문에 따라 -1을 합니다. 랜더링이 변해도 처음으로 설정한 좋아요 갯수는 그대로입니다.

### 7. Main | 피드 및 친구창 mock data로 설정하기

- 백엔드로 부터 데이터를 받아올 것을 미리 준비하기 위해 mock data 를 생성하여 fetch 로 받아왔습니다.

```
  useEffect(() => {
    fetch('http://localhost:3000/data/commentData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setCommentList(data);
      });
  }, []);
```

- public/data 내부에 commentData 를 생성하고 json 형식으로 데이터를 기입하였습니다.
- 이후 fetch 로 데이터를 가져오고, commetList 내에 데이터를 저장했습니다.
- 현 데이터를 props 로 하위 컴포넌트에 전달하였습니다.
  <br />
