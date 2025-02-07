import React from 'react';
import * as style from './styles';

export default function Input(props) {
  return (
    props.type === 'textarea' ? (
      <style.Textarea
        width={props.width}
        height={props.height}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        onClick={props.onClick}
        name={props.name}
        readOnly={props.readOnly}
      />
    ) : (
      <style.Input
        width={props.width}
        height={props.height}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        onClick={props.onClick}
        name={props.name}
        readOnly={props.readOnly}
      />
    )
  );
}