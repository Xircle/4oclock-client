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
  colors,
  BigTextArea,
} from "../styles/styles";

interface Props {}

export default function CancelReservationPage() {
  return (
    <Container>
      <PageTitle title="예약 취소하기" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>네시모해 모임 취소하기</Heading>
          <SubTextRequest>
            <b>정말로 취소하실건가요? 모임 취소사유와 상세사유를 적어주세요.</b>
          </SubTextRequest>
          <SubHeading>취소사유</SubHeading>
          <select>
            <option value="신청실수" style={{ color: colors.Black }}>
              신청실수
            </option>
            <option value="개인일정" style={{ color: colors.Black }}>
              개인일정
            </option>
            <option value="단순변심" style={{ color: colors.Black }}>
              단순변심
            </option>
            <option value="기타" style={{ color: colors.Black }}>
              기타
            </option>
          </select>

          <SubHeading>
            상세사유 <b>(선택)</b>
          </SubHeading>
          <BigTextArea />
        </ContainerwithLeftRightMargin>
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

const SubHeading = styled.p`
  padding-top: 23px;
  font-weight: bold;
  font-size: 18px;
  b {
    color: ${colors.MidGray};
    font-weight: normal;
  }
`;

const MainBtnRequest = styled(MainBtn)`
  margin-top: 150px;
`;
