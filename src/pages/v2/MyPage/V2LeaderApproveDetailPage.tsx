import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

interface Props extends RouteComponentProps<{ teamId: string }, {}, {}> {}

export default function V2LeaderApproveDetailPage({ match }: Props) {
  return (
    <Container>
      <V2SubHeaderC title="신청서 및 정보" />
    </Container>
  );
}

const Container = styled.div``;
