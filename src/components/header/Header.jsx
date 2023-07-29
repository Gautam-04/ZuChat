import React, { useState } from 'react'
import Logo from '../../assets/logo.svg';
import Notification from '../../assets/notification.svg';
import User from '../../assets/user.svg';
import './header.scss'

export const Header = () => {
  const [number, setNumber] = useState(1);

  function onClick() {
    setNumber(number + 1);
  }

  return (
    <div className="Header">
      <div className="Name">
        <img src={Logo} alt="" className="logo" />
        <span className="title">Zu-Chat</span>
      </div>
      <div className="icons">
        <div className="noti" onClick={onClick}>
          <img src={Notification} alt="" />
          <span className="Count">{number}</span>
        </div>
        <div className="profile">
          <img src={User} alt="" width={32} height={32} />
        </div>
      </div>
    </div>
  );
}
