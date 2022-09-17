import * as React from 'react';
import "../css/profile.css";
import female1 from "../image/profile/female1.png";

export default function Profile() {
  return (
    <div className='layout-profile'>
      <div className='profile-photo-container'>
          <img src={female1} alt="female1"></img>
      </div>
      <div className='edit-container'>
        <div className='edit-left-container'>
          <ul>
            <li><input type="text" value ="Ann.b@gmail.com"></input></li>
            <li><input type="text" value ="Ann B"></input></li>
            <li><input type="text" value ="Old Password"></input></li>
            <li><input type="text" value ="New Password"></input></li>
          </ul>
        </div>
        <div className='edit-right-container'>
            <ul>
              <li><input type="text" value ="Contact"></input></li>
              <li><input type="text" value ="Bio"></input></li>
            </ul>
        </div>
        <div className="buttonBox">
          <button>Save Changes</button>
        </div> 
      </div>
    </div>
    );
}