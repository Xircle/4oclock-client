import styled from "styled-components";
import optimizeImage from "../../../lib/optimizeImage";

interface Props {
  profileImg: string;
}

export default function V2ApplyProfileRow({ profileImg }: Props) {
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

const RightContainer = styled.div``;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
