import React from 'react';
import * as style from './styles';

const Button = ({ size, num, content, onClick }) => {
  if (size === 'small') {
    return num === 'one' ? (
      <style.ModalButton1 onClick={onClick}>{content}</style.ModalButton1>
    ) : (
      <style.ModalButton2 onClick={onClick}>{content}</style.ModalButton2>
    );
  }
  return <style.BigButton onClick={onClick}>{content}</style.BigButton>;
};

export default Button;