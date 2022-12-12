import styled from "styled-components";
import { colors, MidInput } from "../../styles/styles";
import { BlankSpace, NextButton } from "./CreateTeam1";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam2({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <Label mandatory={true} labelName="클럽 활동 소개" />
      <Label
        mandatory={true}
        labelName="클럽소개 세부글"
        description="진행하실 클럽에 대한 소개를 적어주세요!"
      />
      <Label
        mandatory={true}
        labelName="클럽 소개 사진 올리기(2개 필수)"
        description="설명만으로는 부족한 my클럽을 표현하는 사진을 올려주세요!
사진을 통해 클럽의 매력을 발산해주세요!"
      />
      <BlankSpace />
      <NextButton type="submit" disabled={false} onClick={onNext}>
        다음(2/3)
      </NextButton>
    </Container>
  );
}

const Container = styled.div``;
