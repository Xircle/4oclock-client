import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

interface Props {
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
}: Props) {
  return (
    <Container>
      <V2SubHeaderC title="정모 활동 정보" />
    </Container>
  );
}

const Container = styled.div``;
