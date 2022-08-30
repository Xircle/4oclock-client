import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { MainBtn } from "../../styles/styles";
import { loadTossPayments } from "@tosspayments/payment-sdk";
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

// async/await을 사용하는 경우
async function main() {
  const tossPayments = await loadTossPayments(clientKey);
}
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
