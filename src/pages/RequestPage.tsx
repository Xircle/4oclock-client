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
  LinkWithoutUnderLine,
} from "../styles/styles";
import * as links from "../components/shared/Links";

export default function RequestPage() {
  return (
    <Container>
      <PageTitle title="건의" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>네시모해 맛집모임 만들기</Heading>
          <SubTextRequest>
            <b>
              앗! 가고 싶은 맛집 모임이 없나요? 카카오 채널로 말씀해 주시면
              초스피드로 만들어드릴게요!
            </b>
          </SubTextRequest>
          <LinkWithoutUnderLine href={links.LOpenKakaoChat} target={"_blank"}>
            <MainBtnRequest>맛집 모임 건의하기</MainBtnRequest>
          </LinkWithoutUnderLine>
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
  color: #8c94a4;
`;

const MainBtnRequest = styled(MainBtn)`
  margin-top: 150px;
`;
