import styled from "styled-components";

interface IProps {
  id: string;
  teamId: number;
  paid?: boolean;
  teamImage: string;
  status: string;
}

export default function MyApplicationRow({ teamImage }: IProps) {
  return (
    <Container>
      <LeftContainer>
        <TeamImage src={teamImage} />
      </LeftContainer>
      <RightContainer></RightContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  margin-bottom: 10px;
`;

const TeamImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const LeftContainer = styled.div`
  width: 100px;
  padding-left: 10px;
  padding-right: 10px;
`;
const RightContainer = styled.div`
  height: 100%;
`;
