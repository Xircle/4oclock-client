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
      </SectionWithPadding>
    </Container>
  );
}

const TeamName = styled.div`
  font-weight: 700;
  font-size: 20px;
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
