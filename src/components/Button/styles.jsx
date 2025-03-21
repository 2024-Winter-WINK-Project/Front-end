import styled from 'styled-components';

export const BigButton = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #0234A8;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  padding: 4px;
`;

export const ModalButton1 = styled.button`
  width: 88px;
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  background: #E7EBF7;
  font-size: 12px;
  font-weight: 600;
  color: black;
  cursor: pointer;
  padding: 4px;
  margin: 12px;
`;

export const ModalButton2 = styled.button`
  width: 88px;
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  background: #F7E7E7;
  font-size: 14px;
  font-weight: 600;
  color: black;
  cursor: pointer;
  padding: 4px;
  margin: 12px;
`;

export const BudgetButton = styled.button`
  width: 336px;
  height: 200px;
  background-color: #0234A8;
  color: white;
  border: none;
  border-radius: 10px;
  display: flex;
  padding-bottom: 160px;
  cursor: pointer;
`;

export const OptionsButton = styled.button`
  width: 75px;
  height: 75px;
  background-color: #E7EBF7;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HistoryButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.name === 'income'
      ? '#E7EBF7'
      : '#F7E7E7'};
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
`;

export const DetailButton = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonContent = styled.div`
  font-size: ${(props) =>
    props.name === 'budget'
      ? '28px'
      : '20px'};
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  > img {
    position: absolute;
    width: 32px;
    margin-left: ${(props) =>
    props.name === 'options'
      ? '22px'
      : '-148px'};
  }
  >span {
    margin-top: ${(props) =>
    props.name === 'budget'
      ? '100px'
      : '0'};
  }
  > span:nth-of-type(1) {
    position: absolute;
    left: ${(props) =>
    props.name === 'budget'
      ? '48px'
      : '-92px'};
    white-space: nowrap;
  }
  > span:nth-of-type(2) {
    color: ${(props) =>
    props.name === 'income'
      ? '#0234A8'
      : props.name === 'expenditure'
      ? '#C00000'
      : 'white'};
    position: absolute;
    right: ${(props) =>
    props.name === 'budget'
      ? '-280px'
      : '-148px'};
    white-space: nowrap;
  }
`;
