import * as React from 'react';
import "../css/profile.css";
import female1 from "../profile/female1.png";


export default function Profile() {
  return (
    <div className='layout-profile'>
      <div className='profile-photo-container'>
          <img src={female1} alt="female1"></img>
      </div>
      <div className='edit-container'>
        <div className='edit-left-container'>
          <ul>
            <li><input type="text"></input></li>
            <li><input type="text"></input></li>
            <li><input type="text"></input></li>
            <li><input type="text"></input></li>
          </ul>
        </div>
        <div className='edit-right-container'>
            <ul>
              <li><input type="text"></input></li>
              <li><input type="text"></input></li>
              <li><input type="text"></input></li>
              <li><input type="text"></input></li>
            </ul>
        </div>
        <button>Save Changes</button>
      </div>
    </div>
    );
}