import styled from "styled-components";

interface IProps {
  id: string;
  teamId: number;
  paid?: boolean;
  teamImage: string;
  status: string;
}

export default function MyApplicationRow({}: IProps) {
  return (
    <Container>
      <LeftContainer></LeftContainer>
      <RightContainer></RightContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  background-color: black;
  margin-bottom: 10px;
`;

const LeftContainer = styled.div`
  background-color: red;
  width: 80px;
`;
const RightContainer = styled.div`
  height: 100%;
  background-color: blue;
`;
