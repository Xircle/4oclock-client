import styled from "styled-components";
import { Gender } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { colors } from "../../../styles/styles";

interface Props {
  profileImg: string;
  username: string;
  age: number;
  gender: Gender;
  phoneNumber?: string;
}

export default function V2ApproveProfileRow({
  profileImg,
  username,
  age,
  gender,
  phoneNumber,
}: Props) {
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
      <RightContainer></RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
