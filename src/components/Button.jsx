// src/components/Button.jsx
import React from 'react';
import './Button.css';  // 引入样式

const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

