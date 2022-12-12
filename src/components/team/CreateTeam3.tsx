import styled from "styled-components";
import { BlankSpace, NextButton } from "./CreateTeam1";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam3({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <Label mandatory={true} labelName="클럽 활동 회차 정보" />
      <Label mandatory={true} labelName="(선택)클럽 활동 mission rule 소개" />
      <BlankSpace />
      <NextButton type="submit" disabled={false} onClick={onNext}>
        다음(3/3)
      </NextButton>
    </Container>
  );
}

const Container = styled.div``;
