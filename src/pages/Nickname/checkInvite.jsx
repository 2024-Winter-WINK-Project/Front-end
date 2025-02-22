import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const InvitationCheck = () => {
  const { meetingId } = useParams();
  console.log(invitationCode);
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!invitationCode) {
      alert('초대 코드가 유효하지 않습니다.');
      navigate(`/home/${memberId}`);
      return;
    }

    const checkInvitation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/${meetingId}/invitations`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        const invitationCode = res.data;
        console.log('초대 링크:', invitationCode);

        alert('초대가 확인되었습니다.');
        navigate(`/meetings/${meetingId}/invitations/${invitationCod}/nickname`);
      } catch (error) {
        console.error('초대 확인 오류:', error);
        alert('유효하지 않은 초대 코드입니다.');
        navigate(`/home/${memberId}`);
      }
    };

    checkInvitation();
  }, [invitationCode, navigate, memberId]);

  return <span>초대 확인 중입니다...</span>;
};

export default InvitationCheck;