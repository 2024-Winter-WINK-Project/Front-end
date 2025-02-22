import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px){
        width : 600px;
        padding-top: 10vh;
    }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

export const ProfileTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  margin-left: 80px;
  margin-bottom: 68px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const Profile = styled.div`
  > img {
    width: 140px;
    height: 140px;
    border-radius: 40px;
  }
`;

export const UserInfo = styled.div`
  font-size: 20px;
  :first-child {
    font-weight: 600;
    margin-right: 12px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  margin: 52px;
`;
