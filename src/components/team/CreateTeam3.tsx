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
      <ActivityInfo>
        <ActivityInfoText>
          클럽이 어떻게 진행될지 프렌즈들은 매우 궁금해 한답니다.
          <br />
          그렇기에 클럽을 진행하실 회차대로,
          <br />
          1~4주차 활동제목과 설명을 적어주세요.
        </ActivityInfoText>

        <ActivityInfoText style={{ marginTop: 10 }}>
          📌예시) 1주차 - 다같이 친해지는 우정시그널
          <br />
          설명: 처음 클럽원들과 만나서 친해지는 시간!
          <br />
          모두 열린 마음만 들고 와주세요!
        </ActivityInfoText>
      </ActivityInfo>
      <Label mandatory={true} labelName="(선택)클럽 활동 mission rule 소개" />
      <BlankSpace />
      <NextButton type="submit" disabled={false} onClick={onNext}>
        다음(3/3)
      </NextButton>
    </Container>
  );
}

const ActivityInfoText = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  text-align: center;

  color: #8c94a4;
`;

const Container = styled.div``;

const ActivityInfo = styled.div`
  background-color: #dbedff;
  width: 100%;
  border-radius: 10px;
  padding: 13px;
`;
