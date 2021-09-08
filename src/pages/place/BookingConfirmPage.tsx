import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import {
  Container,
  ProcedureHeading,
  SubText,
  colors,
  MainBtn,
} from "../../Styles";

interface Props {}

export default function BookingConfirmPage(props: Props) {
  return (
    <Container>
      <Heading>참여 신청 완료</Heading>
      <SubTextBookingBookingConfirm>
        단톡이 만들어지면 적어주신 전화번호로 연락을 드릴게요!
        <br />
        <br />
        모임 시작 전 참여가 어려워진 경우, 반드시 미리
        <b> 마이페이지 {">"} 문의하기</b>를 통해서 알려주세요.
        <br />
        <br />
        모임에 참여하는 친구들을 존중하고 따뜻한 문화를 함께 만들어나가요.
        <br />
        <br />
        무단으로 불참하거나 함께하는 친구들에게 피해를 주는 경우, 이용에 제재를
        받을 수 있습니다.
      </SubTextBookingBookingConfirm>
      <BottomNavBar selectedItem="feed" />
      <MainBtnBookingConfirm>참여하는 친구들 프로필 보기</MainBtnBookingConfirm>
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 50px;
  margin-left: 30px;
`;

const SubTextBookingBookingConfirm = styled(SubText)`
  margin-top: 40px;
  margin-left: 30px;
  width: 315px;
  margin-right: 30px;
  line-height: 1.2em;
  font-weight: 500;
  font-size: 11px;
  b {
    font-weight: 900;
  }
`;

const MainBtnBookingConfirm = styled(MainBtn)`
  margin-top: 30px;
  width: 90%;
`;
