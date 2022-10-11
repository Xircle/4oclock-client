import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { dayArr } from "../../../lib/v2/utils";
import { BigTextArea } from "../../../styles/styles";

interface MatchParms {
  teamId: string;
}

interface LocationState {
  clubName?: string;
  meetingHour?: number;
  meetingDay?: number;
  price?: number;
  maxParticipant?: number;
}

interface Props extends RouteComponentProps<MatchParms, {}, LocationState> {
  clubName?: string;
  meetingHour?: number;
  meetingDay?: number;
  price?: number;
  maxParticipant?: number;
}

export default function V2ApplyingPage({ match, location }: Props) {
  const { teamId } = match.params;
  const { clubName, meetingHour, meetingDay, price, maxParticipant } =
    location.state;

  return (
    <Container>
      <V2SubHeaderC title={"정모 신청서 작성"} />
      <InfoContainer>
        <Title>{clubName}</Title>
        {typeof meetingDay === "number" && typeof meetingHour === "number" && (
          <InfoRow>
            <InfoQuestion>모임시간</InfoQuestion>
            <InfoTime>
              매주{" "}
              {meetingDay && meetingDay >= 0 && meetingDay < 7
                ? dayArr[meetingDay] + "요일 "
                : ""}
              {meetingHour
                ? meetingHour > 12
                  ? "오후 " + (meetingHour - 12) + "시"
                  : "오전 " + meetingHour + "시"
                : ""}
            </InfoTime>
          </InfoRow>
        )}
        {typeof maxParticipant === "number" && (
          <InfoRow>
            <InfoQuestion>모집인원</InfoQuestion>
            <InfoAnswer>총 {maxParticipant} 명</InfoAnswer>
          </InfoRow>
        )}

        <InfoRow>
          <InfoQuestion>활동비</InfoQuestion>
          <InfoAnswer>{price} 원</InfoAnswer>
        </InfoRow>
        <CrewInputContainer>
          <CrewInputLabel>🙋‍♀️클럽에 신청한 이유 + 자기소개</CrewInputLabel>
          <CrewInputField name="crew" />
        </CrewInputContainer>
      </InfoContainer>
    </Container>
  );
}

const CrewInputField = styled(BigTextArea)``;

const Container = styled.div``;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #505050;
`;

const InfoContainer = styled.div`
  padding: 26px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-top: 20px;
  text-align: center;
  align-items: baseline;
`;

const InfoQuestion = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #6f7789;
  width: 100px;
`;

const InfoAnswer = styled.div`
  font-size: 15px;
  color: #505050;
`;

const InfoTime = styled(InfoAnswer)`
  font-weight: 700;
  font-size: 18px;
  color: #fd8a66;
`;

const CrewInputContainer = styled.div`
  width: 100%;
  min-height: 200px;
  border-top: 1px solid #dadada;
  margin-top: 24px;
  padding: 20px;
`;

const CrewInputLabel = styled.div``;
