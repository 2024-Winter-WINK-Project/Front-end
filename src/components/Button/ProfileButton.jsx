import React from 'react';
import * as style from './styles';

const Button = ({ size, num, name, onClick }) => {
  if (size === 'small') {
    return num === 'one' ? (
      <style.ModalButton1 onClick={onClick}>{name}</style.ModalButton1>
    ) : (
      <style.ModalButton2 onClick={onClick}>{name}</style.ModalButton2>
    );
  }
  return <style.BigButton onClick={onClick}>{name}</style.BigButton>;
};

export default Button;