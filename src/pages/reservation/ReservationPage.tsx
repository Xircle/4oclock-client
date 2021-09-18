import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { RouteComponentProps } from "react-router-dom";
import { useState } from "react";
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
} from "../../styles";
import routes from "../../routes";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import { useMutation } from "react-query";
import { makeReservation } from "../../lib/api/makeReservation";
import { decodeUrlSlug } from "../../lib/utils";
import { StartTime } from "../../lib/api/types";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import ClipLoader from "react-spinners/ClipLoader";

interface Props
  extends RouteComponentProps<{ name: string }, {}, { placeId: string }> {}

export default function ReservationPage({ match, location, history }: Props) {
  const { name: placeName } = match.params;
  const placeId = location.state?.placeId;
  const [selectedTime, setSelectedTime] = useState<StartTime | undefined>();

  const { mutateAsync: mutateReservation, isLoading } =
    useMutation(makeReservation);

  const makeReservationHandler = async () => {
    if (!selectedTime || !placeId) return;
    try {
      const { data } = await mutateReservation({
        startTime: selectedTime,
        placeId,
      });
      if (!data.ok) {
        console.log("error");
        alert(data.error);
        window.location.href = routes.placeFeed;
        return;
      }
      history.push(routes.reservationConfirm);
    } catch (err) {
      console.log(err);
      alert(err);
      return;
    }
  };

  return (
    <Container>
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>{decodeUrlSlug(placeName)}</Heading>
          <SelectionBoxBooking onClick={() => setSelectedTime("Four")}>
            <SelectionMainTextBooking>
              다음주 수요일 오후 4시
              <TagBooking>
                <p>4인 모임</p>
              </TagBooking>
            </SelectionMainTextBooking>
            <SelectionSubTextBooking>5명 참가중</SelectionSubTextBooking>
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
              다음주 수요일 오후 4시
              <TagBooking>
                <p>2인 모임</p>
              </TagBooking>
            </SelectionMainTextBooking>
            <SelectionSubTextBooking>7명 참가중</SelectionSubTextBooking>
            <CheckIcon>
              {selectedTime === "Seven" ? (
                <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
              ) : (
                <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
              )}
            </CheckIcon>
          </SelectionBoxBooking>
          <Instruction>
            <InstructionHeading>
              식탁 모임은 이렇게 진행돼요!
            </InstructionHeading>
            <InstructionDetail>
              1. 같은 시간을 신청한 친구들과 4인/2인 랜덤 그룹을 만들어 드려요
              <br />
              2. 모임 당일 단톡을 만들어드려요! 친해지는 시간을 가져보세요
              <br />
              3. 지정된 장소와 시간에 만나서 놀아요.
              <br />
            </InstructionDetail>
            <InstructionDetail style={{ marginTop: "9px" }}>
              단톡이 만들어지기전에 적어주신 전화번호로 연락을 드릴게요!
            </InstructionDetail>
          </Instruction>
          <EnabledMainBtnBooking
            disabled={!selectedTime}
            onClick={makeReservationHandler}
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
              size={40}
            />
          </LoaderWrapper>
        </>
      )}
      <BottomNavBar selectedItem="places" />
    </Container>
  );
}

const SelectionBoxBooking = styled(SelectionBox)`
  margin-top: 30px;
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
  min-height: 200px;
  background-color: #f8fafd;
  border-radius: 5px;
  display: content;
  justify-content: center;
  align-items: center;
  color: ${colors.MidGray};
  p {
    color: #8c94a4;
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
