import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { BigTextArea, colors, MainBtn, MidInput } from "../../styles/styles";
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
      <OnelineInput
        placeholder="개성있는 클럽 이름을 적어주세요!"
        type="text"
        name="clubName"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        value={state.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "setName", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.name?.length}/30</CancelWordCount>
      <Label mandatory={true} labelName="만나는 정기모임 요일 및 시간" />
      <DropDownButton>
        <DropDownText>매주 만나는 요일 및 시간을 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="주 활동지역 (복수 선택 가능)" />
      <DropDownButton>
        <DropDownText>매주 만나는 장소를 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="클럽 나이대" />
      <DropDownButton>
        <DropDownText>해당 클럽의 활동 테마를 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="클럽 활동테마" />
      <DropDownButton>
        <DropDownText>해당 클럽의 활동테마를 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="리더 자기소개" />
      <MultilineInput
        name="leaderIntro"
        value={state.leaderIntro}
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
          dispatch({ type: "setLeaderIntro", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.leaderIntro?.length}/30</CancelWordCount>
      <BlankSpace />
      <NextButton type="submit" disabled={false} onClick={onNext}>
        다음(1/3)
      </NextButton>
    </Container>
  );
}

export const NextButton = styled(MainBtn)`
  position: fixed;
  z-index: 3;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #21e19c;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  &:disabled {
    background-color: ${colors.LightGray};
    filter: none;
  }
`;

export const BlankSpace = styled.div`
  height: 100px;
`;

export const CancelWordCount = styled.div`
  color: #c4cbd8;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: end;
`;

export const Container = styled.div``;

export const OnelineInput = styled(MidInput)`
  width: 100%;
`;

export const MultilineInput = styled(BigTextArea)`
  width: 100%;
`;

const DropDownButton = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c4cbd8;
  padding: 10px 8px;
  margin-bottom: 28px;
  border-radius: 8px;
  font-size: 14px;

  color: #c4cbd8;
`;

const DropDownText = styled.div`
  font-size: 14px;

  color: #c4cbd8;
`;
