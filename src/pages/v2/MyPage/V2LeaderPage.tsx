import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

export default function V2LeaderPage() {
  return (
    <Container>
      <V2SubHeaderC title="리더 page" />
      <Body>
        <BodyItem>
          <BodyItemHeading>회원 정보</BodyItemHeading>
        </BodyItem>
      </Body>
    </Container>
  );
}

const Container = styled.div``;

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
