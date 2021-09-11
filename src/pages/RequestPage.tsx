import styled from "styled-components";
import BottomNavBar from "../components/shared/BottomNavBar";
import {
  Container,
  ProcedureHeading,
  SubText,
  MainBtn,
  ContainerwithLeftRightMargin,
} from "../styles";

interface Props {}

export default function RequestPage(props: Props) {
  return (
    <Container>
      <ContainerwithLeftRightMargin>
        <Heading>이런 써클 만들어주세요!</Heading>
        <SubTextRequest>
          친구들과 같이 가고 싶은 가계가 없나요?
          <br />
          건의해주시면 최대한 빠르게 만들어 드리겠습니다.
        </SubTextRequest>
        <MainBtnRequest>써클 건의해보기</MainBtnRequest>
      </ContainerwithLeftRightMargin>
      <BottomNavBar selectedItem="feed" />
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 50px;
`;

const SubTextRequest = styled(SubText)`
  margin-top: 40px;
  width: 315px;
  line-height: 1.5em;
  font-weight: 500;
  font-size: 11px;
  b {
    font-weight: 900;
  }
`;

const MainBtnRequest = styled(MainBtn)`
  margin-top: 300px;
`;
