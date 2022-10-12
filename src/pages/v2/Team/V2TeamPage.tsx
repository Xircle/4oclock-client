import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import V2SubHeaderC from "../../../components/V2/UI/V2SubHeaderC";
import { getTeamById } from "../../../lib/api/getTeamById";
import { TeamData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
import { colors, V2OrangeButton } from "../../../styles/styles";
interface MatchParms {
  teamId: string;
}
interface LocationState {}

interface Props extends RouteComponentProps<MatchParms, {}, LocationState> {}

export default function V2TeamPage({ match, location, history }: Props) {
  const { teamId } = match.params;
  const { data: teamData } = useQuery<TeamData | undefined>(
    ["team", teamId],
    () => getTeamById(teamId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const applyHandler = () => {
    history.push(`/v2/apply/${teamId}`, {
      clubName: teamData?.name,
      meetingHour: teamData?.meetingHour,
      meetingDay: teamData?.meetingDay,
      price: teamData?.price,
      maxParticipant: teamData?.maxParticipant,
    });
  };

  return (
    <Container>
      <V2SubHeaderC title="정모 활동 정보" />
      <MainPicContainer>
        <MainPic
          src={optimizeImage(teamData?.images?.[0], {
            width: 375,
            height: 230,
          })}
          alt={teamData && teamData?.name + "사진"}
        />
      </MainPicContainer>
      <SectionWithPadding>
        <TeamName>{teamData?.name}</TeamName>
        <LeaderSection>
          <LeaderAvatar>
            <LeaderImg
              src={optimizeImage(teamData?.leader?.profileImageUrl, {
                width: 50,
                height: 50,
              })}
            />
            <LeaderNameText>{teamData?.leader?.username} leader</LeaderNameText>
          </LeaderAvatar>
          <SubTextDiv>🙋‍♀️리더 자기 소개</SubTextDiv>
          <LeaderIntro>
            {teamData?.leader?.shortBio
              ? teamData?.leader?.shortBio
              : "반가워요"}
          </LeaderIntro>
        </LeaderSection>
        <SOrangeButton onClick={applyHandler}>
          신청서 작성하러 가기
        </SOrangeButton>
        <Dividor>✨클럽 지원 정보✨</Dividor>
      </SectionWithPadding>
    </Container>
  );
}

const InfoSection = styled.div``;

const Dividor = styled.div`
  font-weight: 700;
  size: 22px;
  color: ${colors.Black};
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.Lime};
  margin-top: 30px;
`;

const SOrangeButton = styled(V2OrangeButton)`
  margin-top: 40px;
`;

const SubTextDiv = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-top: 20px;
`;

const LeaderIntro = styled.div`
  margin: 5px;
  padding: 10px 18px;
  background-color: #feffc2;
  min-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 13px;
  line-height: 22px;
  color: #50555c;
`;

const LeaderAvatar = styled.div`
  display: flex;
  align-items: center;
`;

const LeaderNameText = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #8c94a4;
  margin-left: 10px;
`;

const LeaderSection = styled.div`
  margin-top: 18px;
`;
const LeaderImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
  display: inline-block;
  border: 3px solid #e67255;
`;

const TeamName = styled.div`
  font-weight: 700;
  font-size: 30px;
`;

const SectionWithPadding = styled.div`
  padding: 21px;
`;

const Container = styled.div``;

const MainPicContainer = styled.div`
  height: 160px;
  position: relative;
`;

const MainPic = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;
