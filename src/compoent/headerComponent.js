import React from 'react';
import '../App.css';

const HeaderComponent = (props) => {
  return (
    <div className="header-class">
    <h3 className="text-color">{props.header}</h3>
  </div>
  );
}

export default HeaderComponent;