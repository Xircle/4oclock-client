import styled from "styled-components";
import { MidInput } from "../../styles/styles";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam1({ onNext, state, dispatch }: Props) {
  return (
    <Container>
      <Label mandatory={true} labelName="클럽 이름" />
      <OnlineInput
        placeholder="개성있는 클럽 이름을 적어주세요!"
        type="text"
        name="clubName"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        // value={state.team}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   dispatch({ type: "setAge", payload: e.target.value })
        // }
        //onKeyUp={() => Validate()}
      />
      <Label mandatory={true} labelName="만나는 정기모임 요일 및 시간" />
      <Label mandatory={true} labelName="주 활동지역 (복수 선택 가능)" />
      <Label mandatory={true} labelName="클럽 나이대" />
      <Label mandatory={true} labelName="클럽 활동테마" />
      <Label mandatory={true} labelName="리더 자기소개" />
    </Container>
  );
}

const Container = styled.div``;

const OnlineInput = styled(MidInput)``;
