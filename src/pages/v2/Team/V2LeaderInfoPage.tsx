import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";

interface Props {}

export default function V2LeaderInfoPage({}: Props) {
  return (
    <Container>
      <V2SubHeaderC title="리더 정보" />
    </Container>
  );
}

const Container = styled.div``;
