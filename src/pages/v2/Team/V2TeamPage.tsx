import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { getTeamById } from "../../../lib/api/getTeamById";
import { TeamData } from "../../../lib/api/types";
import optimizeImage from "../../../lib/optimizeImage";
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

  return (
    <Container>
      <Header>
        <SFontAwesomeIcon
          onClick={() => history.goBack()}
          icon={faArrowLeft}
          size="lg"
          color="black"
        />
        <HeaderText>정모 활동 정보</HeaderText>
      </Header>
      <MainPicContainer>
        <MainPic
          src={optimizeImage(teamData?.images?.[0] || "hi", {
            width: 375,
            height: 230,
          })}
          alt={teamData && teamData?.name + "사진"}
        />
      </MainPicContainer>
      <SectionWithPadding>
        <TeamName>{teamData?.name}</TeamName>
        <LeaderSection>
          <LeaderImg src={teamData?.leader?.profileImageUrl} />
          <LeaderNameText>{teamData?.leader?.username} leader</LeaderNameText>
        </LeaderSection>
      </SectionWithPadding>
    </Container>
  );
}

const LeaderNameText = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #8c94a4;
  margin-left: 10px;
`;

const LeaderSection = styled.div`
  display: flex;
  align-items: center;
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

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  left: 5px;
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 20px;
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
