import React from 'react';
import '../App.css';

const HeaderComponent = (props) => {
    console.log(props.header)
  return (
    <div className="header-class">
    <h3 className="text-color">{props.header}</h3>
  </div>
  );
}

export default HeaderComponent;