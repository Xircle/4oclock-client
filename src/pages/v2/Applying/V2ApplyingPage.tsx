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
      <V2SubHeaderC title={clubName} />
    </Container>
  );
}

const Container = styled.div``;
