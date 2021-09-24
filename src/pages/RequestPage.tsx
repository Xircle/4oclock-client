import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import BackButtonLayout from "../components/shared/BackButtonLayout";
import BottomNavBar from "../components/shared/BottomNavBar";
import {
  Container,
  ProcedureHeading,
  SubText,
  MainBtn,
  ContainerwithLeftRightMargin,
} from "../styles/styles";

export default function RequestPage() {
  return (
    <Container>
      <PageTitle title="건의" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>이런 써클 만들어주세요!</Heading>
          <SubTextRequest>
            친구들과 같이 가고 싶은 가계가 없나요?
            <br />
            건의해주시면 최대한 빠르게 만들어 드리겠습니다.
          </SubTextRequest>
          <MainBtnRequest>써클 건의해보기</MainBtnRequest>
        </ContainerwithLeftRightMargin>
        <BottomNavBar selectedItem="places" />
      </BackButtonLayout>
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 30px;
`;

const SubTextRequest = styled(SubText)`
  margin-top: 19px;
  font-size: 14px;
  width: 315px;
  line-height: 20px;
  font-weight: 500;
  font-size: 11px;
  b {
    font-weight: 900;
  }
`;

const MainBtnRequest = styled(MainBtn)`
  margin-top: 150px;
`;
