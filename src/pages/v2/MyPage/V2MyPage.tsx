import styled from "styled-components";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import { Container } from "../../../styles/styles";

export default function V2MyPage() {
  return (
    <Container>
      <V2HeaderC title="my page" />
      <Body>
        <BodyItem>
          <BodyItemHeading>승인 대기중</BodyItemHeading>
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>승인된 모임</BodyItemHeading>
        </BodyItem>
        <BodyItem>
          <BodyItemHeading>회원 정보</BodyItemHeading>
        </BodyItem>
      </Body>
    </Container>
  );
}

const Body = styled.div``;

const BodyItem = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin-bottom: 20px;
  min-height: 100px;
`;

const BodyItemHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
