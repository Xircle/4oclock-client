import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import BottomNavBar from "../../components/shared/BottomNavBar";
import routes from "../../routes";
import {
  Container,
  SubText,
  colors,
  MainBtn,
  Heading,
  ContainerwithLeftRightMargin,
} from "../../styles/styles";
import { PrimaryText, Row, Section } from "../place/PlacePage";

interface Props
  extends RouteComponentProps<
    {},
    {},
    {
      placeId: string;
      startDateFromNow: string;
      detailAddress: string;
      recommendation: string;
      participationFee: number;
    }
  > {}

export default function ReservationConfirmPage({ history, location }: Props) {
  const {
    placeId,
    startDateFromNow,
    detailAddress,
    recommendation,
    participationFee,
  } = location.state;

  return (
    <Container>
      <PageTitle title="예약 확인" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>맛집 모임 참여 신청 완료</Heading>

          <SubTextBookingBookingConfirm>
            네시 모해 맛집 모임을 신청해주셔서 정말 감사합니다 :)
            <br />
            <br />
            <strong>
              같이 참여하는 친구들의 자세한 프로필을 확인해보세요! 모임에
              참여하는 친구들을 존중하고 따뜻한 문화를 함께 만들어나가요😊
            </strong>
            <br />
            <br />
          </SubTextBookingBookingConfirm>

          <SSection>
            <PrimaryText>#모임안내</PrimaryText>
            <Row>
              <span className="Top01">자세한 정보를 알려드릴게요</span>
            </Row>
            <Row>
              <span className="bold">시간</span>
              <span>{startDateFromNow} 오후 5시(4인) / 오후 7시(2인) 모임</span>
            </Row>
            <Row>
              <span className="bold">장소</span>
              <span>{detailAddress}</span>
            </Row>

            <Row>
              <span className="bold">나이</span>
              <span>{recommendation}</span>
            </Row>

            <Row>
              <span className="bold">참가비</span>
              <span>무료</span>
            </Row>
          </SSection>

          <MainBtnBookingConfirm
            onClick={() =>
              history.push(`/place/${placeId}?scrollToProfile=true`)
            }
          >
            참여하는 친구들 프로필 보기
          </MainBtnBookingConfirm>

          <HomeBtn onClick={() => history.push(routes.placeFeed)}>
            홈으로 가기
          </HomeBtn>
        </ContainerwithLeftRightMargin>
        <BottomNavBar selectedItem="places" />
      </BackButtonLayout>
    </Container>
  );
}
const SSection = styled(Section)`
  margin: 50px 0 10px;
  padding: 30px 0;
  border-top: 1px solid #e7ecf3;
`;
const SubTextBookingBookingConfirm = styled(SubText)`
  margin-top: 40px;
  width: 315px;
  line-height: 1.2em;
  font-size: 14px;
  color: #8c94a4;
  strong {
    line-height: 20px;
    font-weight: bold;
  }
`;

const MainBtnBookingConfirm = styled(MainBtn)`
  margin-top: 100px;
  width: 300px;
`;

const HomeBtn = styled.div`
  margin-top: 20px;
  color: ${colors.LightGray};
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
`;
