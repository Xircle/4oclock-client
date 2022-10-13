import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

interface Props {
  teamId: number;
}

export default function V2LeaderApprovePage(props: Props) {
  return (
    <Container>
      <V2SubHeaderC title="리더 승인 page" />
    </Container>
  );
}

const Container = styled.div``;
