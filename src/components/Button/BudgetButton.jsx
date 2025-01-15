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
      name={props.name}
      onClick={props.onClick}
    >
      {props.name === 'options' ? (
        <style.ButtonContent name={props.name}>
          {props.image && <img src={props.image} alt="icon" />}
          <span>{props.content1}</span>
        </style.ButtonContent>
      ) : props.name === 'budget' ? (
        <style.ButtonContent name={props.name}>
          <span>{props.content1}</span>
          <span>{props.content2}</span>
        </style.ButtonContent>
      ) : (
        <style.ButtonContent name={props.name}>
          {props.image && <img src={props.image} alt="icon" />}
          <span>{props.content1}</span>
          <span>{props.content2}</span>
        </style.ButtonContent>
      )}
    </ButtonComponent>
  );
}