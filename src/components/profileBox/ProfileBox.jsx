import './profileBox.scss';

export default function ProfileBox({ name, nickName, onLogoutHandler }) {
  return (
    <div className="profileBox">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-image">
            <img src="./images/wonikChoi/profile/myprofile.jpeg" alt="" />
          </div>
          <div className="profile-name">
            <span className="profile-user">{nickName}</span>
            <span className="profile-fullname">{name}</span>
          </div>
        </div>
        <div className="profile-right">
          <span onClick={onLogoutHandler}>로그아웃</span>
        </div>
      </div>
    </div>
  );
}
