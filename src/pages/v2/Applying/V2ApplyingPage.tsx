import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

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
        <InfoRow>
          <InfoQuestion>모임시간</InfoQuestion>
          <InforAnswer>매주 금요일 6시</InforAnswer>
        </InfoRow>
        <InfoRow>
          <InfoQuestion>모임시간</InfoQuestion>
          <InforAnswer>매주 금요일 6시</InforAnswer>
        </InfoRow>
        <InfoRow>
          <InfoQuestion>모임시간</InfoQuestion>
          <InforAnswer>매주 금요일 6시</InforAnswer>
        </InfoRow>
      </InfoContainer>
    </Container>
  );
}

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
`;

const InfoQuestion = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #6f7789;
  width: 100px;
`;

const InforAnswer = styled.div``;
