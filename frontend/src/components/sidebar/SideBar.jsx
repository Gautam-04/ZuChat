/* eslint-disable array-callback-return */
import "./Sidebar.scss";
import LightUser from "../../assets/lightUser.svg";
import React from "react";

export default function SideBar() {
  const contacts = [
    {
      id: 0,
      img: LightUser,
      name: "Gautam",
      Email: "raigautam2004@gmail.com",
    },
    {
      id: 1,
      img: LightUser,
      name: "Great",
      Email: "raigau2004@gmail.com",
    },
    {
      id: 2,
      img: LightUser,
      name: "Hi",
      Email: "raigautam4@gmail.com",
    },
    {
      id: 3,
      img: LightUser,
      name: "Ayush",
      Email: "raitam2004@gmail.com",
    },
    {
      id: 4,
      img: LightUser,
      name: "Dhokha",
      Email: "raigauta04@gmail.com",
    },
  ];

  return (
    <div className="Sidebar">
      <div className="items">
        {/* Map over contacts array and return JSX */}
        {contacts.map((contact) => (
          <React.Fragment key={contact.id}>
            <div className="avatar">
              <img src={contact.img} alt="" width={50} />
            </div>
            <div className="details">
              <h1 className="title">{contact.name}</h1>
              <p className="email">{contact.Email}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
