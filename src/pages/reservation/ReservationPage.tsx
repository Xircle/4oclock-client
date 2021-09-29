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
import { decodeUrlSlug } from "../../lib/utils";
import { StartTime } from "../../lib/api/types";
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
    detailAddress,
    recommendation,
    participationFee,
  } = location.state;
  const [selectedTime, setSelectedTime] = useState<StartTime | undefined>();
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [reservationClicked, setReservationClicked] = useState(false);

  const { data: reservationInfo } = useQuery(
    ["getReservationParticipantNumber", placeId],
    () => getReservationParticipantNumber(placeId),
    {
      retry: 1,
    }
  );

  const toggleReservation = () => {
    setReservationClicked((prev) => !prev);
  };

  const { mutateAsync: mutateReservation, isLoading } = useMutation(
    makeReservation
  );

  const makeReservationHandler = async () => {
    if (!selectedTime || !placeId) return;
    try {
      const { data } = await mutateReservation({
        startTime: selectedTime,
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

          <SelectionBoxBooking onClick={() => setSelectedTime("Four")}>
            <SelectionMainTextBooking>
              {startDateFromNow} 오후 4시
              <TagBooking>
                <p>4인 모임</p>
              </TagBooking>
            </SelectionMainTextBooking>
            <SelectionSubTextBooking>
              {reservationInfo?.[0].participantNumber || "0"}명 참가중
            </SelectionSubTextBooking>
            <CheckIcon>
              {selectedTime === "Four" ? (
                <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
              ) : (
                <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
              )}
            </CheckIcon>
          </SelectionBoxBooking>

          <SelectionBoxBooking onClick={() => setSelectedTime("Seven")}>
            <SelectionMainTextBooking>
              {startDateFromNow} 오후 7시
              <TagBooking>
                <p>2인 모임</p>
              </TagBooking>
            </SelectionMainTextBooking>
            <SelectionSubTextBooking>
              {reservationInfo?.[1].participantNumber || "0"}명 참가중
            </SelectionSubTextBooking>
            <CheckIcon>
              {selectedTime === "Seven" ? (
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
            <InstructionHeading>네시모해는 이렇게 진행돼요!</InstructionHeading>
            <InstructionDetail>
              1. 같은 시간을 신청한 친구들과 4인/2인 단톡을 만들어 드려요
              <br />
              2. 모임 전날 단톡을 만들어드려요! 친해지는 시간을 가져보세요
              <br />
              3. 지정된 장소와 시간에 만나서 놀아요.
              <br />
            </InstructionDetail>
            <InstructionDetail style={{ marginTop: "9px" }}>
              {"※"}단톡이 만들어지면 적어주신 전화번호로 연락을 드릴게요!
            </InstructionDetail>
          </Instruction>
          <EnabledMainBtnBooking
            disabled={!selectedTime}
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
          <ModalWrapper>
            <h1>모임 신청 전에 읽어주세요</h1>
            <span>
              1. 모임 전날 적어주신 전화번호로{" "}
              <strong>오픈카카오톡 단톡 링크</strong>를 보내드릴게요.
              <br />
              <br />
              2. 모임 시작 전 참여가 어려워진 경우, 반드시{" "}
              <strong>문의하기를 통해서 미리 </strong>알려주세요!
              <br />
              <br />
              3. <strong>존중하는 문화로</strong> ‘대학친구와 더 가까워지는
              따뜻한 대학가’ 를 만들 수 있게 도와주세요
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
          </ModalWrapper>
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
  min-height: 150px;
  background-color: #dbedff;
  border-radius: 5px;
  display: content;
  justify-content: center;
  align-items: center;
  color: ${colors.MidGray};
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
  font-weight: 400;
  font-size: 11px;
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

const ModalWrapper = styled.div`
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
    font-size: 14px;
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
