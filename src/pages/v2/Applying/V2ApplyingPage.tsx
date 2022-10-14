import { useState } from "react";
import { useMutation } from "react-query";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import { CURRENT_USER } from "../../../components/shared/constants";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { createApplication } from "../../../lib/api/createApplication";
import storage from "../../../lib/storage";
import { ApplicationStatus } from "../../../lib/v2/enums";
import { dayArr } from "../../../lib/v2/utils";
import routes from "../../../routes";
import { BigTextArea, colors } from "../../../styles/styles";

interface MatchParms {
  teamId: string;
}

interface LocationState {
  clubName?: string;
  meetingHour?: number;
  meetingDay?: number;
  price?: number;
  maxParticipant?: number;
}

interface Props extends RouteComponentProps<MatchParms, {}, LocationState> {
  clubName?: string;
  meetingHour?: number;
  meetingDay?: number;
  price?: number;
  maxParticipant?: number;
}

export default function V2ApplyingPage({ match, location }: Props) {
  const history = useHistory();
  const { teamId } = match.params;
  const [content, setContent] = useState("");
  const { clubName, meetingHour, meetingDay, price, maxParticipant } =
    location.state;
  const { mutateAsync: mutateCreateApplication, isLoading } =
    useMutation(createApplication);

  const applyTeam = async () => {
    if (isLoading) return;
    if (!storage.getItem(CURRENT_USER)?.token) {
      alert("로그인 후 이용해주세요");
      return;
    }
    const data = await mutateCreateApplication({
      teamId: parseInt(teamId),
      content,
      status: ApplicationStatus.Pending,
    });
    if (data.data.ok) {
      history.push(routes.v2MyPage);
    } else {
      alert(data.data.error);
    }
  };

  return (
    <Container>
      <LoaderWrapper top={"40%"}>
        <ClipLoader
          loading={isLoading}
          color={colors.MidBlue}
          css={{
            name: "width",
            styles: "border-width: 4px; z-index: 999;",
          }}
          size={40}
        />
      </LoaderWrapper>

      <V2SubHeaderC title={"정모 신청서 작성"} />
      <InfoContainer>
        <Title>{clubName}</Title>
        {typeof meetingDay === "number" && typeof meetingHour === "number" && (
          <InfoRow>
            <InfoQuestion>모임시간</InfoQuestion>
            <InfoTime>
              매주{" "}
              {meetingDay && meetingDay >= 0 && meetingDay < 7
                ? dayArr[meetingDay] + "요일 "
                : ""}
              {meetingHour
                ? meetingHour > 12
                  ? "오후 " + (meetingHour - 12) + "시"
                  : "오전 " + meetingHour + "시"
                : ""}
            </InfoTime>
          </InfoRow>
        )}
        {typeof maxParticipant === "number" && (
          <InfoRow>
            <InfoQuestion>모집인원</InfoQuestion>
            <InfoAnswer>총 {maxParticipant} 명</InfoAnswer>
          </InfoRow>
        )}

        <InfoRow>
          <InfoQuestion>활동비</InfoQuestion>
          <InfoAnswer>{price} 원</InfoAnswer>
        </InfoRow>
        <CrewInputContainer>
          <CrewInputLabel>🙋‍♀️클럽에 신청한 이유 + 자기소개</CrewInputLabel>
          <CrewInputField
            name="crew"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContent(e.target.value);
            }}
          />
        </CrewInputContainer>
        <SubmitButton onClick={applyTeam}>신청서 제출하기</SubmitButton>
      </InfoContainer>
    </Container>
  );
}

export const LoaderWrapper = styled.div<{ top?: string }>`
  position: absolute;
  left: 50%;
  top: ${(props) => props.top || "40%"};
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #21e19c;
  height: 50px;
  font-weight: 700;
  font-size: 22px;
  -webkit-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  &:hover {
    opacity: 0.5;
  }
`;

const CrewInputField = styled(BigTextArea)`
  width: 100%;
`;

const Container = styled.div``;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #505050;
`;

const InfoContainer = styled.div`
  padding: 26px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-top: 20px;
  text-align: center;
  align-items: baseline;
`;

const InfoQuestion = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #6f7789;
  width: 100px;
`;

const InfoAnswer = styled.div`
  font-size: 15px;
  color: #505050;
`;

const InfoTime = styled(InfoAnswer)`
  font-weight: 700;
  font-size: 18px;
  color: #fd8a66;
`;

const CrewInputContainer = styled.div`
  width: 100%;
  min-height: 200px;
  border-top: 1px solid #dadada;
  margin-top: 24px;
  padding: 20px;
`;

const CrewInputLabel = styled.div``;
