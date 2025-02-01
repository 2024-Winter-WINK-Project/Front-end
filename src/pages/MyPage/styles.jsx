import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (min-width: 600px){
        width : 600px;
    }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 28px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const Profile = styled.div`
  > img {
    width: 120px;
    height: 120px;
  }
`;

export const UserInfo = styled.div`
  font-size: 16px;
  :first-child {
    font-weight: 600;
    margin-right: 12px;
  }
  margin-bottom: 32px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 28px;
  margin-bottom: 80px;
`;
