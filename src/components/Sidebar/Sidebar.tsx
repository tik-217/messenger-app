import React from "react";
import Search from "../Search/Search";

export default function Sidebar() {
  return (
    <div id="plist" className="people-list">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-search"></i>
          </span>
          <Search />
        </div>
      </div>
      <ul className="list-unstyled chat-list mt-2 mb-0">
        <li className="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">Vincent Porter</div>
            <div className="status">
              <i className="fa fa-circle offline"></i> left 7 mins ago
            </div>
          </div>
        </li>
        <li className="clearfix active">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">Aiden Chavez</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        <li className="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">Mike Thomas</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        <li className="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">Christian Kelly</div>
            <div className="status">
              <i className="fa fa-circle offline"></i> left 10 hours ago
            </div>
          </div>
        </li>
        <li className="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar8.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">Monica Ward</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </li>
        <li className="clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">Dean Henry</div>
            <div className="status">
              <i className="fa fa-circle offline"></i> offline since Oct 28
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
