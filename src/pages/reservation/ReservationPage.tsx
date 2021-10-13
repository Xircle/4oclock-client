import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { RouteComponentProps } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Container,
  MainBtn,
  SelectionBox,
  SelectionMainText,
  SelectionSubText,
  colors,
  Tag,
  Heading,
  ContainerwithLeftRightMargin,
} from "../../styles/styles";
import routes from "../../routes";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import { useMutation, useQuery } from "react-query";
import { makeReservation } from "../../lib/api/makeReservation";
import { decodeUrlSlug, TimeNumberToString } from "../../lib/utils";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import { getReservationParticipantNumber } from "../../lib/api/getReservationParticipantNumber";
import PageTitle from "../../components/PageTitle";
import Modal from "../../components/UI/Modal";

interface Props
  extends RouteComponentProps<
    { name: string },
    {},
    {
      placeId: string;
      startDateFromNow: string;
      startTime: number;
      detailAddress: string;
      recommendation: string;
      participationFee: number;
    }
  > {}

export default function ReservationPage({ match, location, history }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { name: placeName } = match.params;
  const {
    placeId,
    startDateFromNow,
    startTime,
    detailAddress,
    recommendation,
    participationFee,
  } = location.state;
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [reservationClicked, setReservationClicked] = useState(false);
  const [selected, setSelected] = useState(false);

  const { data: participantsNumber } = useQuery(
    ["getReservationParticipantNumber", placeId],
    () => getReservationParticipantNumber(placeId),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const toggleReservation = () => {
    setReservationClicked((prev) => !prev);
  };

  const { mutateAsync: mutateReservation, isLoading } =
    useMutation(makeReservation);

  const makeReservationHandler = async () => {
    if (!selected || !placeId) return;
    try {
      const { data } = await mutateReservation({
        isVaccinated,
        placeId,
      });
      if (!data.ok) {
        alert(data.error);
        window.location.href = routes.placeFeed;
        return;
      }
      history.push(routes.reservationConfirm, {
        placeId,
        startDateFromNow,
        startTime,
        detailAddress,
        recommendation,
        participationFee,
      });
    } catch (err) {
      console.log(err);
      alert(err);
      return;
    }
  };

  return (
    <Container>
      <PageTitle title="써클 예약" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>{decodeUrlSlug(placeName)}</Heading>

          <p style={{ margin: "30px 0", color: "#8C94A4" }}>
            대학친구들과 함께하는 꿀잼 맛집모임!
          </p>

          <SelectionBoxBooking onClick={() => setSelected((prev) => !prev)}>
            <SelectionMainTextBooking>
              {startDateFromNow}{" "}
              {TimeNumberToString(startTime, { hasIndicator: true })}
              <TagBooking>
                <p>{startTime >= 18 ? "2" : "4"}인 모임</p>
              </TagBooking>
            </SelectionMainTextBooking>
            <SelectionSubTextBooking>
              {participantsNumber || "0"}명의 친구들이 신청했어요
            </SelectionSubTextBooking>
            <CheckIcon>
              {selected ? (
                <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
              ) : (
                <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
              )}
            </CheckIcon>
          </SelectionBoxBooking>

          <Row onClick={() => setIsVaccinated((prev) => !prev)}>
            {isVaccinated ? (
              <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
            ) : (
              <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
            )}
            <span>
              [백신 접종 여부 체크] 2차 <span className="info"> 백신 접종</span>
              을 받았습니다.
            </span>
          </Row>

          <Instruction>
            <InstructionHeading>💖 연고이팅 이용가이드 💖</InstructionHeading>
            <InstructionDetail>
              1. 같은 연고이팅 모임을 신청한 친구들과 4인 or 2인 단톡을 <br />
              &nbsp; &nbsp; &nbsp;모임 전날 만들어드려요!
              <br />
              2. 단톡에서 친구들을 알아가고 친해지는 시간을 가져보세요!
              <br />
              3. 지정된 장소와 시간에 만나서 신나게 놀기!
              <br />
            </InstructionDetail>
            <InstructionDetail style={{ marginTop: "12px" }}>
              {"※"} 단톡링크는 모임 전날 적어주신 전화번호로 보내드릴게요!
            </InstructionDetail>
          </Instruction>
          <EnabledMainBtnBooking
            disabled={!selected}
            onClick={toggleReservation}
          >
            놀러가기
          </EnabledMainBtnBooking>
        </ContainerwithLeftRightMargin>
      </BackButtonLayout>
      {isLoading && (
        <>
          <LoaderBackdrop />
          <LoaderWrapper>
            <ClipLoader
              loading={isLoading}
              color={colors.MidBlue}
              css={{ name: "width", styles: "border-width: 4px;" }}
              size={30}
            />
          </LoaderWrapper>
        </>
      )}
      {reservationClicked && (
        <Modal isClose={!reservationClicked} onClose={toggleReservation}>
          <ReservationModalWrapper>
            <h1>모임 신청 전에 읽어주세요</h1>
            {/* 1. 모임 전날 적어주신 전화번호로 인원을 체크하여 단톡을 파드릴게요!
            2. 모임 시작 전 참여가 어려워진 경우, 반드시 문의하기를 통해서 미리
            알려주세요! 3. 존중하는 문화로 ‘대학친구와 더 가까워지는 따뜻한
            대학가’ 를 만들 수 있게 도와주세요 */}
            <span>
              1. 모임 전날 적어주신 전화번호로 인원을 체크하여{" "}
              <strong>단톡을 파드릴게요!</strong>
              <br />
              <br />
              2. 모임 시작 전 참여가 어려워진 경우, 반드시{" "}
              <strong>문의하기를 통해서 미리 </strong>알려주세요!
              <br />
              <br />
              3. <strong>존중하는 문화로</strong> ‘대학친구와 더 가까워지는
              따뜻한 대학가’를 만들수 있게 도와주세요
            </span>
            <MainBtn onClick={makeReservationHandler} style={{ width: "90%" }}>
              OK{"!"} 놀러가기
            </MainBtn>
            <p
              onClick={() => setReservationClicked(false)}
              className="cancleBtn"
            >
              뒤로가기
            </p>
          </ReservationModalWrapper>
        </Modal>
      )}
      <BottomNavBar selectedItem="places" />
    </Container>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  margin: 20px 0;
  span {
    color: #6f7789;
    text-align: center;
    font-weight: 500;
    font-size: 13px;
    line-height: 28px;
    .info {
      color: ${colors.MidBlue};
    }
  }
`;

const SelectionBoxBooking = styled(SelectionBox)`
  margin: 22px 0;
  position: relative;
  font-size: 24px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const EnabledMainBtnBooking = styled(MainBtn)`
  margin-top: 30px;
  width: 100%;
  &:disabled {
    background-color: ${colors.LightGray};
  }
`;

const SelectionMainTextBooking = styled(SelectionMainText)`
  margin-left: 32px;
  position: relative;
`;

const SelectionSubTextBooking = styled(SelectionSubText)`
  margin-left: 32px;
`;

const Instruction = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding-bottom: 15px;
  min-height: 150px;
  background-color: #dbedff;
  border-radius: 5px;
  display: content;
  justify-content: center;
  align-items: center;
  color: ${colors.MidGray};
  line-height: 18px;
  p {
    color: #18a0fb;
  }
`;

const InstructionHeading = styled.p`
  font-weight: bolder;
  font-size: 13px;
  line-height: 16px;
  margin-left: 12px;
  padding-top: 20px;
`;

const InstructionDetail = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.005em;
  margin-left: 12px;
`;

const TagBooking = styled(Tag)`
  top: -11px;
  left: 150px;
  transform: translate(0, 50%);
`;

const CheckIcon = styled.div`
  position: absolute;
  right: 10%;
`;

export const ReservationModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  padding: 10px 40px;
  h1 {
    color: #12121d;
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
  }
  span {
    color: #18a0fb;
    font-size: 13px;
    line-height: 18px;
  }
  strong {
    font-weight: 700;
  }
  .cancleBtn {
    font-size: 16px;
    font-weight: bold;
    line-height: 28px;
    color: #a7b0c0;
    cursor: pointer;
  }
`;
