import React from "react";
import "./Popup.css";

const Popup = ({ setShow, children }) => {
  return (
    <div
      className="popup_container"
      onClick={(e) => {
        setShow(false);
      }}
    >
      <div
        className="popup_main_contianer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
