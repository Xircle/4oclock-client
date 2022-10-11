import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

interface MatchParms {
  teamId: string;
}

interface Props extends RouteComponentProps<MatchParms> {
  clubName?: string;
  meeting_hour?: number;
  meeting_day?: number;
  price?: number;
  max_participant?: number;
}

export default function V2ApplyingPage({
  clubName,
  meeting_day,
  meeting_hour,
  price,
  match,
}: Props) {
  const { teamId } = match.params;

  return (
    <Container>
      <V2SubHeaderC title="정모 활동 정보" />
    </Container>
  );
}

const Container = styled.div``;
