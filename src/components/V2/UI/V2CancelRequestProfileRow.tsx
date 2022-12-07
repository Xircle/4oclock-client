import { faClone, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Gender } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { colors } from "../../../styles/styles";

interface Props {
  profileImg: string;
  username: string;
  teamId: string;
  userId?: string;
  phoneNumber?: string;
}

export default function V2CancelRequestProfileRow({
  profileImg,
  username,
  teamId,
  userId,
  phoneNumber,
}: Props) {
  const history = useHistory();
  const ApproveCancelCTA = () => {
    // approve cancel
  };

  const CopyCTA = () => {
    if (phoneNumber) {
      navigator.clipboard.writeText(phoneNumber).then((value) => {
        alert("복사되었습니다");
      });
    }
  };

  return (
    <Container>
      <LeftContainer>
        <ProfileImg
          src={optimizeImage(profileImg, {
            width: 60,
            height: 60,
          })}
        />
      </LeftContainer>
      <RightContainer>
        <RightRow>
          <NameTag style={{ marginRight: 10 }}>{username}</NameTag>
          <CTAButton onClick={ApproveCancelCTA}>취소 승인하기</CTAButton>
        </RightRow>
        <RightRow style={{ cursor: "pointer" }}>
          <PhoneNumberTag>전화번호 {phoneNumber}</PhoneNumberTag>
          <FontAwesomeIcon icon={faCopy} color="#6f7789" onClick={CopyCTA} />
        </RightRow>
      </RightContainer>
    </Container>
  );
}

const CTAButton = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  color: white;
  padding: 4px 11px;
  background-color: #fd8a66;
  border-radius: 3px;
  cursor: pointer;
`;

const NameTag = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #8c94a4;
`;

const PhoneNumberTag = styled.div`
  text-decoration-line: underline;
  color: #6f7789;
  font-weight: 400;
  font-size: 13px;
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  margin-right: 10px;
`;

const RightRow = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
