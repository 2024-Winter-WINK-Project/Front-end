import React from 'react';
import * as style from './styles';

export default function BudgetButton(props) {
  const ButtonComponent =
  props.name === 'budget'
    ? style.BudgetButton
    : props.name === 'options'
    ? style.OptionsButton
    : style.HistoryButton;

  return (
    <ButtonComponent
      width={props.width}
      height={props.height}
      name={props.name}
      type={props.type}
      onClick={props.onClick}
    >
      {props.type === 'detail' ? (
        <style.DetailButton>
          <span>{props.content}</span>
        </style.DetailButton>
      ) : props.name === 'options' ? (
        <style.ButtonContent name={props.name}>
          {props.image && <img src={props.image} alt="icon" />}
          <span>{props.description}</span>
        </style.ButtonContent>
      ) : props.name === 'budget' ? (
        <style.ButtonContent name={props.name}>
          <span>{props.description}</span>
          <span>{props.amount}</span>
        </style.ButtonContent>
      ) : (
        <style.ButtonContent name={props.name}>
          {props.image && <img src={props.image} alt="icon" />}
          <span>{props.description}</span>
          <span>{props.amount}</span>
        </style.ButtonContent>
      )}
    </ButtonComponent>
  );
}