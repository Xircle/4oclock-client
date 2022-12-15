import styled from "styled-components";
import { colors, MidInput } from "../../styles/styles";
import {
  BlankSpace,
  CancelWordCount,
  Container,
  MultilineInput,
  NextButton,
  OnelineInput,
} from "./CreateTeam1";
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
      {/*       
      <Label mandatory={true} labelName="클럽 활동 소개" />
      <OnelineInput
        placeholder="활동을 간단하게 표현한 한줄소개를 적어주세요!"
        type="text"
        name="clubDescription"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        value={state.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "setDescription", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.description?.length ?? 0}/30</CancelWordCount> */}
      <Label
        mandatory={true}
        labelName="클럽소개 세부글"
        description="진행하실 클럽에 대한 소개를 적어주세요!"
      />
      <MultilineInput
        name="description"
        value={state.description}
        placeholder="프렌즈들에게 보여주는 리더의 자기소개를 적어주세요!"
        // style={
        //   bioError
        //     ? {
        //         fontSize: "12px",
        //         lineHeight: "18px",
        //         borderColor: colors.MidBlue,
        //       }
        //     : { fontSize: "12px", lineHeight: "18px" }
        // }
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          dispatch({ type: "setDescription", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.description?.length ?? 0}/30</CancelWordCount>
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

const PhotoContainer = styled.div`
  width: 100%;
`;
