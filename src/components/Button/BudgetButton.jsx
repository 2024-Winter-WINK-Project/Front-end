import React from 'react';
import * as style from './styles';

export default function HistoryButton(props) {
  return (
    <style.HistoryButton
      width={props.width}
      height={props.height}
      name={props.name}
      onClick={props.onClick}
    >
      {props.name === 'income' || props.name === 'outcome' ? (
        <style.ButtonContent>
          <span>{props.content}</span>
        </style.ButtonContent>
      ) : null}
    </style.HistoryButton>
  );
}