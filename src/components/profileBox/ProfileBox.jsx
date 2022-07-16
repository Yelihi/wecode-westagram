import './profileBox.scss';

export default function ProfileBox() {
  return (
    <div className="profileBox">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-image">
            <img src="./images/wonikChoi/profile/myprofile.jpeg" alt="" />
          </div>
          <div className="profile-name">
            <span className="profile-user">Yelihi</span>
            <span className="profile-fullname">최원익</span>
          </div>
        </div>
        <div className="profile-right">
          <span>전환</span>
        </div>
      </div>
    </div>
  );
}
