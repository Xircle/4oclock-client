import { useState } from "react";
import styled from "styled-components";
import { BlankSpace, NextButton, OnelineInput } from "./CreateTeam1";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam3({ onNext, state, dispatch }: Props) {
  const AddActivity = () => {
    dispatch({
      type: "setActivityTitles",
      payload: [...state.activityTitles, ""],
    });
    dispatch({
      type: "setActivityDetails",
      payload: [...state.activityDetails, ""],
    });
  };

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
      <AddActivityButton onClick={AddActivity}>활동 추가하기</AddActivityButton>
      <Label
        mandatory={false}
        labelName="(선택)클럽 활동 mission rule 소개"
        description="프렌즈들과 활동을 통해 얻고 싶은 미션을 적어주세요!
프렌즈들은 의미있는 활동을 좋아해요 !간단한 미션이라도 적어보아요:)  예시) 신촌 맛집 지도 그리기 /영화 감상 나누기 /전시 3회 보러가기  "
      />
      <OnelineInput
        placeholder="활동 미션을 적어주세요"
        type="text"
        name="clubMission"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        value={state.mission}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "setMission", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
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

const AddActivityButton = styled.div`
  cursor: pointer;
  background-color: #f3f1f1;
  border-radius: 15px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
