import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { MainBtn } from "../../styles/styles";

interface Props extends RouteComponentProps {}

export default function PaymentPage({ history, location }: Props) {
  return (
    <Container>
      hihi
      <MainBtn onClick={() => {}} style={{ width: "90%" }}>
        OK{"!"} 놀러가기
      </MainBtn>
    </Container>
  );
}

const Container = styled.div`
  background-color: red;
  height: 100%;
`;
